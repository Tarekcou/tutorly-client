import React, { useEffect, useState } from "react";

const Stats = ({ tutors = [] }) => {
  const [uniqueTutors, setUniqueTutors] = useState([]);
  const [review, setReview] = useState(0); // Default to 0
  const [subject, setSubject] = useState(32);

  useEffect(() => {
    if (!tutors.length) return;

    // Ensure unique tutors based on email
    const unique = tutors
      .map((tutor) => tutor.email)
      .filter((value, index, self) => self.indexOf(value) === index);
    setUniqueTutors(unique);

    // Calculate total reviews, handling undefined values
    const totalReview = tutors.reduce(
      (acc, tutor) => acc + (tutor?.review ?? 0),
      0
    );
    setReview(totalReview);
  }, [tutors]); // Add tutors to dependency array

  return (
    <div data-aos="flip-left" className="mx-auto py-10 w-11/12 md:w-10/12">
      <div className="shadow w-full text-center lg:stats-horizontal stats stats-vertical">
        <div className="stat">
          <div className="text-2xl md:stat-value">{uniqueTutors.length}</div>
          <div className="stat-desc">Experienced Tutors</div>
        </div>

        <div className="stat">
          <div className="text-2xl md:stat-value">{review}</div>
          <div className="stat-desc">5-star tutor reviews</div>
        </div>

        <div className="stat">
          <div className="text-2xl md:stat-value">{subject}+</div>
          <div className="stat-desc">Subjects Taught</div>
        </div>

        <div className="stat">
          <div className="text-2xl md:stat-value">{tutors.length}+</div>
          <div className="stat-desc">Users</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
