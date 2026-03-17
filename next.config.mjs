/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/android',
        destination: 'https://play.google.com/store/apps/details?id=com.kttylabs.app',
        permanent: true,
      },
      {
        source: '/ios',
        destination: 'https://apps.apple.com/gb/app/hollowscan/id6759551811',
        permanent: true,
      },
    ]
  },
}

export default nextConfig