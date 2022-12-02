type Item = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageYOffset: string; //Y offset from centered position
  qty: number;
};
type BuyListProps = {
  cartItems: Item[];
};
export type { Item, BuyListProps };
