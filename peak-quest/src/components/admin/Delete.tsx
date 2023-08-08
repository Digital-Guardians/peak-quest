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
    <div className="flex max-h-[992px] min-w-[648px] flex-col">
      <div>
        <div className="mb-1 mt-[22px] text-xl text-darkGray">탈퇴 요청 여부</div>
        <div className="flex">
          <input
            className={`h-[56px]  w-full ${
              select ? "pl-2 text-lg" : ""
            } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
            value={delete_state}
            readOnly
          />
        </div>
      </div>
      <div>
        <div className="mb-1 mt-[22px] text-xl text-darkGray">탈퇴 이유</div>
        <div className="flex">
          <textarea
            className={`mr-[6px] h-[207px] w-full rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
            value={delete_content ? delete_content : ""}
          />
        </div>
      </div>
      <div className="relative mb-[120px] mt-[118px]">
        <div className="flex font-bold">
          {delete_state === "N" ? (
            <button
              className={`mr-2 h-[60px] w-full rounded-[10px] border border-purple bg-white text-lg text-purple`}
            >
              탈퇴 취소
            </button>
          ) : (
            <button
              className={`h-[60px] w-full rounded-[10px] border border-purple bg-purple text-lg text-white`}
            >
              탈퇴 취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
