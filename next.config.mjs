/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites(){
        return [
            {
                source:'/test/:path*',
                destination: 'http://localhost:5000/:path*'
            }
        ]
    }
};

export default nextConfig;
