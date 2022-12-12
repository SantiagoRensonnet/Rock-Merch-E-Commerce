//Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartContextType } from "../../contexts/types.context";
import { Product } from "../../contexts/types.context";

export const ItemCard = (productData: Product) => {
  const { name, price, imageUrl, imageYOffset } = productData;
  const { addItemToCart } = useContext(CartContext) as CartContextType;

  const addProductToCart = () => addItemToCart(productData);

  return (
    <article className="product-card">
      <figure
        style={{ backgroundImage: `url(${imageUrl})` }}
        // className="product-thumbnail bg-[center_top_-4rem]"
        className={
          imageYOffset
            ? `product-thumbnail bg-[center_top_${imageYOffset}]`
            : "product-thumbnail"
        }
      >
        <button
          className="btn btn-black w-11/12 py-3.5 mb-1 opacity-0 transition-opacity"
          onClick={addProductToCart}
        >
          ADD TO CART
        </button>
      </figure>
      <footer className="w-full my-2 lg:mb-0 flex justify-between cursor-default">
        <span>{name}</span>
        <span className="mr-2">{price}</span>
      </footer>
    </article>
  );
};
