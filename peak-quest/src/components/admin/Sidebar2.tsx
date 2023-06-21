import React, { ReactElement, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { MdPhotoAlbum, MdSwitchAccount } from "react-icons/md";
import { BsShieldFillExclamation } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// import test from "@images/test_img.png";

const SELECT_CSS = "text-[#3719C0] bg-[#F3F0FF]";

export default function Sidebar() {
  const [select, setSelect] = useState("dashboard");

  const navigate = useNavigate();

  function selectButton(e: React.MouseEvent<HTMLDivElement>) {
    const dataId = e.currentTarget.dataset.id;
    if (dataId) {
      setSelect(dataId);
      navigate(`/admin/${dataId}`);
    }
  }

  return (
    <div className="sticky top-0 flex h-screen flex-col">
      <div className="w-[240px] h-3/4 flex flex-col justify-between bg-white rounded-xl">
        <div className="flex flex-col w-[224px] mt-[74px] mx-auto text-lg">
          <div
            className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer  ${
              select === "dashboard" ? SELECT_CSS : ""
            }`}
            data-id="dashboard"
            onClick={selectButton}
          >
            <MdDashboard className="text-purple ml-3 text-2xl mr-2" />
            대시보드
          </div>
          <div
            className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer ${
              select === "banner" ? SELECT_CSS : ""
            }`}
            data-id="banner"
            onClick={selectButton}
          >
            <MdPhotoAlbum className="text-purple ml-3 text-2xl mr-2" />
            배너관리
          </div>
          <div
            className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer ${
              select === "report" ? SELECT_CSS : ""
            }`}
            data-id="report"
            onClick={selectButton}
          >
            <BsShieldFillExclamation className="text-purple ml-3 text-2xl mr-2" />
            신고관리
          </div>
          <div
            className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer ${
              select === "user" ? SELECT_CSS : ""
            }`}
            data-id="user"
            onClick={selectButton}
          >
            <MdSwitchAccount className="text-purple ml-3 text-2xl mr-2" />
            회원관리
          </div>
        </div>
      </div>
      <div className="relative h-1/4 flex flex-col justify-center items-center w-[240px] m-1 mx-auto text-lg ">
        <div className="flex flex-col justify-center items-center z-20">
          <img className="w-16 h-16 mt- rounded-full" src="/images/rank/profile.png" alt="" />
          <div className="flex flex-col justify-center items-center text-white font-bold">
            <div className="mt-3">관리자</div>
            <div>admin@gmail.com</div>
          </div>
        </div>
        <div className="absolute w-[240px] h-[264px] mt-1 bg-black bg-opacity-90 z-10 rounded-xl" />
        <img
          className="absolute w-[240px] h-[264px] mt-1 border-white border rounded-xl"
          src="/images/area/area3.png"
          alt=""
        />
      </div>
    </div>
  );
}
