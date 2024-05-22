import { TQueryParam } from "@/types/sidebar.types";
import { baseApi } from "../api/baseApi";
import { OrdersResponse } from "@/types/cartTypes";

const cartManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/api/order/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["cart"],
      transformResponse: (response: OrdersResponse) => {
        return {
          data: response,
        };
      },
    }),
    getOrdersByUserId: builder.query({
      query: (user_id) => {
        console.log(`Fetching data for gadget with ID: ${user_id}`);
        return {
          url: `/api/order/orders/user/${user_id}`,
          method: "GET",
        };
      },
      providesTags: ["cart"],
    }),

    deleteCart: builder.mutation({
      query: (gadgets_id) => {
        return {
          url: `/api/order/orders/${gadgets_id}`, //userId backend e acei.
          method: "DELETE",
        };
      },
      invalidatesTags: ["cart"],
    }),

    updateCart: builder.mutation({
      query: (options) => {
        console.log("inside base api", options); //hubabu object tai asbe.
        return {
          url: "/api/order/orders",
          method: "PUT",
          body: options,
        };
      },
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrdersByUserIdQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = cartManagementApi;
