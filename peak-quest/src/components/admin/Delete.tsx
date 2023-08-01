import React, { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useService } from "../../context/ContextProvider";
import { userData } from "../../types/type";

interface props {
  select: boolean;
  setData: Dispatch<SetStateAction<userData[]>>;
}

export default function Delete({ select, setData }: props) {
  const { userInfo } = useService();
  const { delete_state, delete_content } = userInfo.delete;

  return (
    <div className="flex flex-col min-w-[648px] max-h-[992px]">
      <div>
        <div className="mt-[22px] mb-1 text-xl text-darkGray">탈퇴 요청 여부</div>
        <div className="flex">
          <input
            className={`w-full  h-[56px] ${
              select ? "pl-2 text-lg" : ""
            } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
            value={delete_state}
            readOnly
          />
        </div>
      </div>
      <div>
        <div className="mt-[22px] mb-1 text-xl text-darkGray">탈퇴 이유</div>
        <div className="flex">
          <textarea
            className={`w-full h-[207px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
            value={delete_content ? delete_content : ""}
          />
        </div>
      </div>
      <div className="relative mt-[118px] mb-[120px]">
        <div className="flex font-bold">
          {delete_state === "N" ? (
            <button
              className={`w-full h-[60px] mr-2 text-lg text-purple bg-white border border-purple rounded-[10px]`}
            >
              탈퇴 취소
            </button>
          ) : (
            <button
              className={`w-full h-[60px] text-lg text-white bg-purple border border-purple rounded-[10px]`}
            >
              탈퇴 취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
