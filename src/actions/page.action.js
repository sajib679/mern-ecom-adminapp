// @ts-nocheck
import { MdCallToAction } from "react-icons/md";
import axios from "../helpers/axios";
import { pageConstants } from "./constant";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.ADD_PAGE_REQUEST });
    const res = await axios.post(`page/create`, form);
    console.log(res.data);
    if (res.status == 200) {
      const { page } = res.data;
      dispatch(getAllPage());
    } else if (res.status == 400) {
      dispatch({
        type: pageConstants.ADD_PAGE_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const getAllPage = () => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.GET_PAGE_REQUEST });
    const res = await axios.get(`page/get`);
    console.log(res);

    if (res.status == 200) {
      dispatch({
        type: pageConstants.GET_PAGE_SUCCESS,
        payload: res.data.page,
      });
    }
  };
};
