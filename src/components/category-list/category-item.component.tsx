import { CategoryUI } from "./types";
import { useNavigate } from "react-router-dom";
const CategoryItem = ({
  id,
  title,
  imageURL,
  imageXOffset,
  imageYOffset,
  style,
}: CategoryUI) => {
  const navigate = useNavigate();
  const getOffsetImageStyle = () => {
    let style = "category-image";

    imageXOffset && (style += ` relative left-${imageXOffset}`);
    imageYOffset && (style += ` relative top-${imageYOffset}`);
    return style;
  };
  return (
    <article
      className={style}
      onClick={() => navigate(`/shop/${title.toLowerCase()}`)}
    >
      <img
        src={imageURL}
        alt={title}
        className={
          imageXOffset || imageYOffset
            ? getOffsetImageStyle()
            : "category-image"
        }
      />
      <div className="category-description">
        <h2 className="font-bold lg:text-lg">{title}</h2>
        <p className="font-extralight italic text-sm lg:text-base">SHOP NOW</p>
      </div>
    </article>
  );
};
export default CategoryItem;
