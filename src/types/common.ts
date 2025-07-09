import { USER_ROLE } from "@/constants/common";

export type TUserRole = keyof typeof USER_ROLE;

export type TAddress = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  region: string;
  city: string;
  area: string;
  street: string;
};

export type TProfile = {
  userId: string;
  address: TAddress[];
  birthDate: string;
  photo: string;
  orders: string[];
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  _id: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: TUserRole;
  profile: TProfile;
  vendor: TVendor;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
};

export enum TStatus {
  INACTIVE = "inactive",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  PROCESSING = "processing",
  VERIFIED = "verified",
  ACTIVE = "active",
  BLOCK = "block",
  DELETED = "deleted",
  INSTOCK = "in-stock",
  OUTOFSTOCK = "out-of-stock",
  DISCONTINUED = "discontinued",
}

export type TSubcategory = {
  _id: string;
  name: string;
  href: string;
  subcategories: TSubcategory[];
};

export type TCategory = {
  _id: string;
  name: string;
  subcategories: TSubcategory[];
};

export interface TBrand {
  _id: string;
  name: string;
  logo: string;
  description: string;
}

export interface TReview {
  _id: string;
  name: string;
  photo: string;
  rating: number;
  message: string;
  createdAt?: string;
}

export type TProduct = {
  _id?: string;
  supplier: TVendor;
  name: string;
  description: string;
  // shortDescription: string;
  price: number;
  discount: number;
  stock: number;
  rating?: number;
  category: string;
  brand: string;
  colors: { label: string; color: string }[];
  sizes: string[];
  images: string[];
  reviews?: TReview[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TVendor = {
  _id: string;
  userId: string;
  email: string;
  storeName: string;
  storeDescription: string;
  storeLogo: string;
  storeBanner: string;
  address: TAddress;
  phoneNumber: number;
  products: TProduct[];
  earnings: number;
  status: TStatus;
  createdAt?: string;
  updatedAt?: string;
};
