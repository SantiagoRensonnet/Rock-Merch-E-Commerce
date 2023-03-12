import { Categories, CATEGORIES_ACTION_TYPES } from "./categories.types";

export const setCategories = (categories: Categories | null) => ({
  type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
  payload: categories,
});
