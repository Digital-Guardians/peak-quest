import React, { Dispatch, SetStateAction } from "react";
import { useService } from "../../context/ContextProvider";
import { userData } from "../../types/type";

interface props {
  index: number;
  select: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
  handleSelectBan: Dispatch<SetStateAction<any>>;
  user: any;
}

export default function UserListItem({ select, setSelect, user, index, handleSelectBan }: props) {
  const { name, state, role, ban } = user;
  const { delete_state } = user.delete;
  const { ban_type } = user.ban;

  const { setUserInfo } = useService();

  return (
    <div className="mb-5 flex h-[84px] w-full border-b border-[#F2F2F2] text-lg font-normal text-darkGray">
      <div className={`flex w-[12%] items-center justify-center text-xl`}>{index + 1}</div>
      <div className={`flex w-[30%] items-center justify-center ${select ? "text-lg" : "text-xl"}`}>
        {name}
      </div>
      <div className={`flex w-[15%] items-center justify-center ${select ? "text-lg" : "text-xl"}`}>
        {delete_state}
      </div>
      <div className={`flex w-[25%] items-center justify-center text-center text-lg`}>
        {state === "user" && <NormalUser />}
        {state === "ban" && <BanUser />}
      </div>
      <div className="flex w-[18%] items-center justify-center text-lg">
        {
          <button
            className={`${
              select ? "w-1/2" : ""
            }  h-[44px] w-[110px] rounded-[10px] border border-purple text-lg text-purple transition-all duration-[1s] ease-in-out`}
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
    <div className="flex h-[32px] w-[84px] items-center justify-center rounded-[10px] bg-darkGray text-white">
      정지 회원
    </div>
  );
}
NormalUser;
function NormalUser() {
  return (
    <div className="flex h-[32px] w-[84px] items-center justify-center rounded-[10px] bg-lightPurple text-purple">
      정상 회원
    </div>
  );
}
