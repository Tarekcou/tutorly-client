import React from "react";

const Stats = () => {
  return (
    <div className="mx-auto py-10 w-11/12">
      <div className="shadow w-full text-center lg:stats-horizontal stats stats-vertical">
        <div className="stat">
          <div className="stat-value">31K</div>
          <div className="stat-desc">Experienced Tutor</div>
        </div>

        <div className="stat">
          <div className="stat-value">4,200</div>
          <div className="stat-desc">5 star tutor reviews</div>
        </div>

        <div className="stat">
          <div className="stat-value">120+</div>
          <div className="stat-desc">Subject Taught</div>
        </div>
        <div className="stat">
          <div className="stat-value">50000+</div>
          <div className="stat-desc">Users </div>
        </div>
        <div className="stat">
          <div className="stat-value">180+</div>
          <div className="stat-desc">Tutor Nationalities</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
