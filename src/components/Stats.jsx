import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Stats = ({ tutors = [] }) => {
  const [uniqueTutors, setUniqueTutors] = useState([]);
  const [review, setReview] = useState(0); // Default to 0
  const [subject, setSubject] = useState(32);
  const axiosPublic = useAxiosPublic();
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
  }, [tutors]);

  // Add tutors to dependency array
  const {
    isPending,
    isLoading,
    error,
    data: reviews = [],
    refetch,
  } = useQuery({
    queryKey: ["fiveStarReviews"], // Ensures query updates when email changes
    queryFn: async () => {
      // if (!user?.email) return []; // Avoid running query when user is undefined
      const response = await axiosPublic.get(`/review`);
      console.log(response.data);
      const fiveStar = response.data.map((r) => r.review.rating == "5");
      return fiveStar || [];
    },
  });
  return (
    <div data-aos="flip-left" className="mx-auto py-10 w-11/12 md:w-10/12">
      <div className="shadow w-full text-center lg:stats-horizontal stats stats-vertical">
        <div className="stat">
          <div className="text-2xl md:stat-value">{uniqueTutors.length}</div>
          <div className="">Experienced Tutors</div>
        </div>

        <div className="stat">
          <div className="text-2xl md:stat-value">{reviews.length}</div>
          <div className="">5-star tutor reviews</div>
        </div>

        <div className="stat">
          <div className="text-2xl md:stat-value">{subject}+</div>
          <div className="">Subjects Taught</div>
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
