import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import FloatingBtn from "./components/FloatingBtn";

function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[430px]">
        <Header />
        <FloatingBtn />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
