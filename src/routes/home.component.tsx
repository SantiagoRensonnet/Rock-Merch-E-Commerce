//Context
import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";
import { CartContextType } from "../contexts/types.context";
//Components
import CategoryList from "../components/category-list/category-list.component";
const Home = () => {
  const { setShowCart } = useContext(CartContext) as CartContextType;
  return (
    <main
      className="main-container"
      onClick={() => {
        setShowCart(false);
      }}
    >
      <CategoryList />
    </main>
  );
};
export default Home;
