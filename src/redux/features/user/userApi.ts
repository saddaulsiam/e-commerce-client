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
      query: ({ limit, page, sort, search, role }) => {
        const url = `/users?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (role) params.append("role", role);
        if (search) params.append("search", search);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Auth"],
    }),

    changeUserStatus: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}/status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useChangeUserProfileMutation,
  useAddNewAddressMutation,
  useRemoveAddressMutation,
  useGetAllUsersQuery,
  useChangeUserStatusMutation,
} = authApi;
