import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
// import TodoList from "./component/TodoList";
// import TodoDetail from "./component/TodoDetail";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import SidebarProvider from "./context/sideBarContext";
import Sidebar from './component/cartSideBar';
import ProductContext from "./context/productContext";
import ProductDetail from "./pages/productDetail";  
import CheckoutPages from "./component/checkoutPages";
import NotFound from "./pages/notFound";


function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
      <ProductContext>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/checkoutPages" element={<CheckoutPages />} />
              <Route path="/productList/:id" element={<ProductDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Sidebar></Sidebar>
          
        </Router>
      </div>
      </ProductContext>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
