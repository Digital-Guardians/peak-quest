import "./page.css";
import OutletContainer from "../../components/admin/OutletContainer";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import UserListItem from "./UserListItem";
import { useService } from "../../context/ContextProvider";
import Ban from "../../components/admin/Ban";
import Delete from "../../components/admin/Delete";

export default function User() {
  const [select, setSelect] = useState(false);
  const [selectList, setSelectList] = useState("all");
  const [userList, setUserList] = useState([]);
  const [selectBanType, setSelectBanType] = useState("");

  const [selectType, setSelectType] = useState({});
  // const [showInput, setShowInput] = useState(false);

  const { userInfo } = useService();
  const { delete_state, delete_content } = userInfo.delete;
  const { ban_type, ban_content } = userInfo.ban;

  useEffect(() => {
    fetch("/mock/admin/userList.json")
      .then((res) => res.json())
      .then((data) => {
        return setUserList(data.users);
      });
  }, []);

  function selectReport(e: React.MouseEvent<HTMLDivElement>) {
    const dataId = e.currentTarget.dataset.id;
    if (dataId) {
      setSelectList(dataId);
    }
  }

  const handleBanTypeChange = (e: any) => {
    const selectedType = e.target.value;
    handleSelectBan(selectedType);
  };

  function handleSelectBan(banType: string) {
    setSelectBanType(banType);
    setSelectType(banType);
  }

  console.log(ban_type);

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
            {/* userState */}
            <div className="flex justify-center items-center w-full h-[132px] pb-3 text-[32px] font-bold border-b border-gray">
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="all"
                onClick={selectReport}
              >
                <div className={`${selectList === "all" ? "text-red" : ""}`}>{12}</div>
                <div className="text-lg font-normal">전체</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="user"
                onClick={selectReport}
              >
                <div className={`${selectList === "user" ? "text-red" : ""}`}>{3}</div>
                <div className="text-lg font-normal">일반 유저</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="delete"
                onClick={selectReport}
              >
                <div className={`${selectList === "delete" ? "text-red" : ""}`}>{3}</div>
                <div className="text-lg font-normal">탈퇴 유저</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="ban"
                onClick={selectReport}
              >
                <div className={`${selectList === "ban" ? "text-red" : ""}`}>{9}</div>
                <div className="text-lg font-normal">정지 회원</div>
              </div>
            </div>
          </div>
          {/* userList  */}
          <div className="w-full h-2/3 mt-9">
            <div className="flex text-xl text-darkGray font-bold mb-5 border-b pb-4 border-[#F2F2F2]">
              <div className="w-[12%] text-xl text-center">NO.</div>
              <div className="w-[30%] text-xl text-center">닉네임</div>
              <div className="w-[15%] text-xl text-center">탈퇴</div>
              <div className="w-[25%] text-xl text-center">상태</div>
              <div className="w-[18%] text-xl text-center">관리</div>
            </div>
            {/* userListItem */}
            {userList &&
              userList.map((user, i) => {
                return (
                  <UserListItem
                    key={i}
                    select={select}
                    setSelect={setSelect}
                    user={user}
                    index={i}
                    handleSelectBan={handleSelectBan}
                  />
                );
              })}
          </div>
        </PageLeft>
        <PageRight select={select}>
          <div
            className="relative flex text-2xl font-bold cursor-pointer"
            onClick={() => {
              setSelect((prev) => !prev);
            }}
          >
            <IoIosArrowBack className="mt-[5px] mr-1 text-[28px]" />
            <div className="">회원 관리</div>
          </div>
          {delete_state === "Y" ? (
            <Delete select={select} />
          ) : (
            <>
              <Ban
                select={select}
                setSelect={setSelect}
                selectBanType={selectBanType}
                selectType={selectType}
                handleSelectBan={handleSelectBan}
              />
            </>
          )}
        </PageRight>
      </OutletContainer>
    </>
  );
}
