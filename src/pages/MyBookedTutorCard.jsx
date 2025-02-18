import axios from "axios";
import React, { useContext, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const MyBookedtutorsCard = ({ tutor, user }) => {
  // const { user } = useContext(AuthContext);
  // const location = useLocation();
  // const gettutors = location.state?.tutors; // Destructure the passed tutors object
  console.log(tutor);
  const [tutors, setTutors] = useState(tutor);
  // const [updateReview, setUpdateReview] = useState(tutors?.review);
  const handleReview = async () => {
    console.log("booke tutors card review");
    console.log(tutors);
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
    console.log(response);
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
  console.log(tutors._id);
  return (
    <div>
      <div className="relative flex md:flex-row flex-col gap-5 h-auto min-h-44 group">
        <div className="flex md:flex-row flex-col items-center gap-3 bg-white shadow-lg py-5 p-3 rounded-lg hover:ring-2 md:w-9/12 group">
          <div className="flex md:flex-row flex-col items-center gap-3 w-8/12">
            <img
              src={tutors?.image}
              alt={tutors?.name}
              className="rounded-full w-32 h-32"
            />
            <div className="">
              <h3 className="font-bold text-xl">{user?.displayName}</h3>
              <h3 className="text-base">{user?.language}</h3>
              <p className="flex items-center gap-1 text-base text-gray-600">
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
            <button className="text-gray-800 btn btn-outline btn-sm">
              Send message
            </button>
          </div>
        </div>
        <div className="group-hover:flex md:top-0 md:right-0 md:absolute justify-center items-center hidden bg-white shadow-lg mx-auto w-10/12 md:w-3/12 h-full card">
          <div className="flex flex-col items-center gap-2 p-2 card">
            <img
              className="rounded-xl w-full h-32 box"
              src={tutors.image}
              alt=""
            />
            <Link
              to={"/tutor/details"}
              state={{ tutors }}
              className="w-full btn btn-outline btn-sm"
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
