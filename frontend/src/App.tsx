import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

import Loading from "./components/Loading";
import AccountDetails from "./components/users/AccountDetails";
import Address from "./components/users/Address";
import OrderHistory from "./components/users/OrderHistory";
import HomePage from "./pages/HomePage";
import LayoutPage from "./pages/LayoutPage";

const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const UserPage = React.lazy(() => import("./pages/UserPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "shop",
        element: (
          <Suspense fallback={<Loading />}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Loading />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: <UserPage />,
        children: [
          {
            path: "",
            element: <AccountDetails />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "orders",
            element: <OrderHistory />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
