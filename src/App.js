import "./App.css";
// import Counter from './features/counter/Counter';
// import ProductList from './features/product-list/ProductList'
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/userOrders";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfile from "./features/user/components/userProfile";
import UserProfilePage from "./pages/userProfilePage";
import { fetchLoggedInUser } from "./features/user/userAPI";
import {
  fetchLoggedInUserAsync,
  selectUserInfo,
} from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductForm from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { ToastContainer, toast } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
      // we will add orders page later. now we have directly put the userOrders component for testing
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
      // we will add orders page later. now we have directly put the userOrders component for testing
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  // const userInfo = useSelector(selectUserInfo);
  // console.log(user) // this logs logincredentails

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchLoggedInUserAsync(user.id));
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      {/* <SignupPage></SignupPage> */}
      {/* <LoginPage></LoginPage> */}
      <RouterProvider router={router} />
      <ToastContainer />

      {/* Link must be always be in the provider */}
    </div>
  );
}

export default App;
