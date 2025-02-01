import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";
import UserReviews from "@/components/product/UserReviews";
import CouponCode from "@/components/product/CouponCode";
import AddToCart from "@/components/product/AddToCart";
import ProductCard from "@/components/product/ProductCard";
dayjs.extend(relativeTime);

export async function generateMetadata({ params }) {
  const product = await getProduct(params?.slug);
  // console.log("Fetched product:", product); // 👀 确保 `product` 不是 `undefined`
  return {
    title: product?.title,
    description: product?.description?.substring(0, 160),
    // openGraph: {
    //   images:
    //     product?.images?.length > 0
    //       ? product.images[0]?.secure_url
    //       : "/default.png",
    // },
  };
}

async function getProduct(slug) {
  try {
    const response = await fetch(`${process.env.API}/product/${slug}`, {
      method: "GET",
      next: { revalidate: 1 },
    });
    // console.log("respsonse", response);

    if (!response.ok) {
      throw new Error("111111111Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductViewPage({ params }) {
  const { product, relatedProducts } = await getProduct(params?.slug);
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 card pt-5">
          <h1 className="text-center">{product?.title}</h1>

          {/* <CouponCode product={product} /> */}
          {/* show product images in modal */}
          <ProductImage product={product} />
          <div className="card-body">
            <div className=" text-center">
              <h3>
                <strong className="card-title ">
                  <CouponCode product={product} />
                  {/* {product?.price?.toFixed(2)} */}
                </strong>
              </h3>

              {product?.previousPrice > product?.price && (
                <h4 className=" text-danger">
                  🛍️ <del> £{product?.previousPrice?.toFixed(2)}</del>
                </h4>
              )}
              <br />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description?.replace(/\./g, "<br/><br/>"),
              }}
            />

            <div className="alert alert-primary mt-4">
              Brand: {product?.brand}
            </div>
          </div>
          {/* before accessing category and tags, make sure .populate() is used in api routes and ref: 'Category' models are imported in `Product` model */}
          <div className="card-footer d-flex justify-content-between">
            <small>Category: {product?.category?.name}</small>
            <small>Tags: {product?.tags?.map((t) => t?.name).join(" ")}</small>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <ProductLike product={product} />
            <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
          </div>

          <div className="card-footer">
            <ProductRating product={product} />

            <div className="my-3">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <p className="lead text-center my-5">Other products you may like</p>
          <div className="row">
            {relatedProducts?.map((product) => (
              <div className="col-lg-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      ;
      <div className="row">
        <div className="col-lg-8 offset-lg-2 my-5">
          <UserReviews reviews={product?.ratings} />
        </div>
      </div>
    </div>
  );
}
