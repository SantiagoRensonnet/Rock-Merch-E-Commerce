import { CategoryUI } from "./types";
const CategoryItem = ({ id, title, imageURL, style }: CategoryUI) => {
  return (
    <article className={style}>
      <img src={imageURL} alt={title} className="category-image" />
      <div className="category-description">
        <h2 className="font-bold lg:text-lg">{title}</h2>
        <p className="font-extralight italic text-sm lg:text-base">SHOP NOW</p>
      </div>
    </article>
  );
};
export default CategoryItem;
