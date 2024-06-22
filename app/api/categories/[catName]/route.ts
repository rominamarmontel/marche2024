import { NextResponse } from "next/server"
import Gourmet from '@/models/gourmet'
import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category"

async function findCategoryIdByCatName(catName: string) {
  const category = await Category.findOne({ catName });
  if (category) {
    return category._id; 
  }
  return null; 
}

export const GET = async (
  req: Request, 
  { params }: { params: { catName: string } }
) => {
  try {
    const catName = params.catName;
    const categoryId = await findCategoryIdByCatName(catName); 
    await connectMongoDB();

    const gourmets = await Gourmet.find({ category: categoryId }).populate('category');
    
    const oneGourmet = gourmets.map((gourmet) => {
      const {
        _id,
        category,
        title,
        detail,
        price,
        priceLunch,
        volume,
        imageData,
      } = gourmet;

      return {
        _id,
        category,
        title: {
          en: title?.en || '',
          fr: title?.fr || '',
          jp: title?.jp || '',
        },
        detail: {
          en: title?.en || '',
          fr: title?.fr || '',
          jp: title?.jp || '',
        },
        price,
        priceLunch,
        volume,
        imageData,
      };
    });
    return NextResponse.json({ categoryId, catName, oneGourmet });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch catName" });
  }
}
