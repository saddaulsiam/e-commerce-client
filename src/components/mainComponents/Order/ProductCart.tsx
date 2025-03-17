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
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import CartSummary from "./CartSummary";
import ProgressSteps from "./ProgressSteps";

const ProductCart = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector(({ state }) => state.cart);

  return (
    <div className="bg-accent">
      <div className="container">
        <ProgressSteps />

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
                      src={product.image}
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
                                image: product.image,
                                price: product.price,
                                quantity: 1,
                                color: product?.color,
                                size: product?.size,
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
            <CartSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
