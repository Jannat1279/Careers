import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">
        About Us
      </h1>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-gray-700 mb-6">
          Our platform is built to connect students, colleges, and recruiters on
          a single platform. We aim to provide seamless event participation,
          career guidance, and job recruitment opportunities.
        </p>
        <p className="text-gray-600">
          With features like AI-powered recommendations, centralized event
          management, and easy communication, we are here to help students grow
          and succeed in their journey.
        </p>
      </div>
    </div>
  );
};

export default About;
