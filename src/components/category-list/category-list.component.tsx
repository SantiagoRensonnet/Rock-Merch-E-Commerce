//Interface
import { CategoryListProps } from "./types";
//Components
import CategoryItem from "./category-item.component";
//Auxiliary functions
function getCategoryStyle(length: number, index: number) {
  let style = undefined;
  //Last Row size is 1
  if (length % 3 === 1 && index === length - 1) {
    style = "col-span-full mb-0"; //Last Row style

    //Last Row size is 2
  } else if (length % 3 === 2 && index === length - 2) {
    style = "md:col-span-3 col-span-full";
  } else if (length % 3 === 2 && index === length - 1) {
    style = "md:col-span-3 col-span-full mb-0"; //Last Row style
  } else {
    //Normal style
    style = "md:col-span-2 col-span-full";
  }
  //Add default styles (common to all)
  style += " " + "category-card";
  return style;
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <section className="my-auto w-full p-4  sm:p-0  sm:grid sm:gap-3 sm:w-6/12 md:grid-cols-6 md:gap-4 md:w-10/12  xl:w-8/12  ">
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
    </section>
  );
};

export default CategoryList;
