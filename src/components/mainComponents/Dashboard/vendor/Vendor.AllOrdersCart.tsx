import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const VendorAllOrdersCart = ({ order, i }) => {
  return (
    <>
      <Link href={`/vendor/orders/${order?._id}`}>
        <tr className="my-3 cursor-pointer rounded-md bg-white py-5 px-5 text-base font-light text-my-gray-200 shadow">
          <td className="text-sm text-black sm:text-lg">{i + 1}</td>
          <td className="text-sm text-black sm:text-lg">
            {order?._id.slice(0, 4)}...{order?._id.slice(20, 30)}
          </td>
          <td className="text-sm text-black sm:text-lg">
            {order?.shippingAddress?.name.slice(0, 25)}
            {order?.shippingAddress?.name.length > 25 && "..."}
          </td>
          <td className="text-sm capitalize text-black sm:text-lg">
            {order?.shippingAddress?.address}
            <br />
            {order?.shippingAddress?.area}-{order?.shippingAddress?.city}-
            {order?.shippingAddress?.region}
          </td>
          <td className="text-sm sm:text-base">
            {order?.orderDate?.split("T")[0]}
          </td>
          <td className="text-sm sm:text-base">
            <span>$ {order?.total}</span>
          </td>
          <td>
            <div
              className={`badge ${
                order?.orderStatus === "pending"
                  ? "badge-warning"
                  : order.orderStatus === "reject"
                  ? "badge-error"
                  : order?.orderStatus === "delivery"
                  ? "badge-success"
                  : order?.orderStatus === "cancel"
                  ? "badge-error"
                  : ""
              }`}
            >
              {order?.orderStatus}
            </div>
          </td>
          <td>
            <span className="inline-block cursor-pointer rounded-full p-2 transition duration-200 ease-in-out hover:bg-slate-200 sm:text-lg">
              <AiOutlineArrowRight />
            </span>
          </td>
        </tr>
      </Link>
    </>
  );
};

export default VendorAllOrdersCart;
