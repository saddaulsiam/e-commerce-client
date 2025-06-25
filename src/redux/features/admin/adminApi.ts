import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminByEmail: builder.mutation({
      query: (email) => ({
        url: `/admin/${email}`,
        method: "GET",
      }),
    }),

    getAdminDashboardMeta: builder.query({
      query: () => ({
        url: "/admin/dashboard/meta",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminByEmailMutation, useGetAdminDashboardMetaQuery } =
  authApi;
