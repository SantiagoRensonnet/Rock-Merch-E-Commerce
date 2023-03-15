//Redux
import { useDispatch } from "react-redux";
import { setShowCart } from "../store/cart/cart.action";
//Components
import CategoryList from "../components/category-list/category-list.component";
const Home = () => {
  const dispatch = useDispatch();
  return (
    <main
      className="main-container"
      onClick={() => {
        dispatch(setShowCart(false));
      }}
    >
      <CategoryList />
    </main>
  );
};
export default Home;
