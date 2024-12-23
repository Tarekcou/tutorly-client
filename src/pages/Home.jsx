import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import TutorCategories from "../components/TutorCategories";
import HowItWorks from "../components/HowItWorks";
import BecomeTutor from "../components/BecomeTutor";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <TutorCategories />
      <HowItWorks />
      <BecomeTutor />
    </div>
  );
};

export default Home;
