import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { changeEnglish } from "../../helper/changeAreaName";

export default function SelectArea() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="relative flex w-[430px] flex-col bg-lightGray">
        <div className="mx-auto w-[398px]">
          <h1 className="mb-3 text-xl font-bold">지역을 선택해 주세요</h1>
          <div
            className="pointer relative mb-3 h-[120px] w-[398px] cursor-pointer overflow-hidden rounded-md"
            onClick={() =>
              navigate(`/area/${changeEnglish("수도권")}/courselist`)
            }
          >
            <div className="absolute z-10 h-[120px] w-[398px] bg-black bg-opacity-40" />
            <h1 className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] text-xl font-bold text-white ">
              수도권
            </h1>
            <img
              className="relative translate-y-[-25%]"
              src={`./images/area/capital.png`}
            ></img>
          </div>
          <div
            className="relative mb-3 h-[120px] w-[398px] cursor-pointer overflow-hidden rounded-md"
            onClick={() =>
              navigate(`/area/${changeEnglish("강원권")}/courselist`)
            }
          >
            <div className="absolute z-10 h-[120px] w-[398px] bg-black bg-opacity-40" />
            <h1 className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] text-xl font-bold text-white">
              강원권
            </h1>
            <img
              className="relative translate-y-[-30%]"
              src={`./images/area/gangwon.png`}
            ></img>
          </div>
          <div
            className="relative mb-3 h-[120px] w-[398px] cursor-pointer overflow-hidden rounded-md"
            onClick={() =>
              navigate(`/area/${changeEnglish("충청권")}/courselist`)
            }
          >
            <div className="absolute z-10 h-[120px] w-[398px] bg-black bg-opacity-40" />
            <h1 className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] text-xl font-bold text-white">
              충청권
            </h1>
            <img
              className="relative translate-y-[-35%]"
              src={`./images/area/chungcheong.png`}
            ></img>
          </div>
          <div
            className="relative mb-3 h-[120px] w-[398px] cursor-pointer overflow-hidden rounded-md"
            onClick={() =>
              navigate(`/area/${changeEnglish("전라권")}/courselist`)
            }
          >
            <div className="absolute z-10 h-[120px] w-[398px] bg-black bg-opacity-40" />
            <h1 className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] text-xl font-bold text-white">
              전라권
            </h1>
            <img
              className="relative translate-y-[-39%]"
              src={`./images/area/jeolla.png`}
            ></img>
          </div>
          <div
            className="relative mb-3 h-[120px] w-[398px] cursor-pointer overflow-hidden rounded-md"
            onClick={() =>
              navigate(`/area/${changeEnglish("경상권")}/courselist`)
            }
          >
            <div className="absolute z-10 h-[120px] w-[398px] bg-black bg-opacity-40" />
            <h1 className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] text-xl font-bold text-white">
              경상권
            </h1>
            <img
              className="relative translate-y-[-27%]"
              src={`./images/area/gyeongsang.png`}
            ></img>
          </div>
          <div
            className="relative mb-3 h-[120px] w-[398px] cursor-pointer overflow-hidden rounded-md"
            onClick={() =>
              navigate(`/area/${changeEnglish("제주도")}/courselist`)
            }
          >
            <div className="absolute z-10 h-[120px] w-[398px] bg-black bg-opacity-40" />
            <h1 className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] text-xl font-bold text-white">
              제주도
            </h1>
            <img
              className="relative translate-y-[-26%]"
              src={`./images/area/jeju.png`}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
