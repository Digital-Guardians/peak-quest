import { adminLogin, onAdminStateChanged } from "../../service/firebase";
import { useService } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  function handleLogin() {
    console.log("로그인중");
    adminLogin(); //
    return navigate("/admin/dashboard");
  }

  return (
    <div className="flex w-full justify-center items-center">
      <button className="w-30 h-20 bg-yellow-200 p-20" onClick={handleLogin}>
        로그인하기
      </button>
    </div>
  );
}
