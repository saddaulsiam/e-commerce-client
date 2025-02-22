"use client";
import { AiFillEye, AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import ProductsModal from "../modal/Products.Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../../redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { GrCompare } from "react-icons/gr";

const ProductsCard = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);

  const { products } = useSelector((state) => state.cart);
  const pdt = products.find((p) => p._id === product._id);

  return (
    <>
      <div className="relative">
        <div key={product.id} className="group relative w-full rounded-md bg-white pb-1">
          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white group-hover:opacity-60 lg:aspect-none lg:h-80">
            <Image
              src={product.mainImage}
              alt={product.imageAlt}
              height="600"
              width="500"
              className="object-cover object-center transition-all ease-in group-hover:scale-105"
              priority
            />
          </div>
          <div className="m-2 mt-0 flex justify-between">
            <div className="space-y-2">
              <h3 className="text-base font-semibold capitalize text-my-gray-200">
                <Link href={`/product/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product?.name?.slice(0, 20)}
                  {product?.name?.length > 20 && "..."}
                </Link>
              </h3>
              <p className="flex text-base text-yellow-400 ">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </p>
              <div className="flex space-x-2 text-base font-medium">
                <p className="text-secondary">${product.price - product.discount}</p>
                {/* Discount price */}
                <p className="text-my-gray-200 line-through">${product.price}</p>
              </div>
            </div>
            {/* Add to Cart */}
            <div className="z-10 flex flex-col items-center justify-center text-base ">
              {pdt?.quantity >= 1 ? (
                <>
                  <span
                    onClick={() => dispatch(decreaseQuantity(product))}
                    className="hover:bg-setext-secondary cursor-pointer rounded-md border border-secondary p-1 text-secondary hover:text-white"
                  >
                    <AiOutlineMinus />
                  </span>
                  <span>{pdt?.quantity}</span>
                </>
              ) : (
                ""
              )}

              <span
                className="cursor-pointer rounded-md border border-secondary  p-1 text-secondary hover:bg-secondary hover:text-white"
                onClick={() => dispatch(addToCart(product))}
              >
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          {/* Card Discount */}
          <div className="absolute top-2 left-2 rounded-full bg-secondary px-2 py-0.5 text-sm text-white">
            {((product.discount / product.price) * 100).toFixed(0)} % off
          </div>
          {/* Card Status */}
          {product.status === "out-of-stock" && (
            <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-sm text-white">
              {product.status}
            </div>
          )}
          {/* Card Icons */}
          <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform space-x-3 text-xl text-gray-900 group-hover:flex">
            <button className="cursor-pointer rounded-full bg-my-gray-100 p-2" onClick={() => setIsOpen(true)}>
              <AiFillEye className="modal-button" />
            </button>
            <button className="cursor-pointer rounded-full bg-my-gray-100 p-2">
              <GrCompare />
            </button>
            <button
              className="cursor-pointer rounded-full bg-my-gray-100 p-2"
              onClick={() => {
                dispatch(addToCart(product));
                router.push("/cart");
              }}
            >
              <BsCart2 />
            </button>
          </div>
        </div>
      </div>
      <ProductsModal isOpen={isOpen} setIsOpen={setIsOpen} product={product} />
    </>
  );
};

export default ProductsCard;
