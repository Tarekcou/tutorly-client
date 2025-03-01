import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import TutorCategories from "../components/TutorCategories";
import HowItWorks from "../components/HowItWorks";
import BecomeTutor from "../components/BecomeTutor";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import Reviews from "../components/Reviews";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request (remove this if useLoaderData() already handles loading)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Hero />
          <Stats />
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
