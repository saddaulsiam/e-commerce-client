import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeAdmin: builder.mutation({
      query: (email) => ({
        url: `/admin/make-admin`,
        method: "POST",
        body: { email },
      }),
    }),

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

export const {
  useMakeAdminMutation,
  useGetAdminByEmailMutation,
  useGetAdminDashboardMetaQuery,
} = authApi;
