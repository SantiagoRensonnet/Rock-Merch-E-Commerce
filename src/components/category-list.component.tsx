//Interface
import { CategoryListProps } from "../interfaces";
//Components
import CategoryItem from "./category-item.component";
//Auxiliary functions
function getCategoryStyle(length: number, index: number) {
  let style = undefined;
  //Last Row size is 1
  if (length % 3 === 1 && index === length - 1) {
    style = "col-span-full"; //Last Row style

    //Last Row size is 2
  } else if (length % 3 === 2 && index === length - 2) {
    style = "md:col-span-3 col-span-full";
  } else if (length % 3 === 2 && index === length - 1) {
    style = "md:col-span-3 col-span-full"; //Last Row style
  } else {
    //Normal style
    style = "md:col-span-2 col-span-full";
  }
  //Add default styles (common to all)
  style += " " + "category-container";
  return style;
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="my-auto grid md:grid-cols-6 md:gap-4 gap-3 xl:w-8/12 md:w-10/12 sm:w-6/12 w-7/12 ">
      {categories.map((category, index) => {
        const categoryStyle = getCategoryStyle(categories.length, index);
        return (
          <CategoryItem
            key={category.id}
            id={category.id}
            title={category.title}
            imageURL={category.imageURL}
            style={categoryStyle}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
