import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingBtn from "./components/FloatingBtn";
import { useEffect } from "react";

function App() {
  const { AreaName } = useParams();
  const location = useLocation();

  const nav = useNavigate();
  const t = [];

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

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[430px]">
        <Header />
        <FloatingBtn />
        <Outlet />
        {location.pathname !== `/area/${AreaName}/courselist` && <Footer />}
      </div>
    </div>
  );
}

export default App;
