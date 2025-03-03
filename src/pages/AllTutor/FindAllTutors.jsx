import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import TutorCard from "./TutorCard";
import Loading from "../../components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FindAllTutors = () => {
  const [tutors, setTutors] = useState([]);
  const { user } = useContext(AuthContext);
  const lan = useParams();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axiosPublic.get("/tutors");

        const data = await res.data;
        // console.log(data);
        setTutors(data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
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
    const tutorPrice = parseInt(tutor.hourlyRate, 10);
    return (
      (language === "" ||
        tutor.languages.some(
          (lang) => lang.toLowerCase() === language.toLowerCase()
        )) &&
      (country === "" ||
        tutor.country?.toLowerCase() === country.toLowerCase()) &&
      !isNaN(tutorPrice) &&
      tutorPrice <= parseInt(maxPrice, 10) &&
      (keyword === "" ||
        tutor.name.toLowerCase().includes(keyword.toLowerCase()) ||
        tutor.country?.toLowerCase().includes(keyword.toLowerCase()) ||
        tutor.languages.some((lang) =>
          lang.toLowerCase().includes(keyword.toLowerCase())
        ))
    );
  });

  // console.log(filteredTutors);
  return (
    <div className="mx-auto mt-28 md:p-8 w-11/12 md:w-10/12 min-h-screen">
      {loading ? (
        <div className="-mt-28 font-semibold text-blue-500 text-lg text-center">
          <Loading />
        </div>
      ) : tutors.length === 0 ? (
        <h2 className="mb-4 font-semibold text-xl">No tutors Available</h2>
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
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
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
                <option value="">Select a Country</option>
                {countries.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
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
