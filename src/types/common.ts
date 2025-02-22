export type TUser = {
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: TUserRole;
  isEmailVerified: boolean;
  profile: TProfile;
  createdAt: Date;
  updatedAt: Date;
};

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

export const USER_ROLE = {
  superAdmin: "superAdmin",
  admin: "admin",
  customer: "customer",
  vendor: "vendor",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
