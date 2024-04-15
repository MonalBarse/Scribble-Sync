/** @type {import('next').NextConfig} */
const nextConfig = {
  // for avoiding webpack errors for canvas, utf-8-validate, bufferutil errors in nextjs
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
    });
    // config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
  images: {
    // For accessing images from external domains like liveblocks.io
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liveblocks.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
    ],
  },
  typescript: {
    // For ignoring build errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
