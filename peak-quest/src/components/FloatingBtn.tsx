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
    // courseList page scroll 올리기 위해 설정
    const content = document.getElementById("courseList");
    content?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={scrollToTop}
        className={`
      flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg
      ${
        showFloatingBtn ? "translate-y-0" : "translate-y-[126px]"
      } transition-all duration-500`}
      >
        <ArrowUpBtn />
      </button>
      <button
        className={`my-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FAE300] shadow-lg ${
          showFloatingBtn ? "translate-y-0" : "translate-y-[999px]"
        } transition-all duration-700`}
      >
        <KakaoTalkBtn />
      </button>
      <Link to={"/area"}>
        <button
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-lg ${
            showFloatingBtn ? "translate-y-0" : "translate-y-[999px]"
          } transition-all duration-700`}
        >
          <CreateCourseBtn />
        </button>
      </Link>
      <button
        className="mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-lg"
        onClick={toggleFloatingBtn}
      >
        <MoreBtn />
      </button>
    </div>
  );
}

export default FloatingBtn;
