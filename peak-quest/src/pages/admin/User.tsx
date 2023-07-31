import "./page.css";
import OutletContainer from "../../components/admin/OutletContainer";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import UserListItem from "./UserListItem";
import { useService } from "../../context/ContextProvider";
import Ban from "../../components/admin/Ban";
import Delete from "../../components/admin/Delete";
import {
  getDeleteUser,
  getSuspendedUser,
  getUserList,
  getUserListAll,
  searchUser,
} from "../../service/firebase";

const defaultUserCount = {
  all: 0,
  user: 0,
  deleteUser: 0,
  ban: 0,
};
export default function User() {
  const [select, setSelect] = useState(false);
  const [selectList, setSelectList] = useState("ALL");
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(defaultUserCount);
  const [selectBanType, setSelectBanType] = useState("");
  const [selectType, setSelectType] = useState({});

  const inputRef = useRef<HTMLInputElement | null>(null);

  // const [showInput, setShowInput] = useState(false);

  const { userInfo } = useService();
  const { delete_state, delete_content } = userInfo.delete;
  const { ban_type, ban_content } = userInfo.ban;

  useEffect(() => {
    switch (selectList) {
      case "ALL":
        console.log("all");

        getUserListAll() //
          .then((res) => {
            const all = res;
            console.log(all);

            const user = res.filter(
              (user) => user.state !== "ban" && user.delete.delete_state !== "Y"
            ).length;
            const deleteUser = res.filter((user: any) => user.delete.delete_state === "Y").length;
            const ban = res.filter((user: any) => user.state === "ban").length;

            const userCount = {
              all: all.length,
              user,
              deleteUser,
              ban,
            };
            setUserList(res);
            setUserCount(userCount);
          });
        break;
      case "user":
        console.log("user");

        getUserList() //
          .then((res) => setUserList(res));
        break;
      case "delete":
        console.log("delete");
        getDeleteUser() //
          .then((res) => setUserList(res));
        break;
      case "ban":
        console.log("ban");
        getSuspendedUser() //
          .then((res) => setUserList(res));
        break;
    }
  }, [selectList]);

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

  function handleInput(e) {
    e.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.length === 0) {
        setSelectList("ALL");
      } else {
        setSelectList("");
      }
      searchUser(inputRef.current.value) //
        .then((res) => setUserList(res));
    }
  }

  return (
    <>
      <OutletContainer>
        <PageLeft select={select}>
          <div className="flex flex-col w-full">
            {/* inputContainer */}
            <div className="flex w-full h-1/5 pb-2">
              <form className="w-full" action="submit" onSubmit={handleInput}>
                <input
                  ref={inputRef}
                  className={`w-full  h-[56px] ${
                    select ? "pl-2 text-lg" : ""
                  } border border-[#D9D9D9] mt-2 pl-4 rounded-[10px] half:mx-1`}
                  placeholder="닉네임 검색"
                />
              </form>
            </div>
            {/* userState */}
            <div className="flex justify-center items-center w-full h-[132px] pb-3 text-[32px] font-bold border-b border-gray">
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="ALL"
                onClick={selectReport}
              >
                <div className={`${selectList === "ALL" ? "text-red" : ""}`}>
                  {userCount && userCount.all}
                </div>
                <div className="text-lg font-normal">전체</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="user"
                onClick={selectReport}
              >
                <div className={`${selectList === "user" ? "text-red" : ""}`}>
                  {userCount && userCount.user}
                </div>
                <div className="text-lg font-normal">일반 유저</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="delete"
                onClick={selectReport}
              >
                <div className={`${selectList === "delete" ? "text-red" : ""}`}>
                  {userCount && userCount.deleteUser}
                </div>
                <div className="text-lg font-normal">탈퇴 유저</div>
              </div>
              <div
                className="flex flex-col w-1/6 h-[72px] justify-center items-center px-5 py-8 cursor-pointer"
                data-id="ban"
                onClick={selectReport}
              >
                <div className={`${selectList === "ban" ? "text-red" : ""}`}>
                  {userCount && userCount.ban}
                </div>
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
