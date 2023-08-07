import { useContext, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Login from "./Login";
import { PeakQuestLogo } from "../assets/icon";
import { onUserStateChanged, userLogOut } from "../service/firebase";

function Header() {
  const { AreaName } = useParams();
  const location = useLocation();

  // useUserContext에서 가져온 값 사용
  const { handleOpenLoginPopup, user, setUser } = useUserContext();
  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);

  return (
    <div
      className={`my-1 flex h-[48px] w-full max-w-[430px] items-center justify-between px-[16px] ${
        location.pathname === `/area/${AreaName}/courselist`
          ? "fixed top-0 z-50 text-white"
          : "text-black"
      }`}
    >
      {/* 로고 */}
      <Link to={"/"}>
        <div>
          <PeakQuestLogo
            textColor={location.pathname === `/area/${AreaName}/courselist` ? "#ffffff" : "#646464"}
          />
        </div>
      </Link>
      <div className="flex items-center space-x-2">
        {/* 로그인 */}
        {!user ? (
          <div className="cursor-pointer font-bold" onClick={handleOpenLoginPopup}>
            로그인
          </div>
        ) : (
          <div
            className="cursor-pointer font-bold"
            onClick={() => {
              userLogOut();
              setUser("");
            }}
          >
            로그아웃
          </div>
        )}
        <Login />

        {/* 마이페이지 */}
        <Link to={"/mypage"}>
          <BsFillPersonFill />
        </Link>
      </div>
    </div>
  );
}

export default Header;
