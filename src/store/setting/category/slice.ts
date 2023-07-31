import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getListCategory } from "./action";
import {
  Category,
  CategoryParams,
  CategoryResponse,
} from "@/types/CategoryTypes";

interface InitialStateType {
  list: Category[];
  error: string;
  params: CategoryParams;
  filterName: string;
  loading: boolean;
  total: number;
}

export const initialState: InitialStateType = {
  list: [],
  params: {
    per_page: 3,
    page: 1,
  },
  error: "",
  filterName: "",
  loading: false,
  total: 0,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeParams: (state, action) => {
      const { key, value } = action.payload;
      state.params = {
        ...state.params,
        [key]: value,
      };
    },
    changePage: (state, action) => {
      const value = action.payload;
      state.params.page = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(
        getListCategory.fulfilled,
        (state, action: PayloadAction<CategoryResponse>) => {
          state.loading = false;
          state.list = action.payload.data.list;
          state.total = action.payload.data.meta.total;
        }
      );
  },
});
export const { changeParams, changePage } = categorySlice.actions;

export default categorySlice.reducer;
