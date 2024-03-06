import {
  SalesHistoryResponse,
  TQueryParam,
  TResponseRedux,
} from "@/types/sidebar.types";
import { baseApi } from "../api/baseApi";

const salesManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    Addsales: builder.mutation({
      query: (data) => ({
        url: "/api/sales/sell",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sale"],
    }),
    getSalesHistory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/api/sales/history",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["gadget"],

      transformResponse: (response: TResponseRedux<SalesHistoryResponse>) => {
        return {
          data: response,
        };
      },
    }),
  }),
});

export const { useAddsalesMutation, useGetSalesHistoryQuery } =
  salesManagementApi;
