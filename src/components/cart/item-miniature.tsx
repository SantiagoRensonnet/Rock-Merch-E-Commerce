//Types
import { Item } from "./types";
export const ItemMiniature = (props: Item) => {
  const { name, price, imageUrl, qty } = props;
  return (
    <article className="flex items-center my-1">
      <figure
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="w-16 aspect-square mr-2 rounded-md bg-no-repeat bg-cover bg-center"
      ></figure>
      <div className="font-light text-xl flex flex-col justify-center">
        <h3>{name}</h3>
        <span className="text-sm">
          {qty} x ${price}
        </span>
      </div>
    </article>
  );
};
