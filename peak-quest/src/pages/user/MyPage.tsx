import React, { useEffect, useState } from "react";
import CourseItem from "../../components/user/CourseItem";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineRoute, MdOutlineBookmarkBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/user/mypage/Profile";
import { saveRecentCourse } from "../../helper/saveRecentCourse";
import RecentCourse from "../../components/user/mypage/RecentCourse";

// 코스 타입 정의
interface Course {
  // 코스 속성들
  id: string;
  title: string;
  writer: string;
  thumbnail: string;
  views: number;
  recommendations: number;
  distance: number;
  area: string;
}

export default function MyPage() {
  // 페이지 이동을 위함
  const navigate = useNavigate();

  // 로그인 필요 여부
  const [requireLogin, setRequireLogin] = useState<boolean>(true);

  // 내가 만든 코스
  const [makeCourseList, setMakeCourseList] = useState<Course[]>([]);
  // 스크랩 코스
  const [wishCourseList, setWishCourseList] = useState<Course[]>([]);
  // 최근 본 코스
  const [recentCourseList, setRecentCourseList] = useState<Course[]>([]);

  useEffect(() => {
    // myCourse
    fetch(`/mock/user/myPage_myCourse.json`)
      .then((res) => res.json())
      .then((data) => {
        setMakeCourseList(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching more courses:", error);
      });

    // wishCourse
    fetch(`/mock/user/myPage_wishCourse.json`)
      .then((res) => res.json())
      .then((data) => {
        setWishCourseList(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching more courses:", error);
      });
    // 최근 본 코스 테스트용 코드
    saveRecentCourse({
      id: 1,
      title: "최근adsfa sfsafaㅇㅁㄹㄴㅁ ㅇㄹㄴㄻㄹㅇㄴ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "제주도",
    });
    saveRecentCourse({
      id: 2,
      title: "서울 속 시원한 숲 ㅇㅇㅇㅇ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "수도권",
    });
    saveRecentCourse({
      id: 3,
      title: "최근adsfasfsafa",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "수도권",
    });
    saveRecentCourse({
      id: 4,
      title: "최근adsfasfsafa",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "충청권",
    });
    saveRecentCourse({
      id: 5,
      title: "최 근ad gaggafdas",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "수도권",
    });
    saveRecentCourse({
      id: 6,
      title: "ㅇㄻ ㄹㅇㄴㅁㄹ ㄴㅁㄹㄴㅁㄹ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "강원권",
    });
    saveRecentCourse({
      id: 7,
      title: "최근 ㅁㄴㅇㄻㄹ ㄴㄹㄴㅁㄹㅇㄴ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "강원권",
    });
  }, []);

  return (
    <div className="w-max-[430px] bg-[#f3f3f3] flex flex-col justify-center items-center">
      {/* header */}
      <div className="w-full h-[48px] bg-white text-2xl sm:text-xl font-bold text-center leading-loose relative">
        {/* 뒤로 가기 버튼 */}
        <div
          className="text-2xl absolute top-3 left-3"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </div>
        <p>마이페이지</p>
      </div>
      {/* {requireLogin && (
        // 로그인 X => 최근 본 코스 제외 블러처리
        <div>
          <div>로그인 후 이용 가능합니다.</div>
        </div>
      )} */}
      {/* 프로필 영역 */}
      <Profile />
      {/* 내가 만든 코스 */}
      <div className="w-full bg-white pb-2 mt-3 border-b-[1px] border-lightGray">
        <div className="flex justify-between items-center pt-[20px] px-[8px]">
          <div className="flex items-center font-bold">
            <div className="text-mint mr-2 text-2xl">
              <MdOutlineRoute />
            </div>
            <p className="text-xl sm:text-lg">내가 만든 코스</p>
          </div>
          <button className="w-[26%] h-[32px] sm:w-[24%] sm:h-[28px] text-md text-mint border-[1px] border-mint rounded-full">
            전체보기
          </button>
        </div>
        <CourseItem courseList={makeCourseList} isMine={true} />
      </div>
      {/* 스크랩 */}
      <div className="w-full bg-white pb-2 border-b-[1px] border-lightGray">
        <div className="flex justify-between items-center pt-[20px] px-[8px]">
          <div className="flex items-center font-bold">
            <div className="text-mint text-2xl mr-2">
              <MdOutlineBookmarkBorder />
            </div>
            <p className="text-xl sm:text-lg ">스크랩한 코스</p>
          </div>
          <button className="w-[26%] h-[32px] sm:w-[24%] sm:h-[28px] text-md text-mint border-[1px] border-mint rounded-full">
            전체보기
          </button>
        </div>
        <CourseItem courseList={wishCourseList} isMine={false} />
      </div>
      {/* 최근 본 코스 */}
      <div className="w-full bg-white pb-2 mt-3 border-b-[1px] border-lightGray">
        <div className="flex items-center font-bold pt-[20px] px-[8px]">
          <div className="text-mint mr-2 text-2xl">
            <AiOutlineEye />
          </div>
          <p className="text-xl sm:text-lg">최근 본 코스</p>
        </div>
        <RecentCourse />
      </div>
      {/* 로그아웃 */}
      <button className="w-[95%] h-[48px] sm:h-[40px] mt-3 mb-3 rounded-md bg-mint text-lg text-white font-bold sm:text-md ease-linear duration-300">
        로그아웃
      </button>
      {/* 회원탈퇴 */}
      <button className="mb-4 p-1 text-md text-[#A4A4A4] font-bold border-b-[1px] border-gray sm:text-sm ease-linear duration-300">
        회원탈퇴
      </button>
    </div>
  );
}
