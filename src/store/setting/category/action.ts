import { api } from "@/api/axios";
import { Category } from "@/api/endpoints";
import { CategoryParams, ListData } from "@/types/CategoryTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getListCategory = createAsyncThunk(
  "category/getData",
  async (params: CategoryParams, { rejectWithValue }) => {
    try {
      const response = await api.get(Category.action, {
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

export const getCategory = async () => {
  const response = await api.get(Category.action);
  return response;
};

export const createCategory = async (data: ListData) => {
  const response = await api.post(Category.action, data);
  return response;
};

export const editCategory = async (data: ListData) => {
  const response = await api.put(Category.action, data);
  return response;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`${Category.action}/${id}`);
  return response;
};
