import { BuyListProps } from "./types";
//Components
import { ItemDetail } from "./item-detail-component";

export const BuyList = (props: BuyListProps) => {
  const { cartItems } = props;
  return (
    <section className="checkout-section">
      {cartItems.map((item) => (
        <ItemDetail key={item.id} {...item} />
      ))}
    </section>
  );
};
