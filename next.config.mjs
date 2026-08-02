/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old URLs from the first revamp iteration
      { source: "/engineering", destination: "/career", permanent: true },
      { source: "/food/restaurants", destination: "/food", permanent: true },
    ];
  },
};

export default nextConfig;
