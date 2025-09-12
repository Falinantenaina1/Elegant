import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

import HomePage from "./pages/HomePage";
import LayoutPage from "./pages/LayoutPage";

const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

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
        element: <ShopPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
