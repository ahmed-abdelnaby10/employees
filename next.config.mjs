/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'server-qp7t.onrender.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
