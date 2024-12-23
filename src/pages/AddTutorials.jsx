import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const AddTutorials = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  // State to handle form data

  const [formData, setFormData] = useState({
    image: "",
    language: "",
    price: "",
    description: "",
    review: 0, // Default review
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      name: user.name,
      email: user.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tutorials",
        dataToSubmit
      );
      if (response.status === 201) {
        alert("Tutorial added successfully!");
        setFormData({
          image: "",
          language: "",
          price: "",
          description: "",
          review: "",
        });
      }
    } catch (error) {
      console.error("Error saving tutorial:", error);
      alert("Failed to save tutorial.");
    }
  };

  // Popular languages
  const languages = [
    "English",
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

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-100 to-slate-200 mx-auto mt-28 py-10 min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-lg w-7/12">
        <h1 className="mb-6 font-bold text-3xl text-center text-gray-800">
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
              className="border-gray-300 bg-gray-100 p-3 border rounded-lg w-full text-gray-600"
            />
          </div>

          {/* Email (Read-only) */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="border-gray-300 bg-gray-100 p-3 border rounded-lg w-full text-gray-600"
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
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
              required
            />
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
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
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
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
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
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
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
              className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 hover:from-green-500 to-blue-500 hover:to-blue-600 py-3 rounded-lg w-full font-bold text-white transition duration-300"
          >
            Submit Tutorial
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTutorials;
