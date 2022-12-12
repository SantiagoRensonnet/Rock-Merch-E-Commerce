export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageYOffset?: string;
}
export interface ItemListProps {
  items: Product[];
}
