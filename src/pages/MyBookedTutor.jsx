import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import TutorCard from "./AllTutor/TutorCard";
import { AuthContext } from "../provider/AuthProvider";
import MyBookedTutorCard from "./MyBookedTutorCard";

const MyBookedTutor = () => {
  const myBookedTutor = useLoaderData();
  const { user } = useContext(AuthContext);
  console.log(myBookedTutor);
  return (
    <div className="mx-auto my-32 w-11/12">
      <div className="flex flex-col gap-5">
        {myBookedTutor.map((tutor) => (
          <MyBookedTutorCard key={tutor._id} tutor={tutor} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MyBookedTutor;
