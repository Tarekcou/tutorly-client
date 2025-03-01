import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const MyTutorials = () => {
  // const tutorials = useLoaderData();
  // console.log(tutorials);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a network request (remove this if useLoaderData() already handles loading)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    // Fetch data from the server
    axios
      .get(
        `https://https://tutor-booking-server-olive.vercel.app/myTutorials/${params.myEmail}`
      )
      .then((res) => setTutorials(res.data));
  }, []);
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(`https://tutor-booking-server-olive.vercel.app/tutorials/${id}`)
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            Swal.fire({
              title: "success!",
              text: "One tutorial has been deleted",
              icon: "success",
              confirmButtonText: "ok",
            });
          }
        }); // Replace with your API endpoint
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      Swal.fire({
        title: "error!",
        text: "Something Went Wrong, Please check",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  const handleUpdate = (tutorial) => {
    setSelectedTutorial(tutorial);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTutorial(null);
  };
  if (tutorials.length == 0) {
    return (
      <div className="mt-44 min-h-screen text-gray-700 text-center">
        You have not created any tutorials yet.
      </div>
    );
  }
  return (
    <>
      {loading ? (
        // Show Loading State
        <div className="-mt-28 font-semibold text-blue-500 text-lg text-center">
          <Loading />
        </div>
      ) : (
        <div className="mt-32 p-8">
          <h1 className="mb-6 font-bold text-2xl">My Tutorials</h1>
          <table className="border border-gray-300 w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Image</th>
                <th className="px-4 py-2 border border-gray-300">Language</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
                <th className="px-4 py-2 border border-gray-300">
                  Description
                </th>
                <th className="px-4 py-2 border border-gray-300">Review</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial) => (
                <tr key={tutorial._id}>
                  <td className="px-4 py-2 border border-gray-300">
                    {tutorial.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <img
                      src={tutorial.image}
                      alt="Tutorial"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {tutorial.language}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    ${tutorial.price}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {tutorial.description}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {tutorial.review}
                  </td>
                  <td className="flex gap-2 px-4 py-2 border border-gray-300">
                    <button
                      className="bg-red-500 px-4 py-2 rounded text-white"
                      onClick={() => handleDelete(tutorial._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/updateTutorials/${tutorial._id}`}
                      state={{ tutorial }}
                      className="bg-blue-500 px-4 py-2 rounded text-white"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Update Modal */}
          {/* {showModal && selectedTutorial && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg p-6 rounded w-1/2">
            <h2 className="mb-4 font-bold text-xl">Update Tutorial</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(
                    `/api/tutorials/${selectedTutorial._id}`,
                    selectedTutorial
                  ); // Replace with your API endpoint
                  fetchTutorials();
                  handleCloseModal();
                } catch (error) {
                  console.error("Error updating tutorial:", error);
                }
              }}
            >
              <div className="mb-4">
                <label className="block mb-2 font-bold">Name</label>
                <input
                  type="text"
                  value={selectedTutorial.name}
                  readOnly
                  className="px-4 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Email</label>
                <input
                  type="email"
                  value={selectedTutorial.email}
                  readOnly
                  className="px-4 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Image URL</label>
                <input
                  type="text"
                  value={selectedTutorial.image}
                  onChange={(e) =>
                    setSelectedTutorial({
                      ...selectedTutorial,
                      image: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Language</label>
                <input
                  type="text"
                  value={selectedTutorial.language}
                  onChange={(e) =>
                    setSelectedTutorial({
                      ...selectedTutorial,
                      language: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Price</label>
                <input
                  type="number"
                  value={selectedTutorial.price}
                  onChange={(e) =>
                    setSelectedTutorial({
                      ...selectedTutorial,
                      price: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Description</label>
                <textarea
                  value={selectedTutorial.description}
                  onChange={(e) =>
                    setSelectedTutorial({
                      ...selectedTutorial,
                      description: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Review</label>
                <input
                  type="text"
                  value={selectedTutorial.review}
                  readOnly
                  className="px-4 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 mr-2 px-4 py-2 rounded text-white"
              >
                Update
              </button>
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )} */}
        </div>
      )}
    </>
  );
};

export default MyTutorials;
