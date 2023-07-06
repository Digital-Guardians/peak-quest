import React, { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useService } from "../../context/ContextProvider";

interface props {
  select: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
  selectBanType: string;
  selectType: any;
  handleSelectBan: Dispatch<SetStateAction<any>>;
}

export default function Ban({
  select,
  setSelect,
  selectBanType,
  selectType,
  handleSelectBan,
}: props) {
  const { userInfo } = useService();
  const { ban_content } = userInfo.ban;

  const handleBanTypeChange = (e: any) => {
    const selectedType = e.target.value;
    handleSelectBan(selectedType);
  };

  return (
    <div className="flex flex-col min-w-[648px] max-h-[992px]">
      {/* 회원관리 */}

      <div>
        <div className="mt-[22px] mb-1 text-xl text-darkGray">회원 정지 기간</div>
        <div className="flex">
          <select
            className={`w-1/3 h-[60px] ${
              select ? "pr-2 text-lg" : ""
            } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
            value={selectType ? selectType : ""}
            onChange={handleBanTypeChange}
          >
            <option value="">선택하세요</option>
            <option value="temporary">기간정지</option>
            <option value="permanent">영구정지</option>
          </select>
          {selectBanType === "temporary" ? (
            <div className="flex">
              <input
                type="date"
                className={`w-1/2  h-[60px] ${
                  select ? "pr-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
              />
              <input
                type="date"
                className={`w-1/2  h-[60px] ${
                  select ? "pr-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <div className="mt-[22px] mb-1 text-xl text-darkGray">정지사유</div>
        <textarea
          className={`w-full h-[207px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
          value={ban_content ? ban_content : ""}
        />
      </div>
      <div className="relative mt-[30px] mb-[50px]">
        <div className="flex font-bold">
          <button
            className={`w-full h-[60px] mr-2 text-lg text-purple bg-white border border-purple rounded-[10px]`}
          >
            회원 정지 취소
          </button>
          <button
            className={`w-full h-[60px] text-lg text-white bg-purple border border-purple rounded-[10px]`}
          >
            회원 정지
          </button>
        </div>
      </div>
    </div>
  );
}
