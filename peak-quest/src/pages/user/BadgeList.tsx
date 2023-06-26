import { SetStateAction, useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import congratulations from "../../assets/congratulations.png";
import "./BadgeList.css";
import { Link } from "react-router-dom";

// 뱃지 인증 여부
type BadgeStatus = "Y" | "N";

// 뱃지 인증 상태 타입 정의
interface HasBadgeProp {
  hasBadge: BadgeStatus;
}

// 뱃지 전체보기에서 클릭한 뱃지 타입 정의
interface BadgeInfoProps {
  name: string;
  shortName: string;
  image: string;
  activeColor: string;
  activeTextColor: string;
  popupText: string;
}

// 뱃지 인증 여부 -> "Y" or "N" 구분
// **이슈**
// badgeStatus 초기값 임의 설정 해줌
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

// 1. 뱃지 리스트 컴포넌트
// -----------------------------------------------------------

export default function BadgeList() {
  // 페이지 이동을 위함
  const navigate = useNavigate();

  // 뱃지 인증 상태
  const [badgeStatus, setBadgeStatus] = useState<
    {
      [key: string]: HasBadgeProp;
    }[]
  >(hasBadgeInfos);

  // 클릭한 뱃지 정보 담기
  const [badgeInfo, setBadgeInfo] = useState<BadgeInfoProps>({
    name: "",
    shortName: "",
    image: "",
    activeColor: "",
    activeTextColor: "",
    popupText: "",
  });

  // 인증된 뱃지 필터링
  const isBadgeAuth = badgeStatus
    .filter((badge) => {
      const badgeKey = Object.keys(badge)[0];
      return badge[badgeKey]?.hasBadge === "Y";
    })
    .map((badge) => Object.keys(badge)[0]);

  // 뱃지 개수
  const activeBadgeCount = isBadgeAuth.length ? isBadgeAuth.length - 1 : 0;

  // 클릭 한 뱃지 팝업
  const [isClickPopUpOpen, setIsClickPopUpOpen] = useState(false);
  // 클릭 한 뱃지 열기
  const hanleOpenPopUp = () => {
    setIsClickPopUpOpen(true);
  };
  // 클릭 한 뱃지 닫기
  const handleClosePopUp = () => {
    setIsClickPopUpOpen(false);
  };

  // **이슈**
  // 상태를 전역에 저장해 두어야함
  // 획득 한 뱃지 팝업
  const [isGetPopUpOpen, setIsGetPopUpOpen] = useState(false);
  // 획득 한 뱃지 열기
  const hanleOpenGetPopUp = () => {
    setIsGetPopUpOpen(true);
  };
  // 획득 한 뱃지 닫기
  const handleCloseGetPopUp = () => {
    setIsGetPopUpOpen(false);
  };

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
                popupText,
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
                  handleOpenPopUp={hanleOpenPopUp}
                  setBadgeInfo={setBadgeInfo}
                  popupText={popupText}
                />
              );
            })}
          </div>
        </div>
        {/* 버튼 */}
        <div className="px-8">
          <button className="cursor-auto w-full bg-mint text-white py-2 rounded-lg text-md mt-3 mb-10 font-medium sm:py-2 sm:mt-4 sm:mb-7">
            {window.innerWidth <= 345
              ? "더 많은 뱃지를 획득해 보세요!"
              : "다양한 활동을 통해 더 많은 뱃지를 획득해 보세요!"}
          </button>
        </div>
      </div>
      {/* 팝업 */}
      <BadgePopupComponent
        isClickPopUpOpen={isClickPopUpOpen}
        badgeInfo={badgeInfo}
        handleClosePopUp={handleClosePopUp}
      />
      {/* 뱃지 획득 팝업 */}
      {isGetPopUpOpen && (
        <GetBadgePopupComponent
          getBadgeInfo={filterGetBadgeInfo!}
          handleCloseGetPopUp={handleCloseGetPopUp}
        />
      )}
    </div>
  );
}

// 2. 뱃지 컴포넌트
// -----------------------------------------------------------

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
    // **미정**
    id: "peakQuestMaster",
    name: "픽퀘스트 마스터",
    shortName: "마스터",
    image: "/images/badge/peakQuest_master.png",
    activeColor: "#5A5A5A",
    activeTextColor: "#FFFFFF",
    inActiveColor: "#5a5a5a",
    inActiveTextColor: "#f7f7f7",
    popupText:
      "픽퀘스트의 모든 뱃지를 획득하신 “진정한 픽퀘스트 마스터”에게만 주어지는 뱃지에요!",
  },
];

