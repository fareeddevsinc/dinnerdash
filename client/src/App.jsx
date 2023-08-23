import Home from "./components/home/Home.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Header from "./components/layout/Header/Header.jsx";
import ProductDetails from "./components/product/ProductDetails.jsx";
import Products from "./components/product/Products.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/product/Search.jsx";
import LoginSignup from "./components/user/LoginSignup.jsx";
import { store } from "./store.js";
import { loadUser } from "./actions/userAction";
import Account from "./components/user/Account";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import ProtectedRoute from "./components/route/ProtectedRoute";
import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./components/admin/Dashboard.jsx";
import NewProduct from "./components/admin/NewProduct.jsx";
import OrderList from "./components/admin/OrderList.jsx";
import ProcessOrder from "./components/admin/ProcessOrder.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import ProductReviews from "./components/admin/ProductReviews.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import UsersList from "./components/admin/UsersList.jsx";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import MyOrder from "./components/order/MyOrder.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import OrderDetails from "./components/order/OrderDetails.jsx";

const App = () => {
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:key" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />

        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/shipping" element={<Shipping/>}/> */}
        <Route path="/orders" element={<MyOrder />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
