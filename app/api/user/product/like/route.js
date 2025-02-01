import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  await dbConnect();
  const user = await currentUser();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // console.log("token in user liked-products => ", token);

  try {
    const likedProducts = await Product.find({ likes: token.user._id });
    return NextResponse.json(likedProducts);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  const user = await currentUser();
  const { productId } = await req.json();

  try {
    const updated = await Product.findByIdAndUpdate(
      productId,
      { $addToSet: { likes: user._id } },
      { new: true }
    );
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
