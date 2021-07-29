import axios from "../helpers/axios";
import {
  categoryConstants,
  initDataConstants,
  orderConstants,
  productConstants,
} from "./constant";

export const getInitialData = (params) => {
  return async (dispatch) => {
    dispatch({ type: initDataConstants.GET_INITIALDATA_REQUEST });
    const res = await axios.get("/initialdata");
    if (res.status === 200) {
      const { categories, products, orders } = res.data;

      dispatch({
        type: categoryConstants.GET_CATEGORY_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: { products },
      });

      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
  };
};
