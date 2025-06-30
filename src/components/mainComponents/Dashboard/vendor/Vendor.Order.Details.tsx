"use client";

import { Loading } from "@/components/sharedComponents/loader";
import { Button } from "@/components/ui/button";
import Status from "@/components/ui/status";
import {
  useGetSingleSuborderQuery,
  useUpdateSubOrderStatusMutation,
} from "@/redux/features/order/orders/ordersApi";
import { TAddress, TStatus } from "@/types/common";
import { format } from "date-fns";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import VendorOrderDetailsCart from "./Vendor.Order.Details.Cart";
import { TOrderStatus } from "@/types/Orderstype";

export default function VendorOrderDetails() {
  const params = useParams();
  const router = useRouter();
  const [statusError, setStatusError] = useState<string | null>(null);

  const {
    data: orderData,
    isLoading,
    refetch,
  } = useGetSingleSuborderQuery(params.id);

  const [updateOrderStatus, { isLoading: isUpdating, isSuccess }] =
    useUpdateSubOrderStatusMutation();

  const order = orderData?.data;
  const shipping = order?.shippingAddress as TAddress;

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value;
    if (!newStatus || newStatus === order?.status) return;

    try {
      setStatusError(null);
      await updateOrderStatus({
        id: params.id,
        status: newStatus,
      }).unwrap();
      refetch();
    } catch {
      setStatusError("Failed to update status. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Admin view: interactive, editable */}
      <div className="container mx-auto max-w-6xl space-y-8 px-4 py-8 print:hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b pb-4 print:block">
          <div>
            <h1 className="text-2xl font-bold text-primary">Order Details</h1>
            <p className="text-sm text-gray-500">Order ID: {order?._id}</p>
          </div>
          <Button onClick={() => router.push("/vendor/orders/pending")}>
            Back to Orders
          </Button>
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
                <option value={TOrderStatus.PENDING}>Pending</option>
                <option value={TOrderStatus.SHIPPED}>Shipped</option>
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
              {isSuccess && (
                <span className="mt-1 block text-xs text-green-500">
                  Updated successfully!
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
            <Button onClick={handlePrint} variant="outline">
              Print Invoice
            </Button>
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

      {/* Print Invoice Section */}
      <div className="mx-auto hidden max-w-3xl bg-white p-8 text-[12pt] leading-relaxed text-black print:block">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">
              INVOICE
            </h1>
            <p className="text-sm text-gray-600">Order ID: {order?._id}</p>
            <p className="text-sm text-gray-600">
              Date:{" "}
              {format(new Date(order?.createdAt), "dd-MMM-yyyy | hh:mm a")}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <Image
              src="/logo/logo.svg"
              width={100}
              height={50}
              alt="Brand Logo"
              className="mb-2"
            />
            <p className="text-xs text-gray-500">www.siamstore.com</p>
          </div>
        </header>

        {/* Shipping Address */}
        <section className="mb-8">
          <h2 className="mb-2 pb-1 text-lg font-semibold">Shipping Address</h2>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{shipping?.name}</p>
            <p>{shipping?.street}</p>
            <p>
              {shipping?.area}, {shipping?.city}, {shipping?.region}
            </p>
            <p>Phone: {shipping?.phoneNumber}</p>
            {shipping?.email && <p>Email: {shipping?.email}</p>}
          </div>
        </section>

        {/* Order Items Table */}
        <section className="mb-8">
          <h2 className="mb-2 pb-1 text-lg font-semibold">Order Items</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm">
                  Image
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm">
                  Product
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center text-sm">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right text-sm">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={order?.item?.image || "/placeholder.png"}
                    width={100}
                    height={50}
                    alt="Brand Logo"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order?.item?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {order?.item?.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ${order?.item?.price}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Summary */}
        <section className="flex justify-end">
          <table className="w-full max-w-xs border-t border-gray-300 text-sm">
            <tbody>
              <tr>
                <td className="py-2">Subtotal</td>
                <td className="py-2 text-right">${order?.totalAmount}</td>
              </tr>
              <tr>
                <td className="py-2">Shipping Fee</td>
                <td className="py-2 text-right">$10</td>
              </tr>
              <tr>
                <td className="py-2">Discount</td>
                <td className="py-2 text-right">-$5</td>
              </tr>
              <tr className="border-t border-gray-300 text-base font-bold">
                <td className="py-2">Total</td>
                <td className="py-2 text-right">
                  ${order?.totalAmount + 10 - 5}
                </td>
              </tr>
              <tr>
                <td className="py-2">Payment Method</td>
                <td className="py-2 text-right capitalize">
                  {order?.paymentMethod}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t pt-4 text-center text-xs text-gray-500">
          <p>Thank you for your purchase!</p>
          <p>For support, contact support@siamstore.com</p>
        </footer>
      </div>
    </>
  );
}
