import React, { useEffect, useState } from "react";
import createCourse from "../../assets/course/create-course.png";
import courseList from "../../assets/course/course-lists.png";
import { Link } from "react-router-dom";
import RankSection from "./RankSection";
import EventBanner from "./EventBanner";
import Nearby from "../../components/user/Nearby";
import Header from "../../components/Header";
import Login from "../../components/Login";
import { useUserContext } from "../../context/userContext";
import {
  getBagdes,
  getStartBadge,
  onUserStateChanged,
} from "../../service/firebase";
import GetBadgePopupComponent from "../../components/user/Badge/GetBadgePopup";
import { badgeColorInfos } from "../../components/user/Badge/Badge";
import { HasBadgeProp } from "./BadgeList";

// 뱃지 상태에 대한 타입 정의
export interface BadgeStatusProps {
  gold: HasBadgeProp;
  silver: HasBadgeProp;
  bronze: HasBadgeProp;
  allClear: HasBadgeProp;
  start: HasBadgeProp;
  firstWish: HasBadgeProp;
  firstRecommand: HasBadgeProp;
  firstShare: HasBadgeProp;
  bestInformation: HasBadgeProp;
  bestShare: HasBadgeProp;
  bestRecommand: HasBadgeProp;
  peakQuestMaster: HasBadgeProp;
}
export default function Main() {
  const { user, setUser } = useUserContext();

  // 팝업을 보여줬는지 여부를 저장할 상태 변수
  const [isPopupShown, setIsPopupShown] = useState(false);

  // 획득 한 뱃지 팝업
  const [isGetPopUpOpen, setIsGetPopUpOpen] = useState(false);

  // 획득 한 뱃지 닫기
  const handleCloseGetPopUp = () => {
    setIsGetPopUpOpen(false);
  };

  const [badgeStatus, setBadgeStatus] = useState<BadgeStatusProps>({
    gold: { hasBadge: "N" },
    silver: { hasBadge: "N" },
    bronze: { hasBadge: "N" },
    allClear: { hasBadge: "N" },
    start: { hasBadge: "N" },
    firstWish: { hasBadge: "N" },
    firstRecommand: { hasBadge: "N" },
    firstShare: { hasBadge: "N" },
    bestInformation: { hasBadge: "N" },
    bestShare: { hasBadge: "N" },
    bestRecommand: { hasBadge: "N" },
    peakQuestMaster: { hasBadge: "N" },
  });

  // 획득한 뱃지 정보만 담기
  const filterGetBadgeInfo = badgeColorInfos.find((v) => v.id === "gold");

  // 뱃지를 획득한 경우 해당 뱃지 정보 설정 및 팝업 열기
  const getBadgeOpenPopup = () => {
    console.log("getBadgeOpenPopup 함수");

    if (isPopupShown) {
      return;
    }
    // 뱃지를 획득했는지 확인
    const hasStartBadge = Object.values(badgeStatus).some(
      (badge) => badge.hasBadge === "Y"
    );

    // 뱃지를 획득한 경우에만 팝업을 열도록 설정
    if (hasStartBadge) {
      setIsGetPopUpOpen(true);

      // 팝업을 보여줬음을 상태 변수에 표시
      setIsPopupShown(true);
    }
  };

  useEffect(() => {
    const badge = setInterval(() => {
      getStartBadge(user).then((res) => {
        if (res) {
          setIsGetPopUpOpen(true);
        }
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(badge);
    }, 5000);
  }, [user, isPopupShown, badgeStatus, isGetPopUpOpen]);

  // console.log("isPopupShown", isPopupShown);
  // console.log("isGetPopUpOpen", isGetPopUpOpen);
  // console.log("badgeStatus", badgeStatus);

  return (
    <div className="bg-lightGray text-black">
      {/* 뱃지 획득 팝업 */}
      {isGetPopUpOpen && filterGetBadgeInfo && (
        <GetBadgePopupComponent
          getBadgeInfo={filterGetBadgeInfo}
          handleCloseGetPopUp={handleCloseGetPopUp}
        />
      )}
      <Header />
      <div className="flex items-center justify-center py-5 text-xl font-bold leading-7 sm:text-md sm:leading-3 md:text-lg md:leading-4">
        <Link to={"/area/create"}>
          <div className="relative mr-2">
            <p className="absolute left-3 top-3">
              나만의
              <br />
              코스 만들기
            </p>
            <img
              className="shadow-3xl"
              src={createCourse}
              alt="create-course"
            />
          </div>
        </Link>
        <Link to={"/area"}>
          <div className="relative ml-2">
            <p className="absolute left-3 top-3">
              코스
              <br />
              둘러보기
            </p>
            <img className="shadow-3xl" src={courseList} alt="course-list" />
          </div>
        </Link>
      </div>
      {/* rankSection */}
      <div className="m-auto rounded-xl bg-white">
        <RankSection />
        {/* <RankSection /> */}
        <EventBanner />
        {/* nearbySection */}
        <Nearby />
      </div>
    </div>
  );
}
