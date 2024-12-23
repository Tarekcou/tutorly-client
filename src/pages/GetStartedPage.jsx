import React from "react";
import { Link } from "react-router-dom";
import startedImage from "../assets/startedImage.jpg";
const GetStartedPage = () => {
  return (
    <div
      className="flex justify-center items-center gap-10 space-y-5 mx-auto min-h-screen"
      data-theme="light"
    >
      <div className="space-y-3">
        <h1 className="text-5xl">Find the right tutor for you</h1>
        <p>
          Tell us how you’d like to learn to get a personalized choice of tutors
        </p>
        <div className="flex my-10 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">What do you want to learn?</span>
            </div>
            <div className="flex w-full">
              <select className="w-full select-bordered select">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
              <button className="btn btn-neutral">Get Started</button>
            </div>
          </label>
        </div>
        <Link to={"/"} className="py-10 text-underline">
          Choose by myself from 3000+ Tutors
        </Link>
      </div>
      <div>
        <img className="w-96 h-full" src={startedImage} alt="" />
      </div>
    </div>
  );
};

export default GetStartedPage;
