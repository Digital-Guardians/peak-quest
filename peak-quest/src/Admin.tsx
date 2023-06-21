import { Outlet } from "react-router-dom";
import Header from "./components/admin/Header";
import Sidebar from "./components/admin/Sidebar2";

export default function Admin() {
  return (
    <div className="flex flex-col w-full h-full bg-[#F3F3F3]">
      <Header />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
