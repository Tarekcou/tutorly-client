import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import TutorCard from "./AllTutor/TutorCard";
import { AuthContext } from "../provider/AuthProvider";
import MyBookedTutorCard from "./MyBookedTutorCard";

const MyBookedTutor = () => {
  const myBookedTutor = useLoaderData();
  const { user } = useContext(AuthContext);
  // console.log(myBookedTutor);
  if (myBookedTutor.length == 0) {
    return (
      <div className="mt-44 text-center text-gray-700">
        You have not Booked any tutorials yet.
      </div>
    );
  }
  return (
    <div className="mx-auto my-32 w-11/12">
      <h1 className="my-5 text-3xl text-center">Booked Tutors</h1>
      <div className="flex flex-col gap-5">
        {myBookedTutor.map((tutor) => (
          <MyBookedTutorCard key={tutor._id} tutor={tutor} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MyBookedTutor;
