import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getListProduct } from "./action";
import { Product, ProductParams, ProductResponse } from "@/types/ProductTypes";

interface InitialStateType {
  list: Product[];
  error: string;
  params: ProductParams;
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

export const productSlice = createSlice({
  name: "product",
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
      .addCase(getListProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(
        getListProduct.fulfilled,
        (state, action: PayloadAction<ProductResponse>) => {
          state.loading = false;
          state.list = action.payload.data.list;
          state.total = action.payload.data.meta.total;
        }
      );
  },
});
export const { changeParams, changePage } = productSlice.actions;

export default productSlice.reducer;
