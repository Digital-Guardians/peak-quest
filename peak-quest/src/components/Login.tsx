import { IoClose } from "react-icons/io5";
import { GoogleLoginBtn, PeakQuestLogo } from "../assets/icon";
import { useUserContext } from "../context/userContext";
import { userLogin } from "../service/firebase";

export default function Login() {
  // useUserContext에서 가져온 값 사용
  const { isOpenLogin, handleCloseLoginPopup, user, setUser } =
    useUserContext();

  return (
    <div>
      {isOpenLogin && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div
            onClick={handleCloseLoginPopup}
            className="absolute inset-0 bg-black opacity-70"
          />
          <div className="relative flex max-w-[430px] items-center justify-center rounded-lg bg-white p-10 text-center text-black shadow-3xl">
            <div className="flex flex-col items-center justify-center">
              {/* 로고 */}
              <div>
                <PeakQuestLogo />
              </div>
              {/* 내용 */}
              <h2 className="my-4 text-black">
                <p className="text-lg sm:text-md">구글 로그인으로 간편하게</p>
                <p className="text-lg sm:text-md">
                  나만의 코스를 만들고, 공유해보세요.
                </p>
              </h2>
              {/* 버튼 */}
              <button className="mb-4 w-full cursor-pointer rounded-lg border border-gray transition-shadow duration-300 hover:shadow-md">
                <div
                  className="flex items-center justify-center space-x-2 py-2"
                  onClick={() => {
                    userLogin();
                    handleCloseLoginPopup();
                  }}
                >
                  <GoogleLoginBtn />
                  <div className="text-[14px] font-medium">구글로 시작하기</div>
                </div>
              </button>
              <div className="text-md font-light text-[#939393]">
                더 많은 로그인 채널을 준비중입니다.
              </div>
            </div>
            {/* 닫기 버튼 */}
            <button
              onClick={handleCloseLoginPopup}
              className="absolute right-2 top-2 text-gray"
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
