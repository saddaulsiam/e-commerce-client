import { TMainOrder, TOrderStatus, TSubOrder } from "@/types/Orderstype";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  singleOrder: TMainOrder;
};

const DashboardCustomersOrderDetailsCart = ({ singleOrder }: TProps) => {
  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-sm transition-all duration-300 ease-in hover:shadow-md">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Order # {singleOrder?._id}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Ordered on{" "}
          {singleOrder?.createdAt
            ? format(singleOrder.createdAt, "dd-MMMM-yyyy")
            : "N/A"}
        </p>
      </header>

      <div className="space-y-6">
        {singleOrder?.subOrders?.map((order: TSubOrder) => (
          <div
            key={order?._id}
            className="group flex flex-col items-start justify-between rounded-lg border border-gray-100 p-4 transition-all hover:border-gray-200 hover:bg-gray-50 sm:flex-row sm:items-center"
          >
            {/* Product Info */}
            <div className="flex w-full flex-1 items-start sm:w-auto">
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={order.item.image || "/product-placeholder.jpg"}
                  alt={order.item.name}
                  fill
                  className="rounded-md border border-gray-100 object-cover"
                  sizes="(max-width: 640px) 100vw, 240px"
                />
              </div>

              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {order.item.name}
                </h3>

                {(order?.item?.color || order?.item?.size) && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {order.item.color && (
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600">
                        Color: {order.item.color}
                      </span>
                    )}
                    {order.item.size && (
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600">
                        Size: {order.item.size}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-2 block sm:hidden">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(order.item.price * order.item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.item.quantity} × ${order.item.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="mt-4 w-full sm:mt-0 sm:w-auto sm:text-right">
              <div className="hidden sm:block">
                <p className="text-lg font-semibold text-gray-900">
                  ${(order.item.price * order.item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {order.item.quantity} × ${order.item.price}
                </p>
              </div>

              {order.status === TOrderStatus.DELIVERED && (
                <div className="mt-3 sm:mt-2">
                  <Link
                    href={`/review/${order._id}`}
                    className="inline-flex items-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-200"
                  >
                    ✍️ Write a Review
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Total Items:</span>
          <span className="font-semibold text-gray-900">
            {singleOrder?.subOrders?.reduce(
              (acc, order) => acc + order.item.quantity,
              0,
            )}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium text-gray-700">Order Total:</span>
          <span className="text-xl font-bold text-gray-900">
            ${singleOrder?.totalAmount?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomersOrderDetailsCart;
