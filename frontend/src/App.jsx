import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./routes/Home";
import ErrorPage from "./pages/ErrorPgae";
import Users, { loader as userLoader } from "./routes/Users";
import AddUser, { action as userAction } from "./routes/AddUser";
import Links, { loader as linkLoader } from "./routes/Links";
import Login, { action as loginAction } from "./routes/Login";
import "./App.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
        loader: userLoader,
      },
      {
        path: "/url",
        element: <Links />,
        loader: linkLoader,
      },
      {
        path: "/users/add",
        element: <AddUser />,
        action: userAction,
      },
      {
        path: "/user/login",
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
