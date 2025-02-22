import { AiFillStar, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import Link from "next/link";
import { IoIosGitCompare } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

// local
import { addToCart, decreaseQuantity } from "../../../redux/features/cart/cartSlice";

const SingleProductDetails = ({ data, setFilterColor }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.cart);
  const pdt = products.find((p) => p._id === data?._id);

  return (
    <div className="space-y-7">
      <h2 className="text-2xl capitalize">{data?.name}</h2>
      <div className="flex space-x-2 text-2xl font-medium">
        <p className="text-secondary">${data?.price - data?.discount}</p>
        {/* Discount price */}
        <p className="text-my-gray-200 line-through">${data?.price}</p>
      </div>
      <p className="flex text-lg text-yellow-500/80 ">
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
      </p>
      <p className="leading-78 text-base">{data?.description}</p>
      <hr />
      {/* color and size */}
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-2">
          <p className="text-lg ">Colors: </p>
          <div className="flex items-center space-x-4">
            {data?.colors.map((color, i) => (
              <label key={i} className="flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-primary radio-sm"
                  onChange={() => setFilterColor(color)}
                />
                <span className="label-text ml-3">{color.value}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-lg ">Size</p>
          <div className="flex items-center space-x-2">
            <p className="transform bg-primary px-2 py-1 text-white transition duration-500 hover:bg-primary">x</p>
            <p className="transform bg-slate-200 px-2 py-1 transition duration-500 hover:bg-primary hover:text-white">
              M
            </p>
            <p className="transform bg-slate-200 px-2 py-1 transition duration-500 hover:bg-primary hover:text-white">
              XL
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center justify-center space-x-5 border p-2">
          {/* Add to Cart */}
          <span
            onClick={() => dispatch(decreaseQuantity(data))}
            className="cursor-pointer rounded-md border border-secondary p-1 text-secondary hover:bg-secondary hover:text-white"
          >
            <AiOutlineMinus />
          </span>
          <span>{pdt?.quantity || 0}</span>

          <span
            className="cursor-pointer rounded-md border border-secondary  p-1 text-secondary hover:bg-secondary hover:text-white"
            onClick={() => dispatch(addToCart(data))}
          >
            <AiOutlinePlus />
          </span>
        </div>
        <button
          onClick={() => dispatch(addToCart(data))}
          className="text-l transform bg-gray-800 py-2 px-6 font-bold text-white transition duration-500 hover:bg-primary"
        >
          Add to Cart
        </button>
        <span className="cursor-pointer text-xl">
          <AiOutlineHeart />
        </span>
        <span className="cursor-pointer text-xl">
          <IoIosGitCompare />
        </span>
      </div>
      <p className="text-base">
        Categories :
        <Link
          href={`/product?category=${data?.category?.name.toLowerCase()}`}
          className="capitalize hover:text-secondary"
        >
          {data?.category?.name.split("-").join(" ")}
        </Link>
      </p>
      <p>
        Sold By:{" "}
        <Link href={`/shop/${data?.supplier?.name.toLowerCase()}`} className="capitalize hover:text-secondary">
          {data?.supplier?.name.split("-").join(" ")}
        </Link>
      </p>
    </div>
  );
};

export default SingleProductDetails;
