"use client";

import { addToCart } from "@/redux/features/cart/cartSlice";
import { removeFromCompare } from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";

const CompareList = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(({ state }) => state.compare);

  return (
    <div className="container mx-auto px-2 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold">Compare Products</h1>
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
                      onClick={() =>
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
                        )
                      }
                      className="flex items-center justify-center gap-1 rounded bg-primary px-3 py-2 text-white transition hover:bg-orange-600"
                    >
                      <BsCart2 />
                      Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No products to compare.</p>
      )}
    </div>
  );
};

export default CompareList;
