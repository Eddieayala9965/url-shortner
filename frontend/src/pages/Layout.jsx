import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
const Layout = () => {
  const primaryNav = [
    { title: "Home", url: "/" },
    { title: "URL", url: "/url" },
  ];
  return (
    <>
      <div className="flex flex-col justify-center text-center items-center">
        <Nav navItems={primaryNav} />
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
