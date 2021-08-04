import axios from "../helpers/axios";
import { categoryConstants } from "./constant";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.GET_CATEGORY_REQUEST,
    });
    const res = await axios.get(`category/get`);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.ADD_CATEGORY_REQUEST,
    });
    const res = await axios.post(`category/create`, form);
    if (res.status === 200) {
      const category = res.data.category;
      dispatch({
        type: categoryConstants.ADD_CATEGORY_SUCCESS,
        payload: { category },
      });
    } else {
      dispatch({
        type: categoryConstants.ADD_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`category/update`, form);
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    const res = await axios.post(`category/delete`, ids);
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  };
};
