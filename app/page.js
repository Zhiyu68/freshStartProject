import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const metadata = {
  title: "Fresh Start",
  description: "Easy for freshman setting up your cozy place",
};

async function getProducts(searchParams) {
  const resolvedParams = await searchParams; // 等待异步解析
  const searchQuery = new URLSearchParams({
    page: resolvedParams?.page || 1, // 使用解析后的值
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
}

export default async function Home({ searchParams }) {
  // console.log("searchParams => ", searchParams);
  const { products, currentPage, totalPages } = await getProducts(searchParams);

  return (
    <div className="container">
      <h1 className="text-center mt-4">
        <strong>Latest Products</strong>
      </h1>

      <div className="row">
        {products?.map((product) => (
          <div className="col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname="/"
      />
    </div>
  );
}
