import { ReactNode } from "react";

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem =
  | {
      key: string | undefined;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;
export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
export interface ElectricGadget {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem?: string;
  connectivity?: string[];
  powerSource?: string;
  features?: string[];
  weight?: number;
  dimensions?: string;
}
export interface SaleItem {
  _id: string;
  productId: string;
  quantity: number;
  buyerName: string;
  saleDate: string | null; // Adjust the type accordingly
  __v: number;
  // Add other properties if needed
}

export interface SalesHistoryResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  weekly: Record<string, SaleItem[]>;
  daily: Record<string, SaleItem[]>;
  monthly: Record<string, SaleItem[]>;
  yearly: Record<string, SaleItem[]>;
}
