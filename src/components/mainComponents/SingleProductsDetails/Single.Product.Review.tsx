import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const SingleProductReview = ({ review }) => {
  return (
    <div>
      <div className="flex items-center space-x-3">
        <img
          src="https://flone-react.pages.dev/assets/img/product/fashion/7.jpg"
          className="h-14 w-14 rounded-full object-cover object-center"
          alt=""
        />
        <div>
          <p>Saddaul Siam</p>
          <div className="flex space-x-3">
            <p className="flex text-lg text-yellow-500/80">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </p>
            <p>4.5</p>
            <p>1.7 years ago</p>
          </div>
        </div>
      </div>
      <div className="mt-4 w-1/2">
        <p className="text-base font-normal leading-7 text-my-gray-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam id
          aliquid laborum numquam! Sint, labore reprehenderit est corrupti earum
          numquam deserunt
        </p>
      </div>
    </div>
  );
};

export default SingleProductReview;
