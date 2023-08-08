import { adminLogin, onAdminStateChanged } from "../../service/firebase";
import { GoogleLoginBtn, PeakQuestLogo } from "../../assets/icon";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  function handleLogin() {
    console.log("로그인중");
    adminLogin(); //
    return navigate("/admin/dashboard");
  }

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="p-4">관리자 페이지 로그인</div>
      <button className="mb-4 w-64 cursor-pointer rounded-lg bg-white border border-gray transition-shadow duration-300 hover:shadow-md">
        <div
          className="flex items-center justify-center space-x-2 py-2"
          onClick={() => {
            handleLogin();
          }}
        >
          <GoogleLoginBtn />
          <div className="text-[14px] font-medium">구글로 시작하기</div>
        </div>
      </button>
    </div>
  );
}
