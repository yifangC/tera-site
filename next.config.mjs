/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure App Router is enabled if you're using it
  },
  transpilePackages: ["next-mdx-remote"],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};


import createMDX from '@next/mdx'
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
