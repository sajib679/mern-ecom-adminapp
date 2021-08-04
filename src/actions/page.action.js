import axios from "../helpers/axios";
import { pageConstants } from "./constant";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.ADD_PAGE_REQUEST });
    const res = await axios.post(`page/create`, form);
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

export const updatePage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.UPDATE_PAGE_REQUEST });
    const res = await axios.patch(`page/update`, form);
    if (res.status == 200) {
      const { page } = res.data;
      dispatch(getAllPage());
    } else if (res.status == 400) {
      dispatch({
        type: pageConstants.UPDATE_PAGE_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const getAllPage = () => {
  return async (dispatch) => {
    dispatch({ type: pageConstants.GET_PAGE_REQUEST });
    const res = await axios.get(`page/get`);

    if (res.status == 200) {
      dispatch({
        type: pageConstants.GET_PAGE_SUCCESS,
        payload: res.data.page,
      });
    }
  };
};

export const deletePageImage = ({ imgName, pageId, imageId }) => {
  return async (dispatch) => {
    const res = await axios.delete(`/upload/${imgName}`);
    if (res.status === 200) {
      const response = await axios.patch("/page/deleteimage", {
        pageId,
        imageId,
      });
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
};
