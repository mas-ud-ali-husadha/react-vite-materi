import { api } from "@/api/axios";
import { Product } from "@/api/endpoints";
import { ListData } from "@/types/UserTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getListProduct = createAsyncThunk(
  "product/getData",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await api.get(Product.action, {
        params,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = async (data: ListData) => {
  const response = await api.post(Product.action, data);
  return response;
};

export const editProduct = async (data: ListData) => {
  const response = await api.put(Product.action, data);
  return response;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`${Product.action}/${id}`);
  return response;
};
