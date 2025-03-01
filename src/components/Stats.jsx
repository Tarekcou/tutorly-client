import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Stats = () => {
  const tutors = useLoaderData();
  // console.log(tutors);
  const [uniqueTutors, setUniqueTutors] = useState([]);
  const [review, setReview] = useState();
  const [subject, setSubject] = useState(32);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unique = tutors
      .map((tutor) => tutor.email)
      .filter((value, index, self) => self.indexOf(value) === index);

    setUniqueTutors(unique);
    // console.log(unique, uniqueTutors);
    const review = tutors.reduce((acc, tutor) => acc + tutor.review, 0);
    setReview(review);
    // console.log(review);
  }, []);
  return (
    <div className="mx-auto py-10 w-11/12 md:w-10/12">
      <div className="shadow w-full text-center lg:stats-horizontal stats stats-vertical">
        <div className="stat">
          <div className="text-2xl md:stat-value">{uniqueTutors.length}</div>
          <div className="stat-desc">Experienced Tutor</div>
        </div>

        <div className="stat">
          <div className="text-2xl md:stat-value">{review}</div>
          <div className="stat-desc">5 star tutor reviews</div>
        </div>

        <div className="stat">
          <div className="text-2xl md:stat-value">{subject}+</div>
          <div className="stat-desc">Subject Taught</div>
        </div>
        <div className="stat">
          <div className="text-2xl md:stat-value">{tutors.length}+</div>
          <div className="stat-desc">Users </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
