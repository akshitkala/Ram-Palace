/** @type {import('next').NextConfig} */
const nextConfig = {
  // BRP-FIX: B-3
  async redirects() {
    return [
      {
        source: '/catering/menu',
        destination: '/menu',
        permanent: true,
      },
      {
        source: '/events/corporate-events',
        destination: '/events/corporate',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    minimumCacheTTL: 2592000, // 30 days
  },
};

export default nextConfig;