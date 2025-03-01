import axios from "axios";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TutorCard = ({ tutor, user }) => {
  const navigate = useNavigate();
  // console.log(tutor);
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
        // console.log(res);
        if (res.status == 200) {
          Swal.fire({
            title: "Booked this tutorial!",
            text: "You booked the tutorial!",
            icon: "success",
          });
          navigate(`/booked-tutors/${user.email}`);
        }
      });
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
            `https://tutor-booking-server-olive.vercel.app/tutorials/${id}`
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
      <div className="group relative flex md:flex-row flex-col gap-3 h-auto min-h-44">
        <div className="group relative flex md:flex-row flex-col items-center gap-3 bg-white shadow-lg p-3 py-5 rounded-lg hover:ring-2 w-full md:w-9/12">
          <div className="flex md:flex-row flex-col items-center gap-3 w-8/12">
            <img
              src={tutor?.image}
              alt={tutor?.name}
              className="rounded-full w-32 h-32"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl">{user?.displayName}</h3>
              <h3 className="text-base">{user?.language}</h3>
              <p className="flex items-center gap-1 text-gray-600 text-base">
                <FaLocationDot />
                {tutor.country}
              </p>
              <p>Language: {tutor.language}</p>

              <p className="mt-2 text-gray-700">{tutor.description}</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col justify-center items-center gap-3 md:w-4/12 text-center">
            <div>
              <div className="flex md:flex-row flex-col justify-center items-center gap-3 text-center">
                <span className="flex items-center gap-1 font-bold text-yellow-500">
                  {tutor.rating}
                  <FaStar />
                </span>
                <span className="p-2 border btn-outline text-gray-600 btn btn-sm">
                  {tutor?.review} reviews
                </span>
              </div>
              <p className="font-bold text-pink-600">
                ${tutor.price} / 50-min lesson
              </p>
            </div>
            <div>
              <button
                onClick={handleBooked}
                className="bg-pink-500 hover:bg-pink-600 mt-2 rounded-lg text-white btn btn-sm"
              >
                Book trial lesson
              </button>
              <Link
                to={"/contact"}
                className="text-gray-800 btn btn-sm btn-warning"
              >
                Send message
              </Link>
            </div>
          </div>
          {/* Delete */}
          {user?.email === tutor?.email && (
            <div
              onClick={() => handleDelete(tutor._id)}
              className="top-3 right-3 absolute text-red-600 text-3xl"
            >
              <button>
                <MdOutlineDeleteForever />
              </button>
            </div>
          )}
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

export default TutorCard;
