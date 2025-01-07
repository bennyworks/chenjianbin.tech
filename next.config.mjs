import { withContentlayer } from 'next-contentlayer2'

import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },

  webpack: (config, { dev }) => {
    config.infrastructureLogging = {
      level: 'error', // 可以设置为 'none' 或 'error' 来减少日志输出
    }
    return config
  },
}

export default withContentlayer(nextConfig)
