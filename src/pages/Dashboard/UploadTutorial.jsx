import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const countries = [
  "United States",
  "Bangladesh",
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

export default function UploadTutorial({ updateTutorial }) {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [tutorial, setTutorial] = useState({
    name: user.displayName, // Example static name
    email: user.email, // Example static email
    title: updateTutorial?.title || "",
    description: updateTutorial?.description || "",
    language: updateTutorial?.language || "",
    country: updateTutorial?.country || "",
    price: updateTutorial?.price || "",
    videoUrl: updateTutorial?.videoUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutorial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPublic.post("/add-tutorials", tutorial);
      // console.log(response);
      if (response.status === 200) {
        // alert("Tutorial added successfully!");
        setTutorial({
          title: "",
          description: "",
          language: "",
          country: "",
          price: "",
          videoUrl: "",
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
    <div className="bg-white shadow-lg mx-auto mt-10 p-6 rounded-lg max-w-2xl">
      <h2 className="mb-4 font-semibold text-2xl">
        {updateTutorial ? "Update" : "Upload"} Language Tutorial
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={tutorial.name}
            readOnly
            className="bg-gray-100 mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={tutorial.email}
            readOnly
            className="bg-gray-100 mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={tutorial.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={tutorial.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Language</label>
          <select
            name="language"
            value={tutorial.language}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          >
            <option value="" disabled>
              Select a Language
            </option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        {/* Country Select */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Country</label>
          <select
            name="country"
            value={tutorial.country}
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

        {/* Price */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={tutorial.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            YouTube Video URL
          </label>
          <input
            type="url"
            name="videoUrl"
            value={tutorial.videoUrl}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 py-2 rounded w-full text-white"
        >
          {updateTutorial ? "Update" : "Upload"} Tutorial
        </button>
      </form>
    </div>
  );
}
