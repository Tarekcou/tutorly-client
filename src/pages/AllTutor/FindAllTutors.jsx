import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
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
  const [language, setLanguage] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [country, setCountry] = useState("");
  const [keyword, setKeyword] = useState("");
  const lan = useParams();
  // console.log(lan);
  const axiosPublic = useAxiosPublic();
  const {
    isPending,
    isLoading,
    error,
    data: tutors = [],
    refetch,
  } = useQuery({
    queryKey: ["FindTutors"], // Ensures query updates when email changes
    queryFn: async () => {
      try {
        let res;
        if (lan?.language)
          res = await axiosPublic.get(`/tutors/${lan.language}`);
        else res = await axiosPublic.get("/tutors");

        const data = await res.data;
        // console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    },
  });

  const filteredTutors = tutors.filter((tutor) => {
    const tutorPrice = parseInt(tutor.hourlyRate, 10);
    return (
      (language === "" ||
        tutor.language.toLowerCase() === language.toLowerCase()) &&
      (country === "" ||
        tutor.country?.toLowerCase() === country.toLowerCase()) &&
      !isNaN(tutorPrice) &&
      tutorPrice <= parseInt(maxPrice, 10) &&
      (keyword === "" ||
        tutor.name.toLowerCase().includes(keyword.toLowerCase()) ||
        tutor.country?.toLowerCase().includes(keyword.toLowerCase()) ||
        tutor.language.includes(keyword.toLowerCase()))
    );
  });

  const handleLanguageChange = async (language) => {
    try {
      setLanguage(language);
      let res;

      res = await axiosPublic.get(`/tutors/${language}`);

      refetch();
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
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
        const response = await axiosPublic
          .delete(`/tutors/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  // console.log(filteredTutors);
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
                onChange={(e) => {
                  lan.language
                    ? handleLanguageChange(e.target.value)
                    : setLanguage(e.target.value);
                }}
                className="p-2 border rounded-lg w-full"
              >
                <option value="">Select a Language</option>{" "}
                {/* ✅ Added this line */}
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
              <div>
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
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FindAllTutors;
