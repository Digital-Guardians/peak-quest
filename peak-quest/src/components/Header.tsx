import { useContext } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Login from "./Login";

function Header() {
  const { AreaName } = useParams();
  const location = useLocation();

  // useUserContext에서 가져온 값 사용
  const { handleOpenLoginPopup } = useUserContext();

  return (
    <div
      className={`w-full max-w-[430px] h-[48px] flex justify-between items-center px-[16px] ${
        location.pathname === `/area/${AreaName}/courselist`
          ? "text-white fixed top-0 z-50"
          : "text-black"
      }`}
    >
      {/* 로고 */}
      <Link to={"/"}>
        <div>logo</div>
      </Link>
      <div className="flex items-center space-x-2">
        {/* 로그인 */}
        <div
          className="font-bold cursor-pointer"
          onClick={handleOpenLoginPopup}
        >
          로그인
        </div>
        <Login />

        {/* 마이페이지 */}
        <div>
          <BsFillPersonFill />
        </div>
      </div>
    </div>
  );
}

export default Header;
