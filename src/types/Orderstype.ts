import { TAddress, TProduct } from "@/types/common";

// Payment Status Enum
export enum TPaymentStatus {
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
export enum TPaymentMethod {
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
    image: string;
    productId: TProduct;
    price: number;
    quantity: number;
    color: string;
    size: string;
  };
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
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
  paymentMethod: TPaymentMethod;
  isPaid: boolean;
  paymentStatus: TPaymentStatus;
  shippingAddress: TAddress;
  status: TOrderStatus;
  subOrders: TSubOrder[];
  createdAt: string;
  updatedAt: string;
}
