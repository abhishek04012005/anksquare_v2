/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
};

module.exports = nextConfig;
