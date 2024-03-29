import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import productReducer from "./product.reducers";
import orderReducer from "./order.reducers";
import categoryReducer from "./category.reducers";
import pageReducer from "./page.reducer";
import bannerReducer from "./banner.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  page: pageReducer,
  banner: bannerReducer,
});

export default rootReducer;
