import React from "react";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Carts from "./pages/Carts";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/carts" element={<Carts />} />
          <Route path="/carts/completed" element={<Orders />} />
          {/* <Route path="/category/:categoryId" element={<CategoryProducts />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
