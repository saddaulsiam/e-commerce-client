"use client";

import { Button } from "@/components/ui/button";
import { useGetSingleOrderQuery } from "@/redux/features/order/orders/ordersApi";
import { TMainOrder, TOrderStatus } from "@/types/Orderstype";
import { addDays, format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsBoxSeam } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import DashboardCustomersOrderDetailsCart from "./CustomersOrderDetailsCart";
import CustomersOrderDetailsSkeleton from "@/components/sharedComponents/loader/CustomersOrderDetailsSkeleton";

const DashboardCustomersOrderDetails = () => {
  const params = useParams();
  const { data, isLoading } = useGetSingleOrderQuery(params.id);
  const singleOrder: TMainOrder = data?.data;

  return (
    <div className="mb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between pt-5 sm:pt-0">
        <h2 className="flex items-center text-xl font-semibold text-primary sm:text-2xl">
          <FaShoppingBag className="mr-2 text-2xl text-primary sm:mr-3 sm:text-3xl" />
          My Orders
        </h2>
        <Link href="/orders">
          <Button className="button">Back To Orders</Button>
        </Link>
      </div>

      {isLoading ? (
        <CustomersOrderDetailsSkeleton />
      ) : (
        <>
          {/* Order Status */}
          <div className="mt-10 rounded-md bg-white px-5 py-10 shadow-sm transition-all duration-300 ease-in hover:shadow-md">
            <div className="flex items-center">
              {/* Pending or Processing */}
              <div className="relative rounded-full bg-primary p-4 text-2xl text-white">
                <BsBoxSeam size={24} />
                {(singleOrder?.status === TOrderStatus.SHIPPED ||
                  singleOrder?.status === TOrderStatus.DELIVERED) && (
                  <span className="absolute -right-2 -top-1 rounded-full bg-slate-200 p-1 text-lg text-green-600">
                    <FcCheckmark />
                  </span>
                )}
              </div>

              <span
                className={`w-full border-t-4 ${
                  singleOrder?.status === TOrderStatus.SHIPPED ||
                  singleOrder?.status === TOrderStatus.DELIVERED
                    ? "border-primary"
                    : "border-slate-200"
                }`}
              />

              {/* Shipped */}
              <div
                className={`relative rounded-full p-4 text-2xl ${
                  singleOrder?.status === TOrderStatus.SHIPPED ||
                  singleOrder?.status === TOrderStatus.DELIVERED
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-primary"
                }`}
              >
                <TbTruckDelivery size={24} />
                {singleOrder?.status === TOrderStatus.DELIVERED && (
                  <span className="absolute -right-2 -top-1 rounded-full bg-slate-200 p-1 text-lg text-green-600">
                    <FcCheckmark />
                  </span>
                )}
              </div>

              <span
                className={`w-full border-t-4 ${
                  singleOrder?.status === TOrderStatus.DELIVERED
                    ? "border-primary"
                    : "border-slate-200"
                }`}
              />

              {/* Delivered */}
              <div
                className={`relative rounded-full p-4 text-2xl ${
                  singleOrder?.status === TOrderStatus.DELIVERED
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-primary"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="injected-svg"
                  data-src="/assets/images/icons/delivery.svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  role="img"
                >
                  <path
                    d="M24.0531 1.69349L23.7031 2.33374C23.5704 2.57647 23.3708 2.77603 23.1281 2.90874L22.4878 3.25874C22.4584 3.27482 22.4339 3.29852 22.4167 3.32735C22.3996 3.35619 22.3906 3.38909 22.3906 3.42262C22.3906 3.45614 22.3996 3.48905 22.4167 3.51788C22.4339 3.54671 22.4584 3.57041 22.4878 3.58649L23.1281 3.93649C23.3708 4.0692 23.5704 4.26876 23.7031 4.51149L24.0531 5.15174C24.0691 5.18122 24.0928 5.20583 24.1217 5.22297C24.1506 5.24011 24.1835 5.24916 24.2171 5.24916C24.2506 5.24916 24.2836 5.24011 24.3124 5.22297C24.3413 5.20583 24.365 5.18122 24.3811 5.15174L24.7311 4.51149C24.8639 4.26884 25.0634 4.0693 25.3061 3.93649L25.9463 3.58649C25.9757 3.57041 26.0003 3.54671 26.0174 3.51788C26.0345 3.48905 26.0435 3.45614 26.0435 3.42262C26.0435 3.38909 26.0345 3.35619 26.0174 3.32735C26.0003 3.29852 25.9757 3.27482 25.9463 3.25874L25.3061 2.90874C25.0634 2.77593 24.8639 2.5764 24.7311 2.33374L24.3811 1.69349C24.365 1.66401 24.3413 1.63941 24.3124 1.62226C24.2836 1.60512 24.2506 1.59607 24.2171 1.59607C24.1835 1.59607 24.1506 1.60512 24.1217 1.62226C24.0928 1.63941 24.0691 1.66401 24.0531 1.69349Z"
                    fill={`${singleOrder?.status === TOrderStatus.DELIVERED ? "white" : "hsl(var(--primary))"} `}
                  ></path>
                  <path
                    d="M27.4868 6.42496L27.2408 6.87496C27.1475 7.04555 27.0072 7.18577 26.8366 7.27896L26.3866 7.52496C26.3659 7.53626 26.3487 7.55292 26.3367 7.57317C26.3247 7.59343 26.3184 7.61654 26.3184 7.64008C26.3184 7.66363 26.3247 7.68674 26.3367 7.70699C26.3487 7.72725 26.3659 7.7439 26.3866 7.75521L26.8366 8.00121C27.0072 8.0944 27.1475 8.23462 27.2408 8.40521L27.4868 8.85521C27.4981 8.87593 27.5147 8.89323 27.535 8.90528C27.5552 8.91733 27.5784 8.9237 27.602 8.9237C27.6255 8.9237 27.6487 8.91733 27.6689 8.90528C27.6892 8.89323 27.7058 8.87593 27.7171 8.85521L27.9631 8.40521C28.0562 8.23422 28.1964 8.09357 28.3671 7.99996L28.8171 7.75396C28.8377 7.74265 28.855 7.726 28.867 7.70574C28.879 7.68549 28.8853 7.66238 28.8853 7.63883C28.8853 7.61529 28.879 7.59218 28.867 7.57192C28.855 7.55167 28.8377 7.53501 28.8171 7.52371L28.3671 7.27771C28.1966 7.18443 28.0564 7.04423 27.9631 6.87371L27.7171 6.42371C27.7057 6.40305 27.689 6.38584 27.6687 6.37389C27.6483 6.36195 27.6252 6.35571 27.6016 6.35584C27.578 6.35596 27.5549 6.36245 27.5347 6.37462C27.5145 6.38678 27.498 6.40417 27.4868 6.42496Z"
                    fill={`${singleOrder?.status === TOrderStatus.DELIVERED ? "white" : "hsl(var(--primary))"} `}
                  ></path>
                  <path
                    d="M22.72 27.117C22.2155 26.7778 21.395 26.9463 20.616 27.144C20.3484 27.2145 20.0852 27.3007 19.8278 27.402C19.3339 27.6067 18.806 27.717 18.2715 27.727C17.6673 27.717 16.961 27.5575 16.5123 27.8078C16.4668 27.8331 16.4165 27.8487 16.3647 27.8536C16.3129 27.8584 16.2606 27.8524 16.2112 27.8359C16.1618 27.8195 16.1164 27.7929 16.0779 27.7579C16.0393 27.723 16.0084 27.6803 15.9873 27.6328C15.951 27.541 15.9505 27.439 15.9859 27.3469C16.0214 27.2548 16.0901 27.1794 16.1785 27.1355C16.8433 26.7855 17.6623 27.0173 18.3395 27.1148C18.742 27.1795 19.1513 27.1907 19.5568 27.1483C19.6799 27.1304 19.7915 27.066 19.8685 26.9684C19.9456 26.8707 19.9823 26.7472 19.971 26.6233C19.9497 26.5028 19.8999 26.3892 19.8257 26.2919C19.7515 26.1946 19.6551 26.1165 19.5445 26.064C19.1475 25.8553 17.709 25.464 16.7735 25.273C15.285 24.9739 13.739 25.1859 12.386 25.8748C11.6408 26.2278 9.50876 27.6795 8.98101 28.504C8.90689 28.6092 8.8747 28.7382 8.89076 28.8658C8.94426 29.3465 10.3875 30.7326 10.8303 30.8761C10.9111 30.9062 10.9981 30.9159 11.0836 30.9044C11.1692 30.8929 11.2505 30.8605 11.3205 30.8101C11.5873 30.6386 12.174 30.0625 12.765 29.855C13.8595 29.47 15.6748 29.8025 16.5585 29.7815C17.8585 29.7503 22.201 28.6373 22.8718 28.0315C23.1388 27.7913 23.0415 27.333 22.72 27.117Z"
                    fill={`${singleOrder?.status === TOrderStatus.DELIVERED ? "white" : "hsl(var(--primary))"} `}
                  ></path>
                  <path
                    d="M13.1345 8.16596L13.8048 5.48721H17.1298L17.799 8.16596H24.5925L21.679 5.69996C21.5161 5.56197 21.3095 5.48623 21.096 5.48621H9.8383C9.62479 5.48623 9.41822 5.56197 9.2553 5.69996L6.3418 8.16596H13.1345Z"
                    fill={`${singleOrder?.status === TOrderStatus.DELIVERED ? "white" : "hsl(var(--primary))"} `}
                  ></path>
                  <path
                    d="M17.8989 8.91602V14.55C17.899 14.6265 17.8796 14.7017 17.8426 14.7686C17.8056 14.8355 17.7523 14.8919 17.6875 14.9325C17.6228 14.9731 17.5488 14.9967 17.4725 15.0009C17.3961 15.0051 17.32 14.9898 17.2512 14.9565L15.7702 14.13C15.6883 14.0597 15.584 14.0211 15.476 14.0211C15.3681 14.0211 15.2638 14.0597 15.1819 14.13L13.6854 14.9598C13.6166 14.9926 13.5406 15.0075 13.4645 15.003C13.3884 14.9986 13.3146 14.9749 13.2501 14.9342C13.1856 14.8936 13.1325 14.8373 13.0956 14.7705C13.0588 14.7038 13.0395 14.6288 13.0394 14.5525V8.91602H5.95117V22.7145C5.95117 22.9143 6.03052 23.1059 6.17178 23.2472C6.31303 23.3885 6.50462 23.468 6.70442 23.468H24.2347C24.4345 23.468 24.6262 23.3886 24.7675 23.2473C24.9088 23.106 24.9882 22.9144 24.9882 22.7145V8.91602H17.8989Z"
                    fill={`${singleOrder?.status === TOrderStatus.DELIVERED ? "white" : "hsl(var(--primary))"} `}
                  ></path>
                </svg>
                {singleOrder?.status === TOrderStatus.DELIVERED && (
                  <span className="absolute -right-2 -top-1 rounded-full bg-slate-200 p-1 text-lg text-green-600">
                    <FcCheckmark />
                  </span>
                )}
              </div>
            </div>

            {/* Estimated Delivery Date */}
            {singleOrder?.status !== TOrderStatus.DELIVERED && (
              <div className="mt-10 flex justify-end">
                <p className="rounded-full bg-primary/10 px-4 py-1 text-primary">
                  Estimated Delivery Date:{" "}
                  <span className="font-semibold">
                    {singleOrder?.createdAt
                      ? format(
                          addDays(singleOrder?.createdAt, 5),
                          "dd-MMMM-yyyy",
                        )
                      : "N/A"}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Product List Container */}
          <DashboardCustomersOrderDetailsCart singleOrder={singleOrder} />

          {/* Shipping & Payment Section */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Shipping Address */}
            <section className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 ease-in hover:shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Shipping Address
              </h3>
              <address className="space-y-3 text-base not-italic">
                {singleOrder?.shippingAddress?.name && (
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Name: </span>
                    {singleOrder?.shippingAddress?.name}
                  </p>
                )}
                {singleOrder?.shippingAddress?.street && (
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Address: </span>
                    {singleOrder?.shippingAddress?.street}
                  </p>
                )}
                {
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Region: </span>
                    {[
                      singleOrder?.shippingAddress?.area,
                      singleOrder?.shippingAddress?.city,
                      singleOrder?.shippingAddress?.street,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                }
                <div className="space-y-1">
                  {singleOrder?.shippingAddress?.phoneNumber && (
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      {singleOrder?.shippingAddress?.phoneNumber}
                    </p>
                  )}
                  {singleOrder?.shippingAddress?.email && (
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Email:</span>{" "}
                      {singleOrder?.shippingAddress?.email}
                    </p>
                  )}
                </div>
              </address>
            </section>

            {/* Payment Summary */}
            <section className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 ease-in hover:shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Payment Summary
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal:</dt>
                  <dd className="text-foreground">
                    ${singleOrder?.totalAmount?.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping:</dt>
                  <dd className="text-foreground">$10.00</dd>
                </div>
                {/* <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount:</dt>
              <dd className="text-destructive">-${(0.0).toFixed(2)}</dd>
            </div> */}
                <div className="flex justify-between border-t pt-3">
                  <dt className="font-semibold text-foreground">Total:</dt>
                  <dd className="text-xl font-bold text-primary">
                    ${((singleOrder?.totalAmount ?? 0) + 10).toFixed(2)}
                  </dd>
                </div>
                <div className="pt-3">
                  <p className="text-sm text-muted-foreground">
                    Payment Method:{" "}
                    <span className="font-medium capitalize text-foreground">
                      {singleOrder?.paymentMethod}
                    </span>
                  </p>
                </div>
              </dl>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCustomersOrderDetails;
