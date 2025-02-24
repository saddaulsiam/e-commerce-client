import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    getMe: builder.mutation({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      // providesTags: ["Auth"],
    }),

    update: builder.mutation({
      query: ({ email, profile }) => ({
        url: `/user/${email}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
        body: profile,
      }),
      invalidatesTags: ["Auth"],
    }),

    addAddressToUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/address/${id}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
        body: data,
      }),

      invalidatesTags: ["Auth"],
    }),

    removeAddressToUser: builder.mutation({
      query: (data) => ({
        url: `/user/address/${data.userId}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    getAllUsers: builder.query({
      query: ({ page, limit }) => ({
        url: `/user?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get("access-token")}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeMutation,
  useUpdateMutation,
  useAddAddressToUserMutation,
  useRemoveAddressToUserMutation,
  useGetAllUsersQuery,
} = authApi;
