import path from "path";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(process.cwd(), "app/components"),
    };
    return config;
  },
};

export default nextConfig;
