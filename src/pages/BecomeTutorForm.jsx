import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2"; // Assuming you are using Swal for alerts
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../components/Loading";
const BecomeTutorForm = ({ tutor }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // Initialize form data with location data from state if available
  const [formData, setFormData] = useState({
    language: tutor?.language || [],
    experience: tutor?.experience || "",
    country: tutor?.country || "",
    location: tutor?.location || "", // Pre-fill location
    age: tutor?.age || "",
    description: tutor?.description || "",
    hourlyRate: tutor?.hourlyRate || "",
  });

  const [errors, setErrors] = useState({});

  const languagesList = [
    "English",
    "Bangla",
    "Spanish",
    "Mandarin",
    "Hindi",
    "French",
    "German",
    "Russian",
    "Japanese",
    "Portuguese",
    "Arabic",
    "Korean",
    "Italian",
  ];

  const countriesList = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "India",
    "China",
    "Japan",
    "Brazil",
    "South Korea",
    "Italy",
    "Russia",
    "Mexico",
    "Netherlands",
    "Saudi Arabia",
    "South Africa",
    "Spain",
    "Sweden",
    "Singapore",
    "Bangladesh",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    const selectedLanguages = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, language: selectedLanguages });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.language.length)
      newErrors.language = "At least one language is required.";
    if (!formData.experience) newErrors.experience = "Experience is required.";
    if (!formData.country) newErrors.country = "Country selection is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      return Boolean(new URL(string)); // If valid, it won't throw
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const imageUrl = user?.photoURL || ""; // Fallback to empty string

    if (!isValidUrl(imageUrl)) {
      console.error("Invalid image URL:", imageUrl);
      Swal.fire({
        title: "Invalid Image URL",
        text: "Your profile picture URL is not valid. Please update it.",
        icon: "error",
      });
      return;
    }

    const tutorData = {
      name: user?.displayName,
      email: user?.email,
      imageUrl, // Ensure valid image URL
      ...formData,
      isTutor: false,
    };

    try {
      let response;
      if (tutor)
        response = await axiosPublic.put(
          `/tutors/profileUpdate/${tutor._id}`,
          tutorData
        );
      // If tutor is not provided, create a new one
      else response = await axiosPublic.post("/tutors", tutorData);
      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          title: "Your Application Has been Submitted!",
          text: "Congratulations, your tutorial has been added!",
          icon: "success",
        });
        refetch();
        setFormData({});
      }
    } catch (error) {
      console.error("Error submitting tutor form:", error);
      Swal.fire({
        title: "Submission Failed",
        text: "There was an issue submitting your application. Please try again.",
        icon: "error",
      });
    }
  };

  const {
    isPending,
    isLoading,
    error,
    data: isSubmitted = false,
    refetch,
  } = useQuery({
    queryKey: ["isSubmittedForm"],
    queryFn: async () => {
      // console.log(user.email);
      const response = await axiosPublic.get(`/tutors/email/${user.email}`);

      // console.log(response.data);
      if (response.data?.email) {
        // refetch();
        // console.log(response);
        return true;
      }
    },
  });

  if (isLoading) return <Loading />;
  // verify that is tutor
  if (isSubmitted && !tutor)
    return (
      <div className="flex justify-center items-center w-full h-screen text-center">
        <h1>
          Your Application has been submitted. Please Wait for Response{" "}
          {/* <span
            onClick={handleSubmitAnother}
            className="font-bold text-blue-600 underline cursor-pointer"
          >
            Submit Another Applicaiton?
          </span> */}
        </h1>
      </div>
    );
  return (
    <div
      className={`shadow-lg mx-auto ${
        tutor ? "mt-5" : "mt-20"
      }  p-2 md:p-8 rounded-lg w-11/12 md:w-10/12 max-w-3xl`}
    >
      <h2 className="mb-6 font-bold text-3xl">Become a Tutor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Readonly Fields */}
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="bg-gray-100 p-2 border rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="bg-gray-100 p-2 border rounded-lg w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Profile Image:</label>
          <img
            src={user?.photoURL}
            alt="Tutor"
            className="rounded-full w-20 h-20"
          />
        </div>

        {/* Select Language */}
        <div>
          <label className="flex items-center font-semibold">
            Languages You Teach:{" "}
            <FaStar className="ml-1 text-red-500 text-xs" />
          </label>
          <select
            name="language"
            onChange={handleMultiSelect}
            className="p-2 border rounded-lg w-full"
            value={formData.language}
          >
            <option key={"Select a language"} value={"Select a language"}>
              Select a language
            </option>
            {languagesList.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="text-red-500 text-sm">{errors.language}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="flex items-center font-semibold">
            Years of Experience:{" "}
            <FaStar className="ml-1 text-red-500 text-xs" />
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
            placeholder="Enter years of teaching experience"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience}</p>
          )}
        </div>

        {/* Country Dropdown */}
        <div>
          <label className="flex items-center font-semibold">
            Country: <FaStar className="ml-1 text-red-500 text-xs" />
          </label>
          <select
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">Select Your Country</option>
            {countriesList.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        {/* Location (City) - No Star */}
        <div>
          <label className="block font-semibold">Location (City, State):</label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
            placeholder="Enter your location"
          />
        </div>

        {/* Age */}
        <div>
          <label className="flex items-center font-semibold">
            Age: <FaStar className="ml-1 text-red-500 text-xs" />
          </label>
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
            placeholder="Enter your age"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        {/* Hourly Rate */}
        <div>
          <label className="flex items-center font-semibold">
            Hourly Rate ($): <FaStar className="ml-1 text-red-500 text-xs" />
          </label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
            placeholder="Your rate per hour"
          />
          {errors.hourlyRate && (
            <p className="text-red-500 text-sm">{errors.hourlyRate}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center font-semibold">
            About You: <FaStar className="ml-1 text-red-500 text-xs" />
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full"
            rows="4"
            placeholder="Write something about yourself..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg focus:outline-none w-full text-white"
        >
          {tutor ? "Update" : "Submit"} Application
        </button>
      </form>
    </div>
  );
};

export default BecomeTutorForm;
