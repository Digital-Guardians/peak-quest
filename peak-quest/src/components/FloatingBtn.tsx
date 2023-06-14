import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpBtn,
  CreateCourseBtn,
  KakaoTalkBtn,
  MoreBtn,
} from "../assets/icon";

function FloatingBtn() {
  const [showFloatingBtn, setShowFloatingBtn] = useState<boolean>(false);

  const toggleFloatingBtn = (): void => {
    setShowFloatingBtn((prev) => !prev);
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={scrollToTop}
        className={`
      bg-blue-500 rounded-full text-white w-14 h-14 flex items-center justify-center shadow-lg
      ${
        showFloatingBtn ? "translate-y-0" : "translate-y-[126px]"
      } transition-all duration-500`}
      >
        <ArrowUpBtn />
      </button>
      <button
        className={`bg-[#FAE300] my-2 rounded-full w-14 h-14 flex items-center justify-center shadow-lg ${
          showFloatingBtn ? "translate-y-0" : "translate-y-[999px]"
        } transition-all duration-700`}
      >
        <KakaoTalkBtn />
      </button>
      <Link to={"/area"}>
        <button
          className={`bg-blue-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg ${
            showFloatingBtn ? "translate-y-0" : "translate-y-[999px]"
          } transition-all duration-700`}
        >
          <CreateCourseBtn />
        </button>
      </Link>
      <button
        className="bg-blue-500 rounded-full mt-2 w-14 h-14 flex items-center justify-center shadow-lg"
        onClick={toggleFloatingBtn}
      >
        <MoreBtn />
      </button>
    </div>
  );
}

export default FloatingBtn;
