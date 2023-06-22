import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
  select: boolean;
}

export default function PageRight({ children, select }: props) {
  return (
    <div
      className={`flex justify-center ${
        select ? "w-1/2" : "w-0"
      } h-screen transition-all duration-[1s] ease-in-out`}
    >
      <div
        className={`
          w-[98%] h-[92%] mt-[69px] pt-5 pl-5
          bg-white ${select ? "rounded-tl-2xl rounded-bl-2xl" : "rounded-2xl"}
          overflow-y-scroll scrollbar-custom
          shadow-3xl`}
      >
        <div
          className={`${
            select ? "" : "p-[1%]"
          } w-[98%] mx-auto transition-all duration-[1s] ease-in-out`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
