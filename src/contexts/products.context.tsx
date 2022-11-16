import { createContext, useState, useEffect } from "react";
import { Product } from "./types.context";
import SHOP_DATA from "../json/shop-data.json";

interface Props {
  children: JSX.Element | JSX.Element[];
}

//store (context)
export const ProductsContext = createContext({});
//provider (component)
export const ProductsProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    setProducts(SHOP_DATA);
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
