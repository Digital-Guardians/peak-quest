import { useEffect, useState } from "react";
import { BadgeInfoProps } from "../../../pages/user/BadgeList";

// 뱃지 정보 타입 정의
export interface BadgeColorInfo {
  id: string;
  name: string;
  shortName: string;
  image: string;
  activeColor: string;
  activeTextColor: string;
  inActiveColor: string;
  inActiveTextColor: string;
  popupText: string;
}

// 뱃지 컴포넌트 타입 정의ㅏ
export interface BadgeComponentProps {
  name: string;
  shortName: string;
  image: string;
  activeColor: string;
  activeTextColor: string;
  popupText: string;
  handleOpenPopUp?: (() => void) | undefined;
  setBadgeInfo?:
    | React.Dispatch<React.SetStateAction<BadgeInfoProps>>
    | undefined;
}

// 뱃지 정보
export const badgeColorInfos: BadgeColorInfo[] = [
  {
    // 1. 랭킹 1위
    id: "gold",
    name: "랭킹 1위",
    shortName: "1위",
    image: "/images/badge/gold.png",
    activeColor: "#FAE85F",
    activeTextColor: "#776B13",
    inActiveColor: "#dfdfdf",
    inActiveTextColor: "#727272",
    popupText:
      "내 코스가 랭킹 1위가 되면 얻을 수 있어요. 지금 바로 나만의 코스를 등록하고 랭킹 1위를 노려보세요!",
  },
  {
    // 2. 랭킹 2위
    id: "silver",
    name: "랭킹 2위",
    shortName: "2위",
    image: "/images/badge/silver.png",
    activeColor: "#D9D9D9",
    activeTextColor: "#636363",
    inActiveColor: "#cecece",
    inActiveTextColor: "#636363",
    popupText:
      "내 코스가 랭킹 2위가 되면 얻을 수 있어요.\n 지금 바로 나만의 코스를 등록하고 랭킹 2위를 노려보세요!",
  },
  {
    // 3. 랭킹 3위
    id: "bronze",
    name: "랭킹 3위",
    shortName: "3위",
    image: "/images/badge/bronze.png",
    activeColor: "#B3693B",
    activeTextColor: "#FFE6D7",
    inActiveColor: "#7A7A7A",
    inActiveTextColor: "#dedede",
    popupText:
      "내 코스가 랭킹 3위가 되면 얻을 수 있어요. 지금 바로 나만의 코스를 등록하고 랭킹 3위를 노려보세요!",
  },
  {
    // 4. 이 구역의 정복왕
    id: "allClear",
    name: "이 구역의 정복왕",
    shortName: "정복왕",
    image: "/images/badge/all_clear.png",
    activeColor: "#99ED58",
    activeTextColor: "#335833",
    inActiveColor: "#c6c6c6",
    inActiveTextColor: "#272727",
    popupText: "모든 지역에 코스를 등록하면 얻을 수 있어요!",
  },
  {
    // 5. 시작이 반이다
    id: "start",
    name: "시작이 반이다",
    shortName: "시작이 반",
    image: "/images/badge/start.png",
    activeColor: "#DC4A4A",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#767676",
    inActiveTextColor: "#f1f1f1",
    popupText:
      "코스를 하나만 등록해도 뱃지가 따라와요! 시작이 반이라는 말처럼 열심히 코스를 등록해 보세요.",
  },
  {
    // 6. 도움의 시작
    id: "firstWish",
    name: "도움의 시작",
    shortName: "도움왕",
    image: "/images/badge/first_wish.png",
    activeColor: "#F2C397",
    activeTextColor: "#765742",
    inActiveColor: "#CCCCCC",
    inActiveTextColor: "#373737",
    popupText: "내가 등록한 코스가 처음으로 스크랩받으면 주어지는 뱃지에요!",
  },
  {
    // 7. 소중한 첫 추천
    id: "firstRecommand",
    name: "소중한 첫 추천",
    shortName: "첫 추천",
    image: "/images/badge/first_recommand.png",
    activeColor: "#7A5CFF",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#777777",
    inActiveTextColor: "#e1e1e1",
    popupText: "내가 등록한 코스가 처음으로 추천받으면 주어지는 뱃지에요!",
  },
  {
    // 8. 공유하는 기쁨
    id: "firstShare",
    name: "공유하는 기쁨",
    shortName: "공유왕",
    image: "/images/badge/first_share.png",
    activeColor: "#4F8AA3",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#7B7B7B",
    inActiveTextColor: "#e2e2e2",
    popupText:
      "다른 트래커가 내가 등록한 코스를 처음으로 공유하면 주어지는 뱃지에요!",
  },
  {
    // 9. 소문난 트래커
    id: "bestInformation",
    name: "소문난 트래커",
    shortName: "소문왕",
    image: "/images/badge/best_information.png",
    activeColor: "#FFF28B",
    activeTextColor: "#636363",
    inActiveColor: "#c9c9c9",
    inActiveTextColor: "#656565",
    popupText: "내가 등록한 코스가 30회 이상 스크랩 되면 주어지는 뱃지에요!",
  },
  {
    // 10. 트래킹 정보통
    id: "bestShare",
    name: "트래킹 정보통",
    shortName: "정보통",
    image: "/images/badge/best_share.png",
    activeColor: "#009288",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#929292",
    inActiveTextColor: "#e4e4e4",
    popupText: "내가 등록한 코스가 100회 이상 스크랩 되면 주어지는 뱃지에요!",
  },
  {
    // 11. 트래킹 트렌드세터
    id: "bestRecommand",
    name: "트래킹 트렌드세터",
    shortName: "트렌드세터",
    image: "/images/badge/best_recommand.png",
    activeColor: "#6B4BFB",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#686868",
    inActiveTextColor: "#f2f4f2",
    popupText: "내가 등록한 코스가 100회 이상 추천을 받으면 주어지는 뱃지에요!",
  },
  {
    // 12. 픽퀘스트 마스터
    id: "peakQuestMaster",
    name: "픽퀘스트 마스터",
    shortName: "마스터",
    image: "/images/badge/peakQuest_master.png",
    activeColor: "#000000",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#5a5a5a",
    inActiveTextColor: "#f7f7f7",
    popupText:
      "픽퀘스트의 모든 뱃지를 획득하신 “진정한 픽퀘스트 마스터”에게만 주어지는 뱃지에요!",
  },
];

