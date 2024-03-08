import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const LogOut = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  useEffect(() => {
    localStorage.clear();
    setIsAuth(false);
    return navigate("/login");
  }, [navigate, setIsAuth]);
};
