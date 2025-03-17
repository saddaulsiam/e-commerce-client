"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import RatingStars from "@/components/ui/rating";
import { addToCart, decreaseQuantity } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/common";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type TProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  product: TProduct;
};

const ProductsModal = ({ setIsOpen, isOpen, product }: TProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [image, setImage] = useState(product.images[0]);

  // Get the current product from the cart items based on its _id
  const { cartItems } = useAppSelector(({ state }) => state.cart);
  const currentProduct = cartItems.find(
    (item) => item.productId === product._id,
  );

  // Handle Add to Cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product?._id as string,
        vendorId: product?.supplier?._id,
        image: product.images[0],
        name: product.name,
        price: product.price,
        quantity: 1,
        color: product?.colors[0],
        size: product?.sizes[0],
      }),
    );

    toast.success("Added to cart");
    setIsOpen(false);
  };

  // Handle Decrease Quantity
  const handleDecreaseQuantity = () => {
    if (currentProduct && currentProduct?.quantity > 1) {
      dispatch(decreaseQuantity(product?._id as string));
      setIsOpen(false);
      toast.info("Decrease Quantity");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="mx-auto rounded-xl p-6 sm:max-w-3xl">
        <div className="grid grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="w-full">
            <Image
              className="rounded-md object-cover object-center"
              height="600"
              width="350"
              src={image}
              alt={product.name}
              priority
            />
            <div className="mt-3 flex gap-x-2">
              {product.images.slice(0, 4).map((img, i) => (
                <Image
                  key={i}
                  className="cursor-pointer rounded-md border object-cover p-1 hover:border-primary"
                  height="80"
                  width="80"
                  src={img}
                  alt={product.name}
                  onClick={() => setImage(img)}
                  priority
                />
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-4 text-sm text-gray-700">
            <Link href={`product/${product._id}`}>
              <DialogTitle className="text-xl font-semibold capitalize text-black transition hover:text-primary sm:text-2xl">
                {product.name}
              </DialogTitle>
            </Link>

            {/* Short Description Section */}
            <p className="text-gray-600">{product.description}</p>

            <p>
              Brand:{" "}
              <span className="font-semibold text-primary">
                {product?.brand}
              </span>
            </p>
            <p className="flex">
              Rating: <RatingStars rating={product?.rating as number} />
              <span className="font-semibold text-primary">
                {" "}
                ({product?.reviews?.length + " Reviews" || 0})
              </span>
            </p>
            <p>Status: {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>

            {/* Price Section */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-primary sm:text-3xl">
                ${(product.price - 2).toFixed(2)}
              </span>
              <span className="text-lg font-semibold text-gray-400 line-through">
                ${product.price}
              </span>
            </div>

            {/* Quantity Section */}
            <div className="flex items-center gap-4">
              <Button
                className="size-10 rounded-md bg-slate-200 text-xl text-slate-600 hover:text-slate-600"
                onClick={handleDecreaseQuantity}
              >
                <Minus />
              </Button>
              <span className="text-xl">{currentProduct?.quantity || 0}</span>
              <Button
                className="size-10 rounded-md bg-slate-200 text-xl text-slate-600 hover:text-slate-600"
                onClick={handleAddToCart}
              >
                <Plus />
              </Button>
            </div>

            {/* Buttons Section */}
            <div className="mt-4 flex gap-4">
              <Button
                className="flex-1 bg-slate-200 font-semibold text-my-gray-200 transition-all duration-300 ease-in hover:bg-slate-300 active:scale-95"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                className="flex-1 bg-orange-500 text-white transition-all hover:bg-orange-600"
                onClick={() => {
                  handleAddToCart();
                  router.push("/cart");
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsModal;
