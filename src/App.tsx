//Libraries
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  getCategoriesAndDocuments,
} from "./utils/firebase/firebase.utils";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";
import { setCategories } from "./store/categories/categories.action";
import { selectCategories } from "./store/categories/categories.selector";
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
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
    });
    //cleaning (stop listening) when unmounting
    return unsubscribe;
  }, []);
  useEffect(() => {
    const getCategories = async () => {
      const apiResponse = await getCategoriesAndDocuments();
      dispatch(setCategories(apiResponse));
    };
    getCategories();
  }, []);
  const { categories } = useSelector(selectCategories);

  return (
    <div className="font-jost bg-neutral-900">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/">
            <Route index element={<Shop />} />
            {categories?.map((category: any, index: any) => (
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
