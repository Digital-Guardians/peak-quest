import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import "./BadgeList.css";
import { useUserContext } from "../../context/userContext";
import { getBagdes, onUserStateChanged } from "../../service/firebase";
import { ListItem } from "./CourseEdit";
import { TransformedResult } from "../../types/forestTypes";
import BadgeComponent, {
  badgeColorInfos,
} from "../../components/user/Badge/Badge";
import BadgePopupComponent from "../../components/user/Badge/BadgePopup";

// 뱃지 인증 여부
type BadgeStatus = "Y" | "N";

// 뱃지 인증 상태 타입 정의
export interface HasBadgeProp {
  hasBadge: BadgeStatus;
}

// 뱃지 전체보기에서 클릭한 뱃지 타입 정의
export interface BadgeInfoProps {
  name: string;
  shortName: string;
  image: string;
  activeColor: string;
  activeTextColor: string;
  popupText: string;
}

interface formdata {
  myCourseTitle: string;
  previewImgUrl: string;
  selectedOption: {
    value: string;
    label: string;
  };
  checkedItems: string[];
  level: number;
  totalTimes: {
    hours: string;
    minutes: string;
  };
  totalDistances: string;
  selectOriginCourse: TransformedResult;
  lists: ListItem[];
  tags: string[];
  courseEditorText: string;
}

// 뱃지 인증 여부
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

  const { user, setUser } = useUserContext();

  useEffect(() => {
    onUserStateChanged(setUser);
    const fetch = async () => {
      const data = await getBagdes(user.uid);
      setBadgeStatus(data as any);
    };

    fetch();
  }, [user]);

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
        <div className="px-8 pt-8">
          <h1 className="text-[20px] font-bold">내 뱃지</h1>
          <p className="text-md text-darkGray">{activeBadgeCount}/12개</p>
        </div>
        {/* 뱃지 리스트  */}
        <div className="my-3 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-6 whitespace-normal break-all sm:gap-1 md:gap-5">
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
          <button className="mb-10 mt-3 w-full cursor-auto rounded-lg bg-mint py-2 text-md font-medium text-white sm:mb-7 sm:mt-4 sm:py-2">
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
    </div>
  );
}
