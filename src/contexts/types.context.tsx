import { User } from "@firebase/auth";

//Object Types
export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageYOffset: string; //Y offset from centered position
};
//Context Types
export type UserContextType = {
  currentUser: User | null;
  setCurrentUser: (value: User | null) => void;
};
export type ProductsContextType = {
  products: Array<Product>;
  setProducts: (value: Array<Product>) => void;
};
