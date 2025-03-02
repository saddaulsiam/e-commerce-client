import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerVendor: builder.mutation({
      query: (data) => ({
        url: "/vendor",
        method: "POST",
        body: data,
      }),
    }),

    deleteVendor: builder.mutation({
      query: (email) => ({
        url: `/vendor/${email}`,
        method: "DELETE",
      }),
    }),

    updateMyVendor: builder.mutation({
      query: (data) => ({
        url: `/vendor/update/${data.email}`,
        method: "PATCH",
        body: data.profile,
      }),
    }),

    getMyVendor: builder.mutation({
      query: (email) => ({
        url: `/vendor/${email}`,
        method: "GET",
      }),
    }),

    getVendorByName: builder.query({
      query: ({ name }) => ({
        url: `/vendor/${name}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterVendorMutation,
  useDeleteVendorMutation,
  useGetMyVendorMutation,
  useUpdateMyVendorMutation,
  useGetVendorByNameQuery,
} = authApi;
