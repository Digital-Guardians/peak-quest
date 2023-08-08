import React, { useEffect, useRef, useState } from "react";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import OutletContainer from "../../components/admin/OutletContainer";
import ReportItem from "./ReportItem";
import { useService } from "../../context/ContextProvider";
import { reportData } from "../../types/type";
import { IoIosArrowBack } from "react-icons/io";
import "./page.css";
import {
  getReportStateAll,
  getReportStateFalse,
  getReportStateTrue,
  reportChecked,
  reportDelete,
  searchReportUser,
  searchUser,
} from "../../service/firebase";

interface ReportState {
  all: number;
  notRead: number;
  checked: number;
}

const defaultUserCount: ReportState = {
  all: 0,
  checked: 0,
  notRead: 0,
};

const defaultData: reportData = {
  content: "",
  date: "",
  id: 0,
  link: "",
  name: "",
  state: true,
  type: "",
  uid: "",
};

export default function Report() {
  const [select, setSelect] = useState(false);
  const [reportSelect, setReportSelect] = useState("ALL");
  const [userCount, setUserCount] = useState(defaultUserCount);
  const [reportList, setReportList] = useState<reportData[]>([defaultData]);

  //리랜더용
  const [data, setData] = useState<reportData[]>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { reportInfo, admin } = useService();
  const { name, type, date, content, link, id } = reportInfo;

  useEffect(() => {
    switch (reportSelect) {
      case "ALL":
        getReportStateAll() //
          .then((res) => {
            const all = res as reportData[];
            const checked = res.filter((user: any) => user.state === true).length;
            const notRead = all.length - checked;

            const userCount = {
              all: all.length,
              checked,
              notRead,
            };
            setReportList(all);
            setUserCount(userCount);
          });
        break;
      case "notRead":
        getReportStateFalse() //
          .then((res) => setReportList(res as reportData[]));
        break;
      case "checked":
        getReportStateTrue() //
          .then((res) => setReportList(res as reportData[]));
        break;
    }
  }, [reportSelect, data]);

  function selectReport(e: React.MouseEvent<HTMLDivElement>) {
    const dataId = e.currentTarget.dataset.id;
    if (dataId) {
      setReportSelect(dataId);
    }
  }

  function handleInput(e: any) {
    e.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.length === 0) {
        setReportSelect("ALL");
      } else {
        setReportSelect("");
      }
      searchReportUser(inputRef.current.value) //
        .then((res: any) => setReportList(res as reportData[]));
    }
  }

  return (
    <>
      {admin && (
        <OutletContainer>
          <PageLeft select={select}>
            <div className="flex w-full flex-col">
              {/* inputContainer */}
              <div className="flex h-1/5 w-full pb-2">
                <form className="w-full" action="submit" onSubmit={handleInput}>
                  <input
                    ref={inputRef}
                    onSubmit={handleInput}
                    className={`h-[56px]  w-full ${
                      select ? "pl-2 text-lg" : ""
                    } mt-2 rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
                    placeholder="찾고자 하는 닉네임을 입력후 앤터키를 눌러주세요"
                  />
                </form>
              </div>
              {/* reportState */}
              <div className="flex h-[132px] w-full items-center justify-center border-b border-gray pb-3 text-[32px] font-bold">
                <div
                  className="flex h-[72px] w-1/6 cursor-pointer flex-col items-center justify-center px-5 py-8"
                  data-id="ALL"
                  onClick={selectReport}
                >
                  <div className={`${reportSelect === "ALL" ? "text-red" : ""}`}>
                    {userCount && userCount.all}
                  </div>
                  <div className="text-lg font-normal">전체</div>
                </div>
                <div
                  className="flex h-[72px] w-1/6 cursor-pointer flex-col items-center justify-center px-5 py-8"
                  data-id="notRead"
                  onClick={selectReport}
                >
                  <div className={`${reportSelect === "notRead" ? "text-red" : ""}`}>
                    {userCount && userCount.notRead}
                  </div>
                  <div className="text-lg font-normal">안 읽음</div>
                </div>
                <div
                  className="flex h-[72px] w-1/6 cursor-pointer flex-col items-center justify-center px-5 py-8"
                  data-id="checked"
                  onClick={selectReport}
                >
                  <div className={`${reportSelect === "checked" ? "text-red" : ""}`}>
                    {userCount && userCount.checked}
                  </div>
                  <div className="text-lg font-normal">확인 완료</div>
                </div>
              </div>
              {/* reportList  */}
              <div className="mt-9 h-2/3 w-full">
                <div className="mb-5 flex border-b border-[#F2F2F2] pb-4 text-xl font-bold text-darkGray">
                  <div className="w-[12%] text-center text-xl">NO.</div>
                  <div className="w-[30%] text-center text-xl">닉네임</div>
                  <div className="w-[20%] text-center text-xl">신고유형</div>
                  <div className="w-[20%] text-center text-xl">상태</div>
                  <div className="w-[18%] text-center text-xl">관리</div>
                </div>
                {/* reportItem */}
                {reportList.length > 0 &&
                  reportList.map((report, i) => {
                    return (
                      <ReportItem
                        key={i}
                        index={i}
                        select={select}
                        setSelect={setSelect}
                        report={report}
                      />
                    );
                  })}
              </div>
            </div>
          </PageLeft>
          <PageRight select={select}>
            <div className="flex max-h-[992px] min-w-[648px] flex-col">
              <div
                className="relative flex cursor-pointer text-2xl font-bold"
                onClick={() => {
                  setSelect((prev) => !prev);
                }}
              >
                <IoIosArrowBack className="mr-1 mt-[5px] text-[28px]" />
                <div className="">신고 관리</div>
              </div>
              <div>
                <div className="mb-1 mt-[22px] text-xl text-darkGray">신고 날짜</div>
                <input
                  className={`h-[56px]  w-full ${
                    select ? "pl-2 text-lg" : ""
                  } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
                  value={`${reportInfo ? date : ""}`}
                />
              </div>
              <div>
                <div className="mb-1 mt-[22px] text-xl text-darkGray">유저 닉네임</div>
                <input
                  className={`h-[56px]  w-full ${
                    select ? "pl-2 text-lg" : ""
                  } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
                  value={`${reportInfo ? name : ""}`}
                />
              </div>
              <div>
                <div className="mb-1 mt-[22px] text-xl text-darkGray">신고 유형</div>
                <input
                  className={`h-[56px]  w-full ${
                    select ? "pl-2 text-lg" : ""
                  } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
                  value={`${reportInfo ? type : ""}`}
                />
              </div>
              <div>
                <div className="mb-1 mt-[22px] text-xl text-darkGray">신고사유</div>
                <textarea
                  className={`mr-[6px] h-[207px] w-full rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
                  value={content}
                />
              </div>
              <div>
                <div className="mb-1 mt-[22px] text-xl text-darkGray">신고 게시글 링크</div>
                <div className="flex">
                  <input
                    className={`h-[56px]  w-3/4 ${
                      select ? "pl-2 text-lg" : ""
                    } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
                    value={`${reportInfo ? link : ""}`}
                  />
                  <button
                    className="w-1/4 rounded-[10px] border border-purple bg-white text-purple"
                    onClick={() => window.open(`${link}`)}
                  >
                    바로가기
                  </button>
                </div>
              </div>
              <div className="relative mb-[120px] mt-[118px]">
                <div className="flex font-bold">
                  <button
                    onClick={() => {
                      reportDelete(id).then((res) => setData(res as reportData[]));
                    }}
                    className={`mr-2 h-[60px] w-1/2 rounded-[10px] border border-purple bg-white text-lg text-purple`}
                  >
                    삭제하기
                  </button>
                  <button
                    onClick={() => reportChecked(name).then((res: any) => setData(res))}
                    className={`h-[60px]text-lg w-1/2 rounded-[10px] border border-purple bg-purple text-white`}
                  >
                    신고확인
                  </button>
                </div>
              </div>
            </div>
          </PageRight>
        </OutletContainer>
      )}
    </>
  );
}
