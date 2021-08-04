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

export const deleteProductImage = ({ imgName, productId, imageId }) => {
  return async (dispatch) => {
    const res = await axios.delete(`/upload/${imgName}`);
    if (res.status === 200) {
      const response = await axios.patch("/product/update", {
        productId,
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
