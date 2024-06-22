/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
  env: {
    NEXT_PUBLIC_NEXTAUTH_URL: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
  },
}

export default nextConfig
