import axios from "axios";
import React, { useContext, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
const MyBookedTutorCard = ({ tutor, user }) => {
  // const { user } = useContext(AuthContext);
  // const location = useLocation();
  // const getTutor = location.state?.tutor; // Destructure the passed tutor object
  // console.log(getTutor, location);
  // const [tutor, setTutors] = useState(getTutor);
  const handleReview = () => {
    axios
      .post(`http://localhost:5005/review/${tutor?.tutorId}`)
      .then((response) => {
        // Update the UI after the review count is updated
        setTutors((prevTutors) => ({
          ...prevTutors,
          review: tutor.review + 1,
        }));
        console.log(tutor);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="relative flex gap-3 h-auto min-h-44 group">
        <div className="flex items-center gap-3 bg-white shadow-lg py-5 p-3 rounded-lg hover:ring-2 w-9/12 group">
          <div className="flex items-center gap-3 w-8/12">
            <img
              src={tutor?.image}
              alt={tutor?.name}
              className="rounded-full w-32 h-32"
            />
            <div className="">
              <h3 className="font-bold text-xl">{user?.displayName}</h3>
              <h3 className="text-base">{user?.language}</h3>
              <p className="flex items-center gap-1 text-base text-gray-600">
                <FaLocationDot />
                {tutor.country}
              </p>
              <p>Language: {tutor.language}</p>

              <p className="mt-2 text-gray-700">{tutor.description}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-4/12 text-center">
            <div>
              <div className="flex justify-center items-center gap-3 text-center">
                <span className="flex items-center gap-1 font-bold text-yellow-500">
                  {tutor.rating}
                  <FaStar />
                </span>
                <span className="text-gray-600">{tutor.reviews} reviews</span>
              </div>
              <p className="font-bold text-pink-600">
                ${tutor.price} / 50-min lesson
              </p>
            </div>
            <button
              onClick={handleReview}
              className="px-6 py-2 border rounded-lg text-gray-600 btn btn-warning"
            >
              Add Review
            </button>
            <button className="text-gray-800 btn btn-outline">
              Send message
            </button>
          </div>
        </div>
        <div className="group-hover:flex top-0 -right-4 absolute justify-center items-center hidden bg-white shadow-lg w-3/12 h-full card">
          <div className="flex flex-col items-center gap-2 p-2 card">
            <img
              className="rounded-xl w-full h-32 box"
              src={tutor.image}
              alt=""
            />
            <Link
              to={"/tutor/details"}
              state={{ tutor }}
              className="w-full btn btn-outline btn-sm"
            >
              View Details Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookedTutorCard;
