import axios from "axios";
import React, { useContext, useState } from "react";
import { FaCross } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDeleteForever } from "react-icons/md";

const MyBookedtutorsCard = ({ tutor, user }) => {
  // const { user } = useContext(AuthContext);
  // const location = useLocation();
  // const gettutors = location.state?.tutors; // Destructure the passed tutors object
  // console.log(tutor);
  const [tutors, setTutors] = useState(tutor);
  // const [updateReview, setUpdateReview] = useState(tutors?.review);
  const handleReview = async () => {
    // console.log("booke tutors card review");
    // console.log(tutors);
    // setUpdateReview(232);

    const reviewId = { reviewId: tutors._id };
    setTutors((prevtutorss) => ({
      ...prevtutorss,
      review: tutors.review + 1,
    }));
    const response = await axios
      .post(
        `https://tutor-booking-server-olive.vercel.app/review/${tutors?.tutorId}`,
        reviewId
      )
      .then((response) => console.log(response));
    setTutors((prevtutorss) => ({
      ...prevtutorss,
      review: tutors.review + 1,
    }));
    // console.log(response);
    // Update the UI after the review count is updated
    if (response.status === 200) {
      setTutors((prevtutorss) => ({
        ...prevtutorss,
        review: tutors.review + 1,
      }));
      console.log(tutors.review, typeof tutors.review);
      Swal.fire({
        title: "One tutorsial Booked!",
        text: "Do you want to continue",
        icon: "success",
        confirmButtonText: "ok",
      });
    }
    // } catch (error) {
    //   console.log(error.response);
    // }
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios
          .delete(
            `https://tutor-booking-server-olive.vercel.app/remove-booked-tutorials/${id}`
          )
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
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
          <div className="flex flex-row md:flex-col justify-center items-center gap-2 w-4/12 text-center">
            <div>
              <div className="flex justify-center items-center md:gap-3 text-center">
                {/* <span className="flex items-center gap-1 font-bold text-yellow-500">
                  {tutors.rating}
                  <FaStar />
                </span> */}
                <span className="md:px-6 border btn btn-info btn-sm">
                  {tutors.review} reviews
                </span>
              </div>
            </div>
            <button
              onClick={handleReview}
              className="md:px-6 md:py-2 border rounded-lg text-gray-600 btn btn-sm btn-warning"
            >
              Add Review
            </button>
            <Link
              to={"/contact"}
              className="btn-outline text-gray-800 btn btn-sm"
            >
              Send message
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
        <div className="group-hover:flex hidden top-0 -right-4 absolute justify-center items-center bg-white shadow-lg w-full md:w-3/12 h-full card">
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
