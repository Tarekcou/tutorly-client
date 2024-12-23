import React from "react";
import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";

const HeroBanner = () => {
  return (
    <div>
      <img src={one} className="bg-cover bg-no-repeat w-full object-cover" />
      <div className="top-1/2 right-5 left-5 absolute flex justify-between transform -translate-y-1/2">
        <a href="#slide4" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide2" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
