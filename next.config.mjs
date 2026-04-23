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
  compress: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|otf|ttf|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
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
    qualities: [70, 75, 85, 95],
    minimumCacheTTL: 2592000, // 30 days
  },
};

export default nextConfig;