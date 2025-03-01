import baseApi from "../../api/baseApi";

const orderNowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStipePaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/payment/create-stripe-payment-intent",
        method: "POST",
        body: data,
      }),
    }),
    createSSLPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/payment/create-ssl-payment-intent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateStipePaymentIntentMutation,
  useCreateSSLPaymentIntentMutation,
} = orderNowApi;
