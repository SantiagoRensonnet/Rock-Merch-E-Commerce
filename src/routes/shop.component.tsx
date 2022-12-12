//Libraries
import { useContext } from "react";
//Context
import { CategoriesContext } from "../contexts/categories.context";
import { CategoriesContextType } from "../contexts/types.context";
//Components
import { ItemList } from "../components/shop-list/item-list.component";
export default function Shop() {
  //context init
  const { categories } = useContext(CategoriesContext) as CategoriesContextType;

  return (
    <main className="main-container">
      {categories?.map((category, index) => (
        <div
          key={index}
          className="w-full sm:w-8/12 md:w-10/12  2xl:w-8/12 my-auto p-4 2xl:py-4"
        >
          <h1 className="text-neutral-100 text-2xl font-extralight mb-1 md:mb-3">
            {category.title.toUpperCase()}
          </h1>
          <ItemList items={category.items} />
        </div>
      ))}
    </main>
  );
}
