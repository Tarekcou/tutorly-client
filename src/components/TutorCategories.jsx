import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TutorCategories = () => {
  const categories = [
    { name: "English tutors", count: "82 teachers", icon: "🕰️" },
    { name: "Spanish tutors", count: "51 teachers", icon: "⛪" },
    { name: "French tutors", count: "77 teachers", icon: "🗼" },
    { name: "German tutors", count: "17 teachers", icon: "🏛️" },
    { name: "Italian tutors", count: "22 teachers", icon: "🏯" },
    { name: "Chinese tutors", count: "40 teachers", icon: "🏰" },
    { name: "Arabic tutors", count: "35 teachers", icon: "🕌" },
    { name: "Japanese tutors", count: "25 teachers", icon: "⛩️" },
    { name: "Portuguese tutors", count: "16 teachers", icon: "🌉" },
  ];

  return (
    <div className="mx-auto py-8 w-11/12">
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            to={"/find-tutors/get-started"}
            state={category.name.split(" ")[0]}
            // to={"/find-tutors/" + category.name.split(" ")[0]}
            key={index}
            className="flex justify-between items-center hover:shadow-lg p-4 border rounded-lg transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-center">
              <div className="mr-4 text-3xl">{category.icon}</div>
              <div>
                <h2 className="font-semibold text-lg">{category.name}</h2>
                <p className="text-gray-500 text-sm">{category.count}</p>
              </div>
            </div>
            <div className="text-gray-400 text-xl">
              <FaChevronRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TutorCategories;
