import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category";
import Marche from "@/models/marche"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/auth"

async function findCategoryIdByCatName(catName:string) {
  const category = await Category.findOne({ catName })
  if (category) {
    return category._id; 
  }
  return null; 
}

export const PUT = async (req: Request,
  {params}:{params: {id:string}})=> {
    await connectMongoDB()
    const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }
  const {id} = params

  const {
    category: catName,
    genre,
    title, 
    detail,
    price,
    priceLunch,
    volume,
    imageData,
  } = await req.json()
  
  console.log("Received data:", {
    catName,
    genre,
    title,
    detail,
    price,
    priceLunch,
    volume,
    imageData,
  });

  const parsedTitle = JSON.parse(title);
  const parsedDetail = JSON.parse(detail);
  const categoryId = catName ? await findCategoryIdByCatName(catName) : null

  console.log("Parsed data:", {
    categoryId,
    genre,
    parsedTitle,
    parsedDetail,
    price,
    priceLunch,
  });

  await Marche.findByIdAndUpdate(id, {
  category: categoryId,
  genre,
  'title.en': parsedTitle.en,
  'title.fr': parsedTitle.fr,
  'title.jp': parsedTitle.jp,
  'detail.en': parsedDetail.en,
  'detail.fr': parsedDetail.fr,
  'detail.jp': parsedDetail.jp,
  price,
  priceLunch,
  volume,
  imageData,
  })
  return NextResponse.json({message:"Marche updated"}, {status: 200})
}


export const GET = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const marche = await Marche.findOne({_id: id}).populate('category')

  return NextResponse.json({marche}, {status: 200})
}

export const DELETE = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()

  try {
    const marche = await Marche.findByIdAndDelete({_id: id})
    return NextResponse.json(marche)   
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Error deleting the marche"})
  }
}