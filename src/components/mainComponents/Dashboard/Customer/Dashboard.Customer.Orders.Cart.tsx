import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const DashboardCustomerOrdersCart = ({ orders }) => {
  return (
    <>
      {orders
        ?.map(({ _id, orderStatus, orderDate, total, paymentDetails }, i) => (
          <Link key={i} href={`/customer/orders/${_id}`}>
            <ul className="my-3 grid cursor-pointer grid-cols-5 rounded-md bg-white py-5 px-5 text-base font-light text-my-gray-200 shadow">
              <li className="text-sm text-black sm:text-lg">
                {_id.slice(0, 8)}...
              </li>
              <li>
                <p className="inline rounded-full bg-slate-200 py-1 px-3 text-sm">
                  {orderStatus}
                </p>
              </li>
              <li className="text-sm sm:text-base">
                {orderDate.split("T")[0]}
              </li>
              <li className="text-sm sm:text-base">
                {paymentDetails.paymentType}
              </li>
              <li className="flex justify-between text-sm sm:text-base">
                <span>$ {total}</span>
                <span className="cursor-pointer rounded-full p-2 transition duration-200 ease-in-out hover:bg-slate-200 sm:text-lg">
                  <AiOutlineArrowRight />
                </span>
              </li>
            </ul>
          </Link>
        ))
        .reverse()}
    </>
  );
};

export default DashboardCustomerOrdersCart;
