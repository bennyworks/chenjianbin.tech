import { withContentlayer } from 'next-contentlayer2'
import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  // Next.js 15 不再需要 serverComponentsExternalPackages 配置
  // 它现在自动处理外部包

  webpack: (config, { dev }) => {
    config.infrastructureLogging = {
      level: 'error', // 可以设置为 'none' 或 'error' 来减少日志输出
    }
    return config
  },
}

export default withContentlayer(nextConfig)
