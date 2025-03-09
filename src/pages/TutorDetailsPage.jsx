import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import ReviewModal from "../components/ReviewModal";
import { useQuery } from "@tanstack/react-query";

const TutorDetailsPage = () => {
  const { user } = useContext(AuthContext);
  // console.log(user.photoURL);
  const location = useLocation();
  const navigate = useNavigate();
  const getTutor = location.state?.tutor || location.state?.tutors; // Destructure the passed tutor object
  const [tutor, setTutors] = useState(getTutor);
  const [tutorials, setTutorials] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get(`/tutorials/email/${tutor?.email}`)
      .then((response) => setTutorials(response.data));
  }, []);
  const handleBooked = () => {
    const bookedTutor = {
      tutorId: tutor?._id,
      image: tutor?.imageUrl,
      language: tutor?.language,
      price: tutor?.price,
      country: tutor?.country,
      review: tutor?.review,
      tutorEmail: tutor?.email,
      email: user?.email,
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
  // console.log(tutor);
  const extractYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };
  if (!tutor) {
    return <p className="mt-28 text-red-500">No tutor data available.</p>;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isPending,
    isLoading,
    error,
    data: reviews = [],
    refetch,
  } = useQuery({
    queryKey: ["Reviews", tutor?.email], // Ensures query updates when email changes
    queryFn: async () => {
      // if (!user?.email) return []; // Avoid running query when user is undefined
      const response = await axiosPublic.get(`/review/${tutor?.email}`);
      // console.log(response.data);
      return response?.data || [];
    },
  });
  const handleReviewSubmit = (review) => {
    console.log("Submitted Review:", review);
    // Here you can send the review to your API
    const reviewData = {
      name: user?.displayName,
      reviewerEmail: user?.email,
      image: user?.photoURL,
      review: review,
      tutorEmail: tutor?.email,
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

  return (
    <div className="bg-white shadow-md mx-auto my-5 mt-28 p-6 rounded-lg max-w-4xl">
      <div className="flex md:flex-row flex-col items-start md:items-center md:space-x-6 space-y-4 md:space-y-0">
        {/* Tutor Image */}
        <div className="flex-shrink-0">
          <img
            src={tutor.imageUrl || "https://via.placeholder.com/150"}
            alt={tutor.name}
            className="border border-gray-300 rounded-full w-32 h-32"
          />
        </div>

        {/* Tutor Information */}
        <div className="flex-1">
          <h2 className="font-bold text-2xl">{tutor.name}</h2>
          <p className="text-gray-500 text-sm">
            {tutor?.language || 0} language
          </p>
          <p className="mt-1 text-gray-600">
            {tutor?.description ||
              "Qualified tutor with years of experience helping students excel."}
          </p>
          <div className="flex sm:flex-row flex-col sm:items-center sm:space-x-4 mt-4">
            <p className="text-gray-500 text-sm">
              🌟 {reviews.length || 0} reviews
            </p>
            <p className="text-gray-500 text-sm">
              📚 {tutorials.length || 0} lessons
            </p>
            <p className="text-gray-500 text-sm">
              💲 {tutor.hourlyRate || 0} / 50-min lesson
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
        <p>
          Mail: <span className="text-blue-600 underline">{tutor.email}</span>
        </p>
      </div>
      {/* Actions Section */}
      <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
        <Link to="/contact" className="flex items-center gap-3 btn-outline btn">
          <FaMessage />
          Send message
        </Link>
        <div className="">
          <button
            className="w-full text-white btn btn-info"
            onClick={() => setIsModalOpen(true)}
          >
            <FaEdit />
            Leave a Review
          </button>

          <ReviewModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleReviewSubmit}
          />
        </div>
        <button
          onClick={handleBooked}
          className="rounded-lg btn btn-sm md:btn-md btn-warning"
        >
          Book This Tutor
        </button>
      </div>
      {/* Super Popular Badge */}
      <div className="my-5 font-semibold text-pink-600 text-sm">
        🔥 Super popular: 9 new contacts and 1 lesson booking in the last 48
        hours
      </div>
      {/* tutorials  */}
      <h1 className="my-5 font-bold text-2xl">Tutorials</h1>
      {tutorials.length == 0 && (
        <h1 className="underline">No Tutorials by {tutor.email}</h1>
      )}
      {tutorials.map((tutorial) => (
        <div
          key={tutorial._id}
          className="bg-white shadow-lg mb-4 p-4 border border-gray-200 rounded-lg"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="mb-2 font-semibold text-xl">{tutorial.title}</h2>
              <p className="text-gray-600">{tutorial.description}</p>
              <p className="mt-1 font-medium text-gray-700">
                Language: {tutorial.language}
              </p>
              <p className="font-semibold text-green-600">
                Price: ${tutorial.price}
              </p>
            </div>
          </div>

          {/* Embed YouTube Video */}
          {tutorial.videoUrl && (
            <div className="mt-3">
              <iframe
                className="border rounded-lg w-full h-96"
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  tutorial.videoUrl
                )}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TutorDetailsPage;
