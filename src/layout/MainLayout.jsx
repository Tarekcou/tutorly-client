import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { isLoading, setLoading } = useContext(AuthContext);
  console.log(isLoading);
  useEffect(() => {
    // fetch data here
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      // cleanup function
    };
  }, []);
  if (isLoading) return <Loading />;
  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-400px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
