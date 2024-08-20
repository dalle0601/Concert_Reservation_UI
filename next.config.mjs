/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        middleware: true,
    },
    reactStrictMode: false, // 여기에 추가
};

export default nextConfig;
