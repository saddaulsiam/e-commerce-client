"use client";

import { Loading } from "@/components/sharedComponents/loader";
import { Button } from "@/components/ui/button";
import {
  useGetSingleSuborderQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orders/ordersApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import VendorOrderDetailsCart from "./Vendor.Order.Details.Cart";
import Status from "@/components/ui/status";
import { TAddress } from "@/types/common";
import { format } from "date-fns";

export default function VendorOrderDetails() {
  const params = useParams();
  const {
    data: orderData,
    isLoading,
    refetch,
  } = useGetSingleSuborderQuery(params.id);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [statusError, setStatusError] = useState<string | null>(null);

  const order = orderData?.data;
  const shipping = order?.shippingAddress as TAddress;

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value;
    if (!newStatus || newStatus === order?.status) return;

    try {
      setStatusError(null);
      await updateOrderStatus({ id: params.id, status: newStatus }).unwrap();
      refetch();
    } catch {
      setStatusError("Failed to update status. Please try again.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto max-w-6xl space-y-8 px-4 py-8 print:bg-white print:text-black">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Order Details</h1>
          <p className="text-sm text-gray-500">Order ID: {order?._id}</p>
        </div>
        <Link href="/vendor/orders/pending">
          <Button>Back to Orders</Button>
        </Link>
      </div>

      {/* Status + Actions (Redesigned) */}
      <section className="grid grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-sm md:grid-cols-3 print:border print:shadow-none">
        {/* Status Update */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="mb-2 text-lg font-semibold">Order Status</h2>
            <Status status={order?.status} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Change Status
            </label>
            <select
              value={order?.status}
              onChange={handleStatusChange}
              disabled={isUpdating}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
            >
              <option value="pending">Pending</option>
              <option value="cancel">Cancel</option>
              <option value="reject">Reject</option>
              <option value="delivery">Delivery</option>
            </select>
            {isUpdating && (
              <span className="mt-1 block text-xs text-primary">
                Updating...
              </span>
            )}
            {statusError && (
              <span className="mt-1 block text-xs text-red-500">
                {statusError}
              </span>
            )}
          </div>
        </div>

        {/* Order Info */}
        <div className="flex flex-col gap-2 border-l border-gray-100 pl-6">
          <h2 className="mb-2 text-lg font-semibold">Order Info</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <div>
              <span className="font-medium">Date:</span>{" "}
              {order?.createdAt
                ? format(new Date(order.createdAt), "dd-MMM-yyyy | hh:mm a")
                : "--"}
            </div>
            <div>
              <span className="font-medium">Payment:</span>{" "}
              {order?.paymentMethod}
            </div>
            <div>
              <span className="font-medium">Total Paid:</span> $
              {order?.totalAmount + 10 - 5}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-start gap-4 border-l border-gray-100 pl-6">
          <h2 className="mb-2 text-lg font-semibold">Actions</h2>
          <Button onClick={() => window.print()} variant="outline">
            Print Invoice
          </Button>
          <Link href="/vendor/orders/pending">
            <Button variant="secondary">Back to Orders</Button>
          </Link>
        </div>
      </section>

      {/* Order Items */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm print:border print:shadow-none">
        <header className="flex items-center justify-between rounded-t-xl border-b bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-bold text-primary">Order Items</h2>
          <span className="text-sm text-gray-500">
            Total Items: {order?.items?.length || 0}
          </span>
        </header>
        <VendorOrderDetailsCart item={order?.item} />
      </section>

      {/* Shipping & Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 print:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm print:border print:shadow-none">
          <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {shipping?.name}
            </p>
            <p>
              <span className="font-medium">Address:</span> {shipping?.street}
            </p>
            <p>
              <span className="font-medium">Region:</span> {shipping?.area} -{" "}
              {shipping?.city} - {shipping?.region}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {shipping?.phoneNumber}
            </p>
            {shipping?.email && (
              <p>
                <span className="font-medium">Email:</span> {shipping?.email}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm print:border print:shadow-none">
          <h2 className="mb-4 text-lg font-semibold">Total Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order?.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>$10</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-$5</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order?.totalAmount + 10 - 5}</span>
            </div>
            <p className="text-sm capitalize text-gray-500">
              Paid by: {order?.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
