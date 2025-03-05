import { USER_ROLE } from "@/contants/common";

export type TUser = {
  _id: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: TUserRole;
  profile: TProfile;
  createdAt: Date;
  updatedAt: Date;
};

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
  createdAt: Date;
  updatedAt: Date;
};

export type TSubcategory = {
  name: string;
  href: string;
  subcategories?: TSubcategory[];
};

export type TCategory = {
  _id: string;
  name: string;
  subcategories?: TSubcategory[];
};

export interface TBrand {
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
  vendorId: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  stock: number;
  rating: number;
  reviews: TReview[];
  category: TCategory;
  brand: TBrand;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
