export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  UNBLOCKED = "unblocked",
  DELETED = "deleted",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCEL = "cancel",
  SUCCESSFUL = "successful",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum authKey {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export const redirectUrl = "redirectUrl";

export enum USER_ROLE {
  SUPER_ADMIN = "superAdmin",
  ADMIN = "admin",
  CUSTOMER = "customer",
  VENDOR = "vendor",
}
