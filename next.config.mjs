/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger must not keep HTML from an obsolete deployment for a year.
  expireTime: 600,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.callcentercommunications.com' }],
        destination: 'https://callcentercommunications.com/:path*',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
