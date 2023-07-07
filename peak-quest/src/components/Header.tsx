import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useLocation, useParams } from "react-router-dom";

function Header() {
  const { AreaName } = useParams();
  const location = useLocation();

  return (
    <div
      className={`w-full max-w-[430px] h-[48px] flex justify-between items-center px-[16px] ${
        location.pathname === `/area/${AreaName}/courselist`
          ? "text-white fixed top-0 z-50"
          : "text-black"
      }`}
    >
      <Link to={"/"}>
        <div>logo</div>
      </Link>
      <div className="flex items-center space-x-[16px]">
        <div className="font-bold">로그인</div>
        <div>
          <BsFillPersonFill />
        </div>
      </div>
    </div>
  );
}

export default Header;
