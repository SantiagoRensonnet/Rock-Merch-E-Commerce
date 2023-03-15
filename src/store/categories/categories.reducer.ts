import { CATEGORIES_ACTION_TYPES } from "./categories.types";
const INITIAL_STATE = {
  categories: null,
};

//reducer
export const categoriesReducer = (
  state: any = INITIAL_STATE,
  action: any = {}
) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };

    default:
      return state;
  }
};
