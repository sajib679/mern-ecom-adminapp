// @ts-nocheck
import axios from "../helpers/axios";
import { bannerConstants } from "./constant";

export const createBanner = (form) => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.ADD_BANNER_REQUEST });
    const res = await axios.post(`banner`, form);
    if (res.status == 200) {
      const { banner } = res.data;
      dispatch(getAllBanner());
    } else if (res.status == 400) {
      dispatch({
        type: bannerConstants.ADD_BANNER_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const getAllBanner = () => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.GET_BANNER_REQUEST });
    const res = await axios.get(`banner`);

    if (res.status == 200) {
      dispatch({
        type: bannerConstants.GET_BANNER_SUCCESS,
        payload: res.data.banner,
      });
    }
  };
};
