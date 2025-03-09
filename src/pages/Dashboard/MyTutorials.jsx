import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import UploadTutorial from "./UploadTutorial";
import { useQuery } from "@tanstack/react-query";

const MyTutorials = () => {
  // const tutorials = useLoaderData();
  // console.log(tutorials);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateTutorial, setUpdateTutorial] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isLoading,
    error,
    data: tutorials = [],
    refetch,
  } = useQuery({
    queryKey: ["myTutorials", user.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/tutorials/email/${user.email}`);

      if (response.data) {
        return response.data;
      }
    },
  });
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = await axiosPublic.delete(`/tutorials/${id}`);
          console.log(data);
          if (data.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "One tutorial has been deleted",
              icon: "success",
              confirmButtonText: "OK",
            });
            refetch();
          }
        }
      });
    } catch (error) {
      console.error("Error deleting tutorial:", error);
    }
  };

  const handleUpdate = (tutorial) => {
    setShowUpdate(true);
    setUpdateTutorial(tutorial);
  };
  // console.log(showUpdate);
  if (tutorials.length == 0) {
    return (
      <div className="mt-44 min-h-screen text-gray-700 text-center">
        You have not created any tutorials yet.
      </div>
    );
  }
  const extractYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };
  return (
    <>
      {isLoading ? (
        // Show Loading State
        <div className="-mt-28 font-semibold text-blue-500 text-lg text-center">
          <Loading />
        </div>
      ) : showUpdate ? (
        <UploadTutorial updateTutorial={updateTutorial} />
      ) : (
        <div className="mt-5 p-4 text-black/80">
          <h1 className="mb-6 font-bold text-2xl">My Tutorials</h1>
          <table className="border border-gray-300 w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Video</th>
                <th className="px-4 py-2 border border-gray-300">Language</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
                <th className="px-4 py-2 border border-gray-300">
                  Description
                </th>
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
                    <div className="mt-2">
                      <p>
                        <strong>Video Preview:</strong>
                      </p>
                      <iframe
                        className="mt-2 border rounded w-64 h-64"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(
                          tutorial.videoUrl
                        )}`}
                        title="YouTube Video"
                        allowFullScreen
                      ></iframe>
                    </div>
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

                  <td className="flex flex-col !justify-center !items-center gap-2 px-4 py-2 border-gray-300 w-full h-full">
                    <button
                      className="bg-red-500 px-4 py-2 rounded text-white"
                      onClick={() => handleDelete(tutorial._id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(tutorial)}
                      className="bg-blue-500 px-4 py-2 rounded text-white"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MyTutorials;
