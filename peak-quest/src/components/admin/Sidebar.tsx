import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { MdPhotoAlbum, MdSwitchAccount } from "react-icons/md";
import { BsShieldFillExclamation } from "react-icons/bs";

export default function Sidebar() {
  const [select, setSelect] = useState("DashBoard");

  const SELECT_CSS = "text-[#3719C0] bg-[#F3F0FF]";

  function selectButton(e: React.MouseEvent<HTMLDivElement>) {
    const dataId = e.currentTarget.dataset.id;
    if (dataId) {
      setSelect(dataId);
    }
  }

  return (
    <div className="w-[240px] h-screen flex flex-col justify-between bg-white">
      <div className="flex flex-col w-[224px] mt-[74px] mx-auto text-lg">
        <div
          className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer  ${
            select === "DashBoard" ? SELECT_CSS : ""
          }`}
          data-id="DashBoard"
          onClick={selectButton}
        >
          <MdDashboard className="text-purple ml-3 text-2xl mr-2" />
          대시보드
        </div>
        <div
          className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer ${
            select === "Banner" ? SELECT_CSS : ""
          }`}
          data-id="Banner"
          onClick={selectButton}
        >
          <MdPhotoAlbum className="text-purple ml-3 text-2xl mr-2" />
          배너관리
        </div>
        <div
          className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer ${
            select === "Report" ? SELECT_CSS : ""
          }`}
          data-id="Report"
          onClick={selectButton}
        >
          <BsShieldFillExclamation className="text-purple ml-3 text-2xl mr-2" />
          신고관리
        </div>
        <div
          className={`flex items-center h-[48px] rounded-md mb-3 cursor-pointer ${
            select === "User" ? SELECT_CSS : ""
          }`}
          data-id="User"
          onClick={selectButton}
        >
          <MdSwitchAccount className="text-purple ml-3 text-2xl mr-2" />
          회원관리
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center w-[224px] h-[208px] mb-2 mx-auto text-lg ">
        <div className="flex flex-col justify-center items-center z-20">
          <img className="w-16 h-16 mt- rounded-full" src="/images/rank/profile.png" alt="" />
          <div className="flex flex-col justify-center items-center text-white font-bold">
            <div className="mt-3">관리자</div>
            <div>admin@gmail.com</div>
          </div>
        </div>
        <div className="absolute w-[224px] h-[208px] bg-black bg-opacity-90 z-10 border-white border rounded-md" />
        <img
          className="absolute w-[224px] h-[208px] border-white border rounded-md"
          src="/images/area/area3.png"
          alt=""
        />
      </div>
    </div>
  );
}
