import { userConstants } from "../actions/constant";

const initState = {
  error: null,
  message: "",
  loading: false,
  succes: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
        succes: false,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        succes: true,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...initState,
        loading: false,
        message: action.payload.error,
        succes: false,
      };
      break;
    default:
      break;
  }

  return state;
};
