import { Outlet } from "react-router-dom";
import "./App.css";
import FloatingBtn from "./components/FloatingBtn";

function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[430px]">
        <FloatingBtn />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
