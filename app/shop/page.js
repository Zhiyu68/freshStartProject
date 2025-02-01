import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

async function getProducts(searchParams) {
  try {
    // console.log("传递给 getProducts 的 searchParams:", searchParams); // 调试输出
    const searchQuery = new URLSearchParams({
      page: searchParams.page || 1,
      minPrice: searchParams.minPrice || "",
      maxPrice: searchParams.maxPrice || "",
      ratings: searchParams.ratings || "",
      category: searchParams.category || "",
      tag: searchParams.tag || "",
      brand: searchParams.brand || "",
    }).toString();
    // console.log("构建的 searchQuery:", searchQuery); // 调试输出
    const response = await fetch(
      `${process.env.API}/product/filters?${searchQuery}`,
      {
        method: "GET",
        next: { revalidate: 1 },
      }
    );
    // console.log("shop{process.env.API}", process.env.API);

    // console.log("searchQuery", searchQuery);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    // console.log("获取到的data:", data); // 调试输出

    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);

    throw error;
  }
}

export default async function Shop({ searchParams }) {
  //   console.log("searchParams in shop page => ", searchParams);
  const { products, currentPage, totalPages } = await getProducts(searchParams);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 overflow-auto" style={{ maxHeight: "90vh" }}>
          <ProductFilter searchParams={searchParams} />
        </div>
        <div className="col-lg-9 overflow-auto" style={{ maxHeight: "90vh" }}>
          <h4 className="text-center fw-bold mt-3">Shop Latest products</h4>

          <div className="row">
            {products?.map((product) => (
              <div className="col-lg-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <br />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
            pathname="/shop"
          />
        </div>
      </div>
    </div>
  );
}
