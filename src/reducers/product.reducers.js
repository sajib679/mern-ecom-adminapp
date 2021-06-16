import { productConstants } from "../actions/constant";

const initialState = {
  products: [],
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_PRODUCT_FAILURE:
      state = {
        ...initialState,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
