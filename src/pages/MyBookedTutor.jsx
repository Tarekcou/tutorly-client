import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import TutorCard from "./AllTutor/TutorCard";
import { AuthContext } from "../provider/AuthProvider";
import MyBookedTutorCard from "./MyBookedTutorCard";
import Loading from "../components/Loading";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const MyBookedTutor = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  // console.log(myBookedTutor);
  const {
    isPending,
    isLoading,
    error,
    data: myBookedTutor = [],
    refetch,
  } = useQuery({
    queryKey: ["BookedTutor", user?.email], // Ensures query updates when email changes
    queryFn: async () => {
      if (!user?.email) return []; // Avoid running query when user is undefined
      const response = await axiosPublic.get(`/booked-tutors/${user.email}`);
      return response?.data || [];
    },
    enabled: !!user?.email, // Prevents query from running if user is not logged in
  });

  if (isLoading) {
    return (
      <div className="-mt-28 font-semibold text-blue-500 text-lg text-center">
        <Loading />
      </div>
    );
  }

  if (!myBookedTutor?.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        You have not booked any tutors yet.
      </div>
    );
  }
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
        const response = await axiosPublic.delete(
          `/remove-booked-tutorials/${id}`
        );
        console.log(response.data);

        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="">
      {isLoading ? (
        <div className="min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="mx-auto my-32 w-11/12 md:w-10/12">
          <h1 className="my-5 font-bold text-3xl text-center">Booked Tutors</h1>
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
            {myBookedTutor.map((tutor) => (
              <MyBookedTutorCard
                key={tutor._id}
                tutor={tutor}
                user={user}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookedTutor;
