import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
  select: boolean;
}

export default function PageRight({ children, select }: props) {
  return (
    <div
      className={`flex justify-center  ${
        select ? "w-1/2" : "w-0"
      } h-screen transition-all  duration-[1s] ease-in-out`}
    >
      {/* radius 왼쪽 지우고 오른쪽만 하기! */}
      <div
        className="w-[98%] h-[93%] mt-[69px]
        bg-white rounded-tr-2xl rounded-br-2xl 
        overflow-y-scroll scrollbar-custom 
        shadow-3xl ease-out"
      >
        {children}
      </div>
    </div>
  );
}
