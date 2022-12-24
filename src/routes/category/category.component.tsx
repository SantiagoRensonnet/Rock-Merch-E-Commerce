//Types
import { CategoryPageProps } from "./types";
//Components
import { ItemList } from "../../components/shop-list/item-list.component";

export const Category = (props: CategoryPageProps) => {
  const { category } = props;
  return (
    <main className="main-container text-neutral-100">
      <div className="w-full sm:w-8/12 md:w-10/12  2xl:w-8/12 my-auto p-4 2xl:py-4">
        <h1 className="flex flex-col">
          <span className="text-neutral-100 text-2xl font-extralight mb-1 md:mb-3 cursor-default self-center">
            {category.title.toUpperCase()}
          </span>
        </h1>
        <ItemList
          items={category.items}
          cardsShownOnMobile={-1} // -1 for show all cards on mobile
        />
      </div>
    </main>
  );
};
