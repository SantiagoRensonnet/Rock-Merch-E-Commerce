//Libraries
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useResize } from "../hooks/useResize";
//Context
import { Category } from "../contexts/types.context";
import { CartContext } from "../contexts/cart.context";
import { CartContextType } from "../contexts/types.context";
//redux
import { useSelector } from "react-redux";
//Selectors
import { selectCategories } from "../store/categories/categories.selector";

const findItembyId = (categoryArray: Category[], itemId: number) => {
  for (let i = 0; i < categoryArray.length; i++) {
    const category = categoryArray[i];
    const item = category.items.find((item) => item.id === itemId);
    if (item) {
      return item;
    }
  }
  return undefined;
};
export const ItemDetail = () => {
  const { itemId } = useParams();
  const { categories } = useSelector(selectCategories);
  const { addItemToCart } = useContext(CartContext) as CartContextType;
  const isMobile = useResize();

  if (itemId) {
    var item = findItembyId(categories, parseInt(itemId));
  }
  const addProductToCart = () => item && addItemToCart(item);
  //Traer data del context
  return isMobile ? (
    <main className="main-container">
      <section className="item-detail--card-mobile">
        <header className="text-neutral-100 italic flex justify-between px-1 my-2 cursor-default">
          <span>{item?.name}</span>
          <span>{item?.price}</span>
        </header>
        <figure
          style={{ backgroundImage: `url(${item?.imageUrl})` }}
          className="item-thumbnail"
        ></figure>
        <button
          className="btn btn-black w-full py-3.5 my-2"
          onClick={addProductToCart}
        >
          ADD TO CART
        </button>
      </section>
    </main>
  ) : (
    <main className="main-container">
      <section className="item-detail--card-desktop">
        <figure
          style={{ backgroundImage: `url(${item?.imageUrl})` }}
          className="item-thumbnail"
        >
          <button onClick={addProductToCart} className="figure-btn">
            ADD TO CART
          </button>
        </figure>

        <article className="text-neutral-100 italic lg:text-lg col-span-3 flex flex-col cursor-default">
          <span>{item?.name}</span>
          <span>{item?.price}</span>
        </article>
      </section>
    </main>
  );
};
