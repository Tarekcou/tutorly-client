import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    // Fetchtutors from the backend
    axiosPublic
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error("Error fetchingtutors:", error));
  }, []);

  const handleAction = (userId, isAdmin) => {
    // Updatetutor status (Accept/Reject)
    console.log(isAdmin);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/users/isAdmin/${userId}`, { isAdmin })
          .then((res) => {
            console.log(res.data);
            console.log(users);

            if (res.status === 200) {
              setUsers(
                users.map((user) =>
                  user._id === userId ? { ...user, isAdmin } : user
                )
              );
            }
          })
          .catch((error) =>
            console.error("Error updatingtutor status:", error)
          );
        Swal.fire({
          title: "Done!",
          text: "Change Completed.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mx-auto p-6 container">
      <h2 className="mb-4 font-bold text-2xl text-center">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="border border-gray-300 w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Languages</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="px-4 py-2 border">
                  <img
                    src={user.imageUrl || "https://via.placeholder.com/50"}
                    alt={user.name}
                    className="mx-auto rounded-full w-12 h-12"
                  />
                </td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>

                <td className="space-x-2 px-4 py-2 border">
                  {!user.isAdmin && (
                    <button
                      className="bg-green-500 px-3 py-1 rounded text-white"
                      onClick={() => handleAction(user._id, true)}
                    >
                      Make Admin
                    </button>
                  )}
                  {user.isAdmin && (
                    <button
                      className="bg-red-500 px-3 py-1 rounded text-white"
                      onClick={() => handleAction(user._id, false)}
                    >
                      Delete Admin
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

export default ManageUsers;
