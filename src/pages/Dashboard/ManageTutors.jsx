import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageTutors = () => {
  const [tutors, setTutors] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    // Fetchtutors from the backend
    axiosPublic
      .get("/allTutors")
      .then((res) => {
        setTutors(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error("Error fetchingtutors:", error));
  }, []);

  const handleAction = (tutorId, isTutor) => {
    // Updatetutor status (Accept/Reject)
    console.log(isTutor);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Changed!",
            text: "Change Successfull.",
            icon: "success",
          });
          axiosPublic.put(`/tutors/${tutorId}`, { isTutor }).then((res) => {
            //  console.log(res.data);
            if (res.status === 200) {
              setTutors(
                tutors.map((tutor) =>
                  tutor._id === tutorId ? { ...tutor, isTutor } : tutor
                )
              );
            }
          });
        }
      })
      .catch((error) => console.error("Error updatingtutor status:", error));
  };

  return (
    <div className="mx-auto p-6 container">
      <h2 className="mb-4 font-bold text-2xl text-center">Manage tutors</h2>
      <div className="overflow-x-auto">
        <table className="border border-gray-300 w-full table-auto">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Languages</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor._id} className="text-center">
                <td className="px-4 py-2 border">
                  <img
                    src={tutor.imageUrl}
                    alt={tutor.name}
                    className="mx-auto rounded-full w-12 h-12"
                  />
                </td>
                <td className="px-4 py-2 border">{tutor.name}</td>
                <td className="px-4 py-2 border">{tutor.email}</td>
                <td className="px-4 py-2 border">
                  {tutor.languages?.join(", ")}
                </td>
                <td className="space-x-2 px-4 py-2 border">
                  {!tutor.isTutor && (
                    <button
                      className="bg-green-500 px-3 py-1 rounded text-white"
                      onClick={() => handleAction(tutor._id, true)}
                    >
                      Make Tutor
                    </button>
                  )}
                  {tutor.isTutor && (
                    <button
                      className="bg-red-500 px-3 py-1 rounded text-white"
                      onClick={() => handleAction(tutor._id, false)}
                    >
                      Remove Tutor
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTutors;
