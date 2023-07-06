import React, { Dispatch, SetStateAction } from "react";
import { useService } from "../../context/ContextProvider";
import { userData } from "../../types/type";

interface props {
  index: number;
  select: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
  handleSelectBan: Dispatch<SetStateAction<any>>;
  user: userData;
}

export default function UserListItem({ select, setSelect, user, index, handleSelectBan }: props) {
  const { user_name, state, role, ban } = user;
  const { delete_state } = user.delete;
  const { ban_type } = user.ban;

  const { setUserInfo } = useService();

  return (
    <div className="flex w-full h-[84px] text-lg text-darkGray font-normal mb-5 border-b border-[#F2F2F2]">
      <div className={`flex justify-center items-center w-[12%] text-xl`}>{index + 1}</div>
      <div className={`flex justify-center items-center w-[30%] ${select ? "text-lg" : "text-xl"}`}>
        {user_name}
      </div>
      <div className={`flex justify-center items-center w-[15%] ${select ? "text-lg" : "text-xl"}`}>
        {delete_state}
      </div>
      <div className={`flex justify-center items-center w-[25%] text-lg text-center`}>
        {state === "user" && <NormalUser />}
        {state === "ban" && <BanUser />}
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
                setUserInfo(user);
                handleSelectBan(ban_type);
              } else {
                setUserInfo(user);
                handleSelectBan(ban_type);
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

function BanUser() {
  return (
    <div className="flex justify-center items-center w-[84px] h-[32px] rounded-[10px] bg-darkGray text-white">
      정지 회원
    </div>
  );
}
NormalUser;
function NormalUser() {
  return (
    <div className="flex justify-center items-center w-[84px] h-[32px] rounded-[10px] bg-lightPurple text-purple">
      정상 회원
    </div>
  );
}
