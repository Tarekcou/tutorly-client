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
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-center">
        You have not booked any tutors yet.
      </div>
    );
  }

  return (
    <div className="py-20">
      {isLoading ? (
        <div className="-mt-28 font-semibold text-blue-500 text-lg text-center">
          <Loading />
        </div>
      ) : (
        <div className="mx-auto my-32 w-11/12 md:w-10/12">
          <h1 className="my-5 font-bold text-3xl text-center">Booked Tutors</h1>
          <div className="flex flex-col gap-5">
            {myBookedTutor.map((tutor) => (
              <MyBookedTutorCard key={tutor._id} tutor={tutor} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookedTutor;
