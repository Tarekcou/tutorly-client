import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: "https://tutor-booking-server-olive.vercel.app",
  // baseURL: "http://localhost:5005",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
