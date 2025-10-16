/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ⚠️ CRITICAL: This enables static HTML export
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,
  transpilePackages: ['three', '@react-three/fiber'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
};

export default nextConfig;