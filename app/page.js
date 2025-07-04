import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const metadata = {
  title: "Fresh Start",
  description: "Easy for freshman setting up your cozy place",
};

async function getProducts(searchParams) {
  try {
    const page = (await searchParams)?.page || 1;

    const searchQuery = new URLSearchParams({
      page: page.toString(),
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
    // console.log("{process.env.API}", process.env.API);
    // console.log("data", data);
    // console.log("searchQuery", searchQuery);

    throw error;
  }
}

export default async function Home({ searchParams }) {
  try {
    const { products, currentPage, totalPages } = await getProducts(
      searchParams
    );

    return (
      <div className="container">
        <h1 className="text-center mt-4">
          <strong>Latest Products</strong>
        </h1>

        <div className="row">
          {products?.map((product) => (
            <div key={product._id} className="col-lg-4">
              <ProductCard product={product} priority={true} />
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
  } catch (error) {
    return (
      <div className="container">failed to fetch products: {error.message}</div>
    );
  }
}
