import React, { Dispatch, SetStateAction } from "react";
import { useService } from "../../context/ContextProvider";
import { reportData } from "../../types/type";

interface props {
  index: number;
  select: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
  report: reportData;
}

export default function ReportItem({ select, setSelect, report, index }: props) {
  const { name, state, type } = report;

  console.log(report);

  const { setReportInfo } = useService();

  return (
    <div className="flex w-full h-[84px] text-lg text-darkGray font-normal mb-5 border-b border-[#F2F2F2]">
      <div className={`flex justify-center items-center w-[12%] text-xl`}>{index + 1}</div>
      <div className={`flex justify-center items-center w-[30%] ${select ? "text-lg" : "text-xl"}`}>
        {name}님
      </div>
      <div className={`flex justify-center items-center w-[20%] ${select ? "text-lg" : "text-xl"}`}>
        {type === "info_error" ? "정보오류" : "부적절한 내용"}
      </div>
      <div className={`flex justify-center items-center w-[20%] text-lg text-center`}>
        {!state && <NotRead />}
        {state && <Checked />}
      </div>
      <div className="flex justify-center items-center w-[18%] text-lg">
        {
          <button
            className={`${
              select ? "w-1/2" : ""
            }  w-[110px] h-[44px] text-lg text-purple border border-purple rounded-[10px] transition-all duration-[1s] ease-in-out`}
            onClick={() => {
              if (!select) {
                setSelect((prev) => !prev);
                setReportInfo(report);
              } else {
                setReportInfo(report);
              }
            }}
          >
            상세 보기
          </button>
        }
      </div>
    </div>
  );
}

function NotRead() {
  return (
    <div className="flex justify-center items-center w-[72px] h-[32px] rounded-[10px] bg-darkGray text-white">
      안읽음
    </div>
  );
}
function Checked() {
  return (
    <div className="flex justify-center items-center w-[72px] h-[32px] rounded-[10px] bg-lightPurple text-purple">
      확인
    </div>
  );
}
