import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useService } from "../../context/ContextProvider";
import { userData } from "../../types/type";
import { userSuspend, userUnsuspend } from "../../service/firebase";

interface props {
  select: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
  selectBanType: string;
  selectType: any;
  handleSelectBan: Dispatch<SetStateAction<any>>;
  setData:any
}

interface date {
  start: string | undefined;
  end: string | undefined;
}

const defaultDate = { start: undefined, end: undefined };

export default function Ban({
  select,
  selectBanType,
  selectType,
  handleSelectBan,
  setData,
}: props) {
  const [selectValue, setSelectValue] = useState("");
  const [content, setContent] = useState("");
  const [banDate, setBanDate] = useState<date>(defaultDate);
  const { userInfo } = useService();
  const { name } = userInfo;
  const { ban_type, ban_content, ban_end_date, ban_start_date } = userInfo.ban;

  const inputRef: any = useRef<HTMLInputElement>();

  useEffect(() => {
    setContent(ban_content);
    setSelectValue(ban_type);
    setBanDate((prev) => ({ ...prev, start: ban_start_date, end: ban_end_date }));
    setData((prev:any) => ({ ...prev }));
  }, [userInfo]);

  const handleBanTypeChange = (e: any) => {
    const selectedType = e.target.value;
    setSelectValue(selectedType);
    handleSelectBan(selectedType);
  };

  const handleinputValue = () => {
    if (inputRef.current) {
      setContent((prev): any => inputRef.current.value);
    }
  };

  const changeDate = (e: any) => {
    if (e.target.name === "start") {
      setBanDate((prev) => ({ ...prev, start: e.target.value }));
    } else {
      setBanDate((prev) => ({ ...prev, end: e.target.value }));
    }
  };

  return (
    <div className="flex max-h-[992px] min-w-[648px] flex-col">
      {/* 회원관리 */}

      <form>
        <div className="mb-1 mt-[22px] text-xl text-darkGray">회원 정지 기간</div>
        <div className="flex">
          <select
            className={`h-[60px] w-1/3 ${
              select ? "pr-2 text-lg" : ""
            } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
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
                name="start"
                onChange={changeDate}
                value={banDate.start ? banDate.start : ""}
                className={`h-[60px]  w-1/2 ${
                  select ? "pr-2 text-lg" : ""
                } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
              />
              <input
                type="date"
                name="end"
                onChange={changeDate}
                value={banDate.end ? banDate.end : ""}
                className={`h-[60px]  w-1/2 ${
                  select ? "pr-2 text-lg" : ""
                } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
      <div>
        <div className="mb-1 mt-[22px] text-xl text-darkGray">정지사유</div>
        <input
          ref={inputRef}
          onChange={handleinputValue}
          className={`mr-[6px] h-[207px] w-full rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
          value={content ? content : ""}
        />
      </div>
      <div className="relative mb-[50px] mt-[30px]">
        <div className="flex font-bold">
          <button
            onClick={() => userUnsuspend(name)}
            className={`mr-2 h-[60px] w-full rounded-[10px] border border-purple bg-white text-lg text-purple`}
          >
            회원 정지 취소
          </button>
          <button
            onClick={() => {
              const newData = userSuspend(name, selectValue, content, banDate.start, banDate.end);
              setData(newData);
            }}
            className={`h-[60px] w-full rounded-[10px] border border-purple bg-purple text-lg text-white`}
          >
            회원 정지
          </button>
        </div>
      </div>
    </div>
  );
}
