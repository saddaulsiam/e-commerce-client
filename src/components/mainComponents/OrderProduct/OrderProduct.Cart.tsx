"use client";

import { Button } from "@/components/ui/button";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import OrderSummaryCart from "./OrderSummaryCart";

const OrderProductCart = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector(({ state }) => state.cart);

  return (
    <div className="bg-accent pt-32 lg:pt-[10.9rem]">
      <div className="container">
        <div className="flex items-center space-x-6 py-10">
          <Link href="/cart">
            <button className="hover:bg-primary-dark cursor-pointer rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors duration-300">
              <span className="hidden sm:block">1. Cart</span>
              <span className="sm:hidden">Cart</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/checkout">
            <button
              disabled={cart.cartItems.length < 1}
              className="hover:bg-secondary-dark cursor-pointer rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <span className="hidden sm:block">2. Details</span>
              <span className="sm:hidden">Details</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/payment">
            <button
              disabled={cart.cartItems.length < 1}
              className="hover:bg-secondary-dark cursor-pointer rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <span className="hidden sm:block">3. Payment</span>
              <span className="sm:hidden">Payment</span>
            </button>
          </Link>
          <div className="w-20 border-t-4 border-secondary" />
          <Link href="/review">
            <button
              disabled={cart.cartItems.length < 1}
              className="hover:bg-secondary-dark cursor-pointer rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <span className="hidden sm:block">4. Review</span>
              <span className="sm:hidden">Review</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-5 pb-32">
          <div className="col-span-3 space-y-5 lg:col-span-2">
            {cart.cartItems.length > 0 ? (
              cart.cartItems.map((product, index) => (
                <div
                  key={index}
                  className="flex w-full rounded-md bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex h-28 w-36 items-center justify-center md:h-36 md:w-40">
                    <Image
                      height={130}
                      width={120}
                      className="h-full w-full rounded-md object-cover"
                      src={product.imageUrl}
                      alt={product.name}
                      priority
                    />
                  </div>
                  <div className="flex w-full flex-col justify-between p-6">
                    <div className="flex w-full justify-between text-lg text-my-gray-200">
                      <h4>{product.name}</h4>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          dispatch(removeFromCart(product.productId))
                        }
                        className="text-red-500 transition-colors duration-200 hover:text-red-600"
                      >
                        <Trash2 />
                      </Button>
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
                          className="cursor-pointer rounded-md border border-primary p-1 text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                          onClick={() =>
                            dispatch(decreaseQuantity(product.productId))
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <p>{product.quantity}</p>
                        <span
                          className="cursor-pointer rounded-md border border-primary p-1 text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                name: product.name,
                                productId: product.productId,
                                vendorId: product.vendorId,
                                imageUrl: product.imageUrl,
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
              <div className="col-span-3 text-center">
                <p className="text-2xl text-my-gray-200">
                  Your cart is empty. Start shopping!
                </p>
              </div>
            )}
          </div>
          <div className="col-span-3 lg:col-span-1">
            <OrderSummaryCart cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCart;
