let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

const blogSlugs = {
  1: 'smart-home-devices-philippines',
  2: 'smart-home-security-philippines',
  3: 'smart-home-voice-assistant',
  4: 'smart-home-energy-saving',
  5: 'smart-home-integration',
  6: 'smart-home-for-elderly',
  7: 'how-to-start-a-smart-home-philippines',
  8: 'cut-aircon-electricity-bill-philippines',
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // /devices and /builder are hidden for now. The page code is kept in app/devices and app/builder.
  // To bring it back: delete this redirects() block and restore the nav, footer and sitemap links.
  async redirects() {
    return [
      // Send the old vercel.app address (and www) to the real domain so Google only sees one site.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'smarterhomeph.vercel.app' }],
        destination: 'https://smarterhomephilippines.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.smarterhomephilippines.com' }],
        destination: 'https://smarterhomephilippines.com/:path*',
        permanent: true,
      },
      ...Object.entries(blogSlugs).map(([id, slug]) => ({ source: `/blog/${id}`, destination: `/blog/${slug}`, permanent: true })),
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
