import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectArea() {
  const navigate = useNavigate();

  return (
    <div className="relative w-[430px] flex flex-col bg-lightGray">
      <div className="w-[398px] mx-auto">
        <h1 className="text-xl font-bold mb-3">지역을 선택해 주세요</h1>
        <div
          className="relative w-[398px] h-[120px] mb-3 rounded-md overflow-hidden"
          onClick={() => navigate("/area/수도권/courselist")}
        >
          <div className="absolute w-[398px] h-[120px] bg-black bg-opacity-40 z-10" />
          <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-xl font-bold text-white z-20">
            수도권
          </h1>
          <img className="relative translate-y-[-25%]" src={`./images/area/area1.png`}></img>
        </div>
        <div
          className="relative w-[398px] h-[120px] mb-3 rounded-md overflow-hidden"
          onClick={() => navigate("/area/강원권/courselist")}
        >
          <div className="absolute w-[398px] h-[120px] bg-black bg-opacity-40 z-10" />
          <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-xl font-bold text-white z-20">
            강원권
          </h1>
          <img className="relative translate-y-[-30%]" src={`./images/area/area2.png`}></img>
        </div>
        <div
          className="relative w-[398px] h-[120px] mb-3 rounded-md overflow-hidden"
          onClick={() => navigate("/area/충청권/courselist")}
        >
          <div className="absolute w-[398px] h-[120px] bg-black bg-opacity-40 z-10" />
          <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-xl font-bold text-white z-20">
            충청권
          </h1>
          <img className="relative translate-y-[-35%]" src={`./images/area/area3.png`}></img>
        </div>
        <div
          className="relative w-[398px] h-[120px] mb-3 rounded-md overflow-hidden"
          onClick={() => navigate("/area/전라권/courselist")}
        >
          <div className="absolute w-[398px] h-[120px] bg-black bg-opacity-40 z-10" />
          <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-xl font-bold text-white z-20">
            전라권
          </h1>
          <img className="relative translate-y-[-39%]" src={`./images/area/area4.png`}></img>
        </div>
        <div
          className="relative w-[398px] h-[120px] mb-3 rounded-md overflow-hidden"
          onClick={() => navigate("/area/경상권/courselist")}
        >
          <div className="absolute w-[398px] h-[120px] bg-black bg-opacity-40 z-10" />
          <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-xl font-bold text-white z-20">
            경상권
          </h1>
          <img className="relative translate-y-[-27%]" src={`./images/area/area5.png`}></img>
        </div>
        <div
          className="relative w-[398px] h-[120px] mb-3 rounded-md overflow-hidden"
          onClick={() => navigate("/area/제주도/courselist")}
        >
          <div className="absolute w-[398px] h-[120px] bg-black bg-opacity-40 z-10" />
          <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-xl font-bold text-white z-20">
            제주도
          </h1>
          <img className="relative translate-y-[-26%]" src={`./images/area/area6.png`}></img>
        </div>
        <footer>푸터입니다</footer>
      </div>
    </div>
  );
}
