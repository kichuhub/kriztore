import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }]
  }
};

export default nextConfig;
