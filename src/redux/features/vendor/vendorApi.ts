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

    getMyVendor: builder.query({
      query: (id) => ({
        url: `/vendor/${id}`,
        method: "GET",
      }),
      providesTags: ["Vendor"],
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
  useGetMyVendorQuery,
  useUpdateMyVendorMutation,
  useGetVendorByNameQuery,
} = authApi;
