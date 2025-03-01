import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/address`,
        method: "POST",
        body: data,
      }),
    }),

    removeAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/address`,
        method: "DELETE",
        body: data,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddNewAddressMutation,
  useRemoveAddressMutation,
  useGetAllUsersQuery,
} = authApi;
