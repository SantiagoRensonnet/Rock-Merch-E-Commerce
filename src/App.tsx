//Libraries
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
//Context
import { CategoriesContext } from "./contexts/categories.context";
import { CategoriesContextType } from "./contexts/types.context";

//Routes
import Navigation from "./routes/navigation.component";
import Home from "./routes/home.component";
import Authentication from "./routes/authentication.component";
import Shop from "./routes/shop.component";
import { ItemDetail } from "./routes/item-detail.component";
import CheckOut from "./routes/checkout.component";
import { Error404 } from "./routes/error404.component";
//Components
import { Category } from "./routes/category/category.component";

const App = () => {
  const { categories } = useContext(CategoriesContext) as CategoriesContextType;
  return (
    <div className="font-jost bg-neutral-900">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/">
            <Route index element={<Shop />} />
            {categories?.map((category, index) => (
              <Route
                key={index}
                path={category.title.toLowerCase()}
                element={<Category category={category} />}
              />
            ))}
          </Route>
          <Route path="item/:itemId" element={<ItemDetail />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
