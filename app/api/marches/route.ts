import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category";
import Marche from "@/models/marche"
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server"
import { authOptions } from "../auth/auth";

async function findCategoryIdByCatName(catName: string) {
  await connectMongoDB();
  const category = await Category.findOne({ catName });
  console.log("Category found:", category); 
  if (category) {
    return category._id;
  }
  return null;
}

export const POST = async (req: Request) => {
  await connectMongoDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const {
    category: catName,
    genre,
    title,
    detail,
    price,
    priceLunch,
    volume,
    imageData,
  } = await req.json();

  // console.log("Received data:", {
  //   catName,
  //   genre,
  //   title,
  //   detail,
  //   price,
  //   priceLunch,
  //   volume,
  //   imageData,
  // });
  const parsedTitle = JSON.parse(title);
  const parsedDetail = JSON.parse(detail);
  const categoryId = await findCategoryIdByCatName(catName);
  if (!categoryId) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  // console.log("Parsed data:", {
  //   categoryId,
  //   genre,
  //   parsedTitle,
  //   parsedDetail,
  //   price,
  //   priceLunch,
  // });

  try {
    const newMarche = await Marche.create({
      category: categoryId,
      genre,
      title: {
        en: parsedTitle.en,
        fr: parsedTitle.fr,
        jp: parsedTitle.jp,
      },
      detail: {
        en: parsedDetail.en,
        fr: parsedDetail.fr,
        jp: parsedDetail.jp,
      },
      price,
      priceLunch,
      volume,
      imageData,
    });

    await newMarche.save();
    console.log(newMarche);
    return NextResponse.json({ res: newMarche });
  } catch (error) {
    console.error("Error creating new marche:", error);
    return NextResponse.json({ error: "Failed to create marche" }, { status: 500 });
  }
};

export const GET = async(req:Request) => {
  await connectMongoDB()
  const marches = await Marche.find()
  const marchesWithCategories = await Promise.all(
    marches.map(async (marche) => {
      if (marche.category) {
        const categoryObject = await Category.findById(marche.category);
        return { ...marche.toObject(), category: categoryObject };
      }
      return marche.toObject();
    })
  );

  return NextResponse.json(marchesWithCategories)
}

export const DELETE = async(req:NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Marche.findByIdAndDelete(id)
  return NextResponse.json({message:"Marche deleted"}, {status: 200})
}