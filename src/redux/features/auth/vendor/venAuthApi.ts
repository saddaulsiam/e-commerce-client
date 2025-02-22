import Cookies from "js-cookie";
import baseApi from "../../api/baseApi";

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
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
    }),

    updateMyVendor: builder.mutation({
      query: (data) => ({
        url: `/vendor/update/${data.email}`,
        method: "PATCH",
        body: data.profile,
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),

    getMyVendor: builder.mutation({
      query: (email) => ({
        url: `/vendor/${email}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    getVendorByName: builder.query({
      query: ({ name }) => ({
        url: `/vendor/${name}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
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
