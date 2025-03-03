import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import TutorCategories from "../components/TutorCategories";
import HowItWorks from "../components/HowItWorks";
import BecomeTutor from "../components/BecomeTutor";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import Reviews from "../components/Reviews";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();
  const {
    isPending,
    isLoading,
    error,
    data: tutors = [],
    refetch,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/tutors`);
      return response.data;
    },
  });

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="-mt-28 min-h-screen font-semibold text-blue-500 text-lg text-center">
          <Loading />
        </div>
      ) : (
        <>
          <Hero data-aos="fade-up" />
          <Stats tutors={tutors} />
          <TutorCategories />
          <HowItWorks />
          <Reviews />
          <BecomeTutor />
        </>
      )}
    </div>
  );
};

export default Home;
