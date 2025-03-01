export const Status = {
  active: "active",
  inactive: "inactive",
  blocked: "blocked",
  unblocked: "unblocked",
  deleted: "deleted",
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  cancel: "cancel",
  successful: "successful",
} as const;

export const Gender = { male: "male", female: "female" } as const;

export const authKey = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const;

export const redirectUrl = "redirectUrl";

export const USER_ROLE = {
  superadmin: "superAdmin",
  admin: "admin",
  customer: "customer",
  vendor: "vendor",
} as const;
