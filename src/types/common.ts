import { USER_ROLE } from "@/contants/common";

export type TUserRole = keyof typeof USER_ROLE;

export type TAddress = {
  name: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  area: string;
  address: string;
};

export type TProfile = {
  userId: string;
  address: TAddress[];
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
  createdAt: string;
  updatedAt: string;
};
export type TSubcategory = {
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
  name: string;
  rating: number;
  massage: string;
}

export interface TProduct {
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
  colors: string[];
  sizes: string[];
  images: string[];
  reviews?: TReview[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TVendor = {
  _id: string;
  userId: string;
  storeName: string;
  storeDescription: string;
  storeLogo: string;
  storeBanner: string;
  address: TAddress;
  phoneNumber: number;
  products: TProduct[];
  earnings: number;
};
