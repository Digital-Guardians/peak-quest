import React from "react";
import RankSection from "./RankSection";

export default function Main() {
  return (
    <div className="w-screen h-screen relative flex bg-lightGray">
      <div className="w-1/2"></div>
      {/* rankSection */}
      <div className='w-[430px] m-auto bg-white rounded-xl'>
        <RankSection />
      </div>
    </div>
  );
}
