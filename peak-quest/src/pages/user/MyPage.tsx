import React, { useEffect, useState } from "react";
import CourseItem from "../../components/user/CourseItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineRoute, MdOutlineBookmarkBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/user/mypage/Profile";
import RecentCourse from "../../components/user/mypage/RecentCourse";
import { useUserContext } from "../../context/userContext";
import {
  getBagdes,
  getMyCourse,
  onUserStateChanged,
  userLogOut,
} from "../../service/firebase";

// 코스 타입 정의
interface Course {
  id: number;
  title: string;
  writer: string;
  thumbnail: string;
  views: number;
  recommendations: number;
  area: string;
  position: {
    lat: number;
    lng: number;
  };
}

// 뱃지 인증 상태 타입 정의
interface HasBadgeProp {
  hasBadge: BadgeStatus;
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

export default function MyPage() {
  // 페이지 이동을 위함
  const navigate = useNavigate();

  const [userBadges, setUserBadges] = useState<
    {
      [key: string]: HasBadgeProp;
    }[]
  >(hasBadgeInfos);

  // 내가 만든 코스
  const [myCourseList, setMyourseList] = useState<Course[]>([]);
  // 스크랩 코스
  const [wishCourseList, setWishCourseList] = useState<Course[]>([]);

  const { user, setUser } = useUserContext();

  useEffect(() => {
    onUserStateChanged(setUser);
    //  내코스 가져오기
    const fetchMyCourse = async () => {
      const data = await getMyCourse(user);
      setMyourseList(data);
      // console.log("내코스", data);
    };

    fetchMyCourse();
  }, [user]);

  return (
    <div className="w-max-[430px] flex flex-col items-center justify-center bg-[#f3f3f3]">
      {/* header */}
      <div className="relative h-[50px] w-full bg-white pt-1 text-center text-xl font-bold leading-loose duration-300 ease-linear sm:h-[48px] sm:pt-2 sm:text-lg">
        {/* 뒤로 가기 버튼 */}
        <div
          className="absolute left-3 top-3 text-2xl duration-300 ease-linear sm:text-xl"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </div>
        <p>마이페이지</p>
      </div>
      <div className="relative h-full w-full">
        {!user && (
          <div className="absolute left-[26%] top-[50%] z-10 flex h-[32px] w-[180px] items-center justify-center rounded-full border-[1px] border-green bg-lightGreen text-md font-bold text-green">
            로그인 후 이용 가능합니다.
          </div>
        )}
        <div className={!user ? "blur-sm" : ""}>
          {/* 프로필 영역 */}
          <Profile />
          {/* <Profile /> */}
          {/* 내가 만든 코스 */}
          <div className="mt-3 w-full border-b-[1px] border-lightGray bg-white pb-2">
            <div className="flex items-center justify-between px-[8px] pt-[15px]">
              <div className="flex items-center font-bold">
                <div className="mr-2 text-2xl text-mint">
                  <MdOutlineRoute />
                </div>
                <p className="text-xl sm:text-lg">내가 만든 코스</p>
              </div>
              <button
                className="h-[32px] w-[26%] rounded-full border-[1px] border-mint text-md text-mint sm:h-[28px] sm:w-[24%]"
                onClick={() =>
                  navigate("/mypage/mycourselist", { state: { myCourseList } })
                }
              >
                전체보기
              </button>
            </div>
            {user && myCourseList.length > 0 ? (
              <CourseItem courseList={myCourseList} isMine={true} />
            ) : (
              user && (
                <div className=" flex h-[115px] flex-col items-center justify-center p-3 text-[14px]">
                  <p>
                    당신의{" "}
                    <span className="font-bold text-green">
                      멋진 코스를 기록
                    </span>
                    하러 떠나볼까요?
                  </p>
                  <a
                    className="mt-2 flex items-center justify-center border-b-[1px] border-mint text-md font-bold text-mint"
                    href="/area/create"
                  >
                    코스 만들러 가기 <IoIosArrowForward />
                  </a>
                </div>
              )
            )}
          </div>
          {/* 스크랩 */}
          <div className="mt-3 w-full border-b-[1px] border-lightGray bg-white pb-2">
            <div className="flex items-center justify-between px-[8px] pt-[15px]">
              <div className="flex items-center font-bold">
                <div className="mr-2 text-2xl text-mint">
                  <MdOutlineBookmarkBorder />
                </div>
                <p className="text-xl sm:text-lg ">스크랩한 코스</p>
              </div>
              <button className="h-[32px] w-[26%] rounded-full border-[1px] border-mint text-md text-mint sm:h-[28px] sm:w-[24%]">
                전체보기
              </button>
            </div>
            {wishCourseList.length > 0 ? (
              <CourseItem courseList={wishCourseList} isMine={false} />
            ) : (
              user && (
                <div className=" flex h-[115px] flex-col items-center justify-center p-3 text-[14px]">
                  <p>
                    마음에 드는
                    <span className="font-bold text-green"> 코스를 저장</span>
                    하고
                  </p>
                  <p>필요할 때마다 확인할 수 있어요.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* 최근 본 코스 */}
      <div className="mt-3 h-full w-full border-b-[1px] border-lightGray bg-white pb-2">
        <div className="flex items-center px-[8px] pt-[15px] font-bold">
          <div className="mr-2 text-2xl text-mint">
            <AiOutlineEye />
          </div>
          <p className="text-xl sm:text-lg">최근 본 코스</p>
        </div>
        <RecentCourse />
      </div>
      {user && (
        <>
          {" "}
          {/* 로그아웃 */}
          <button
            className="mb-3 mt-3 h-[48px] w-[95%] rounded-md bg-mint text-lg font-bold text-white duration-300 ease-linear sm:h-[40px] sm:text-md"
            onClick={() => {
              userLogOut();
              setUser("");
              navigate("/");
            }}
          >
            로그아웃
          </button>
          {/* 회원탈퇴 */}
          <button className="mb-4 mt-1 border-b-[1px] border-gray p-1 text-md font-bold text-[#A4A4A4] duration-300 ease-linear sm:text-sm">
            회원탈퇴
          </button>
        </>
      )}
    </div>
  );
}
