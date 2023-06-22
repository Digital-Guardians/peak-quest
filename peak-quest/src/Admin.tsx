import { Outlet } from "react-router-dom";
import Header from "./components/admin/Header";
import Sidebar from "./components/admin/Sidebar2";
import ContextProvider from "./context/ContextProvider";

export default function Admin() {
  return (
    <div className="flex flex-col w-full h-full bg-[#F3F3F3]">
      <ContextProvider>
        <Header />
        <div className="flex">
          {/* <div className="w-[80px]" /> */}
          <Sidebar />
          <Outlet />
        </div>
      </ContextProvider>
    </div>
  );
}
