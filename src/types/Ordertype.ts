import { TCartItem } from "@/redux/features/cart/cartSlice";
import { TAddress } from "@/types/common";

// Payment Status Enum
export enum PaymentStatus {
  UNPAID = "unpaid",
  PAID = "paid",
  REFUNDED = "refunded",
}

// Order Status Enum
export enum OrderStatus {
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

// Main Order Interface
export interface MainOrder {
  userId: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  paymentStatus: PaymentStatus;
  shippingAddress: TAddress;
  status: OrderStatus;
  subOrders: TCartItem[];
}
