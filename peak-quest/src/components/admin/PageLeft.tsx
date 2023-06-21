import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
  select: boolean;
}

export default function PageLeft({ children, select }: props) {
  return (
    <div
      className={`flex justify-center ${
        select ? "w-1/2" : "w-full"
      } h-screen transition-all duration-[1s] ease-in-ou`}
    >
      <div
        className="
          w-[98%] h-[93%] mt-[69px] 
          bg-white rounded-tl-2xl rounded-bl-2xl
          overflow-y-scroll scrollbar-custom
          shadow-3xl"
      >
        {children}
      </div>
    </div>
  );
}
