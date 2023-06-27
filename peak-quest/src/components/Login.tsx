import { IoClose } from "react-icons/io5";
import { GoogleLoginBtn } from "../assets/icon";
import { useUserContext } from "../context/userContext";

export default function Login() {
  // useUserContext에서 가져온 값 사용
  const { isOpenLogin, handleCloseLoginPopup } = useUserContext();

  return (
    <div>
      {isOpenLogin && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div
            onClick={handleCloseLoginPopup}
            className="absolute inset-0 bg-black opacity-70"
          />
          <div className="max-w-[430px] relative flex items-center justify-center rounded-lg bg-white p-10 text-center text-black shadow-3xl">
            <div className="sm:w-full">
              {/* 로고 */}
              <div>logo</div>
              {/* 내용 */}
              <h2 className="text-black my-4">
                <p className="text-lg sm:text-md">구글 로그인으로 간편하게</p>
                <p className="text-lg sm:text-md">
                  나만의 코스를 만들고, 공유해보세요.
                </p>
              </h2>
              {/* 버튼 */}
              <button className="mb-4 w-full cursor-pointer rounded-lg border border-gray hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center space-x-2 py-2 items-center">
                  <GoogleLoginBtn />
                  <div className="text-[14px] font-medium">구글로 시작하기</div>
                </div>
              </button>
              <div className="text-md text-[#939393] font-light">
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
