import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaUserAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut, imageKey, cart, theme, setTheme } =
    useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  // const [isTutor, setIsTutor] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  const axiosPublic = useAxiosPublic();
  const {
    isPending,
    isLoading,
    error,
    data: isTutor = false,
    refetch,
  } = useQuery({
    queryKey: ["tutor"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/tutors/email/${user?.email}`);
      // refetch();
      // console.log(response);
      return response?.data.isTutor || null;
    },
  });

  const { data: isAdmin = false } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/users/${user?.email}`);
      // console.log(response);
      // refetch();
      return response?.data.isAdmin || null;
    },
  });
  const handleToggle = (e) => {
    if (e.target.checked && localStorage.getItem("theme") == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    // (cart);
    refetch();
    localStorage.setItem("theme", theme);
    const localtheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localtheme);
  }, [theme]);

  const handleLogOut = () => {
    logOut();
  };

  const signInSignOutToggle = (
    <div className="flex items-center">
      {user ? (
        <div className="flex justify-between items-center gap-2 w-full">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer"
          >
            <div role="button" className="avatar btn btn-circle btn-ghost">
              <div className="rounded-full w-10">
                <img
                  key={imageKey}
                  src={
                    user.photoURL ||
                    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316631.1.png"
                  }
                  alt="navbar"
                />
              </div>
            </div>

            {/* Overlay Name */}
            <div
              className={`absolute w-[200px] h-[50px] text-center z-10 md:-right-10 -right-30  top-16 flex items-center justify-center
           bg-black bg-opacity-50 text-white text-lg font-semibold rounded-lg transition-opacity ${
             isHovered ? "opacity-200" : "opacity-0"
           }`}
            >
              {user?.displayName}
            </div>
          </div>

          <button
            onClick={handleLogOut}
            className="bg-orange-500 my-5 border-none rounded-xl font-medium text-white text-white-700 hover:text-blue-600 text-sm btn btn-sm"
          >
            LogOut
          </button>
        </div>
      ) : (
        // If no user is logged in

        <div className="flex justify-between items-center w-full">
          <div>
            <FaUserAlt className="text-white text-xl" />
          </div>
          <NavLink
            to="/login"
            className="mx-3 rounded-md font-medium hover:text-blue-600 text-sm"
          >
            <button className="bg-orange-500 py-2 border-none text-white btn btn-sm">
              Login
            </button>
          </NavLink>
        </div>
      )}
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="mx-1 text-blue-400 label-text">
            {theme == "light" ? "Light " : "Dark "}
          </span>
          <input onChange={handleToggle} type="checkbox" className="toggle" />
        </label>
      </div>
    </div>
  );
  const navMenu = (
    <div className="flex lg:flex-row flex-col justify-center gap-2 text-white">
      <NavLink to="/" className="bg-white btn-outline btn btn-sm">
        Home
      </NavLink>
      <NavLink to="/find-tutors" className="bg-white btn-outline btn btn-sm">
        Find Tutors
      </NavLink>

      {user ? (
        <div className="flex lg:flex-row flex-col gap-2">
          {/* <NavLink
            to="/addTutorials"
            className="bg-white btn-outline btn btn-sm"
          >
            Add Tutorials
          </NavLink>
          <NavLink
            to={`/myTutorials/${user.email}`}
            className="bg-white btn-outline btn btn-sm"
          >
            My Tutorials
          </NavLink> */}
          <NavLink
            to={`/booked-tutors/${user.email}`}
            className="bg-white btn-outline btn btn-sm"
          >
            My Booked Tutors
          </NavLink>

          {isAdmin ? (
            <NavLink
              to={`/admin-dashboard`}
              className="bg-white btn-outline btn btn-sm"
            >
              Admin Dashboard
            </NavLink>
          ) : isTutor ? (
            <NavLink
              to={`/dashboard`}
              className="bg-white btn-outline btn btn-sm"
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to={`/become-tutor`}
              className="bg-white btn-outline btn btn-sm"
            >
              Become a Tutor
            </NavLink>
          )}
        </div>
      ) : (
        ""
      )}
      <NavLink to={`/contact`} className="bg-white btn-outline btn btn-sm">
        Contact
      </NavLink>
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center bg-none mx-auto my-6 md:my-4 w-11/12 md:w-10/12">
        {/* left side */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link
            to={"/"}
            className="flex items-center gap-1 font-bold text-orange-500 text-2xl"
          >
            <img className="rounded-full w-6 h-6" src={logo} /> Tutorly
          </Link>
          <div className="lg:!hidden block dropdown">
            <div tabIndex={0} role="button" className="text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="right-2 z-100 absolute bg-base-100 shadow mt-3 p-3 rounded-box min-w-52 dropdown-content menu-content"
            >
              {navMenu}
              {signInSignOutToggle}
            </ul>
          </div>
        </div>
        {/* middle area */}

        <div className="!hidden lg:!block">
          <ul className="w-full">{navMenu}</ul>
        </div>
        {/* right side */}
        <div className="flex justify-center items-center gap-2">
          <div className="hidden md:!block">{signInSignOutToggle}</div>
          {/* <Link to={"/main/checkOut"} className="relative">
            <p className="-top-2 -right-2 absolute font-bold text-yellow-500">
              {cart.length}{" "}
            </p>
            <FaCartPlus className="text-green-500 text-3xl" />
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
