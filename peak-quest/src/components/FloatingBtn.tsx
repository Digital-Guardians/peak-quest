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
    <div className="fixed bottom-4 right-4 z-10">
      <button
        onClick={scrollToTop}
        className={`
      flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg
      ${
        showFloatingBtn ? "translate-y-0" : "translate-y-[126px]"
      } transition-all duration-500`}
      >
        <ArrowUpBtn />
      </button>
      <button
        className={`my-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#FAE300] shadow-lg ${
          showFloatingBtn ? "translate-y-0" : "translate-y-[999px]"
        } transition-all duration-700`}
      >
        <KakaoTalkBtn />
      </button>
      <Link to={"/area"}>
        <button
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-lg ${
            showFloatingBtn ? "translate-y-0" : "translate-y-[999px]"
          } transition-all duration-700`}
        >
          <CreateCourseBtn />
        </button>
      </Link>
      <button
        className="mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-lg"
        onClick={toggleFloatingBtn}
      >
        <MoreBtn />
      </button>
    </div>
  );
}

export default FloatingBtn;
