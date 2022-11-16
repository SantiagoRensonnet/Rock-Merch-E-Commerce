//Libraries
import CATEGORIES from "../json/categories.json";
//Components
import CategoryList from "../components/category-list/category-list.component";
const Home = () => {
  return (
    <main className="main-container">
      <CategoryList categories={CATEGORIES} />
    </main>
  );
};
export default Home;
