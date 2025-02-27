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
  }),
});

export const { useAddNewAddressMutation, useRemoveAddressMutation } = authApi;
