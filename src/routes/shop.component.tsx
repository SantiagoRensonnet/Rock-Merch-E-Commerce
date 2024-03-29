//Libraries
import { useContext } from "react";
import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
//selectors
import { selectCategories } from "../store/categories/categories.selector";
//Components
import { ItemList } from "../components/shop-list/item-list.component";
//Hooks
import { useResize } from "../hooks/useResize";

export default function Shop() {
  //context init
  const { categories } = useSelector(selectCategories);
  const isMobile = useResize();

  return (
    <main className="main-container">
      {categories?.map((category: any, index: any) => (
        <div
          key={index}
          className="w-full sm:w-8/12 md:w-10/12  2xl:w-8/12 my-auto p-4 2xl:py-4"
        >
          <h1
            className="text-neutral-100 text-2xl font-extralight mb-1 md:mb-3 cursor-pointer opacity-70 transition-all ease-out duration-500
          hover:opacity-100 hover:duration-500"
          >
            <Link className="nav-link" to={`./${category.title.toLowerCase()}`}>
              {category.title.toUpperCase()}
            </Link>
          </h1>
          <ItemList
            items={category.items.filter((e: any, index: any) => index < 3)}
            cardsShownOnMobile={2} // -1 for show all cards on mobile
            isMobile={isMobile}
          />
        </div>
      ))}
    </main>
  );
}
