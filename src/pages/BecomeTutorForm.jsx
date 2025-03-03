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
  const [isSubmitted, setIsSubmitted] = useState(false);
  // console.log(tutor);
  // const location = useLocation();
  // console.log(location.state?.tutor); // Check if tutor data exists

  // Initialize form data with location data from state if available
  const [formData, setFormData] = useState({
    languages: tutor?.languages || [],
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
    setFormData({ ...formData, languages: selectedLanguages });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.languages.length)
      newErrors.languages = "At least one language is required.";
    if (!formData.experience) newErrors.experience = "Experience is required.";
    if (!formData.country) newErrors.country = "Country selection is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const tutorData = {
      name: user?.displayName,
      email: user?.email,
      imageUrl: user?.photoURL,
      ...formData,
      isTutor: false,
    };
    // console.log(tutorData);
    const { isPending, error, data, refetch } = useQuery({
      queryKey: ["becomeTutorForm"],
      queryFn: async () => {
        const response = await axiosPublic.post("/tutors", tutorData);

        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            title: "Your Application Has been Submitted!",
            text: "Congratulations, your tutorial has been added!",
            icon: "success",
          });
          refetch();
          setFormData({});
          setIsSubmitted(true);
        }
      },
    });
  };

  const { isPending, isLoading, error, data, refetch } = useQuery({
    queryKey: ["isSubmittedForm"],
    queryFn: async () => {
      const response = await axiosPublic.get("/tutors");

      console.log(response);
      if (response.status === 200) {
        setIsSubmitted(true);
      }
    },
  });
  if (isLoading) return <Loading />;
  // verify that is tutor
  if (isSubmitted)
    return (
      <div className="flex justify-center items-center w-full h-screen text-center">
        <h1>Your Application has been submitted. Please Wait for Response</h1>
      </div>
    );
  return (
    <div className="bg-white shadow-lg mx-auto mt-16 p-8 rounded-lg max-w-3xl">
      <h2 className="mb-6 font-bold text-2xl">Become a Tutor</h2>
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
            multiple
            name="languages"
            onChange={handleMultiSelect}
            className="p-2 border rounded-lg w-full"
            value={formData.languages}
          >
            {languagesList.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {errors.languages && (
            <p className="text-red-500 text-sm">{errors.languages}</p>
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
          className="bg-blue-500 hover:bg-blue-600 py-2 rounded-lg w-full text-white"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BecomeTutorForm;
