//Types
import { Item } from "./types";
//Icons
import { MdArrowLeft, MdArrowRight, MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

//Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartContextType } from "../../contexts/types.context";

export const ItemDetail = (item: Item) => {
  const { name, price, imageUrl, qty } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(
    CartContext
  ) as CartContextType;
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
          <button onClick={() => removeItemFromCart(item)}>
            <MdArrowLeft
              style={{ width: "1.5rem", height: "1.5rem" }}
              className={"nav-link"}
            />
          </button>
          <span>{qty}</span>
          <button onClick={() => addItemToCart(item)}>
            <MdArrowRight
              style={{ width: "1.5rem", height: "1.5rem" }}
              className={"nav-link"}
            />
          </button>
        </div>

        <span className="m-auto">${qty * price}</span>
        <button onClick={() => clearItemFromCart(item)} className="m-auto">
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
