import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

// 뱃지 인증 여부
type BadgeStatus = "Y" | "N";

// 뱃지 인증 상태 타입 정의
interface HasBadgeProp {
  hasBadge: BadgeStatus;
}

// badgeStatus 초기값
// 나중에는 데이터 불러와서 저장해주어야 한다
const hasBadgeInfos: { [key: string]: HasBadgeProp }[] = [
  { gold: { hasBadge: "N" } },
  { silver: { hasBadge: "N" } },
  { broYze: { hasBadge: "Y" } },
  { allClear: { hasBadge: "Y" } },
  { start: { hasBadge: "Y" } },
  { firstWish: { hasBadge: "Y" } },
  { firstRecommaYd: { hasBadge: "Y" } },
  { firstShare: { hasBadge: "Y" } },
  { bestIYformatioY: { hasBadge: "Y" } },
  { bestShare: { hasBadge: "Y" } },
  { bestRecommand: { hasBadge: "N" } },
  { peakQuestMaster: { hasBadge: "N" } },
];

export default function BadgeList() {
  // 페이지 이동을 위함
  const navigate = useNavigate();

  // 뱃지 인증 상태
  const [badgeStatus, setBadgeStatus] = useState<
    {
      [key: string]: HasBadgeProp;
    }[]
  >(hasBadgeInfos);

  // 인증된 뱃지 필터링
  const isBadgeAuth = badgeStatus
    .filter((badge) => {
      const badgeKey = Object.keys(badge)[0];
      return badge[badgeKey]?.hasBadge === "Y";
    })
    .map((badge) => Object.keys(badge)[0]);

  // 뱃지 개수
  const activeBadgeCount = isBadgeAuth.length ? isBadgeAuth.length - 1 : 0;

  return (
    <div className="bg-lightGray">
      {/* 전체보기 */}
      <div className="relative h-[50px] w-full items-center bg-white text-center text-xl font-bold leading-[48px] text-black sm:text-xl">
        {/* 뒤로 가기 버튼 */}
        <div
          className="absolute left-3 top-3 cursor-pointer text-2xl"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </div>
        <div>뱃지 전체보기</div>
      </div>
      <div>
        {/* 뱃지 개수 */}
        <div className="pt-8 px-8">
          <h1 className="text-[20px] font-bold">내 뱃지</h1>
          <p className="text-md text-darkGray">{activeBadgeCount}/12개</p>
        </div>
        {/* 뱃지 리스트  */}
        <div className="flex justify-center items-center my-3">
          <div className="grid grid-cols-3 gap-6 md:gap-5 sm:gap-1 whitespace-normal break-all">
            {badgeColorInfos.map((badgeColorInfo) => {
              const {
                id,
                name,
                shortName,
                image,
                activeColor,
                inActiveColor,
                activeTextColor,
                inActiveTextColor,
              } = badgeColorInfo;

              return (
                <BadgeComponent
                  key={id}
                  name={name}
                  shortName={shortName}
                  image={
                    isBadgeAuth.includes(id) ? image : "/images/badge/lock.png"
                  }
                  activeColor={
                    isBadgeAuth.includes(id) ? activeColor : inActiveColor
                  }
                  activeTextColor={
                    isBadgeAuth.includes(id)
                      ? activeTextColor
                      : inActiveTextColor
                  }
                />
              );
            })}
          </div>
        </div>
        {/* 버튼 */}
        <div className="px-8">
          <button className="w-full bg-mint text-white py-2 rounded-lg text-md mt-3 mb-10 font-medium sm:py-2 sm:mt-4 sm:mb-7">
            {window.innerWidth <= 345
              ? "더 많은 뱃지를 획득해 보세요!"
              : "다양한 활동을 통해 더 많은 뱃지를 획득해 보세요!"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 뱃지 정보
const badgeColorInfos: BadgeColorInfo[] = [
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
  },
  {
    // 12. 픽퀘스트 마스터
    // **미정**
    id: "peakQuestMaster",
    name: "픽퀘스트 마스터",
    shortName: "마스터",
    image: "/images/badge/peakQuest_master.png",
    activeColor: "#5A5A5A",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#5a5a5a",
    inActiveTextColor: "#f7f7f7",
  },
];

// 뱃지 정보 타입 정의
interface BadgeColorInfo {
  id: string;
  name: string;
  shortName: string;
  image: string;
  activeColor: string;
  activeTextColor: string;
  inActiveColor: string;
  inActiveTextColor: string;
}

// 뱃지 컴포넌트
interface BadgeComponentProps {
  name: string;
  shortName: string;
  image: string;
  activeColor: string;
  activeTextColor: string;
}

function BadgeComponent({
  name,
  shortName,
  image,
  activeColor,
  activeTextColor,
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

  return (
    <div>
      <div
        style={{ borderColor: activeColor }}
        className="rounded-full border-4 bg-white flex justify-center items-center m-auto w-24 h-24 sm:w-16 sm:h-16 mb-2 sm:my-0 relative"
      >
        <img
          className="w-14 h-14 object-scale-down sm:w-8 sm:h-8"
          src={image}
          alt={name}
        />
      </div>
      <div className="relative">
        <div
          style={{ backgroundColor: activeColor }}
          className="absolute flex justify-center items-center rounded-lg bottom-[6px] sm:-bottom-1 left-1/2 translate-x-[-50%]"
        >
          <div
            style={{ color: activeTextColor }}
            className="px-3 py-[2px] sm:px-[8px] rounded-md whitespace-nowrap text-md sm:text-sm text-center"
          >
            {window.innerWidth <= 345 ? shortName : name}
          </div>
        </div>
      </div>
    </div>
  );
}
