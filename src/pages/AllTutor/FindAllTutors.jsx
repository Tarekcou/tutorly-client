import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import TutorCard from "./TutorCard";
import Loading from "../../components/Loading";

const FindAllTutors = () => {
  const tutors = useLoaderData();
  const { user } = useContext(AuthContext);
  const lan = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request (remove this if useLoaderData() already handles loading)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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

  const [language, setLanguage] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [country, setCountry] = useState("");
  const [keyword, setKeyword] = useState("");

  const filteredTutors = tutors.filter((tutor) => {
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
    <div className="mx-auto mt-28 p-8 w-11/12 md:w-10/12 min-h-screen">
      {loading ? (
        // Show Loading State
        <div className="-mt-28 font-semibold text-blue-500 text-lg text-center">
          <Loading />
        </div>
      ) : (
        <>
          <h1 className="mb-8 font-bold text-3xl">
            Online tutors & teachers for private lessons
          </h1>
          {/* Filters Section */}
          <div className="flex md:flex-row flex-col flex-wrap gap-4 mb-8">
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

            <div className="flex-1">
              <label className="block text-gray-700">Search:</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by name, country, language"
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
        </>
      )}
    </div>
  );
};

export default FindAllTutors;
