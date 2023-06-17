import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

function Header() {
  // 코스목록 페이지 header 변경
  const { AreaName } = useParams();

  return (
    <div
      className={
        AreaName
          ? "w-full max-w-[430px] text-white h-[48px] flex justify-between items-center px-[16px] fixed top-0 z-50"
          : "text-black h-[48px] flex justify-between items-center px-[16px]"
      }
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
