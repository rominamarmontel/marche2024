import cloudinary from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const removeImage = async(publicId:string) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId)
    console.log("Image removed")
  } catch (error) {
    console.log(error)
  }
}

export const POST = async (req: Request) => {
  const { publicIds } = await req.json();

  if (Array.isArray(publicIds)) {
    for (const publicId of publicIds) {
      await removeImage(publicId);
    }

    return NextResponse.json({ message: 'success' });
  } else {
    return NextResponse.json(
      { message: 'Invalid payload. publicIds must be an array.'},{status: 400}
    );
  }
};