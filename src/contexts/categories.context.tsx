import { createContext, useState, useEffect } from "react";
import { Category } from "./types.context";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

interface Props {
  children: JSX.Element | JSX.Element[];
}

//store (context)
export const CategoriesContext = createContext({});
//provider (component)
export const CategoriesProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    const getCategories = async () => {
      const apiResponse = await getCategoriesAndDocuments();
      setCategories(apiResponse);
    };
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
