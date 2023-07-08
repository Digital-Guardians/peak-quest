import { adminLogin, onAdminStateChanged } from "../../service/firebase";
import { useService } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { setAdmin, setSelect } = useService();
  const navigate = useNavigate();

  function handleLogin() {
    console.log("로그인중");
    adminLogin(); //
    // .then((data) => {
    //   console.log(data);
    //   console.log(data.isAdmin);
    //   if (data.isAdmin) {
    //     onAdminStateChanged(setAdmin);
    //     setAdmin(data);
    //     setSelect("dashboard");
    return navigate("/admin/dashboard");
    //     console.log("끝");
    //   } else {
    //     alert("접근 권한이 없습니다.");
    // return navigate("/");
    //   }
    // });
  }

  return (
    <div className="flex w-full justify-center items-center">
      <button className="w-30 h-20 bg-yellow-200 p-20" onClick={handleLogin}>
        로그인하기
      </button>
    </div>
  );
}
