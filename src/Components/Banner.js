import React from "react";

const Banner = () => {
  return (
    <div className="relative">
    
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      
      <img
        className="w-full lg:h-[480px] sm:h-[300px]"
        src="school.avif"
        alt="banner"
      ></img>
    </div>
  );
};

export default Banner;
