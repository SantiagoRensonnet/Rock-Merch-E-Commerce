import { Product } from "../../contexts/types.context";
export const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  imageYOffset,
}: Product) => {
  return (
    <article key={id} className="product-card">
      <figure
        style={{ backgroundImage: `url(${imageUrl})` }}
        // className="product-thumbnail bg-[center_top_-4rem]"
        className={
          imageYOffset
            ? `product-thumbnail bg-[center_top_${imageYOffset}]`
            : "product-thumbnail"
        }
      >
        <button className="btn btn-white w-11/12 py-3.5 mb-1 opacity-0 transition ease-out duration-300">
          ADD TO CART
        </button>
      </figure>
      <footer className="w-full my-2 flex justify-between cursor-default">
        <span>{name}</span>
        <span className="mr-2">{price}</span>
      </footer>
    </article>
  );
};
