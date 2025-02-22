import Link from "next/link";
import Image from "next/image";

const DashboardCustomersOrderDetailsCart = ({ order }) => {
  return (
    <>
      <div className="mt-10 grid grid-cols-3 bg-slate-200 px-5 py-5 text-xs text-my-gray-100 sm:text-sm">
        <p className="">
          Order ID:
          <br className="sm:hidden" />
          <b>{order?._id}</b>
        </p>
        <p className="">
          Placed on:
          <br className="sm:hidden" />
          <b> {order?.orderDate?.split("T")[0]}</b>
        </p>
        <p className="">
          Delivered on:
          <br className="sm:hidden" />
          <b> {order?.orderDate?.split("T")[0]}</b>
        </p>
      </div>
      {order?.products?.map((product, i) => (
        <div key={i}>
          <div className="grid grid-cols-3 items-center bg-white px-5 py-5">
            <div className="flex items-center">
              <Image
                width="100"
                height="100"
                className="object-cover object-center"
                src={product?.mainImage}
                alt=""
                priority
              />
              <div className="ml-3">
                <Link href={`/product/${product._id}`}>
                  <p className="cursor-pointer text-xs font-semibold text-my-gray-200 sm:text-sm">
                    {product?.name}
                  </p>
                </Link>
                <small className="text-my-gray-100/90">
                  $ {product?.salePrice} x {product.quantity}
                </small>
              </div>
            </div>
            <div>
              <p className="text-xs text-my-gray-100/90 sm:text-base">
                Product properties: {product?.colors}, {product?.size}
              </p>
            </div>
            <div>
              <button className="rounded py-2 px-5 text-xs font-semibold text-primary hover:bg-red-100 sm:text-base">
                Write a Review
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default DashboardCustomersOrderDetailsCart;
