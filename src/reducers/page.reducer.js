import { pageConstants } from "../actions/constant";

const initState = {
  error: null,
  pages: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case pageConstants.GET_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstants.GET_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        pages: action.payload,
      };
      break;
    case pageConstants.GET_PAGE_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;

    case pageConstants.ADD_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case pageConstants.ADD_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        pages: action.payload,
      };
      break;
    case pageConstants.ADD_PAGE_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload,
      };
      break;
    default:
      break;
  }

  return state;
};
