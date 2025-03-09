import React, { useContext, useState } from "react";
import becomeTutor from "../assets/becometutor.jpg";
import becomeTutor2 from "../assets/becomeTutor2.jpg";
import becomeTutor3 from "../assets/becomeTutor3.jpg";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Loading from "../components/Loading";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";
const BecomeTutor = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    isPending,
    isLoading,
    error,
    data: isSubmitted = false,
    refetch,
  } = useQuery({
    queryKey: ["isSubmitted"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/tutors/email/${user.email}`);

      // console.log(response.data);
      if (response.data?.email) {
        // refetch();
        // console.log(response);
        return true;
      }
    },
  });
  if (isLoading) return <Loading />;
  // verify that is tutor
  // console.log(isSubmitted);
  if (isSubmitted)
    return (
      <div className="flex justify-center items-center w-full h-screen text-center">
        <h1>Your Application has been submitted. Please Wait for Response</h1>
      </div>
    );
  return (
    <div className="mx-auto mt-32 p-1 w-11/12 md:w-10/12">
      <div className="flex md:flex-row flex-col">
        <div className="flex flex-col items-start">
          <h1 className="mb-6 px-2 font-bold text-2xl md:text-4xl text-start">
            Make a living by teaching the largest community of learners
            worldwide
          </h1>

          <div className="flex justify-center items-center gap-1 md:gap-4 mb-8">
            <div className="p-1 md:p-4 border rounded-md">
              <span className="font-semibold text-lg">1</span>
              <p>Sign up</p>
            </div>
            <div className="w-5">
              <HiArrowLongRight className="w-full text-3xl" />
            </div>
            <div className="p-1 md:p-4 border rounded-md">
              <span className="font-semibold text-base md:text-lg">2</span>
              <p>Get approved</p>
            </div>
            <div className="w-5">
              <HiArrowLongRight className="w-full text-3xl" />
            </div>
            <div className="p-1 md:p-4 border rounded-md">
              <span className="font-semibold text-lg">3</span>
              <p>Start earning</p>
            </div>
          </div>

          <Link
            to={"/become-tutor-form"}
            className="bg-orange-500 px-6 py-2 rounded-md text-white"
          >
            Create a tutor profile now
          </Link>
        </div>

        <div>
          <img src={becomeTutor} alt="become tutor" />
        </div>
      </div>

      <div className="gap-6 grid md:grid-cols-3 mt-12 text-left">
        <div className="p-4 border">
          <h3 className="font-semibold text-xl">Set your own rate</h3>
          <p>Choose your hourly rate and change it anytime.</p>
        </div>
        <div className="p-4 border">
          <h3 className="font-semibold text-xl">Teach anytime, anywhere</h3>
          <p>Decide your schedule. No minimum time commitment.</p>
        </div>
        <div className="p-4 border">
          <h3 className="font-semibold text-xl">Grow professionally</h3>
          <p>Attend webinars and get tips to upgrade your skills.</p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-3 mt-12">
        <div className="flex flex-col justify-start items-start">
          <h2 className="mb-4 font-bold text-xl md:text-3xl text-start">
            Teach students from over 180 countries
          </h2>
          <ul className="flex flex-col justify-start items-start gap-3 md:gap-4 mx-auto w-full h-full text-left list-disc list-inside">
            <li>Steady stream of new students</li>
            <li>Smart calendar</li>
            <li>Interactive classroom</li>
            <li>Convenient payment methods</li>
            <li>Professional development webinars</li>
            <li>Supportive tutor community</li>
          </ul>
          <Link
            to={"/become-tutor-form"}
            className="bg-orange-500 mt-6 px-6 py-2 rounded-md text-white"
          >
            Create a tutor profile now
          </Link>
        </div>
        <div>
          <img src={becomeTutor2} alt="become tutor" />
        </div>
      </div>

      <div className="flex md:flex-row flex-col mt-5 md:mt-10 rounded-xl text-center">
        <div className="flex-1">
          <img src={becomeTutor3} alt="become tutoro 3" />
        </div>
        <div className="flex flex-col flex-1 justify-center items-center bg-orange-300 p-10 border">
          <h1 className="text-3xl md:text-5xl">Get paid to teach online</h1>
          <p>
            Connect with thousands of learners around the world and teach from
            your living room
          </p>
          <Link
            to={"/become-tutor-form"}
            className="bg-black mt-6 text-white btn btn-ghost"
          >
            Create a tutor profile now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BecomeTutor;
