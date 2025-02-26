import { USER_ROLE } from "@/contants/common";

export type TUser = {
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
  street: string;
  city: string;
  area: string;
  fullAddress: string;
};

export type TProfile = {
  userId: string;
  address: TAddress[];
  photo: string;
  orders: string[];
  createdAt: Date;
  updatedAt: Date;
};
export interface TCategory {
  name: string;
  description: string;
  logo: string;
}

export interface TBrand {
  name: string;
  description: string;
  logo: string;
}

export interface TReview {
  _id: string;
  name: string;
  massage: string;
  rating: number;
}

export interface TProduct {
  _id: string;
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
