import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
          <h5 className="card-title">{product?.title}</h5>
        </Link>

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
        <small>Category: {product?.category?.name || "未分类"}</small>
        <small>
          Tags: {product?.tags?.map((t) => t?.name).join(", ") || "无标签"}
        </small>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>❤️ {product?.likes?.length || 0} Likes</small>
        <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>Brand: {product?.brand || "未知品牌"}</small>
        <small>⭐️ {product?.ratings?.length || 0} Reviews</small>
      </div>
    </div>
  );
}
