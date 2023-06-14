import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="flex items-center">
      <div className="w-full max-w-[430px]">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
