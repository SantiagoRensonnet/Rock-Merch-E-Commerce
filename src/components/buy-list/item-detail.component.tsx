//Types
import { Item } from "./types";
//Icons
import { MdArrowLeft, MdArrowRight, MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

export const ItemDetail = (item: Item) => {
  const { name, price, imageUrl, qty } = item;
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  return (
    <article>
      <hr className="bg-zinc-600 h-px border-none" />
      <div className="grid grid-cols-5 my-8 ">
        <figure
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="w-2/3 aspect-[0.8]  bg-no-repeat bg-cover bg-center"
        ></figure>

        <h3 className="m-auto">{name}</h3>
        <div className="m-auto flex items-center">
          <button onClick={() => dispatch(removeItemFromCart(cart, item))}>
            <MdArrowLeft
              style={{ width: "1.5rem", height: "1.5rem" }}
              className={"nav-link"}
            />
          </button>
          <span>{qty}</span>
          <button onClick={() => dispatch(addItemToCart(cart, item))}>
            <MdArrowRight
              style={{ width: "1.5rem", height: "1.5rem" }}
              className={"nav-link"}
            />
          </button>
        </div>

        <span className="m-auto">${qty * price}</span>
        <button
          onClick={() => dispatch(clearItemFromCart(cart, item))}
          className="m-auto"
        >
          <RiDeleteBin5Line
            style={{ width: "1.5rem", height: "1.5rem" }}
            className={"nav-link"}
          />
        </button>
      </div>
      <hr className="bg-zinc-600 h-px border-none" />
    </article>
  );
};
