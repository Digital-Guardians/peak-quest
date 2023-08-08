import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import FloatingBtn from "./components/FloatingBtn";
import { useEffect } from "react";
import UserProvider from "./context/userProvider";
import Header from "./components/Header";


  const nav = useNavigate();
  const t: any = [];

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "A" ||
        e.key === "D" ||
        e.key === "M" ||
        e.key === "I" ||
        e.key === "N" ||
        e.key === "!"
      ) {
        t.push(e.key);
        if (t.length > 6) {
          t.splice(0, 1);
          console.log(t);
        }
      }
      if (t.join("") === "ADMIN!" && e.key === "Enter") {
        nav("/admin");
      }
    });
  }, []);

function App() {
  return (
    <UserProvider>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-[430px]">
          <FloatingBtn />
          <Outlet />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
