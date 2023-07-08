import React from "react";
import { MdDashboard } from "react-icons/md";
import { MdPhotoAlbum, MdSwitchAccount } from "react-icons/md";
import { BsShieldFillExclamation } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useService } from "../../context/ContextProvider";

const SELECT_CSS = "text-[#3719C0] bg-[#F3F0FF] transition-all duration-500";

export default function Sidebar() {
  const { toggle, select, setSelect, admin } = useService();

  const navigate = useNavigate();

  function selectButton(e: React.MouseEvent<HTMLDivElement>) {
    const dataId = e.currentTarget.dataset.id;

    if (!admin && dataId) {
      setSelect(dataId);
      return navigate("/admin");
    }

    if (dataId) {
      setSelect(dataId);
      navigate(`/admin/${dataId}`);
    }
  }

  return (
    <>
      {admin?.isAdmin && (
        <div className="sticky top-0 flex h-screen flex-col">
          <div
            className={`flex flex-col justify-between mb-[9px] bg-white rounded-xl ${
              toggle ? "w-[240px] h-[74%] " : "w-[80px] h-full"
            } transition-all duration-500`}
          >
            <div
              className={`relative flex flex-col mx-auto text-lg mt-[74px]
        ${toggle ? " w-[224px]" : "w-[80px] h-full"} `}
            >
              <div
                className={`flex items-center rounded-md mb-3 cursor-pointer  ${
                  select === "dashboard" ? SELECT_CSS : ""
                } 
            ${toggle ? "h-[48px]" : "ml-1 flex flex-col text-md w-[72px] h-[60px] pt-2"}`}
                data-id="dashboard"
                onClick={selectButton}
              >
                <MdDashboard className="text-purple ml-3 text-2xl mr-3 mb-1" />
                대시보드
              </div>
              <div
                className={`flex items-center rounded-md mb-3 cursor-pointer ${
                  select === "banner" ? SELECT_CSS : ""
                } 
            ${toggle ? "h-[48px]" : "ml-1 flex flex-col text-md w-[72px] h-[60px] pt-2"}`}
                data-id="banner"
                onClick={selectButton}
              >
                <MdPhotoAlbum className="text-purple ml-3 text-2xl mr-3 mb-1" />
                배너관리
              </div>
              <div
                className={`flex items-center rounded-md mb-3 cursor-pointer ${
                  select === "report" ? SELECT_CSS : ""
                } 
            ${toggle ? "h-[48px]" : "ml-1 flex flex-col text-md w-[72px] h-[60px] pt-2"}`}
                data-id="report"
                onClick={selectButton}
              >
                <BsShieldFillExclamation className="text-purple ml-3 text-2xl mr-3 mb-1" />
                신고관리
              </div>
              <div
                className={`flex items-center rounded-md mb-3 cursor-pointer ${
                  select === "user" ? SELECT_CSS : ""
                } 
            ${toggle ? "h-[48px]" : "ml-1 flex flex-col text-md w-[72px] h-[60px] pt-2"}`}
                data-id="user"
                onClick={selectButton}
              >
                <MdSwitchAccount className="text-purple ml-3 text-2xl mr-3 mb-1" />
                회원관리
              </div>
            </div>
            <div
              className={`relative flex-col justify-center items-center mx-auto bottom-6 ${
                toggle ? "hidden" : "flex"
              }`}
            >
              <img
                className={`${toggle ? "w-16 h-16 " : "w-9 h-9"} rounded-full `}
                src={admin ? admin.photoURL : ""}
                alt=""
              />
            </div>
          </div>
          <div
            className={`relative flex flex-col w-[240px] h-[25%] justify-center items-center  mx-auto text-lg ${
              toggle ? "bottom-0" : "hidden"
            }`}
          >
            <div
              className={`flex flex-col justify-center items-center z-20 ${toggle ? "" : "h-0"}`}
            >
              {admin && (
                <img
                  className={`${toggle ? "w-16 h-16 " : "half:w-9 half:h-9 hidden"} rounded-full `}
                  src={admin ? admin.photoURL : ""}
                  alt=""
                />
              )}
              {!admin && (
                <div className={`${toggle ? "w-16 h-16 " : "w-9 h-9"} bg-white rounded-full `} />
              )}
              <div
                className={`flex flex-col justify-center items-center text-white font-bold ${
                  toggle ? "" : "hidden"
                }`}
              >
                <div className="mt-3">{admin ? admin.displayName : ""}</div>
                <div>{admin ? admin.email : "로그인 해라"}</div>
              </div>
            </div>
            <div
              className={`absolute w-[240px] h-[240px] mt-1 bg-black bg-opacity-90 z-10 rounded-xl ${
                toggle ? "" : "hidden"
              }`}
            />
            <img
              className={`absolute w-[240px] h-[240px] mt-1 border-white border rounded-xl ${
                toggle ? "" : "hidden"
              }`}
              src={admin ? admin.photoURL : ""}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
