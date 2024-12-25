import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLoaderData, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const PrivateRouter = ({ children }) => {
  const { user, isLoading, setLoading } = useContext(AuthContext);
  // const key=import.meta.env.VITE_apiKey
  // (key)

  const location = useLocation();
  // (location);
  if (isLoading) return <Loading />;
  if (user && user.email) return children;

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRouter;
