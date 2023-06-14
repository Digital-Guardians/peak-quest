import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="h-[48px] flex justify-between items-center px-[16px]">
      <Link to={"/"}>
        <div>logo</div>
      </Link>
      <div className="flex items-center space-x-[16px]">
        <div>로그인</div>
        <div>
          <BsFillPersonFill />
        </div>
      </div>
    </div>
  );
}

export default Header;
