let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // /devices and /builder are hidden for now. The page code is kept in app/devices and app/builder.
  // To bring it back: delete this redirects() block and restore the nav, footer and sitemap links.
  async redirects() {
    return [
      { source: '/devices', destination: '/services', permanent: false },
      { source: '/builder', destination: '/services', permanent: false },
      { source: '/services/audio-video', destination: '/services/media-control', permanent: true },
      { source: '/services/smart-plugs', destination: '/services/appliances', permanent: true },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
