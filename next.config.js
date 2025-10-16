/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Changed for Docker optimization
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['three', '@react-three/fiber'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;