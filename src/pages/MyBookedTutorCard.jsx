import axios from "axios";
import React, { useContext, useState } from "react";
import { FaCross, FaEdit } from "react-icons/fa";
import { FaLocationDot, FaMessage } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDeleteForever } from "react-icons/md";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "../components/ReviewModal";

const MyBookedtutorsCard = ({ tutor, user, handleDelete }) => {
  const [tutors, setTutors] = useState(tutor);

  const axiosPublic = useAxiosPublic();
  console.log(tutors);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewSubmit = (review) => {
    console.log("Submitted Review:", review);
    // Here you can send the review to your API
    const reviewData = {
      name: user.displayName,
      reviewerEmail: user.email,
      image: user?.photoURL,
      review: review,
      tutorEmail: tutor.email,
    };
    axiosPublic.post("/review", reviewData).then((res) => {
      // console.log(res);
      refetch();
      Swal.fire({
        title: "One Review Added !",
        text: "Congratulation one Review added!",
        icon: "success",
      });
    });
  };
  const {
    isPending,
    isLoading,
    error,
    data: reviews = [],
    refetch,
  } = useQuery({
    queryKey: ["BookedReviews", tutor.tutorEmail], // Unique key per tutor
    queryFn: async () => {
      // if (!user?.email) return []; // Avoid running query when user is undefined
      const response = await axiosPublic.get(`/review/${tutor.tutorEmail}`);
      console.log(response.data);
      return response?.data || [];
    },
  });

  return (
    <div>
      <div className="group relative flex md:flex-row flex-col gap-5 h-auto min-h-44">
        <div className="group relative flex md:flex-row flex-col items-center gap-5 shadow-lg p-3 py-5 rounded-lg hover:ring-2 md:w-9/12">
          <div className="flex md:flex-row flex-col items-center gap-3 w-8/12">
            <img
              src={tutors?.image}
              alt={tutors?.name}
              className="rounded-full w-32 h-32"
            />
            <div className="">
              <h3 className="font-bold text-xl">{user?.displayName}</h3>
              <h3 className="text-base">{user?.language}</h3>
              <p className="flex items-center gap-1 text-gray-600 text-base">
                <FaLocationDot />
                {tutors.country}
              </p>
              <p>Language: {tutors.language}</p>
              <p className="font-bold text-pink-600">
                ${tutors.price} / 50-min lesson
              </p>

              <p className="mt-2 text-gray-700">{tutors.description}</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col justify-center items-center gap-2 w-full md:w-4/12 text-center">
            <div>
              <div className="flex justify-center items-center md:gap-3 text-center">
                {/* <span className="flex items-center gap-1 font-bold text-yellow-500">
                  {tutors.rating}
                  <FaStar />
                </span> */}
                <span className="p-1 md:px-6 border rounded-xl">
                  {reviews.length} reviews
                </span>
              </div>
            </div>
            <div className="">
              <button
                className="flex justify-center items-center text-white btn btn-sm btn-info"
                onClick={() => setIsModalOpen(true)}
              >
                <FaEdit />
                Add Review
              </button>

              <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleReviewSubmit}
              />
            </div>
            <Link
              to={"/contact"}
              className="btn-outline text-gray-800 btn btn-sm"
            >
              <FaMessage /> Send message
            </Link>
          </div>

          {/* Delete */}
          <div
            onClick={() => handleDelete(tutors._id)}
            className="top-3 right-3 absolute text-red-600 text-3xl"
          >
            <button>
              <MdOutlineDeleteForever />
            </button>
          </div>
        </div>
        <div className="group-hover:flex !hidden top-0 -right-4 absolute justify-center items-center bg-white shadow-lg w-full md:w-3/12 h-full card">
          <div className="flex flex-col items-center gap-2 p-2 card">
            <img
              className="rounded-xl w-full h-32 box"
              src={tutor.image}
              alt=""
            />
            <Link
              to={"/tutor/details"}
              state={{ tutor }}
              className="btn-outline w-full btn btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookedtutorsCard;
