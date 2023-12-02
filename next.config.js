/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**',
          },
        ],
    },
}

module.exports = nextConfig
