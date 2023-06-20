import { Outlet } from "react-router-dom";
import Header from "./components/admin/Header";
import Sidebar from "./components/admin/Sidebar";

export default function Admin() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
