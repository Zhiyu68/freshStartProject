import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductRating from "@/components/product/ProductRating";
import AddToCart from "@/components/product/AddToCart";

dayjs.extend(relativeTime);

export default function ProductCard({ product, priority = true }) {
  if (!product) {
    return null;
  }

  return (
    <div className="card my-3">
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Image
          src={product?.images?.[0]?.secure_url || "/images/default.png"}
          width={500}
          height={300}
          priority={true}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt={product?.title || "Product Image"}
        />
      </div>

      <div className="card-body">
        <Link href={`/product/${product?.slug}`}>
          <h5 className="card-title">
            <strong>£{product?.price?.toFixed(2)}</strong>
            {product?.title}
          </h5>
        </Link>

        {product?.previousPrice > product.price && (
          <h5 className="card-title text-danger">
            🛍️ <del> £{product?.previousPrice?.toFixed(2)}</del>
          </h5>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html:
              product?.description?.length > 160
                ? `${product?.description?.substring(0, 160)}...`
                : product?.description,
          }}
        />
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>Category: {product?.category?.name || "No Catrgory"}</small>
        <small>
          Tags: {product?.tags?.map((t) => t?.name).join(", ") || "No tag"}
        </small>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>❤️ {product?.likes?.length || 0} Likes</small>
        <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <small>Brand: {product?.brand || "No brand"}</small>
        <ProductRating product={product} leaveARating={false} />
      </div>

      <div className="card-footer">
        <AddToCart product={product} />
      </div>
    </div>
  );
}
