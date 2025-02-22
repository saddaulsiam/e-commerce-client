import baseApi from "../api/baseApi";

const jwt = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJWTToken: builder.mutation({
      query: (data) => ({
        url: "/user/jwt",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetJWTTokenMutation } = jwt;