// 뱃지 컴포넌트
export default function BadgeComponent({
  name,
  shortName,
  image,
  activeColor,
  activeTextColor,
  handleOpenPopUp,
  setBadgeInfo,
  popupText,
}: BadgeComponentProps) {
  // 브라우저 가로 사이즈가 작아질 수록 뱃지명이 짧아짐.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const handleBadgePopUp = () => {
    if (handleOpenPopUp && setBadgeInfo) {
      handleOpenPopUp();
      setBadgeInfo({
        name,
        shortName,
        image,
        activeColor,
        activeTextColor,
        popupText,
      });
    }
  };

  return (
    <div onClick={handleBadgePopUp}>
      <div
        style={{ borderColor: activeColor }}
        className="relative m-auto mb-2 flex h-24 w-24 items-center justify-center rounded-full border-4 bg-white sm:my-0 sm:h-16 sm:w-16"
      >
        <img
          className="h-14 w-14 object-scale-down sm:h-8 sm:w-8"
          src={image}
          alt={name}
        />
      </div>
      <div className="relative">
        <div
          style={{ backgroundColor: activeColor }}
          className="absolute bottom-[6px] left-1/2 flex translate-x-[-50%] items-center justify-center rounded-lg sm:-bottom-1"
        >
          <div
            style={{ color: activeTextColor }}
            className="whitespace-nowrap rounded-md px-3 py-[2px] text-center text-md sm:px-[8px] sm:text-sm"
          >
            {window.innerWidth <= 345 ? shortName : name}
          </div>
        </div>
      </div>
    </div>
  );
}
