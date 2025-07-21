import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', 
  // Optional: Uncomment and set to true if you use next/image with external images that shouldn't be optimized by Next.js itself (required for static export)
  // images: {
  //   unoptimized: true,
  // },

  // IMPORTANT: If you use an `images` configuration with `output: 'export'`,
  // you must also set `unoptimized: true` or define a custom `loader`.
  // Otherwise, image optimization features (which require a server) will not work.
};

export default nextConfig;