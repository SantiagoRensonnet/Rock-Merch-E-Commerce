//Libraries
import { Route, Routes } from "react-router-dom";
//Routes
import Navigation from "./routes/navigation.component";
import Home from "./routes/home.component";
import Login from "./routes/login.component";
import Shop from "./routes/shop.component";

const App = () => {
  return (
    <div className="flex flex-col items-center font-jost bg-neutral-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
