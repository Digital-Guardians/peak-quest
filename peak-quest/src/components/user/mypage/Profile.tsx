import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface FormData {
  nickname: string;
}

export default function Profile() {
  // 페이지 이동
  const navigate = useNavigate();

  // 기본 nickName => userInfo 에서 가져오기 !
  const [nickname, setNickname] = useState("하늘을 나는 트래커1");
  // nickname 수정
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // 닉네임 변경 submit
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const inputEl = document.getElementById("nickname") as HTMLInputElement;
    inputEl.disabled = true;
    setIsEdit(false);
    console.log(data);
    alert("닉네임이 변경되었습니다.");
  };

  return (
    <div className="w-full mb-5 bg-white">
      {/* 프로필 */}
      <div className="max-h-[108px] flex items-center px-[20px] border-y-[1px] border-lightGray p-5">
        <img
          className="max-w-[58px] max-h-[58px] rounded-full border-[1px] mr-3"
          src=""
          alt="프로필 image"
        />
        <div>
          <form
            className="w-[80%] sm:w-[85%] relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <input
                id="nickname"
                className="w-full text-xl  sm:text-lg border-b-[1px] border-gray font-bold focus:outline-none disabled:bg-white ease-linear duration-300"
                disabled
                value={nickname}
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                  onChange: (e) => setNickname(e.target.value),
                })}
              />
            </div>
            {isEdit ? (
              <button
                type="submit"
                className="text-md text-mint absolute bottom-1 right-0 cursor-pointer"
              >
                확인
              </button>
            ) : (
              <div
                className="text-[28px] sm:text-[24px] text-mint absolute bottom-0 right-0 cursor-pointer"
                onClick={() => {
                  // nickName input
                  // => typescript 에서는 HTMLInputElement 타입으로 캐스팅 필요
                  const inputEl = document.getElementById(
                    "nickname"
                  ) as HTMLInputElement;
                  inputEl.disabled = false;
                  setIsEdit(true);
                }}
              >
                <MdEditNote />
              </div>
            )}
          </form>
          {errors.nickname ? (
            <span className="text-md text-red">{errors.nickname.message}</span>
          ) : (
            <p className="w-[50%] sm:w-[55%] p-1 mt-[8px] text-md text-green font-bold text-center bg-lightGreen rounded-full ">
              PEACKMASTER
            </p>
          )}
        </div>
      </div>
      {/* 뱃지 */}
      <div className="w-full h-[72px] p-3 flex justify-start items-center relative">
        <div className="w-[83%] grid grid-cols-6 relative">
          <div className="w-[45px] h-[45px] p-2 rounded-full bg-gray flex items-center justify-center border-green border-[1px]">
            <img
              className="w-full h-full"
              src="../../src/assets/user/badge/all_clear.png"
              alt="뱃지"
            />
          </div>
          <div className="w-[45px] h-[45px] p-2 rounded-full bg-gray flex items-center justify-center translate-x-[-15%]  border-green border-[1px]">
            <img
              className="w-full h-full"
              src="../../src/assets/user/badge/best_information.png"
              alt="뱃지"
            />
          </div>
          <div className="w-[45px] h-[45px] p-2 rounded-full bg-gray flex items-center justify-center translate-x-[-30%]  border-green border-[1px]">
            <img
              className="w-full h-full"
              src="../../src/assets/user/badge/best_recommand.png"
              alt="뱃지"
            />
          </div>
          <div className="w-[45px] h-[45px] p-2 rounded-full bg-gray flex items-center justify-center translate-x-[-45%]  border-green border-[1px]">
            <img
              className="w-full h-full"
              src="../../src/assets/user/badge/best_share.png"
              alt="뱃지"
            />
          </div>
          <div className="w-[45px] h-[45px] p-2 rounded-full bg-gray flex items-center justify-center translate-x-[-60%]  border-green border-[1px]">
            <img
              className="w-full h-full"
              src="../../src/assets/user/badge/bronze.png"
              alt="뱃지"
            />
          </div>
          <div className="w-[45px] h-[45px] p-2 rounded-full bg-gray flex items-center justify-center translate-x-[-75%]  border-green border-[1px]">
            <img
              className="w-full h-full"
              src="../../src/assets/user/badge/gold.png"
              alt="뱃지"
            />
          </div>
          {/* 그라데이션 */}
          <div className="w-full h-full bg-gradient-to-l from-white absolute top-0 left-0" />
        </div>
        <button
          className="w-[25%] h-[32px] sm:w-[23%] sm:h-[30px] text-md text-mint border-[1px] border-mint rounded-full absolute top-5 right-2"
          onClick={() => navigate("/mypage/badgelist")}
        >
          전체보기
        </button>
      </div>
    </div>
  );
}
