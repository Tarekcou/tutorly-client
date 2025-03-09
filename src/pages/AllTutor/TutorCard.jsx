import axios from "axios";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaMailchimp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const TutorCard = ({ tutor, user, handleDelete }) => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  // console.log(tutor);

  const handleBooked = () => {
    const bookedTutor = {
      tutorId: tutor._id,
      image: tutor.imageUrl,
      language: tutor.language,
      hourlyRate: tutor.hourlyRate,
      country: tutor.country,
      review: tutor.review,
      tutorEmail: tutor.email,
      email: user.email,
      // Assuming user ID is stored in a global state
    };
    axiosPublic.post("/add-booked-tutorials", bookedTutor).then((res) => {
      // console.log(res);
      // console.log(res);
      if (res.status == 200) {
        Swal.fire({
          title: "Booked this tutor!",
          text: "You booked the tutor!",
          icon: "success",
        });
        // navigate(`/booked-tutors/${user.email}`);
      }
    });
  };

  // find reviews

  const {
    isPending,
    isLoading,
    error,
    data: reviews = [],
    refetch,
  } = useQuery({
    queryKey: ["Reviews", tutor.email], // Unique key per tutor
    queryFn: async () => {
      // if (!user?.email) return []; // Avoid running query when user is undefined
      const response = await axiosPublic.get(`/review/${tutor.email}`);
      // console.log(response.data[0].review.rating);
      return response?.data || [];
    },
  });

  return (
    <div className="">
      <div
        data-aos="fade-right"
        className="group relative flex md:flex-row flex-col gap-3 h-auto min-h-44"
      >
        <div
          onClick={() => navigate(`/tutor/details`, { state: { tutor } })}
          className={`group relative flex md:flex-row flex-col items-center gap-3  shadow-lg p-3 py-5 rounded-lg hover:ring-2 w-full md:w-10/12 cursor-pointer ${
            user?.email === tutor?.email ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          <div className="flex md:flex-row flex-col items-center gap-3 md:w-8/12">
            <img
              src={tutor?.imageUrl}
              alt={tutor?.name}
              className="rounded-full w-32 h-32"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl">{tutor?.name}</h3>
              <h3 className="flex items-center gap-1 text-black text-base">
                <CiMail /> {tutor?.email}
              </h3>
              <p className="flex items-center gap-1 text-gray-600 text-base">
                <FaLocationDot />
                {tutor.country}
              </p>
              <p className="font-bold text-blue-500">
                Language: {tutor.language}
              </p>
              <p className="mt-2 text-gray-700">
                {tutor.description.split(" ").slice(0, 12).join(" ")}...
              </p>{" "}
            </div>
          </div>
          <div className="flex flex-row md:flex-col justify-between items-center gap-3 w-full md:w-4/12 text-center">
            <div>
              <div className="flex md:flex-row flex-col justify-center items-center text-center">
                <span className="flex items-center gap-1 font-bold text-yellow-500">
                  {reviews.length > 0
                    ? (
                        reviews.reduce(
                          (acc, r) => acc + (r.review.rating || 0),
                          0
                        ) / reviews.length
                      ).toFixed(1)
                    : "No ratings yet"}{" "}
                  <FaStar />
                </span>
                <span className="p-2 text-gray-600">
                  {reviews.length} reviews
                </span>
              </div>
              <p className="md:block top-2 right-2 md:right-10 absolute font-bold text-pink-600">
                ${tutor.hourlyRate} / 50-min lesson
              </p>
            </div>

            <div className="flex flex-col justify-end space-y-2">
              <button
                onClick={handleBooked}
                className="bg-pink-500 hover:bg-pink-600 mt-2 rounded-lg text-white btn btn-sm"
              >
                Book this Tutor
              </button>
              <Link
                to={"/contact"}
                className="text-gray-800 btn btn-sm btn-warning"
              >
                Send message
              </Link>
            </div>
          </div>
          <Link
            to={"/tutor/details"}
            state={{ tutor }}
            className="md:hidden bg-accent w-full text-white btn-accent btn btn-sm"
          >
            View Details
          </Link>
          {/* Delete */}
          {/* {user?.email === tutor?.email && (
            <div
              onClick={() => handleDelete(tutor._id)}
              className="top-3 right-3 absolute text-red-600 text-3xl"
            >
              <button>
                <MdOutlineDeleteForever />
              </button>
            </div>
          )} */}
        </div>

        <div className="md:group-hover:flex hidden group-hover:hidden top-0 -right-4 absolute justify-center items-center bg-gray-100 shadow-lg w-full md:w-2/12 h-full card">
          <div className="flex flex-col items-center gap-2 p-2 card">
            <img
              className="rounded-xl w-full h-32 box"
              src={tutor.imageUrl}
              alt=""
            />
            <Link
              to={"/tutor/details"}
              state={{ tutor }}
              className="btn-outline w-full text-black btn btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
