import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import startedImage from "../assets/startedImage.jpg";
const GetStartedPage = () => {
  const location = useLocation();
  const [language, setLanguage] = useState(location?.state);
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
  const handleLanguageChange = (e) => {
    console.log(e.target.value);
    setLanguage(e.target.value);
  };
  console.log(location);
  return (
    <div
      className="flex justify-center items-center gap-10 space-y-5 mx-auto min-h-screen"
      data-theme="light"
    >
      <div className="space-y-3">
        <h1 className="text-5xl">Find the right tutor for you</h1>
        <p>
          Tell us how you’d like to learn to get a personalized choice of tutors
        </p>
        <div className="flex my-10 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">What do you want to learn?</span>
            </div>
            <div className="flex items-center mb-4 w-full join">
              {/* Language Dropdown */}
              <div className="border w-full join-item">
                {/* <label className="block font-semibold text-gray-700">
                  Language
                </label> */}
                <select
                  name="language"
                  defaultValue={language}
                  onChange={handleLanguageChange}
                  className="p-3 border w-full"
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
              <Link
                to={`/find-tutors/${location.state}`}
                className="btn btn-neutral join-item"
              >
                Get Started
              </Link>
            </div>
          </label>
        </div>
        <Link to={"/find-tutors"} className="py-10 underline">
          Choose from 3000+ Tutors
        </Link>
      </div>
      <div>
        <img className="w-96 h-full" src={startedImage} alt="" />
      </div>
    </div>
  );
};

export default GetStartedPage;
