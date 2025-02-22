import React, { useState } from "react";
import { Loading, ProductsCard } from "../../sharedComponents";
import SingleProductDescription from "./Single.Product.Description";
import SingleProductDetails from "./Single.Product.Details";
import SingleProductImages from "./Single.Product.Images";
import SingleProductReview from "./Single.Product.Review";
import { useGetProductsQuery, useGetSingleProductQuery } from "../../../redux/features/products/productsApi";
import { useRouter } from "next/navigation";

const SingleProduct = () => {
  const router = useRouter();

  const [filterColor, setFilterColor] = useState("");
  const [showProductDetails, setShowProductDetails] = useState("description");

  const { data: allProducts, isLoading: allPisLoading } = useGetProductsQuery({
    limit: 5,
    page: 1,
    sort: "",
  });

  const { data: singleProData, isLoading } = useGetSingleProductQuery(router.query.id);

  return (
    <div className="mt-32 px-3 lg:mt-48 xl:px-0">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="grid grid-cols-1 gap-10 pt-5 sm:grid-cols-2 xl:gap-0">
            {/* Image */}
            <SingleProductImages data={singleProData?.data} />
            {/* Details */}
            <SingleProductDetails data={singleProData?.data} setFilterColor={setFilterColor} />
          </div>
          {/* description */}
          <div className="mt-20">
            <div className="flex justify-center space-x-10 border-b text-2xl text-my-gray-200">
              <p
                className={`cursor-pointer ${
                  showProductDetails === "description" && "border-b-2"
                } border-my-gray-200 pb-2`}
                onClick={() => setShowProductDetails("description")}
              >
                Description
              </p>
              <p
                className={`cursor-pointer ${showProductDetails === "reviews" && "border-b-2"} border-my-gray-200 pb-2`}
                onClick={() => setShowProductDetails("reviews")}
              >
                Reviews(2)
              </p>
            </div>
            {/* Description */}
            {showProductDetails === "description" && <SingleProductDescription />}
            {/* Reviews(2) */}
            {showProductDetails === "reviews" && (
              <div className="mt-5 space-y-10">
                <SingleProductReview />
                <SingleProductReview />
                <SingleProductReview />
              </div>
            )}
          </div>
          {/* Related products */}
          <div className="my-28">
            <h4 className="mb-5 text-2xl text-primary">Related Products</h4>
            {allPisLoading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 rounded-md sm:grid-cols-3 lg:grid-cols-5">
                {allProducts?.data?.products.map((product, index) => (
                  <ProductsCard product={product} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
