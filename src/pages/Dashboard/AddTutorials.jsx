import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddTutorials = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location.state.tutorial);
  // State to handle form data
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [rating, setRating] = useState(0);

  const [formData, setFormData] = useState({
    image: "",
    language: "",
    price: "",
    description: "",
    review: 0,
    rating: rating,
    country: "", // Default review
  });
  const countries = [
    "United States",
    "India",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
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
  ];
  // Popular languages
  const languages = [
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
    "Turkish",
    "Dutch",
    "Swedish",
    "Polish",
    "Greek",
    "Czech",
    "Hebrew",
    "Danish",
  ];

  const handleRatingChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      name: user.displayName,
      email: user.email,
      ...formData,
    };
    // console.log(dataToSubmit);
    try {
      const response = await axiosPublic.post("/add-tutorials", dataToSubmit);
      // console.log(response);
      if (response.status === 200) {
        // alert("Tutorial added successfully!");
        setFormData({
          image: "",
          language: "",
          price: "",
          description: "",
          review: "",
          rating: rating,
          country: "",
        });
        Swal.fire({
          title: "One Tutorial Added !",
          text: "Congratulation one tutorial added!",
          icon: "success",
        });
        // navigate(`/myTutorials/${user.email}`);
      }
    } catch (error) {
      console.error("Error saving tutorial:", error);
      alert("Failed to save tutorial.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-100 to-slate-200 mx-auto min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-lg w-11/12 md:w-10/12">
        <h1 className="mb-6 font-bold text-gray-800 text-3xl text-center">
          Add Your Tutorial
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name (Read-only) */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="bg-gray-100 p-3 border border-gray-300 rounded-lg w-full text-gray-600"
            />
          </div>

          {/* Email (Read-only) */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="bg-gray-100 p-3 border border-gray-300 rounded-lg w-full text-gray-600"
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter tutorial image URL"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
          </div>
          {/* Country Select */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Rating System */}
          <div>
            <label className="block mb-2 font-medium text-gray-600">
              Rate Us
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => handleRatingChange(value)}
                  className={`w-10 h-10 text-white font-bold rounded-full focus:outline-none ${
                    formData.rating >= value ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            >
              <option value="" disabled>
                Select a language
              </option>
              {languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter tutorial description"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Review  */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Review</label>
            <input
              type="number"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Enter Review"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
              readOnly={location.state ? true : false}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 hover:from-green-500 to-blue-500 hover:to-blue-600 py-3 rounded-lg w-full font-bold text-white transition duration-300"
          >
            {location.state ? "Update Tutorial" : "Submit Tutorial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTutorials;
