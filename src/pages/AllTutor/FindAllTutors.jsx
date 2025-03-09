import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import TutorCard from "./TutorCard";
import Loading from "../../components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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

const FindAllTutors = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { language: paramLanguage } = useParams(); // Get language from URL params

  const [language, setLanguage] = useState(paramLanguage || ""); // Ensure initial state from params
  const [maxPrice, setMaxPrice] = useState(500);
  const [country, setCountry] = useState("");
  const [keyword, setKeyword] = useState("");

  // Fetch tutors based on selected language
  const {
    isLoading,
    data: tutors = [],
    refetch,
  } = useQuery({
    queryKey: ["FindTutors", language], // Re-fetch when language changes
    queryFn: async () => {
      try {
        const res = language
          ? await axiosPublic.get(`/tutors/${language}`)
          : await axiosPublic.get("/tutors");
        // console.log(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching tutors:", error);
        return [];
      }
    },
    enabled: true, // Ensures query runs immediately
  });

  // Update tutors when language changes
  useEffect(() => {
    if (language) {
      refetch();
    }
  }, [language, refetch]);

  // Filter tutors based on user selections
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const tutorPrice = parseInt(tutor.hourlyRate, 10);
      console.log(tutor);
      return (
        (language === "" ||
          (tutor.language &&
            typeof tutor.language === "string" &&
            tutor.language.toLowerCase() === language.toLowerCase())) &&
        (country === "" ||
          (tutor.country &&
            typeof tutor.country === "string" &&
            tutor.country.toLowerCase() === country.toLowerCase())) &&
        !isNaN(tutorPrice) &&
        tutorPrice <= parseInt(maxPrice, 10) &&
        (keyword === "" ||
          tutor.name.toLowerCase().includes(keyword.toLowerCase()) ||
          tutor.country.toLowerCase().includes(keyword.toLowerCase()) ||
          tutor.language.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
  }, [tutors, language, country, maxPrice, keyword]); // Dependencies

  console.log(filteredTutors);
  // Handle language selection
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage); // Update state first
    // refetch(); // Explicitly refetch to ensure data update
  };

  // Handle tutor deletion
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
        try {
          const response = await axiosPublic.delete(`/tutors/${id}`);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your tutor has been deleted.", "success");
            refetch(); // Refresh tutors after deletion
          }
        } catch (error) {
          console.error("Error deleting tutor:", error);
        }
      }
    });
  };

  return (
    <div className="mx-auto my-5 mt-28 md:p-8 w-11/12 md:w-10/12 min-h-screen">
      {isLoading ? (
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
              <label className="block">Language:</label>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="p-2 border rounded-lg w-full"
              >
                <option value="">Select a Language</option>
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block">Price (Max):</label>
              <input
                type="range"
                min="1"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full"
              />
              <span className="block mt-2">${maxPrice}</span>
            </div>

            <div className="flex-1">
              <label className="block">Country:</label>
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
              <label className="block">Search:</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by name, country, language"
                className="p-2 border rounded-lg w-full"
              />
            </div>
          </div>

          {tutors.length === 0 ? (
            <h2 className="mb-4 font-semibold text-xl">No tutors Available</h2>
          ) : (
            <>
              {/* Tutor List Section */}
              <h2 className="mb-4 font-semibold text-xl">
                {filteredTutors.length} tutor(s) match your needs
              </h2>
              <div className="flex flex-col gap-5">
                {filteredTutors.map((tutor) => (
                  <TutorCard
                    key={tutor._id}
                    tutor={tutor}
                    user={user}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FindAllTutors;
