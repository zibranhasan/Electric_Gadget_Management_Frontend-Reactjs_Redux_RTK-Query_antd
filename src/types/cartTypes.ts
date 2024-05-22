/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DecodedToken {
  userId: string;
  // Add other fields as necessary
}

export interface ElectricGadget {
  _id: string;
  name: string;
  price: number;
  brand: string;
  quantity: number;
  photo: string;
  category: string;
  modelNumber: string;
  operatingSystem?: string;
  powerSource?: string;
  features: string[];
  connectivity: string[];
}

export interface OrderItem {
  gadgetsId: ElectricGadget;
  quantity: number;
}

export interface GadgetsDataResponse {
  data: ElectricGadget[];
}
export interface FilterOptions {
  priceRange: number[];
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem: string;
  connectivity: never[];
  powerSource: string;
  features: never[];
}
export interface OrderItem {
  gadgetsId: ElectricGadget;
  quantity: number;
}

export interface TResponseRedux<T> {
  data: T;
}

export interface ElectricGadget {
  _id: string;
  name: string;
  price: number;
  brand: string;
  quantity: number;
  photo: string;
  category: string;
  modelNumber: string;
  operatingSystem?: string;
  powerSource?: string;
  weight?: number;
  features: string[];
  connectivity: string[];
}

export interface TQueryParam {
  name: string;
  value: string | number;
}
export interface User {
  _id: string;
  username: string;
}

export interface OrderItem {
  gadgetsId: ElectricGadget;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: User;
  items: OrderItem[];
}

export interface OrdersResponse {
  [x: string]: any;
  data: Order[];
}
