"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const SearchingProductsSidebarMenu = ({
  products,
  setFilteredByStatus,
  setFilterByBrands,
  setFilterByColors,
  setFilterMinPrice,
  setFilterMaxPrice,
}) => {
  const router = useRouter();
  const status = [...new Set(products?.map((product) => product.status))];
  const brands = [...new Set(products?.map((product) => product.brand.name))];
  const categories = [...new Set(products?.map((product) => product.category.name))];
  const colors = [...new Set(products?.flatMap((product) => product.colors.map((color) => color.value)))];

  return (
    <div className="p-3">
      <div className="">
        <h3 className="my-3 text-sm font-semibold">Related Categories:</h3>
        {/* {router.query.category && ( */}
        <ul>
          {categories.map((category, i) => (
            <Link href={`product?category=${category}`} key={i}>
              <li className="cursor-pointer py-2 text-base capitalize  hover:text-secondary">{category}</li>
            </Link>
          ))}
        </ul>
        {/* )} */}
        {/* <div className="form-control space-y-2">
          {!router.query.category && (
            <>
              {categories.map((brand, i) => (
                <label className="flex cursor-pointer items-center" key={i}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    onClick={(e) => {
                      if (e.currentTarget.checked) {
                        setFilterByBrands((prevBrands) => [
                          ...prevBrands,
                          brand,
                        ]);
                      } else {
                        setFilterByBrands((prevBrands) =>
                          prevBrands.filter((preBrand) => preBrand !== brand)
                        );
                      }
                    }}
                  />
                  <span className="label-text ml-3">{brand}</span>
                </label>
              ))}
            </>
          )}
        </div> */}
      </div>
      <hr className="my-5" />
      {/* Price Range */}
      <div className="">
        <h3 className="my-3 text-sm font-semibold">Price Range:</h3>
        <div className="flex w-full space-x-2">
          <input
            id="min"
            name="min"
            type="number"
            placeholder="0"
            className="input input-bordered h-10 w-full"
            onChange={(e) => setFilterMinPrice(e.target.value)}
          />
          <span>__</span>
          <input
            id="max"
            name="max"
            type="number"
            placeholder="250"
            className="input input-bordered h-10 w-full"
            onChange={(e) => setFilterMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <hr className="my-5" />
      {/* Brands */}
      <div className="">
        <h3 className="my-3 text-sm font-semibold">Brands:</h3>
        <div className="form-control space-y-2">
          {brands.map((brand, i) => (
            <label className="flex cursor-pointer items-center" key={i}>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                onClick={(e) => {
                  if (e.currentTarget.checked) {
                    setFilterByBrands((prevBrands) => [...prevBrands, brand]);
                  } else {
                    setFilterByBrands((prevBrands) => prevBrands.filter((preBrand) => preBrand !== brand));
                  }
                }}
              />
              <span className="label-text ml-3">{brand}</span>
            </label>
          ))}
        </div>
      </div>
      <hr className="my-5" />
      {/* Status */}
      <div className="form-control space-y-2">
        {status?.map((status, i) => (
          <label className="flex cursor-pointer items-center" key={i}>
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              onClick={(e) => {
                if (e.currentTarget.checked) {
                  setFilteredByStatus((prevStatus) => [...prevStatus, status]);
                } else {
                  setFilteredByStatus((prevStatus) => prevStatus.filter((preSts) => preSts !== status));
                }
              }}
            />
            <span className="label-text ml-3">{status}</span>
          </label>
        ))}
      </div>
      <hr className="my-5" />
      {/* Color Family */}
      <div className="">
        <h3 className="my-3 text-sm font-semibold">Color Family:</h3>
        <div className="form-control space-y-2">
          {colors.map((color, i) => (
            <label key={i} className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                onClick={(e) => {
                  if (e.currentTarget.checked) {
                    setFilterByColors((prevColors) => [...prevColors, color]);
                  } else {
                    setFilterByColors((prevColors) => prevColors.filter((preColor) => preColor !== color));
                  }
                }}
              />
              <span className="label-text ml-3">{color}</span>
            </label>
          ))}
        </div>
      </div>
      <hr className="my-5" />
      {/* Ratings */}
      <div className="">
        <h3 className="my-3 text-sm font-semibold">Ratings:</h3>
        <div className="form-control space-y-2 ">
          <label className="flex cursor-pointer items-center">
            <input type="checkbox" className="checkbox checkbox-sm rounded-md" />
            <span className="label-text ml-3 flex text-xl text-yellow-500/80">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input type="checkbox" className="checkbox checkbox-sm rounded-md" />
            <span className="label-text ml-3 flex text-xl text-yellow-500/80">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input type="checkbox" className="checkbox checkbox-sm rounded-md" />
            <span className="label-text ml-3 flex text-xl text-yellow-500/80">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input type="checkbox" className="checkbox checkbox-sm rounded-md" />
            <span className="label-text ml-3 flex text-xl text-yellow-500/80">
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </span>
          </label>
          <label className="flex cursor-pointer items-center">
            <input type="checkbox" className="checkbox checkbox-sm rounded-md" />
            <span className="label-text ml-3 flex text-xl text-yellow-500/80">
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </span>
          </label>
        </div>
      </div>
      <hr className="my-5" />
    </div>
  );
};

export default SearchingProductsSidebarMenu;
