import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaPlus,
  FaBook,
  FaUser,
  FaHome,
  FaUsers,
  FaUserAlt,
  FaUserAltSlash,
  FaDashcube,
} from "react-icons/fa";
import AddTutorials from "./AddTutorials";
import MyTutorials from "./MyTutorials";
import Profile from "./Profile";
import ManageTutors from "./ManageTutors";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import ManageUsers from "./ManageUsers";
import UploadTutorial from "./UploadTutorial";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboardChart");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTutor, setIsTutor] = useState(false);
  useEffect(() => {
    axiosPublic.get(`/users/${user.email}`).then((response) => {
      if (response.data.isAdmin) setIsAdmin(true);
    });
  }, []);
  const dashboardMenu = (
    <>
      <button
        onClick={() => setActivePage("dashboardChart")}
        className={`flex items-center space-x-2 p-3 rounded-lg ${
          activePage === "dashboardChart" ? "bg-blue-500" : "hover:bg-gray-700"
        }`}
      >
        <FaDashcube />
        <span>Dashboard</span>
      </button>
      <button
        onClick={() => setActivePage("addTutorial")}
        className={`flex items-center space-x-2 p-3 rounded-lg ${
          activePage === "addTutorial" ? "bg-blue-500" : "hover:bg-gray-700"
        }`}
      >
        <FaPlus />
        <span>Add Tutorials</span>
      </button>
      <button
        onClick={() => setActivePage("myTutorials")}
        className={`flex items-center space-x-2 p-3 rounded-lg ${
          activePage === "myTutorials" ? "bg-blue-500" : "hover:bg-gray-700"
        }`}
      >
        <FaBook />
        <span>My Tutorials</span>
      </button>
      {!isAdmin && (
        <button
          onClick={() => setActivePage("profile")}
          className={`flex items-center space-x-2 p-3 rounded-lg ${
            activePage === "profile" ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
        >
          <FaUser />
          <span>Tutors Profile</span>
        </button>
      )}
      {/* New Manage Users Button */}
      {isAdmin && (
        <>
          <button
            onClick={() => setActivePage("manageTutors")}
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              activePage === "manageTutors"
                ? "bg-blue-500"
                : "hover:bg-gray-700"
            }`}
          >
            <FaUsers />
            <span>Manage Tutors</span>
          </button>
          <button
            onClick={() => setActivePage("manageUsers")}
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              activePage === "manageUsers" ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
          >
            <FaUserAlt />
            <span>Manage Users</span>
          </button>
        </>
      )}
      <Link
        to="/"
        className="flex justify-center items-center space-x-2 bg-red-500 hover:bg-red-600 mt-10 p-3 rounded-lg text-white text-center"
      >
        <FaHome />
        <span>Home</span>
      </Link>
    </>
  );
  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed for Desktop) */}
      <div className="hidden fixed md:flex flex-col bg-gray-800 p-5 w-64 h-full text-white">
        <h2 className="mb-6 font-bold text-xl text-center">
          {isAdmin ? "Admin" : "Tutor"} Dashboard
        </h2>
        <nav className="flex flex-col space-y-4">{dashboardMenu}</nav>
      </div>

      {/* Drawer Button for Mobile */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="md:hidden top-4 left-4 z-50 fixed bg-gray-800 p-3 rounded-full text-white"
      >
        <FaBars size={20} />
      </button>

      {/* Drawer Sidebar (For Mobile & Tablet) */}
      {isDrawerOpen && (
        <div
          className="z-40 fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-64 bg-gray-800 text-white p-5 h-full z-50 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <h2 className="mb-6 font-bold text-xl text-center">
          {isAdmin ? "Admin" : "Tutor"} Dashboard
        </h2>
        <nav className="flex flex-col space-y-4">{dashboardMenu}</nav>
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 bg-gray-100 md:ml-64 md:p-8 h-screen overflow-y-auto">
        {activePage === "dashboardChart" && <DashboardChart />}
        {activePage === "addTutorial" && <UploadTutorial />}
        {activePage === "myTutorials" && <MyTutorials />}
        {activePage === "profile" && <Profile />}
        {activePage === "manageTutors" && <ManageTutors />}{" "}
        {activePage === "manageUsers" && <ManageUsers />}{" "}
        {/* New Manage Users Page */}
      </div>
    </div>
  );
};

export default Dashboard;
