import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import TutorCard from "./AllTutor/TutorCard";
import { AuthContext } from "../provider/AuthProvider";
import MyBookedTutorCard from "./MyBookedTutorCard";
import Loading from "../components/Loading";

const MyBookedTutor = () => {
  const myBookedTutor = useLoaderData();
  const { user, isLoading } = useContext(AuthContext);
  // console.log(myBookedTutor);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a network request (remove this if useLoaderData() already handles loading)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (myBookedTutor.length == 0) {
    return (
      <div className="mt-44 text-gray-700 text-center">
        You have not Booked any tutorials yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {loading ? (
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
