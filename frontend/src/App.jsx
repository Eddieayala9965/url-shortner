import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
