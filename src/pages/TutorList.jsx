import React, { useState } from "react";

const TutorList = () => {
  // Sample Data for Tutors
  const tutors = [
    {
      id: 1,
      name: "Sid B.",
      country: "United Kingdom",
      price: 24,
      rating: 5,
      reviews: 1,
      description:
        "Qualified UK primary teacher with TEFL certificate and more than 6 years teaching experience.",
      language: "English",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Jane D.",
      country: "United States",
      price: 30,
      rating: 4.8,
      reviews: 10,
      description:
        "Experienced English tutor with a passion for helping students achieve their goals.",
      language: "English",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Carlos M.",
      country: "Spain",
      price: 18,
      rating: 4.9,
      reviews: 25,
      description:
        "Spanish tutor with 5 years of experience in teaching conversational Spanish.",
      language: "Spanish",
      image: "https://via.placeholder.com/100",
    },
  ];

  // Filter States
  const [language, setLanguage] = useState("");
  const [maxPrice, setMaxPrice] = useState(50);
  const [country, setCountry] = useState("");
  const [keyword, setKeyword] = useState("");

  // Filtered Tutors
  const filteredTutors = tutors.filter((tutor) => {
    return (
      (language === "" || tutor.language === language) &&
      (country === "" || tutor.country === country) &&
      tutor.price <= maxPrice &&
      (keyword === "" ||
        tutor.name.toLowerCase().includes(keyword.toLowerCase()) ||
        tutor.description.toLowerCase().includes(keyword.toLowerCase()))
    );
  });

  return (
    <div className="bg-gray-100 mt-28 p-8 min-h-screen">
      <h1 className="mb-8 font-bold text-3xl">
        Online English tutors & teachers for private lessons
      </h1>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Language Filter */}
        <div className="flex-1">
          <label className="block text-gray-700">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded-lg w-full"
          >
            <option value="">Any</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex-1">
          <label className="block text-gray-700">Price (Max):</label>
          <input
            type="range"
            min="1"
            max="50"
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
            <option value="">Any</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Spain">Spain</option>
          </select>
        </div>

        {/* Search by Keyword or Name */}
        <div className="flex-1">
          <label className="block text-gray-700">Search:</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by name or keyword"
            className="p-2 border rounded-lg w-full"
          />
        </div>
      </div>

      {/* Tutor List Section */}
      <h2 className="mb-4 font-semibold text-xl">
        {filteredTutors.length} tutor(s) match your needs
      </h2>
      <div>
        <div className="flex flex-col gap-5 w-9/12">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="flex gap-4 bg-white shadow-lg p-4 rounded-lg"
            >
              <div className="w-9/12">
                <div className="flex">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="mr-4 rounded-full w-24 h-24"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{tutor.name}</h3>
                    <p className="text-gray-600">{tutor.country}</p>
                    <div className="flex items-center">
                      <span className="font-bold text-yellow-500">
                        {tutor.rating}
                      </span>
                      <span className="ml-2 text-gray-600">
                        {tutor.reviews} reviews
                      </span>
                    </div>
                    <p className="mt-2 font-bold text-pink-600">
                      ${tutor.price} / 50-min lesson
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{tutor.description}</p>
              </div>
              <div className="flex flex-col justify-between items-center mt-auto w-3/12">
                <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-white">
                  Book trial lesson
                </button>
                <button className="text-gray-800 underline">
                  Send message
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-3/12"></div>
      </div>
    </div>
  );
};

export default TutorList;