// 획득한 뱃지 정보만 담기
const filterGetBadgeInfo = badgeColorInfos.find((v) => v.id === "gold");

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
  popupText: string;
}

// 뱃지 컴포넌트 타입 정의ㅏ
interface BadgeComponentProps {
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

// 뱃지 컴포넌트
function BadgeComponent({
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

// 3. 클릭한 뱃지 팝업
// -----------------------------------------------------------

// 뱃지 팝업 타입 정의
interface BadgePopupComponentProps {
  isClickPopUpOpen: boolean;
  badgeInfo: BadgeInfoProps;
  handleClosePopUp: () => void;
}

// 뱃지 팝업 컴포넌트
function BadgePopupComponent({
  isClickPopUpOpen,
  badgeInfo,
  handleClosePopUp,
}: BadgePopupComponentProps) {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-end justify-center ${
        isClickPopUpOpen ? "translate-y-0" : "translate-y-[999px]"
      }`}
    >
      <div
        onClick={handleClosePopUp}
        className="absolute inset-0 bg-black opacity-70"
      />
      <div
        className={`w-full max-w-[430px] relative flex items-center justify-center rounded-t-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2 ${
          isClickPopUpOpen
            ? "translate-y-0 transition duration-500"
            : "translate-y-[300px] transition duration-500"
        }`}
      >
        <div className="py-5 px-2">
          <BadgeComponent
            name={badgeInfo.name}
            shortName={badgeInfo.shortName}
            image={badgeInfo.image}
            activeColor={badgeInfo.activeColor}
            activeTextColor={badgeInfo.activeTextColor}
            popupText={badgeInfo.popupText}
          />
          <div>
            {/* 팝업 내용 */}
            <div>
              <div className="mt-5 my-2 text-lg text-darkGray sm:text-md">
                {badgeInfo.popupText}
              </div>
            </div>
          </div>
        </div>
        {/* 닫기 버튼 */}
        <button
          onClick={handleClosePopUp}
          className="absolute right-2 top-2 text-gray"
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
}

// 4. 획득한 뱃지 팝업
// -----------------------------------------------------------

// 뱃지 획득 팝업 타입 정의
interface GetBadgePopupComponentProps {
  // NonNullable
  // - TypeScript의 타입 유틸리티 중 하나
  // - null 및 undefined를 제거하여 새로운 타입을 생성
  getBadgeInfo: NonNullable<BadgeColorInfo>;
  handleCloseGetPopUp: () => void;
}

// 뱃지 획특 팝업 컴포넌트
function GetBadgePopupComponent({
  getBadgeInfo,
  handleCloseGetPopUp,
}: GetBadgePopupComponentProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        onClick={handleCloseGetPopUp}
        className="absolute inset-0 bg-black opacity-70"
      />
      <div className="max-w-[430px] relative flex items-center justify-center rounded-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2">
        <div className="relative">
          {/* 랜덤한 도형 */}
          <div className="absolute top-0 right-0">
            <img
              className="animate-float"
              src={congratulations}
              alt="축하 효과"
            />
          </div>
          {/* 팝업 내용 */}
          <div className="">
            <h2 className="text-2xl font-semibold text-black sm:mt-4 sm:text-xl">
              <p>축하해요!</p>
              <p>
                <strong className="text-mint">{getBadgeInfo.name}</strong>{" "}
                획득했어요
              </p>
            </h2>
            {/* 뱃지 */}
            <div className="my-5">
              <BadgeComponent
                name={getBadgeInfo.name}
                shortName={getBadgeInfo.shortName}
                image={getBadgeInfo.image}
                activeColor={getBadgeInfo.activeColor}
                activeTextColor={getBadgeInfo.activeTextColor}
                popupText={getBadgeInfo.popupText}
              />
            </div>
            <div className="text-center p-2 my-2 text-md text-darkGray bg-[#f8f8f8] py-2 rounded-lg">
              트레킹 정보통 , 트레킹 트랜드세터 뱃지도 모아 보세요!
            </div>
          </div>
          {/* 버튼 */}
          <div className="mt-4 flex items-center space-x-3 justify-center sm:text-md">
            <div className="w-1/2">
              <Link to="/mypage/badgelist">
                <button className="p-2 w-full cursor-pointer rounded-lg bg-mint text-white">
                  내 뱃지 둘러보기
                </button>
              </Link>
            </div>
            <div className="w-1/2">
              <button
                onClick={handleCloseGetPopUp}
                className="py-2 w-full rounded-lg bg-gray text-darkGray"
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
        {/* 닫기 버튼 */}
        <button
          onClick={handleCloseGetPopUp}
          className="absolute right-2 top-2 text-gray"
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
}
