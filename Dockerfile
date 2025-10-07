# Stage 1: Builder - Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies for building
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies
RUN npm ci

# Copy all application code
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the static Next.js application
RUN npm run build

# Stage 2: Runner - Serve with nginx
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Create custom nginx configuration for SPA
RUN echo 'server { \n\
    listen 80; \n\
    listen [::]:80; \n\
    server_name _; \n\
    root /usr/share/nginx/html; \n\
    index index.html; \n\
    \n\
    # Gzip compression \n\
    gzip on; \n\
    gzip_vary on; \n\
    gzip_min_length 1024; \n\
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json; \n\
    \n\
    # Security headers \n\
    add_header X-Frame-Options "SAMEORIGIN" always; \n\
    add_header X-Content-Type-Options "nosniff" always; \n\
    add_header X-XSS-Protection "1; mode=block" always; \n\
    \n\
    # Cache static assets \n\
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ { \n\
        expires 1y; \n\
        add_header Cache-Control "public, immutable"; \n\
    } \n\
    \n\
    # SPA fallback for client-side routing \n\
    location / { \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

# Copy built static files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Create non-root user for security
RUN adduser -D -u 1001 nginxuser && \
    chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    chown -R nginxuser:nginxuser /var/log/nginx && \
    chown -R nginxuser:nginxuser /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid

# Update nginx config to run as non-root user
RUN sed -i 's/user  nginx;/user  nginxuser;/' /etc/nginx/nginx.conf

# Switch to non-root user
USER nginxuser

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
