/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "*.googleusercontent.com",
            port: "",
            pathname: "**",
        },
        ],
    },
    env: {
        POSTGRES_URL: process.env.POSTGRES_URL,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET
    }
}

module.exports = nextConfig
