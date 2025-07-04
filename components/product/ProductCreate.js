"use client";
import { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";

export default function ProductCreate() {
  const {
    product,
    setProduct,
    updatingProduct,
    setUpdatingProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProduct();

  const { categories, fetchCategories } = useCategory();
  const { tags, fetchTags } = useTag();

  const imagePreviews = updatingProduct
    ? updatingProduct?.images ?? []
    : product?.images ?? [];
  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  return (
    <div>
      <p className="lead"> {updatingProduct ? "Update" : "Create"} Product</p>
      <input
        type="text"
        placeholder="Title"
        value={updatingProduct ? updatingProduct?.title : product?.title}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, title: e.target.value })
            : setProduct({ ...product, title: e.target.value })
        }
        className="form-control p-2 my-2"
      />

      <textarea
        className="form-control p-2 mb-2"
        placeholder="Description"
        rows="5"
        value={
          updatingProduct ? updatingProduct?.description : product?.description
        }
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                description: e.target.value,
              })
            : setProduct({ ...product, description: e.target.value })
        }
      ></textarea>

      <input
        className="form-control p-2 mb-2"
        type="number"
        placeholder="Price"
        min="1"
        value={updatingProduct ? updatingProduct?.price : product?.price}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                price: e.target.value,
              })
            : setProduct({ ...product, price: e.target.value })
        }
      />

      {updatingProduct && (
        <input
          type="number"
          placeholder="Previous price"
          min="1"
          class="form-control p-2 mb-2"
          value={updatingProduct?.previousPrice}
          onChange={(e) =>
            setUpdatingProduct({
              ...updatingProduct,
              previousPrice: e.target.value,
            })
          }
        />
      )}

      <input
        type="text"
        placeholder="Colour"
        value={updatingProduct ? updatingProduct?.colour : product?.colour}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, colour: e.target.value })
            : setProduct({ ...product, colour: e.target.value })
        }
        className="form-control p-2 my-2"
      />

      <input
        type="text"
        placeholder="Brand"
        value={updatingProduct ? updatingProduct?.brand : product?.brand}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({ ...updatingProduct, brand: e.target.value })
            : setProduct({ ...product, brand: e.target.value })
        }
        className="form-control p-2 my-2"
      />

      <input
        className="form-control p-2 mb-2"
        type="number"
        placeholder="Stock"
        min="1"
        value={updatingProduct ? updatingProduct?.stock : product?.stock}
        onChange={(e) =>
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                stock: e.target.value,
              })
            : setProduct({ ...product, stock: e.target.value })
        }
      />
      <div className="form-group">
        <select
          className="form-control p-2 mb-2"
          name="category"
          onChange={(e) => {
            const categoryId = e.target.value;
            const categoryName =
              e.target.options[e.target.selectedIndex].getAttribute("name");

            const category = categoryId
              ? { _id: categoryId, name: categoryName }
              : null;

            if (updatingProduct) {
              setUpdatingProduct({
                ...updatingProduct,
                category,
              });
            } else {
              setProduct({ ...product, category });
            }
          }}
          value={
            updatingProduct
              ? updatingProduct?.category?._id
              : product?.category?._id
          }
        >
          <option>Select Category </option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id} name={c?.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      {/* Tags selected */}
      <div className="d-flex flex-wrap justify-content-evenly align-items-center">
        {tags
          ?.filter(
            (ft) =>
              ft?.parentCategory ===
              (updatingProduct?.category?._id || product?.category?._id)
          )
          ?.map((tag) => (
            <div key={tag?._id} className="form-check">
              <input
                type="checkbox"
                value={tag?._id}
                onChange={(e) => {
                  const tagId = e.target.value;
                  const tagName = tag?.name;

                  let selectedTags = updatingProduct
                    ? [...(updatingProduct?.tags ?? [])]
                    : [...(product?.tags ?? [])];

                  if (e.target.checked) {
                    selectedTags.push({ _id: tagId, name: tagName });
                  } else {
                    selectedTags = selectedTags.filter((t) => t._id !== tagId);
                  }

                  if (updatingProduct) {
                    setUpdatingProduct({
                      ...updatingProduct,
                      tags: selectedTags,
                    });
                  } else {
                    setProduct({ ...product, tags: selectedTags });
                  }
                }}
              />{" "}
              <label>{tag?.name}</label>
            </div>
          ))}
      </div>
      {/* img uplod */}
      <div className="form-group mb-3">
        <label
          className={`btn btn-primary col-12 ${uploading ? "disabled" : ""}`}
        >
          {uploading ? "Processing" : "Upload Images"}
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={uploadImages}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="d-flex justify-content-center">
        {imagePreviews?.map((img) => (
          <div key={img?.public_id}>
            <img
              src={img?.secure_url}
              alt={img.title || "Image preview"}
              className="img-thumbnail mx-1 shadow"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              priority={true}
            />
            <br />
            <div
              className="text-center pointer"
              onClick={() => deleteImage(img?.public_id)}
            >
              ❌
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button
          className={`btn btn-raised btn-${
            updatingProduct ? "info" : "primary"
          }`}
          onClick={(e) => (updatingProduct ? updateProduct() : createProduct())}
        >
          {updatingProduct ? "Update" : "Create"}
        </button>
        {updatingProduct && (
          <>
            <button
              className="btn btn-danger btn-raised"
              onClick={() => deleteProduct()}
            >
              Delete
            </button>
            <button
              className="btn btn-warning btn-raised"
              onClick={() => window.location.reload()}
            >
              Clear
            </button>
          </>
        )}
      </div>

      <pre>
        {/* {JSON.stringify(product, null, 4)} */}
        {/* {JSON.stringify(tags, null, 4)} */}
      </pre>
    </div>
  );
}
