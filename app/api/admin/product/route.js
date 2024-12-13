import { NextReqsponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import product from "@/models/product";
import slugify from "slugify";
import product from "@/models/product";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const product = await product.create({
      ...body,
      slug: slugify(body.title),
    });
    return NextReqsponse.json(product);
  } catch (err) {
    return NextReqsponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
