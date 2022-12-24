//Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartContextType } from "../../contexts/types.context";
import { ItemCardProps } from "./types";

export const ItemCard = (props: ItemCardProps) => {
  const { name, price, imageUrl, imageYOffset } = props.item;
  const { isMobile, showCardOnMobile } = props;
  const { addItemToCart } = useContext(CartContext) as CartContextType;
  const addProductToCart = () => addItemToCart(props.item);

  return !isMobile || showCardOnMobile ? (
    <article className="shop--product-card">
      <figure
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={
          imageYOffset
            ? `product-thumbnail bg-[center_top_${imageYOffset}]`
            : "product-thumbnail"
        }
      >
        <button onClick={addProductToCart}>ADD TO CART</button>
      </figure>
      <footer>
        <span>{name}</span>
        <span className="mr-2">{price}</span>
      </footer>
    </article>
  ) : (
    <></>
  );
};
