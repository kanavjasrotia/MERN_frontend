import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js.LICENSE.txt";
import "./scss/index.scss";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import NotFound from "./components/error/PageNotFound";
import Login from "./pages/LoginPage";
import withAuthentication from "./hoc/withAuthentication";
import AddProductsPage from "./pages/shop_admin/AddProduct";
import { ERole } from "./core/enum/Erole";
import ShopRoot from "./pages/shop_admin/ShopRoot";

const ProtectedAppProducts = withAuthentication(AddProductsPage, ERole.Shop);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: "/", index: true, element: <HomePage /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "shopAdmin",
    element: <ShopRoot />,
    children: [{ path: "addProduct", element: <ProtectedAppProducts /> }],
  },
]);

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
