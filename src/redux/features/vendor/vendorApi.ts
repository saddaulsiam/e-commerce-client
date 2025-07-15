import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerVendor: builder.mutation({
      query: (data) => ({
        url: "/vendor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),

    getAllVendors: builder.query({
      query: ({ limit, page, sort, search, status }) => {
        const url = `/vendor?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (status) params.append("status", status);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Vendor"],
    }),

    getMyVendor: builder.query({
      query: (userId) => ({
        url: `/vendor/${userId}`,
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),

    getVendorOrders: builder.query({
      query: ({ limit, page, sort, search, vendorId, status }) => {
        const url = `/orders/vendor?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (vendorId) params.append("vendorId", vendorId);
        if (status) params.append("status", status);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),

    getVendorCustomers: builder.query({
      query: ({ limit, page, sort, search, vendorId, status }) => {
        const url = `/vendor/${vendorId}/customers?`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (status) params.append("status", status);

        return {
          url: `${url}${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Vendor"],
    }),

    updateMyVendor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/vendor/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),

    getVendorByName: builder.query({
      query: (name) => ({
        url: `/vendor/${name}`,
        method: "GET",
      }),
    }),

    getVendorDashboardMeta: builder.query({
      query: () => ({
        url: "/vendor/dashboard/meta",
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),

    changeVendorStatus: builder.mutation({
      query: (payload) => ({
        url: `/vendor/${payload.id}/status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useRegisterVendorMutation,
  useGetAllVendorsQuery,
  useGetMyVendorQuery,
  useGetVendorOrdersQuery,
  useGetVendorCustomersQuery,
  useUpdateMyVendorMutation,
  useGetVendorByNameQuery,
  useGetVendorDashboardMetaQuery,
  useChangeVendorStatusMutation,
} = authApi;
