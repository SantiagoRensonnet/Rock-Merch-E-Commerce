interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageXOffset?: string;
  imageYOffset?: string;
}
export interface Category {
  title: string;
  cover: string;
  items: Array<Product>;
  imageXOffset?: string;
  imageYOffset?: string;
}
