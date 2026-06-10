/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingExcludes: {
    "/*": ["./Portfolio/**/*"],
  },
};

export default nextConfig;
