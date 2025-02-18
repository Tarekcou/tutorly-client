import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const TutorDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const getTutor = location.state?.tutor || location.state?.tutors; // Destructure the passed tutor object
  console.log(getTutor, location);
  const [tutor, setTutors] = useState(getTutor);
  // console.log(tutor);
  if (!tutor) {
    return <p className="mt-28 text-red-500">No tutor data available.</p>;
  }
  // console.log(tutor.tutorId);
  const handleBooked = () => {
    const bookedTutor = {
      tutorId: tutor._id,
      image: tutor.image,
      language: tutor.language,
      price: tutor.price,
      country: tutor.country,
      review: tutor.review,
      tutorEmail: tutor.email,
      email: user.email,
      // Assuming user ID is stored in a global state
    };
    axios
      .post(
        "https://tutor-booking-server-olive.vercel.app/add-booked-tutorials",
        bookedTutor
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "One Tutorial Added !",
          text: "Congratulation one tutorial added!",
          icon: "success",
        });
        navigate(`/booked-tutors/${user.email}`);
      });
  };
  // console.log(tutor);

  return (
    <div className="bg-white shadow-md mx-auto mt-28 p-6 rounded-lg max-w-4xl">
      <div className="flex md:flex-row flex-col items-start md:items-center md:space-x-6 space-y-4 md:space-y-0">
        {/* Tutor Image */}
        <div className="flex-shrink-0">
          <img
            src={tutor.image || "https://via.placeholder.com/150"}
            alt={tutor.name}
            className="border-gray-300 border rounded-full w-32 h-32"
          />
        </div>

        {/* Tutor Information */}
        <div className="flex-1">
          <h2 className="font-bold text-2xl">{tutor.name}</h2>
          <p className="text-gray-500 text-sm">
            {tutor.language || 0} language
          </p>
          <p className="mt-1 text-gray-600">
            {tutor.description ||
              "Qualified tutor with years of experience helping students excel."}
          </p>
          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-4 mt-4">
            <p className="text-gray-500 text-sm">
              🌟 {tutor.review || 0} reviews
            </p>
            <p className="text-gray-500 text-sm">
              📚 {tutor.lessons || 0} lessons
            </p>
            <p className="text-gray-500 text-sm">
              💲 {tutor.price || 0} / 50-min lesson
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-xl">About me</h3>
        <p className="mt-2 text-gray-600">
          {tutor.description ||
            "Hello, I am a passionate educator who loves to share knowledge and inspire learning. Let's achieve your goals together!"}
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
        <button
          onClick={handleBooked}
          className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-lg text-white"
        >
          Book This Lesson
        </button>
        <Link
          to="/contact"
          className="border-gray-300 hover:bg-gray-100 px-6 py-2 border rounded-lg text-gray-600"
        >
          Send message
        </Link>
      </div>

      {/* Super Popular Badge */}
      <div className="mt-6 font-semibold text-pink-600 text-sm">
        🔥 Super popular: 9 new contacts and 1 lesson booking in the last 48
        hours
      </div>
    </div>
  );
};

export default TutorDetailsPage;
