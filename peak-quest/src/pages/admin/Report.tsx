import React, { useEffect, useRef, useState } from "react";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import OutletContainer from "../../components/admin/OutletContainer";
import ReportItem from "./ReportItem";
import { useService } from "../../context/ContextProvider";
import { reportData } from "../../types/type";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
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
            <div className="flex flex-col w-full">
              {/* inputContainer */}
              <div className="flex w-full h-1/5 pb-2">
                <form className="w-full" action="submit" onSubmit={handleInput}>
                  <input
                    ref={inputRef}
                    onSubmit={handleInput}
                    className={`w-full  h-[56px] ${
                      select ? "pl-2 text-lg" : ""
                    } border border-[#D9D9D9] mt-2 pl-4 rounded-[10px] half:mx-1`}
                    placeholder="찾고자 하는 닉네임을 입력후 앤터키를 눌러주세요"
                  />
                </form>
              </div>
              {/* reportState */}
              <div className="flex justify-center items-center w-full h-[132px] pb-3 text-[32px] font-bold border-b border-gray">
                <div
                  className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                  data-id="ALL"
                  onClick={selectReport}
                >
                  <div className={`${reportSelect === "ALL" ? "text-red" : ""}`}>
                    {userCount && userCount.all}
                  </div>
                  <div className="text-lg font-normal">전체</div>
                </div>
                <div
                  className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                  data-id="notRead"
                  onClick={selectReport}
                >
                  <div className={`${reportSelect === "notRead" ? "text-red" : ""}`}>
                    {userCount && userCount.notRead}
                  </div>
                  <div className="text-lg font-normal">안 읽음</div>
                </div>
                <div
                  className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
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
              <div className="w-full h-2/3 mt-9">
                <div className="flex text-xl text-darkGray font-bold mb-5 border-b pb-4 border-[#F2F2F2]">
                  <div className="w-[12%] text-xl text-center">NO.</div>
                  <div className="w-[30%] text-xl text-center">닉네임</div>
                  <div className="w-[20%] text-xl text-center">신고유형</div>
                  <div className="w-[20%] text-xl text-center">상태</div>
                  <div className="w-[18%] text-xl text-center">관리</div>
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
                  value={`${reportInfo ? date : ""}`}
                />
              </div>
              <div>
                <div className="mt-[22px] mb-1 text-xl text-darkGray">유저 닉네임</div>
                <input
                  className={`w-full  h-[56px] ${
                    select ? "pl-2 text-lg" : ""
                  } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                  value={`${reportInfo ? name : ""}`}
                />
              </div>
              <div>
                <div className="mt-[22px] mb-1 text-xl text-darkGray">신고 유형</div>
                <input
                  className={`w-full  h-[56px] ${
                    select ? "pl-2 text-lg" : ""
                  } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                  value={`${reportInfo ? type : ""}`}
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
                    value={`${reportInfo ? link : ""}`}
                  />
                  <button
                    className="w-1/4 bg-white text-purple border border-purple rounded-[10px]"
                    onClick={() => window.open(`${link}`)}
                  >
                    바로가기
                  </button>
                </div>
              </div>
              <div className="relative mt-[118px] mb-[120px]">
                <div className="flex font-bold">
                  <button
                    onClick={() => {
                      reportDelete(id).then((res) => setData(res as reportData[]));
                    }}
                    className={`w-1/2 h-[60px] mr-2 text-lg text-purple bg-white border border-purple rounded-[10px]`}
                  >
                    삭제하기
                  </button>
                  <button
                    onClick={() => reportChecked(name).then((res: any) => setData(res))}
                    className={`w-1/2 h-[60px]text-lg text-white bg-purple border border-purple rounded-[10px]`}
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
