import { BsShare } from "react-icons/bs";
import { MdOutlineIosShare } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useService } from "../../context/ContextProvider";
import { useEffect, useState } from "react";

export default function Header() {
  const { setToggle } = useService();

  return (
    <header className="fixed flex justify-between items-center w-full h-[60px] bg-purple z-10">
      <RxHamburgerMenu
        className="absolute text-white text-2xl font-bold ml-5 cursor-pointer"
        onClick={() =>
          setToggle((prev) => {
            console.log(prev);

            return !prev;
          })
        }
      />
      <div className="ml-16 min-w-[100px] bg-white">⭐️</div>
      <div className="flex min-w-[453px] text-base leading-6 font-light mr-5">
        <button className="border px-4 py-[5px] mr-3 text-white border-white rounded-lg">
          위젯 수정
        </button>
        <button className="flex items-center border px-5 py-[5px] mr-3 text-black border-white rounded-lg bg-white">
          <BsShare className="text-[14px] mr-2" />
          공유
        </button>
        <button className="flex items-center border px-5 py-[5px] mr-3 text-black border-white rounded-lg bg-white">
          <MdOutlineIosShare className="text-[14px] mr-2" />
          내보내기
        </button>
        <button className="flex items-center border px-5 py-[5px] text-black border-white rounded-lg bg-white">
          <div className="text-[12px] mr-2">✕</div>
          나가기
        </button>
      </div>
    </header>
  );
}