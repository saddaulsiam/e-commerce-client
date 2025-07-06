"use client";

import { Button } from "@/components/ui/button";
import {
  clearWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BsFillSuitHeartFill } from "react-icons/bs";
import WishlistCard from "./WishlistCard";

const Wishlists = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(({ state }) => state.wishlist);

  // Remove item from wishlist
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="container my-10 px-2">
      {/* Header */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          <BsFillSuitHeartFill className="mr-3 inline text-primary" />
          <span>My Wishlist</span>
        </h2>

        <Button onClick={() => dispatch(clearWishlist())}>Clear All</Button>
      </div>

      {/* Wishlist Items */}
      <div className="pt-5">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 rounded-md bg-white sm:grid-cols-3 lg:grid-cols-5">
            {items.map((product) => (
              <WishlistCard
                key={product._id}
                product={product}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-96 items-center justify-center text-3xl font-semibold text-gray-500">
            No items in your wishlist
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlists;
