import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the navigate hook
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import BecomeTutorPage from "../BecomeTutorPage";
import BecomeTutorForm from "../BecomeTutorForm";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [tutor, setTutor] = useState({});
  const navigate = useNavigate(); // Initialize navigate hook
  const [showBecomeTutorPage, setShowBecomeTutorPage] = useState(false);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    try {
      axiosPublic.get(`/tutors/email/${user.email}`).then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          setTutor(res.data);
        }
      });
    } catch (error) {
      console.error("Error Getting Tutor", error);
    }
  }, [user.email]);

  // Navigate to BecomeTutor page when Edit is clicked
  const handleEditClick = () => {
    // navigate("/become-tutor", { state: { tutor } }); // Pass tutor data to the Become Tutor page
    setShowBecomeTutorPage(true);
  };

  return (
    <>
      {showBecomeTutorPage ? (
        <BecomeTutorForm tutor={tutor} />
      ) : (
        <div className="mx-auto mb-20 p-10 rounded-lg w-full h-full text-center">
          {/* User Photo */}
          <img
            src={tutor.imageUrl}
            alt={tutor.name}
            className="mx-auto border-4 border-blue-500 rounded-full w-36 md:w-64 h-36 md:h-64"
          />

          {/* Name */}
          <h2 className="mt-4 font-bold text-gray-800 text-xl">{tutor.name}</h2>
          <p className="text-gray-500 text-sm">{tutor.email}</p>

          {/* Display Profile Info */}
          <p className="mt-2 text-gray-700">
            <strong>Location:</strong> {tutor?.city}, {tutor.country}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong> {tutor.experience} years
          </p>
          <p className="font-bold text-green-700 text-xl">
            <strong>Languages:</strong> {tutor?.language}
          </p>
          <p className="text-gray-700">
            <strong>Age:</strong> {tutor.age}
          </p>
          <p className="mt-3 text-gray-600 italic">"{tutor.description}"</p>

          {/* Edit Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 my-5 text-white btn"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
