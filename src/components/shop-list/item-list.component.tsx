//Types
import { ItemListProps } from "./types";
//Components
import { ItemCard } from "./item-card.component";

export const ItemList = (props: ItemListProps) => {
  const { items, isMobile = false, cardsShownOnMobile } = props;
  return (
    <section className="shop--products-layout ">
      {items?.map((item, index) => (
        <ItemCard
          key={item.id}
          item={item}
          showCardOnMobile={
            cardsShownOnMobile < 0 || index < cardsShownOnMobile
          }
          isMobile={isMobile}
        />
      ))}
    </section>
  );
};
