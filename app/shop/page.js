import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams.page || 1,
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    ratings: searchParams.ratings || "",
    category: searchParams.category || "",
    tag: searchParams.tag || "",
    brand: searchParams.brand || "",
  }).toString();

  try {
    const response = await fetch(
      `${process.env.API}/product/filters?${new URLSearchParams(searchParams)}`,
      {
        method: "GET",
      }
    );
    // console.log(
    //   "Final URL =>",
    //   `${process.env.API}/product/filters?${searchQuery}`
    // );
    // console.log("Response Status:", response.status); // Log response status
    // console.log("Response Headers:", response.headers);

    // console.log("response:", response);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const responseText = await response.text();
    // console.log("Raw Response Text:", responseText);

    let data;
    try {
      data =
        responseText && responseText !== "null"
          ? JSON.parse(responseText)
          : null;
    } catch (e) {
      // console.log("Failed to parse JSON:", e);
      data = null;
    }
    // console.log("API Response Data:", data);

    if (!data || !Array.isArray(data.products)) {
      console.log("Invalid data structure:", data); // Log invalid data structure
      throw new Error("No products returned");
    }

    return data;
  } catch (err) {
    console.log("Error:", err); // Log the error
    return { products: [], currentPage: 1, totalPages: 1 };
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
