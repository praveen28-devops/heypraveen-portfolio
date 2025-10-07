    # Dockerfile

    # ---- Stage 1: Build the static assets ----
        FROM node:20-alpine AS builder
        WORKDIR /app
    
        # Copy package files and install dependencies
        COPY package*.json ./
        RUN npm ci
    
        # Copy the rest of the application source code
        COPY . .
    
        # Build the application for static export
        RUN npm run build
    
        # ---- Stage 2: Serve the static assets with Nginx ----
        FROM nginx:1.27-alpine AS runner
    
        # Copy the static files from the build stage to the Nginx web root
        COPY --from=builder /app/out /usr/share/nginx/html
    
        # Optional: Add a custom Nginx config for client-side routing
        COPY nginx.conf /etc/nginx/conf.d/default.conf
    
        EXPOSE 80
    
        # Command to start Nginx
        CMD ["nginx", "-g", "daemon off;"]
        
    