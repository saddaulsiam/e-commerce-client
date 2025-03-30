import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminByEmail: builder.mutation({
      query: (email) => ({
        url: `/admin/${email}`,
        method: "GET",
      }),
    }),

    getAllCustomers: builder.query({
      query: ({ limit, page, sort, search }) => {
        const url = `/users?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAdminByEmailMutation, useGetAllCustomersQuery } = authApi;
