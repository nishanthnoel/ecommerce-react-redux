import "./Stripe.css";
// import Counter from './features/counter/Counter';
// import ProductList from './features/product-list/ProductList'
import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import {
  checkAuthAsync,
  selectLoggedInUserToken,
  selectUserChecked,
} from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductForm from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { ToastContainer } from "react-toastify";
import StripeCheckout from "./pages/StripeCheckout";
import CheckoutForm from "./pages/CheckoutForm";
import CompletePage from "./pages/CompletePage";
import ResetPassword from "./features/auth/components/ResetPassword";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const Home = lazy(() => import("./pages/Home"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

const PageNotFound = lazy(() => import("./pages/404"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const UserOrders = lazy(() => import("./features/user/components/userOrders"));
const UserOrdersPage = lazy(() => import("./pages/UserOrdersPage"));
const UserProfile = lazy(() =>
  import("./features/user/components/userProfile")
);
const UserProfilePage = lazy(() => import("./pages/userProfilePage"));

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
    path: "/reset-password",
    element: <ResetPassword> </ResetPassword>,
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
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    // path: "/orders",
    path: "/my-orders", // for deployment
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
    path: "/checkoutform",
    element: (
      <Protected>
        <CheckoutForm></CheckoutForm>
      </Protected>
    ),
  },
  {
    path: "/complete",
    element: (
      <Protected>
        <CompletePage></CompletePage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  const userChecked = useSelector(selectUserChecked);
  // const userInfo = useSelector(selectUserInfo);
  // console.log(user) // this logs logincredentails
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    // if (user && user.id) {
    if (user) {
      dispatch(fetchLoggedInUserAsync()); // this is to fetch userInfo
      console.log("its fetching");
      // dispatch(fetchItemsByUserIdAsync(user.id));// we can get the req.user using token in the backend no need give it in the front end
      dispatch(fetchItemsByUserIdAsync()); // we can get the req.user using token in the backend no need give it in the front end
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      {userChecked && (
        <>
          <Suspense
            fallback={<div className="p-8 text-center">Loading...</div>}
          >
            <RouterProvider router={router} />
          </Suspense>
          <ToastContainer />
        </>
      )}
      {/* Link must be always be in the provider */}
    </div>
  );
}

export default App;
