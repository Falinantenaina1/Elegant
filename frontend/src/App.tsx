import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ShopPage from "./pages/ShopPage";
import SignUpPage from "./pages/SignUpPage";

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
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignUpPage />,
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
