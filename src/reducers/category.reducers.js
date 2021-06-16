import { categoryConstants } from "../actions/constant";

const initState = {
  error: null,
  categories: [],
  loading: false,
};

const buildCategories = (parentId, prevCat, newCat) => {
  let newCategoryList = [];
  if (parentId === undefined) {
    return [
      ...prevCat,
      {
        _id: newCat._id,
        name: newCat.name,
        slug: newCat.slug,
        children: [],
      },
    ];
  }

  for (const category of prevCat) {
    if (category._id == parentId) {
      const newCategory = {
        _id: newCat._id,
        name: newCat.name,
        slug: newCat.slug,
        parentId: newCat.parentId,
        children: [],
      };
      newCategoryList.push({
        ...category,
        children:
          category.children.length > 0
            ? [...category.children, newCategory]
            : [newCategory],
      });
    } else {
      newCategoryList.push({
        ...category,
        children: category.children
          ? buildCategories(parentId, category.children, newCat)
          : [],
      });
    }
  }
  return newCategoryList;
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.GET_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;

    case categoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstants.ADD_CATEGORY_SUCCESS:
      const newCategory = action.payload.category;

      // let allCat = [];
      // if (newCategory.parentId === undefined || null) {
      //   allCat.push(...state.categories, newCategory);
      // } else {
      //   allCat.push(...state.categories);
      // }

      const updatedCategoryList = buildCategories(
        newCategory.parentId,
        state.categories,
        newCategory
      );

      console.log(updatedCategoryList);
      state = {
        ...state,
        loading: false,
        categories: updatedCategoryList,
      };
      break;
    case categoryConstants.ADD_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }

  return state;
};
