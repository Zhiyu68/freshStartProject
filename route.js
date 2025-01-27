import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";

dayjs.extend(relativeTime);

async function getProduct(slug) {
  try {
    const response = await fetch(`${process.env.API}/product/${slug}`, {
      method: "GET",
      next: { revalidate: 1 },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.err);
    }

    if (!data) {
      throw new Error("failed to find product data");
    }

    return data;
  } catch (err) {
    console.error("fetch data fail:", err);
    throw err;
  }
}

export async function generateMetadata({ params }) {
  try {
    if (!params?.slug) {
      return {
        title: "产品未找到",
        description: "no description",
      };
    }
    const product = await getProduct(params.slug);
    return {
      title: product?.title || "product title",
      description:
        product?.description?.substring(0, 160) || "product description",
    };
  } catch (error) {
    console.error("生成元数据错误:", error);
    return {
      title: "产品未找到",
      description: "无法加载产品信息",
    };
  }
}

export default async function ProductViewPage({ params }) {
  try {
    if (!params?.slug) {
      return (
        <div className="container">
          <div className="alert alert-danger">产品标识符未提供</div>
        </div>
      );
    }

    const product = await getProduct(params.slug);

    if (!product) {
      return (
        <div className="container">
          <div className="alert alert-warning">产品未找到</div>
        </div>
      );
    }

    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 card py-5">
            <h1 className="text-center">{product?.title}</h1>

            <ProductImage product={product} priority={true} />
            <div className="card-body">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<div>" +
                    product?.description?.replace(/\./g, "<br/><br/>") +
                    "</div>",
                }}
              />
            </div>

            <div className="card-footer d-flex justify-content-between">
              <small>Category: {product?.category?.name || "未分类"}</small>
              <small>
                Tags:{" "}
                {product?.tags?.map((t) => t?.name).join(", ") || "无标签"}
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

            <div className="row">
              <div className="col">
                <h4 className="text-center my-5">Related Products</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container">
        <div className="alert alert-danger">
          加载产品时出错: {error.message}
        </div>
      </div>
    );
  }
}
