import React, { Dispatch, SetStateAction } from "react";
import { useService } from "../../context/ContextProvider";

interface Report {
  id: number;
  user_name: string;
  state: string;
  report_type: string;
  report_date: string;
  content: string;
  url: string;
  delete: string;
}

interface props {
  select: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
  report: Report;
}

export default function ReportItem({ select, setSelect, report }: props) {
  console.log(report);
  const { id, user_name, state, report_type } = report;

  const { setReportInfo } = useService();

  return (
    <div className="flex w-full h-[84px] text-lg text-darkGray font-normal mb-5 border-b border-[#F2F2F2]">
      <div className={`flex justify-center items-center w-[12%] text-xl`}>{id}</div>
      <div className={`flex justify-center items-center w-[30%] ${select ? "text-lg" : "text-xl"}`}>
        {user_name}님
      </div>
      <div className={`flex justify-center items-center w-[20%] ${select ? "text-lg" : "text-xl"}`}>
        {report_type}
      </div>
      <div className={`flex justify-center items-center w-[20%] text-lg text-center`}>
        {state === "notRead" && <NotRead />}
        {state === "checked" && <Checked />}
        {state === "pending" && <Pending />}
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
            수정
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
function Pending() {
  return (
    <div className="flex justify-center items-center w-[72px] h-[32px] rounded-[10px] bg-gray">
      보류
    </div>
  );
}
