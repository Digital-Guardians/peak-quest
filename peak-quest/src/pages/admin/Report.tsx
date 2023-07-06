import React, { useEffect, useState } from "react";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import "./page.css";
import OutletContainer from "../../components/admin/OutletContainer";
import ReportItem from "./ReportItem";
import { IoIosArrowBack } from "react-icons/io";
import { useService } from "../../context/ContextProvider";
import { reportData } from "../../types/type";

interface ReportState {
  all: Report[];
  notRead: Report[];
  checked: Report[];
  pending: Report[];
  deleted?: Report[];
}

const defaultReportData: ReportState = {
  all: [],
  notRead: [],
  checked: [],
  pending: [],
};

export default function Report() {
  const [select, setSelect] = useState(false);
  const [reportSelect, setReportSelect] = useState("all");
  const [reportState, setReportState] = useState(defaultReportData);

  const { all, notRead, checked, pending } = reportState;

  const { reportInfo, setReportInfo } = useService();

  const { id, user_name, state, report_type, report_date, content, url } = reportInfo;

  useEffect(() => {
    fetch("/mock/admin/report.json")
      .then((res) => res.json())
      .then((data) => {
        const notRead = data.report.filter((report: reportData) => report.state === "notRead");
        const checked = data.report.filter((report: reportData) => report.state === "checked");
        const pending = data.report.filter((report: reportData) => report.state === "pending");
        const deleted = data.report.filter((report: reportData) => report.delete === "Y");

        return setReportState({
          all: [...data.report],
          notRead,
          checked,
          pending,
          deleted,
        });
      });
  }, []);

  function selectReport(e: React.MouseEvent<HTMLDivElement>) {
    const dataId = e.currentTarget.dataset.id;
    if (dataId) {
      setReportSelect(dataId);
    }
  }

  return (
    <>
      <OutletContainer>
        <PageLeft select={select}>
          <div className="flex flex-col w-full">
            {/* inputContainer */}
            <div className="flex w-full h-1/5 pb-2">
              <input
                className={`w-full  h-[56px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mt-2 pl-4 rounded-[10px] half:mx-1`}
                placeholder="닉네임 검색"
              />
            </div>
            {/* reportState */}
            <div className="flex justify-center items-center w-full h-[132px] pb-3 text-[32px] font-bold border-b border-gray">
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="all"
                onClick={selectReport}
              >
                <div className={`${reportSelect === "all" ? "text-red" : ""}`}>{all.length}</div>
                <div className="text-lg font-normal">전체</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="notRead"
                onClick={selectReport}
              >
                <div className={`${reportSelect === "notRead" ? "text-red" : ""}`}>
                  {notRead.length}
                </div>
                <div className="text-lg font-normal">안 읽음</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="checked"
                onClick={selectReport}
              >
                <div className={`${reportSelect === "checked" ? "text-red" : ""}`}>
                  {checked.length}
                </div>
                <div className="text-lg font-normal">확인 완료</div>
              </div>
            </div>
            {/* reportList  */}
            <div className="w-full h-2/3 mt-9">
              <div className="flex text-xl text-darkGray font-bold mb-5 border-b pb-4 border-[#F2F2F2]">
                <div className="w-[12%] text-xl text-center">NO.</div>
                <div className="w-[30%] text-xl text-center">닉네임</div>
                <div className="w-[20%] text-xl text-center">신고유형</div>
                <div className="w-[20%] text-xl text-center">상태</div>
                <div className="w-[18%] text-xl text-center">관리</div>
              </div>
              {/* reportItem */}
              {reportState &&
                reportState.all.map((report, i) => {
                  return (
                    <ReportItem key={i} select={select} setSelect={setSelect} report={report} />
                  );
                })}
            </div>
          </div>
        </PageLeft>
        <PageRight select={select}>
          <div className="flex flex-col min-w-[648px] max-h-[992px]">
            <div
              className="relative flex text-2xl font-bold cursor-pointer"
              onClick={() => {
                setSelect((prev) => !prev);
              }}
            >
              selectBtn
            </div>
          </div>
        </PageRight>
      </OutletContainer>
    </>
  );
}
