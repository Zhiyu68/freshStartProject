import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

async function getProducts(searchParams) {
  try {
    const searchQuery = new URLSearchParams({
      page: searchParams.page || 1,
      minPrice: searchParams.minPrice || "",
      maxPrice: searchParams.maxPrice || "",
      ratings: searchParams.ratings || "",
      category: searchParams.category || "",
      tag: searchParams.tag || "",
      brand: searchParams.brand || "",
    }).toString();

    const response = await fetch(`${process.env.API}/product?${searchQuery}`, {
      method: "GET",
      next: { revalidate: 1 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export default async function Shop({ searchParams }) {
  // console.log("searchParams in shop page => ", searchParams);
  const { products, currentPage, totalPages } = await getProducts(searchParams);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 overflow-auto" style={{ maxHeight: "90vh" }}>
          <ProductFilter searchParams={searchParams} />
        </div>
        <div className="col-lg-9 overflow-auto" style={{ maxHeight: "90vh" }}>
          {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

          <h4 className="text-center fw-bold mt-3">Shop Latest products</h4>

          <div className="row">
            {products?.map((product) => (
              <div key={product._id} className="col-lg-4">
                <ProductCard product={product} priority={true} />
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
