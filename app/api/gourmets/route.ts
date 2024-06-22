import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category";
import Gourmet from "@/models/gourmet"
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
    const newGourmet = await Gourmet.create({
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

    await newGourmet.save();
    console.log(newGourmet);
    return NextResponse.json({ res: newGourmet });
  } catch (error) {
    console.error("Error creating new gourmet:", error);
    return NextResponse.json({ error: "Failed to create gourmet" }, { status: 500 });
  }
};

export const GET = async(req:Request) => {
  await connectMongoDB()
  const gourmets = await Gourmet.find()
  const gourmetsWithCategories = await Promise.all(
    gourmets.map(async (gourmet) => {
      if (gourmet.category) {
        const categoryObject = await Category.findById(gourmet.category);
        return { ...gourmet.toObject(), category: categoryObject };
      }
      return gourmet.toObject();
    })
  );

  return NextResponse.json(gourmetsWithCategories)
}

export const DELETE = async(req:NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await Gourmet.findByIdAndDelete(id)
  return NextResponse.json({message:"Gourmet deleted"}, {status: 200})
}