import { bannerConstants } from "../actions/constant";

const initState = {
  error: null,
  banners: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case bannerConstants.GET_BANNER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case bannerConstants.GET_BANNER_SUCCESS:
      state = {
        ...state,
        loading: false,
        banners: action.payload,
      };
      break;
    case bannerConstants.GET_BANNER_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload,
      };
      break;

    case bannerConstants.ADD_BANNER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case bannerConstants.ADD_BANNER_SUCCESS:
      state = {
        ...state,
        loading: false,
        banners: action.payload,
      };
      break;
    case bannerConstants.ADD_BANNER_FAILURE:
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
