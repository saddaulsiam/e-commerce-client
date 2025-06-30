"use client";

import Link from "next/link";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function VendorOrderDetailsCart({ item }: { item: any }) {
  if (!item) {
    return (
      <div className="p-6 text-center text-gray-500">
        No items in this order.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Size
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
              Qty
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
              Price
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="transition hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded bg-gray-100">
                  <Image
                    src={item?.image || "/placeholder.png"}
                    alt={item?.name || "Product"}
                    fill
                    className="rounded object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="font-medium capitalize text-gray-800">
                    {item?.name}
                  </p>
                  <p className="text-sm text-gray-500">ID: {item?._id}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 capitalize text-gray-700">
              {item?.colors || "-"}
            </td>
            <td className="px-6 py-4 capitalize text-gray-700">
              {item?.size || "-"}
            </td>
            <td className="px-6 py-4 text-center text-gray-700">
              {item?.quantity}
            </td>
            <td className="px-6 py-4 text-right text-gray-700">
              ${item?.price}
            </td>
            <td className="px-6 py-4 text-center">
              <Link
                href={`/product/${item?._id}`}
                className="inline-flex items-center rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-primary"
              >
                <AiOutlineArrowRight className="text-lg" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
