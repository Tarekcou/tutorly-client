import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import TutorCard from "./TutorCard";

const FindAllTutors = () => {
  // Sample Data for Tutors
  const tutors = useLoaderData();
  const { user } = useContext(AuthContext);
  const lan = useParams();
  // console.log(lan);
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
  // Filter States
  const [language, setLanguage] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [country, setCountry] = useState("");
  const [keyword, setKeyword] = useState("");
  // Filtered Tutors
  const filteredTutors = tutors.filter((tutor) => {
    // console.log(language, tutor.language);

    return (
      language === "" ||
      (tutor.language === language &&
        (country === "" || tutor.country === country) &&
        parseInt(tutor.price) <= parseInt(maxPrice) &&
        (keyword === "" ||
          user.displayName.toLowerCase().includes(keyword.toLowerCase()) ||
          tutor.country.toLowerCase().includes(keyword.toLowerCase()) ||
          tutor.language.toLowerCase().includes(keyword.toLowerCase())))
    );
  });

  return (
    <div className="bg-gray-100 mt-28 p-8 min-h-screen">
      <h1 className="mb-8 font-bold text-3xl">
        Online English tutors & teachers for private lessons
      </h1>

      {/* Filters Section */}
      <div className="flex md:flex-row flex-col flex-wrap gap-4 mb-8">
        {/* Language Filter */}
        <div className="flex-1">
          <label className="block text-gray-700">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded-lg w-full"
          >
            {languages.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex-1">
          <label className="block text-gray-700">Price (Max):</label>
          <input
            type="range"
            min="1"
            max="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full"
          />
          <span className="block mt-2 text-gray-700">${maxPrice}</span>
        </div>

        {/* Country Filter */}
        <div className="flex-1">
          <label className="block text-gray-700">Country:</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">Select a Language</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Search by Keyword or Name */}
        <div className="flex-1">
          <label className="block text-gray-700">Search:</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by name ,country, language"
            className="p-2 border rounded-lg w-full"
          />
        </div>
      </div>

      {/* Tutor List Section */}
      <h2 className="mb-4 font-semibold text-xl">
        {filteredTutors.length} tutor(s) match your needs
      </h2>
      <div>
        <div className="flex flex-col gap-5">
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindAllTutors;
