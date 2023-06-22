import React, { useEffect, useState } from "react";
import CourseItem from "../../components/user/CourseItem";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/user/mypage/Profile";

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

  return (
    <div className="w-max-[430px] bg-gray flex flex-col justify-center items-center">
      {/* header */}
      <div className="w-full h-[48px] bg-white text-2xl font-bold text-center leading-loose relative">
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
      <div>
        <p>내가 만든 코스</p>
        <button>전체보기</button>
        <CourseItem courseList={makeCourseList} />
      </div>
      {/* 스크랩 */}
      <div>
        <p>스크랩한 코스</p>
        <button>전체보기</button>
        <CourseItem courseList={wishCourseList} />
      </div>
      {/* 최근 본 코스 */}
      <div>
        <p>최근 본 코스</p>
        <div>
          <div>
            <img />
            <div>
              <p>지역</p>
              <p>코스이름</p>
            </div>
          </div>
        </div>
      </div>
      {/* 로그아웃 */}
      <button className="w-[95%] h-[48px] rounded-md bg-mint text-white font-bold">
        로그아웃
      </button>
      {/* 회원탈퇴 */}
      <button className="w-[95%] h-[48px] rounded-md bg-mint text-white font-bold">
        회원탈퇴
      </button>
    </div>
  );
}
