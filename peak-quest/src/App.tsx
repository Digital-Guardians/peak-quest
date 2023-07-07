import { Outlet } from "react-router-dom";
import "./App.css";
import FloatingBtn from "./components/FloatingBtn";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[430px]">
        <FloatingBtn />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
