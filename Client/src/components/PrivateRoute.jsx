import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/api/auth/me", {
           withCredentials: true
        }); // cookiee careted
        if (res.status === 200) {
          setIsAuth(true);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // loading state
  if (isAuth === null) return <h1>Loading...</h1>;

  // agar login nahi hai
  if (!isAuth) return <Navigate to="/login" />;

  // agar login hai
  return children;
};

export default PrivateRoute;