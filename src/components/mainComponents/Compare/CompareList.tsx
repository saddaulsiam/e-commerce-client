"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/features/cart/cartSlice";
import {
  clearCompare,
  removeFromCompare,
} from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/common";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";
import { IoIosGitCompare } from "react-icons/io";
import { toast } from "react-toastify";

const CompareList = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(({ state }) => state.compare);

  const handleAddToCart = (product: TProduct) => {
    dispatch(
      addToCart({
        name: product.name,
        productId: product._id as string,
        vendorId: product.supplier._id,
        image: product.images[0],
        price: product.price,
        quantity: 1,
        color: product?.colors[0],
        size: "L",
      }),
    );
    toast.success("Added To Cart");
  };
  return (
    <div className="container px-2 py-10">
      {/* Header */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          <IoIosGitCompare className="mr-3 inline text-primary" />
          <span> My Compare List</span>
        </h2>

        <Button onClick={() => dispatch(clearCompare())}>Clear All</Button>
      </div>

      {/* Items */}
      <div className="pt-5">
        {items.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-4 text-left">Product</th>
                  {items.map((product) => (
                    <th key={product._id} className="border p-4 text-center">
                      <div className="flex flex-col items-center">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={150}
                          height={150}
                          className="rounded object-cover"
                        />
                        <h2 className="mt-2 text-lg font-semibold">
                          {product.name}
                        </h2>
                        <button
                          onClick={() =>
                            dispatch(removeFromCompare(product._id as string))
                          }
                          className="mt-2 text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr>
                  <td className="border p-4 font-medium">Price</td>
                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="border p-4 text-center font-semibold text-primary"
                    >
                      ${product.price.toFixed(2)}
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr>
                  <td className="border p-4 font-medium">Rating</td>
                  {items.map((product) => (
                    <td key={product._id} className="border p-4 text-center">
                      {product.rating} / 5
                    </td>
                  ))}
                </tr>

                {/* Description Row */}
                <tr>
                  <td className="border p-4 font-medium">Description</td>
                  {items.map((product) => (
                    <td key={product._id} className="border p-4 text-center">
                      {product.description}
                    </td>
                  ))}
                </tr>

                {/* Availability Row */}
                <tr>
                  <td className="border p-4 font-medium">Availability</td>
                  {items.map((product) => (
                    <td key={product._id} className="border p-4 text-center">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </td>
                  ))}
                </tr>

                {/* Actions Row */}
                <tr>
                  <td className="border p-4 font-medium">Actions</td>
                  {items.map((product) => (
                    <td key={product._id} className="border p-4 text-center">
                      <button
                        className="flex w-full items-center justify-center gap-1 rounded-bl-lg bg-slate-200 py-1.5 text-center font-semibold text-my-gray-200 transition-all duration-300 ease-in hover:bg-slate-300 active:scale-95 md:py-3"
                        onClick={() => handleAddToCart(product)}
                      >
                        <BsCart2 className="pr-1 text-lg" />
                        Add
                        <span className="hidden xl:block"> to Cart</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex h-96 items-center justify-center text-3xl font-semibold text-gray-500">
            No items in your Compare List&apos;s
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareList;
