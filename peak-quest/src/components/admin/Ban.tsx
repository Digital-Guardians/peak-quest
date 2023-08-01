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
  setData: Dispatch<SetStateAction<userData[]>>;
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
  const [user, setUser] = useState(userInfo);
  const { name } = userInfo;
  const { ban_type, ban_content, ban_end_date, ban_start_date } = userInfo.ban;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setContent(ban_content);
    setSelectValue(ban_type);
    setBanDate((prev) => ({ ...prev, start: ban_start_date, end: ban_end_date }));
    setData((prev) => ({ ...prev }));
  }, [userInfo]);

  const handleBanTypeChange = (e: any) => {
    const selectedType = e.target.value;
    setSelectValue(selectedType);
    handleSelectBan(selectedType);
  };

  const handleinputValue = () => {
    if (inputRef.current) {
      setContent((prev) => inputRef.current.value);
    }
  };

  const changeDate = (e) => {
    if (e.target.name === "start") {
      setBanDate((prev) => ({ ...prev, start: e.target.value }));
    } else {
      setBanDate((prev) => ({ ...prev, end: e.target.value }));
    }
  };

  return (
    <div className="flex flex-col min-w-[648px] max-h-[992px]">
      {/* 회원관리 */}

      <form>
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
                name="start"
                onChange={changeDate}
                value={banDate.start ? banDate.start : ""}
                className={`w-1/2  h-[60px] ${
                  select ? "pr-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
              />
              <input
                type="date"
                name="end"
                onChange={changeDate}
                value={banDate.end ? banDate.end : ""}
                className={`w-1/2  h-[60px] ${
                  select ? "pr-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
      <div>
        <div className="mt-[22px] mb-1 text-xl text-darkGray">정지사유</div>
        <input
          ref={inputRef}
          onChange={handleinputValue}
          className={`w-full h-[207px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
          value={content ? content : ""}
        />
      </div>
      <div className="relative mt-[30px] mb-[50px]">
        <div className="flex font-bold">
          <button
            onClick={() => userUnsuspend(name)}
            className={`w-full h-[60px] mr-2 text-lg text-purple bg-white border border-purple rounded-[10px]`}
          >
            회원 정지 취소
          </button>
          <button
            onClick={() => {
              const newData = userSuspend(name, selectValue, content, banDate.start, banDate.end);
              setData(newData);
            }}
            className={`w-full h-[60px] text-lg text-white bg-purple border border-purple rounded-[10px]`}
          >
            회원 정지
          </button>
        </div>
      </div>
    </div>
  );
}
