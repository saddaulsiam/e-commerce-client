import { TAddress, TProduct } from "@/types/common";

// Payment Status Enum
export enum PaymentStatus {
  UNPAID = "unpaid",
  PAID = "paid",
  REFUNDED = "refunded",
}

// Order Status Enum
export enum TOrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

// Payment Methods Enum
export enum PaymentMethod {
  CASH_ON_DELIVERY = "cashOnDelivery",
  SSLCOMMERZ = "sslCommerz",
  STRIPE = "stripe",
}

export interface TSubOrder {
  _id: string;
  vendorId: string;
  orderId: string;
  productId: string;
  item: {
    name: string;
    productId: TProduct;
    quantity: number;
    price: number;
  };
  totalAmount: number;
  paymentMethod: string;
  isPaid: boolean;
  shippingAddress: TAddress;
  status: TOrderStatus;
  createdAt: string;
  updatedAt: string;
}

// Main Order Interface
export interface TMainOrder {
  _id?: string;
  userId: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  paymentStatus: PaymentStatus;
  shippingAddress: TAddress;
  status: TOrderStatus;
  subOrders: TSubOrder[];
  createdAt: string;
  updatedAt: string;
}
