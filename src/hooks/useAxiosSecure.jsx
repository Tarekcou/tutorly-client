import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5005",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        response;
      },
      (error) => {
        console.log("error caught: " + error);
        if (error.status == 401 || error.status == 403) {
          console.log("need to logout user");
          logOut()
            .then(() => {
              console.log("user logged out");
              navigate("/login");
            })
            .catch((error) => console.log("error caught: " + error));
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
