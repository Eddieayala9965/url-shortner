import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
const Layout = () => {
  const primaryNav = [
    { title: "Home", url: "/" },
    { title: "Users", url: "/users" },
    { title: "Links", url: "/url" },
    { title: "Add User", url: "/users/add" },
    { title: "Login", url: "/user/login" },
  ];
  return (
    <>
      <div className="flex justify-center text-center items-center ">
        <Nav navItems={primaryNav} />
      </div>
      <Outlet />
    </>
  );
};
export default Layout;
