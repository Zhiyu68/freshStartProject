import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Order from "@/models/order";
import { currentUser } from "@/utils/currentUser";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  // console.log("body in rating route", body);
  const { productId, rating, comment } = body;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // const user = await currentUser(req);
  // if (!token || !token.user || !token.user._id) {
  //   return NextResponse.json({ err: "Unauthorized request" }, { status: 401 });
  // }
  try {
    const product = await Product.findById(productId);
    // if (!product) {
    //   return NextResponse.json({ err: "Product not found" }, { status: 404 });
    // }

    //check if user has already left a rating
    const existingRating = product.ratings.find(
      (rate) => rate.postedBy.toString() === token.user._id.toString()
    );

    // Check if the user has purchased the product
    const userPurchased = await Order.findOne({
      userId: token.user._id,
      "cartItems._id": productId,
    });

    if (!userPurchased) {
      return NextResponse.json(
        {
          err: "You can only leave a review for products you've purchased.",
        },
        { status: 400 }
      );
    }
    //check if the user has purchased the product
    if (existingRating) {
      //update the exiting rating
      existingRating.rating = rating;
      existingRating.comment = comment;
      await product.save();

      return NextResponse.json(product, { status: 200 });
    }
    // if the user has not already rated, add a new rating
    product.ratings.push({
      rating: rating,
      postedBy: token.user._id,
      comment: comment,
    });

    const updated = await product.save();

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Please try again later" },
      { status: 500 }
    );
  }
}
