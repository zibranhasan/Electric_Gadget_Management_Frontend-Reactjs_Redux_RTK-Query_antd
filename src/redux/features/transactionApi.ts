import { baseApi } from "../api/baseApi";

const transactionManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddTransactions: builder.mutation({
      query: (data) => ({
        url: "/api/transaction/transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["gadget"],
    }),

    // deleteCart: builder.mutation({
    //   query: (gadgets_id) => {
    //     return {
    //       url: `/api/order/orders/${gadgets_id}`, //userId backend e acei.
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["cart"],
    // }),

    // updateCart: builder.mutation({
    //   query: (options) => {
    //     console.log("inside base api", options); //hubabu object tai asbe.
    //     return {
    //       url: "/api/order/orders",
    //       method: "PUT",
    //       body: options,
    //     };
    //   },
    //   invalidatesTags: ["cart"],
    // }),
  }),
});

export const { useAddTransactionsMutation } = transactionManagementApi;
