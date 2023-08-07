import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getBagdes } from "../../../service/firebase";
import { useUserContext } from "../../../context/userContext";

interface FormData {
  nickname: string;
}

// 뱃지 인증 상태 타입 정의
interface HasBadgeProp {
  hasBadge: BadgeStatus;
}

interface BadgeProps {
  badge: HasBadgeProp;
  index: number;
}

// 뱃지 인증 여부
type BadgeStatus = "Y" | "N";

const hasBadgeInfos: { [key: string]: HasBadgeProp }[] = [
  { gold: { hasBadge: "N" } },
  { silver: { hasBadge: "N" } },
  { bronze: { hasBadge: "N" } },
  { allClear: { hasBadge: "N" } },
  { start: { hasBadge: "N" } },
  { firstWish: { hasBadge: "N" } },
  { firstRecommand: { hasBadge: "N" } },
  { firstShare: { hasBadge: "N" } },
  { bestInformation: { hasBadge: "N" } },
  { bestShare: { hasBadge: "N" } },
  { bestRecommand: { hasBadge: "N" } },
  { peakQuestMaster: { hasBadge: "N" } },
];

const Badge = ({ badge, index }: any) => {
  const translateXValue = -15 * index;
  const badgeStyle = {
    transform: `translateX(${translateXValue}%)`,
  };

  return (
    <div
      className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-[1px] border-green bg-gray p-2"
      style={badgeStyle}
    >
      <img
        className="h-full w-full"
        src={`/images/badge/${Object.keys(badge)[0]}.png`}
        alt="뱃지"
      />
    </div>
  );
};

export default function Profile() {
  // 페이지 이동
  const navigate = useNavigate();

  // 유저정보
  const { user, setUser } = useUserContext();

  // 뱃지
  const [userBadges, setUserBadges] = useState<
    {
      [key: string]: HasBadgeProp;
    }[]
  >(hasBadgeInfos);

  // 기본 nickName => userInfo 에서 가져오기 !
  const [nickname, setNickname] = useState<string>(
    "닉네임" || user.displayName
  );
  // nickname 수정
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      nickname: nickname,
    },
  });

  // 닉네임 변경 submit
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const inputEl = document.getElementById("nickname") as HTMLInputElement;
    inputEl.disabled = true;
    setIsEdit(false);
    alert("닉네임 변경이 완료되었습니다.");
  };

  // useEffect(() => {
  //   // 뱃지 가져오기
  //   const fetchBadge = async () => {
  //     const data = await getBagdes(user?.uid);
  //     const newData = data.filter((el) => {
  //       const badgeKey = Object.keys(el)[0];
  //       return el[badgeKey]?.hasBadge === "Y";
  //     });
  //     if (user) setUserBadges(newData);
  //   };
  //   if (user) setNickname(user.displayName);
  //   fetchBadge();
  // }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     // 뱃지 가져오기
  //     const fetchBadge = async () => {
  //       const data = await getBagdes(user.uid);
  //       const newData = data.filter((el) => {
  //         const badgeKey = Object.keys(el)[0];
  //         // el[badgeKey]?.hasBadge === "Y";
  //         // console.log(el[badgeKey].hasBadge);
  //         return isHasBadgeProp(el[badgeKey]?.hasBadge === "Y");
  //       });
  //       setUserBadges(newData as any); // 타입 캐스팅
  //     };
  //     setNickname(user.displayName);
  //     fetchBadge();
  //   }
  // }, [user]);

  useEffect(() => {
    if (user) {
      // 뱃지 가져오기
      const fetchBadge = async () => {
        const data = await getBagdes(user.uid);
        const newData = data.filter((el: any) => {
          const badgeKey = Object.keys(el)[0];
          return isHasBadgeProp(el[badgeKey]) && el[badgeKey].hasBadge === "Y";
        });
        setUserBadges(newData as any); // 타입 캐스팅
      };
      setNickname(user.displayName);
      fetchBadge();
    }
  }, [user]);

  // 타입 가드 함수
  function isHasBadgeProp(obj: any): obj is HasBadgeProp {
    return obj && typeof obj === "object" && "hasBadge" in obj;
  }

  useEffect(() => {
    // 뱃지 최대 6개까지 잘라서 보여주기
    const visibleBadges = userBadges.slice(0, 6);
    setUserBadges(visibleBadges);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* 프로필 */}
      <div className="flex max-h-[108px] items-center border-y-[1px] border-lightGray p-5 px-[20px]">
        <img
          className="mr-3 max-h-[58px] max-w-[58px] rounded-full border-[1px]"
          src={`${user.photoURL}`}
          alt="프로필 image"
        />
        <div>
          <form
            className="relative w-[80%] sm:w-[95%]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <input
                id="nickname"
                className="w-full border-b-[1px]  border-gray text-xl font-bold duration-300 ease-linear focus:outline-none disabled:bg-white sm:text-lg"
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
                className="absolute bottom-1 right-0 cursor-pointer text-md text-mint"
                disabled={isSubmitting}
              >
                확인
              </button>
            ) : (
              <div
                className="absolute bottom-0 right-0 cursor-pointer text-[28px] text-mint sm:text-[24px]"
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
            <p className="mt-[8px] p-1 text-md text-red">
              {errors.nickname.message}
            </p>
          ) : (
            <p className="mt-[8px] w-[50%] rounded-full bg-lightGreen p-1 text-center text-md font-bold text-green sm:w-[55%] ">
              PEACKMASTER
            </p>
          )}
        </div>
      </div>
      {/* 뱃지 */}
      <div className="relative flex h-[72px] w-full items-center justify-start p-3">
        <div className="relative grid w-[83%] grid-cols-6">
          {userBadges &&
            userBadges.map((badge, index) => (
              <Badge key={index} badge={badge} index={index} />
            ))}
          {/* 그라데이션 */}
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-l from-white" />
        </div>
        <button
          className="absolute right-2 top-6 h-[32px] w-[25%] rounded-full border-[1px] border-mint text-md text-mint sm:h-[28px] sm:w-[23%]"
          onClick={() => navigate("/mypage/badgelist")}
        >
          전체보기
        </button>
      </div>
    </div>
  );
}
