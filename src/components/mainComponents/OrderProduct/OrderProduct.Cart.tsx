"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../../redux/features/cart/cartSlice";
import OrderSummaryCart from "./OrderSummaryCart";

const OrderProductCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useAppSelector(({ state }) => state.cart);
  return (
    <div className="bg-slate-200">
      <div className="container mt-32 lg:mt-[10.9rem]">
        <div className="flex items-center py-10">
          <Link href="/cart">
            <button className="cursor-pointer rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white">
              <span className="hidden sm:block">1. Cart</span>
              <span className="sm:hidden">Cart</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/details">
            <button
              disabled={cartItems.length < 1 ? true : false}
              className="cursor-pointer rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed"
            >
              <span className="hidden sm:block">2. Details</span>
              <span className="sm:hidden">Details</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/payment">
            <button
              disabled={cartItems.length < 1 ? true : false}
              className="cursor-pointer rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed"
            >
              <span className="hidden sm:block">3. Payment</span>
              <span className="sm:hidden">Payment</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/review">
            <button
              disabled={cartItems.length < 1 ? true : false}
              className="cursor-pointer rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed"
            >
              <span className="hidden sm:block">4. Review</span>
              <span className="sm:hidden">Review</span>
            </button>
          </Link>
        </div>
        <div className="mb-10 grid grid-cols-3 gap-5">
          <div className="col-span-3 space-y-5 lg:col-span-2">
            {cartItems.length > 0 ? (
              cartItems.map((product, index) => (
                <div key={index} className="flex w-full rounded-md bg-white">
                  <div className="flex h-28 w-36 items-center justify-center md:h-36 md:w-40">
                    <Image
                      height={130}
                      width={120}
                      className="h-full w-full object-cover"
                      src={product.imageUrl}
                      alt=""
                      priority
                    />
                  </div>
                  <div className="flex w-full flex-col justify-between p-6">
                    <div className="flex w-full justify-between text-lg text-my-gray-200">
                      <h4>{product.name}</h4>
                      <p
                        onClick={() => dispatch(removeFromCart(product._id))}
                        className="cursor-pointer"
                      >
                        X
                      </p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="text-sm text-my-gray-100">
                        ${product.price} x {product.quantity}
                        <span className="text-base text-primary">
                          {" "}
                          = ${product.price * product.quantity}
                        </span>
                      </p>
                      <div className="flex justify-center space-x-2 text-base">
                        <span
                          className="cursor-pointer rounded-md border border-primary p-1 text-primary hover:bg-primary hover:text-white"
                          onClick={() =>
                            dispatch(decreaseQuantity(product._id))
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <p>{product.quantity}</p>
                        <span
                          className="cursor-pointer rounded-md border border-primary p-1 text-primary hover:bg-primary hover:text-white"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                _id: product._id,
                                imageUrl: product.imageUrl,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                              }),
                            )
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-center text-2xl text-my-gray-200">
                  Your cart is empty
                </p>
              </div>
            )}
          </div>
          <div className="col-span-3 lg:col-span-1">
            <OrderSummaryCart products={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCart;
