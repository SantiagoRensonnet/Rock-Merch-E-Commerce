//Types
import { ItemListProps } from "./types";
//Components
import { ItemCard } from "./item-card.component";

export const ItemList = (props: ItemListProps) => {
  const { items } = props;
  return (
    <section className="products-layout">
      {items?.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </section>
  );
};
