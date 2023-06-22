import React, { useEffect, useState } from "react";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import "./page.css";
import OutletContainer from "../../components/admin/OutletContainer";
import ReportItem from "./ReportItem";
import { IoIosArrowBack } from "react-icons/io";
import { useService } from "../../context/ContextProvider";

interface ReportState {
  all: Report[];
  notRead: Report[];
  checked: Report[];
  pending: Report[];
  deleted?: Report[];
}

const reportType: ReportState = {
  all: [],
  notRead: [],
  checked: [],
  pending: [],
};

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

export default function Report() {
  const [select, setSelect] = useState(false);
  const [reportSelect, setReportSelect] = useState("all");
  const [reportState, setReportState] = useState(reportType);

  const { all, notRead, checked, pending, deleted } = reportState;

  const { reportInfo, setReportInfo } = useService();

  const { id, user_name, state, report_type, report_date, content, url } = reportInfo;

  useEffect(() => {
    fetch("/mock/admin/report.json")
      .then((res) => res.json())
      .then((data) => {
        const notRead = data.report.filter((report: Report) => report.state === "notRead");
        const checked = data.report.filter((report: Report) => report.state === "checked");
        const pending = data.report.filter((report: Report) => report.state === "pending");
        const deleted = data.report.filter((report: Report) => report.delete === "Y");

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
              {/* <select
                className={`w-1/5  h-[60px] ${
                  select ? "pr-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
              >
                <option value="" disabled className="hidden">
                  처리상태
                </option>
                <option value="notRead">안 읽음</option>
                <option value="checked">읽음</option>
                <option value="pending">보류</option>
              </select> */}
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
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="pending"
                onClick={selectReport}
              >
                <div className={`${reportSelect === "pending" ? "text-red" : "text-darkGray"}`}>
                  {pending.length}
                </div>
                <div className="text-lg font-normal">삭제 처리</div>
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
              <IoIosArrowBack className="mt-[5px] mr-1 text-[28px]" />
              <div className="">신고 관리</div>
            </div>
            <div>
              <div className="mt-[22px] mb-1 text-xl text-darkGray">신고 날짜</div>
              <input
                className={`w-full  h-[56px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                value={`${reportInfo ? report_date : ""}`}
              />
            </div>
            <div>
              <div className="mt-[22px] mb-1 text-xl text-darkGray">유저 닉네임</div>
              <input
                className={`w-full  h-[56px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                value={`${reportInfo ? user_name : ""}`}
              />
            </div>
            <div>
              <div className="mt-[22px] mb-1 text-xl text-darkGray">신고 유형</div>
              <input
                className={`w-full  h-[56px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                value={`${reportInfo ? report_type : ""}`}
              />
            </div>
            <div>
              <div className="mt-[22px] mb-1 text-xl text-darkGray">신고사유</div>
              <textarea
                className={`w-full h-[207px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
                value={content}
              />
            </div>
            <div>
              <div className="mt-[22px] mb-1 text-xl text-darkGray">신고 게시글 링크</div>
              <div className="flex">
                <input
                  className={`w-3/4  h-[56px] ${
                    select ? "pl-2 text-lg" : ""
                  } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                  value={`${reportInfo ? url : ""}`}
                />
                <button
                  className="w-1/4 bg-white text-purple border border-purple rounded-[10px]"
                  onClick={() => window.open(`${url}`)}
                >
                  바로가기
                </button>
              </div>
            </div>
            <div className="relative mt-[118px] mb-[120px]">
              <div className="flex font-bold">
                <button
                  className={`w-1/2 h-[60px] mr-2 text-lg text-purple bg-white border border-purple rounded-[10px]`}
                >
                  삭제하기
                </button>
                <button
                  className={`w-1/2 h-[60px]text-lg text-white bg-purple border border-purple rounded-[10px]`}
                >
                  신고확인
                </button>
              </div>
            </div>
          </div>
        </PageRight>
      </OutletContainer>
    </>
  );
}
