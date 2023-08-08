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
import { userData } from "../../types/type";

const defaultUserCount = {
  all: 0,
  user: 0,
  deleteUser: 0,
  ban: 0,
};

const userDefaultData: any = {
  name: "",
  role: "",
  email: "",
  state: "",
  ban: {
    ban_type: "",
    ban_content: "",
    ban_start_date: "",
    ban_end_date: "",
  },
  delete: {
    delete_state: "",
    delete_content: "",
    deleted_at: "",
  },
};

export default function User() {
  const [select, setSelect] = useState(false);
  const [selectList, setSelectList] = useState("all");
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(defaultUserCount);
  const [selectBanType, setSelectBanType] = useState("");
  const [selectType, setSelectType] = useState({});

  //리랜더용
  const [data, setData] = useState<userData[]>([userDefaultData]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // const [showInput, setShowInput] = useState(false);

  const { userInfo } = useService();
  const { delete_state, delete_content } = userInfo.delete;
  const { ban_type, ban_content } = userInfo.ban;

  useEffect(() => {
    switch (selectList) {
      case "all":
        console.log("all");

        getUserListAll() //
          .then((res: any) => {
            const all = res;
            console.log(all);

            const user = res.filter(
              (user: any) => user.state !== "ban" && user.delete.delete_state !== "Y"
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
          .then((res: any) => setUserList(res));
        break;
      case "delete":
        console.log("delete");
        getDeleteUser() //
          .then((res: any) => setUserList(res));
        break;
      case "ban":
        console.log("ban");
        getSuspendedUser() //
          .then((res: any) => setUserList(res));
        break;
    }
  }, [selectList, data]);

  function selectReport(e: React.MouseEvent<HTMLDivElement>) {
    const dataId = e.currentTarget.dataset.id;
    if (dataId) {
      setSelectList(dataId);
    }
  }

  function handleSelectBan(banType: string) {
    setSelectBanType(banType);
    setSelectType(banType);
  }

  function handleInput(e: any) {
    e.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.length === 0) {
        setSelectList("all");
      } else {
        setSelectList("");
      }
      searchUser(inputRef.current.value) //
        .then((res: any) => setUserList(res));
    }
  }

  return (
    <>
      <OutletContainer>
        <PageLeft select={select}>
          <div className="flex w-full flex-col">
            {/* inputContainer */}
            <div className="flex h-1/5 w-full pb-2">
              <form className="w-full" action="submit" onSubmit={handleInput}>
                <input
                  ref={inputRef}
                  className={`h-[56px]  w-full ${
                    select ? "pl-2 text-lg" : ""
                  } mt-2 rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
                  placeholder="닉네임 검색"
                />
              </form>
            </div>
            {/* userState */}
            <div className="flex h-[132px] w-full items-center justify-center border-b border-gray pb-3 text-[32px] font-bold">
              <div
                className="flex h-[72px] w-1/6 cursor-pointer flex-col items-center justify-center px-5 py-8"
                data-id="all"
                onClick={selectReport}
              >
                <div className={`${selectList === "all" ? "text-red" : ""}`}>
                  {userCount && userCount.all}
                </div>
                <div className="text-lg font-normal">전체</div>
              </div>
              <div
                className="flex h-[72px] w-1/6 cursor-pointer flex-col items-center justify-center px-5 py-8"
                data-id="user"
                onClick={selectReport}
              >
                <div className={`${selectList === "user" ? "text-red" : ""}`}>
                  {userCount && userCount.user}
                </div>
                <div className="text-lg font-normal">일반 유저</div>
              </div>
              <div
                className="flex h-[72px] w-1/6 cursor-pointer flex-col items-center justify-center px-5 py-8"
                data-id="delete"
                onClick={selectReport}
              >
                <div className={`${selectList === "delete" ? "text-red" : ""}`}>
                  {userCount && userCount.deleteUser}
                </div>
                <div className="text-lg font-normal">탈퇴 유저</div>
              </div>
              <div
                className="flex h-[72px] w-1/6 cursor-pointer flex-col items-center justify-center px-5 py-8"
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
          <div className="mt-9 h-2/3 w-full">
            <div className="mb-5 flex border-b border-[#F2F2F2] pb-4 text-xl font-bold text-darkGray">
              <div className="w-[12%] text-center text-xl">NO.</div>
              <div className="w-[30%] text-center text-xl">닉네임</div>
              <div className="w-[15%] text-center text-xl">탈퇴</div>
              <div className="w-[25%] text-center text-xl">상태</div>
              <div className="w-[18%] text-center text-xl">관리</div>
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
            className="relative flex cursor-pointer text-2xl font-bold"
            onClick={() => {
              setSelect((prev) => !prev);
            }}
          >
            <IoIosArrowBack className="mr-1 mt-[5px] text-[28px]" />
            <div className="">회원 관리</div>
          </div>
          {delete_state === "Y" ? (
            <Delete select={select} setData={setData} />
          ) : (
            <>
              <Ban
                select={select}
                setSelect={setSelect}
                selectBanType={selectBanType}
                selectType={selectType}
                handleSelectBan={handleSelectBan}
                setData={setData}
              />
            </>
          )}
        </PageRight>
      </OutletContainer>
    </>
  );
}
