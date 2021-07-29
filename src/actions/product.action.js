import axios from "../helpers/axios";

export const addProduct = (body) => {
  return async (dispatch) => {
    const res = await axios.post(`product/create`, body);
  };
};

export const updateProduct = (body) => {
  return async (dispatch) => {
    const res = await axios.post(`product/update`, body);
  };
};
