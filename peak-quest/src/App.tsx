import { Outlet } from "react-router-dom";
import "./App.css";
import FloatingBtn from "./components/FloatingBtn";
import UserProvider from "./context/userProvider";
import Header from "./components/Header";


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
