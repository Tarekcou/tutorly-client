import React from "react";
import tutor from "../assets/tutor.jpg";
import { Link } from "react-router-dom";
const BecomeTutor = () => {
  return (
    <div className="bg-teal-300">
      <div className="flex md:flex-row flex-col items-center shadow-lg mx-auto p-8 md:p-16 rounded-lg w-11/12 md:w-10/12">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={tutor} // Replace with the actual image URL
            alt="Tutor"
            className="rounded-lg object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="mt-8 md:mt-0 md:ml-12 w-full md:w-1/2 text-left">
          <h2 className="mb-4 font-bold text-gray-900 text-4xl">
            Become a tutor
          </h2>
          <p className="mb-6 text-gray-800 text-lg">
            Earn money sharing your expert knowledge with students. Sign up to
            start tutoring online with Preply.
          </p>
          <ul className="space-y-2 mb-6 text-gray-800">
            <li>✔ Find new students</li>
            <li>✔ Grow your business</li>
            <li>✔ Get paid securely</li>
          </ul>
          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <Link
              to={"/become-tutor"}
              className="bg-black hover:bg-gray-800 shadow px-6 py-3 rounded-lg text-white"
            >
              Become a tutor →
            </Link>
            <Link
              href="#"
              className="text-teal-900 hover:text-teal-700 underline"
            >
              How our platform works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeTutor;
