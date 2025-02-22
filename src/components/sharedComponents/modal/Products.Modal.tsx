"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";

// local
import { addToCart } from "../../../redux/features/cart/cartSlice";

const ProductsModal = ({ setIsOpen, isOpen, product }) => {
  const [image, setImage] = useState(product?.mainImage);
  const dispatch = useDispatch();
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden rounded-xl bg-white
                p-5 text-left align-middle shadow-xl transition-all lg:max-w-2xl"
                >
                  <div className="grid grid-cols-2 gap-5">
                    <div className="w-full">
                      <Image className="rounded-md object-cover" height="400" width="350" src={image} alt="" priority />
                      <div className="flex gap-x-2">
                        {product.images.slice(0, 4).map((image, i) => (
                          <Image
                            key={i}
                            className="cursor-pointer rounded-md object-cover"
                            height="120"
                            width="100"
                            src={image}
                            alt=""
                            onClick={() => setImage(image)}
                            priority
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-my-gray-100 sm:space-y-3">
                      <Link href={`product/${product._id}`}>
                        <h3 className="font-sem py-5 text-xl capitalize text-black sm:text-2xl">{product.name}</h3>
                      </Link>
                      <div className="5 space-y-2.5 text-base">
                        <p className="">
                          Brand: <span className="font-semibold text-primary">{product?.brand?.name}</span>
                        </p>
                        <p className="">
                          Rating:{product?.rating}
                          <span className="font-semibold text-primary"> ({product?.reviews?.length})</span>
                        </p>
                        <p className="">Status: {product.status}</p>
                      </div>
                      <div className="py-5">
                        <span className="pt-3 text-2xl font-bold text-primary sm:pt-5 sm:text-3xl">
                          ${product.price - product.discount}
                        </span>{" "}
                        <span className="mr-2 text-xl font-semibold text-my-gray-200 line-through">
                          ${product.price}
                        </span>
                      </div>
                      <div className="pb-5">
                        <button
                          onClick={() => {
                            dispatch(addToCart(product));
                            toast.success("added to cart");
                          }}
                          className="ease-in-outs rounded-md bg-primary px-10 py-2 text-white transition duration-300 hover:bg-red-600"
                        >
                          Add to cart
                        </button>
                      </div>
                      <div className="">
                        Sold By:
                        <Link href={`/shop/${product?.supplier?.name}`}>
                          <span className="font-semibold text-primary">Siam Store</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
export default ProductsModal;
