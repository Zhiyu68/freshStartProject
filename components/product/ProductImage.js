"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductImage({ product }) {
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [currentImagePreviewUrl, setCurrentImagePreviewUrl] = useState("");

  useEffect(() => {
    //close modal on clicks on the page
    window.addEventListener("click", handleClickedOutside);
    return () => {
      window.removeEventListener("click", handleClickedOutside);
    };

    function handleClickedOutside(event) {
      if (event.target.classList.contains("modal")) {
        closeModal();
      }
    }
  }, []);

  const openModal = (url) => {
    setCurrentImagePreviewUrl(url);
    setShowImagePreviewModal(true);
  };

  const closeModal = () => {
    setShowImagePreviewModal(false);
    setCurrentImagePreviewUrl("");
  };

  const showImage = (src, title) => (
    <Image
      className="card-img-top"
      src={src}
      width={500}
      height={300}
      style={{ objectFit: "contain", height: "100%", width: "100%" }}
      alt={title || "Image preview"}
    />
  );

  return (
    <>
      {showImagePreviewModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            style={{ height: "calc(100%-60px)" }}
          >
            <div className="modal-content" style={{ height: "calc(100%-60px" }}>
              <div className="modal-body overflow-auto">
                {showImage(currentImagePreviewUrl, product?.title)}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center">
        {product?.images?.length > 0 ? (
          <>
            {product?.images?.map((image) => (
              <div
                key={image.public_id}
                className="pointer"
                style={{ height: "350px", overflow: "hidden" }}
                onClick={() => openModal(image?.secure_url)}
              >
                {showImage(image?.secure_url, product?.title)}
              </div>
            ))}
          </>
        ) : (
          <div
            className="pointer"
            style={{ height: "350px", overflow: "hidden" }}
            onClick={() => openModal("/images/default.png")}
          >
            {showImage("/images/default.png", product?.title)}
          </div>
        )}
      </div>
    </>
  );
}
