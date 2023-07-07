import { Outlet, useLocation, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingBtn from "./components/FloatingBtn";

function App() {
  const { AreaName } = useParams();
  const location = useLocation();

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[430px]">
        <FloatingBtn />
        <Outlet />
        {/* {location.pathname !== `/area/${AreaName}/courselist` && <Footer />} */}
      </div>
    </div>
  );
}

export default App;
