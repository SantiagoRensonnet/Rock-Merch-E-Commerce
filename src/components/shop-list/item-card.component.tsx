//Libraries
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ItemCardProps } from "./types";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

export const ItemCard = (props: ItemCardProps) => {
  const { name, price, imageUrl, imageYOffset } = props.item;
  const { isMobile, showCardOnMobile } = props;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cart, props.item));

  return !isMobile || showCardOnMobile ? (
    <article
      className="shop--product-card"
      onClick={() => navigate(`/item/${props.item.id}`)}
    >
      <figure
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={
          imageYOffset
            ? `product-thumbnail bg-[center_top_${imageYOffset}]`
            : "product-thumbnail"
        }
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            addProductToCart();
          }}
        >
          ADD TO CART
        </button>
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
