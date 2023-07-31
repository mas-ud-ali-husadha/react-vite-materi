import usersSlice from "./users/slice";
import productSlice from "./product/slice";
import categorySlice from "./category/slice";

const settingReducer = {
  users: usersSlice,
  product: productSlice,
  category: categorySlice,
};

export default settingReducer;
