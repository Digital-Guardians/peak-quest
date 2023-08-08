import { BsShare } from "react-icons/bs";
import { MdOutlineIosShare } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useService } from "../../context/ContextProvider";
import { adminLogin, adminLogOut } from "../../service/firebase";
import { useNavigate } from "react-router-dom";
import { PeakQuestLogo } from "../../assets/icon";

export default function Header() {
  const { setToggle, admin, setAdmin } = useService();

  const navigate = useNavigate();

  function handleLogout() {
    adminLogOut();
    setAdmin(null);
    navigate("/admin");
  }
  return (
    <>
      {admin?.isAdmin && (
        <header className="fixed z-10 flex h-[60px] w-full items-center justify-between bg-purple">
          <RxHamburgerMenu
            className="absolute ml-5 cursor-pointer text-2xl font-bold text-white"
            onClick={() => setToggle((prev: any) => !prev)}
          />
          <div className="ml-16 min-w-[100px] bg-white"></div>
          <div className="mr-5 flex min-w-[453px] text-base font-light leading-6">
            <button className="mr-3 rounded-lg border border-white px-4 py-[5px] text-white">
              위젯 수정
            </button>
            <button className="mr-3 flex items-center rounded-lg border border-white bg-white px-5 py-[5px] text-black">
              <BsShare className="mr-2 text-[14px]" />
              공유
            </button>
            <button className="mr-3 flex items-center rounded-lg border border-white bg-white px-5 py-[5px] text-black">
              <MdOutlineIosShare className="mr-2 text-[14px]" />
              내보내기
            </button>
            {admin && (
              <button
                className="flex items-center rounded-lg border border-white bg-white px-5 py-[5px] text-black"
                onClick={handleLogout}
              >
                <div className="mr-2 text-[12px]">✕</div>
                나가기
              </button>
            )}
            {!admin && (
              <button
                className="flex items-center rounded-lg border border-white bg-white px-5 py-[5px] text-black"
                onClick={adminLogin}
              >
                <div className="mr-2 text-[12px]">✕</div>
                로그인
              </button>
            )}
          </div>
        </header>
      )}
    </>
  );
}
