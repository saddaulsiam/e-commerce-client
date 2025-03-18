import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeUserProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    addNewAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/address`,
        method: "POST",
        body: data,
      }),
    }),

    removeAddress: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/address`,
        method: "DELETE",
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
  useChangeUserProfileMutation,
  useAddNewAddressMutation,
  useRemoveAddressMutation,
  useGetAllUsersQuery,
} = authApi;
