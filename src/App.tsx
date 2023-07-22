import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js.LICENSE.txt";
import "./scss/index.scss";

import Root from "./pages/Root";
import Home from "./components/Home";
import NotFound from "./components/error/PageNotFound";
import Login from "./pages/LoginPage";
import cart from "./Cart";

import withAuth from "./hoc/withAuth";

const AuthCart = withAuth(cart);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <AuthCart name="kanav" /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
