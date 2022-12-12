//Libraries
import { Route, Routes } from "react-router-dom";

//Routes
import Navigation from "./routes/navigation.component";
import Home from "./routes/home.component";
import Authentication from "./routes/authentication.component";
import Shop from "./routes/shop.component";
import CheckOut from "./routes/checkout.component";

const App = () => {
  return (
    <div className="font-jost bg-neutral-900">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
