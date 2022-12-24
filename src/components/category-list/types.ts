type CategoryData = {
  id: number;
  title: string;
  imageURL: string;
};
type CategoryUI = {
  id: number;
  title: string;
  imageURL: string;
  imageXOffset: string;
  imageYOffset: string;
  style: string;
};
interface CategoryListProps {
  categories: CategoryData[];
}
export type { CategoryData, CategoryUI, CategoryListProps };
