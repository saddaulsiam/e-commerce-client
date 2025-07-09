"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import RatingStars from "@/components/ui/rating";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { TProduct } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type TProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  product: TProduct;
};

const ProductsModal = ({ setIsOpen, isOpen, product }: TProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get the current product from the cart if it exists
  const { cartItems } = useAppSelector(({ state }) => state.cart);
  const currentProduct = cartItems.find(
    (item) => item.productId === product._id,
  );

  // Initialize local quantity state with currentProduct's quantity if available, otherwise default to 1
  const [quantity, setQuantity] = useState<number>(
    currentProduct?.quantity ?? 1,
  );
  const [selectedImage, setSelectedImage] = useState(0);

  const discountedPrice = product?.price - product?.discount;
  const discountPercentage = Math.round(
    (product?.discount / product?.price) * 100,
  );

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      Math.max(1, type === "increment" ? prev + 1 : prev - 1),
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        name: product?.name,
        price: product?.price,
        productId: product?._id as string,
        vendorId: product?.supplier?._id,
        image: product?.images[0],
        quantity: quantity,
        color: product?.colors[0].label,
        size: product?.sizes ? product?.sizes[0] : "",
      }),
    );
    toast.success("Product added to cart");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="mx-auto rounded-xl p-6 sm:max-w-4xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Product Images Section */}
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden rounded-xl bg-gray-50">
              {product?.images?.length ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="block h-full w-full object-contain object-center"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500">
                  No Image Available
                </div>
              )}
            </div>
            {product?.images?.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative block overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      width={100}
                      height={100}
                      alt={product.name}
                      className="block h-full w-full object-cover"
                      loading={index > 2 ? "lazy" : "eager"}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details Section */}
          <div className="space-y-6">
            <DialogTitle className="text-3xl font-semibold text-gray-900">
              {product?.name}
            </DialogTitle>
            <div className="flex flex-wrap items-center gap-3">
              <RatingStars rating={product?.rating as number} />
              <span className="text-sm text-gray-500">
                ({product?.reviews?.length || 0} reviews)
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm font-medium text-green-600">
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {product?.discount > 0 && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  -{discountPercentage}% off
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  $
                  {product?.discount
                    ? discountedPrice.toFixed(2)
                    : product?.price.toFixed(2)}
                </span>
                {product?.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product?.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {product?.description}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-4 rounded-lg border border-gray-200 px-4 py-2">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-primary"
                >
                  <AiOutlineMinus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-primary"
                >
                  <AiOutlinePlus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 rounded-lg bg-primary text-base font-medium hover:bg-primary/90"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-lg text-base font-medium"
                onClick={() => {
                  handleAddToCart();
                  router.push("/cart");
                }}
              >
                Buy Now
              </Button>
            </div>
            <div className="space-y-2 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Category:</span>
                <Link
                  href={`/product?category=${product?.category}`}
                  className="font-medium capitalize text-gray-900 hover:text-primary hover:underline"
                >
                  {product?.category.split("-")[2]}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Vendor:</span>
                <Link
                  href={`/shop/${product?.supplier?.storeName}`}
                  className="font-medium text-gray-900 hover:text-primary hover:underline"
                >
                  {product?.supplier?.storeName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsModal;
