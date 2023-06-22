import React, { useState, useEffect, useRef } from "react";
import CourseItem from "../../components/user/CourseItem";
import Filter from "../../components/user/Filter";
import Header from "../../components/Header";

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

export default function CourseList() {
  // 코스 지역, 유형, 난이도 선택
  const [select, setSelect] = useState<{
    areaName: string;
    courseOption: string[];
    level: number;
  }>({
    areaName: "",
    courseOption: [],
    level: 0,
  });
  // 코스 목록
  const [courseList, setCourseList] = useState<Course[]>([]);
  // 스크롤 여부
  const [isScroll, setIsScroll] = useState<boolean>(false);

  // 데이터를 불러오는 중인지 확인
  let isFetching = false;

  useEffect(() => {
    // 첫 렌더링시 데이터 호출
    fetchMoreCourses();

    // courseList를 담는 div 컴포넌트
    const content = document.getElementById("courseList");

    // 스크롤 핸들러
    const handleScroll = () => {
      if (content) {
        const { scrollTop, scrollHeight } = content;
        const windowHeight = window.innerHeight;

        // 스크롤되기 시작 => 스타일 변경
        if (scrollTop) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }

        if (!isFetching && scrollTop + windowHeight >= scrollHeight - 1) {
          // console.log("END");
          isFetching = true;
          fetchMoreCourses();
        }
      }
    };

    // id=courseList 컴포넌트에 스크롤 이벤트 리스너 추가
    content?.addEventListener("scroll", handleScroll);

    // id=courseList 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
    return () => {
      content?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 코스 목록 api 실행
  const fetchMoreCourses = () => {
    // 코스 목록 API 호출
    fetch(`/mock/user/courseList_page.json`)
      .then((res) => res.json())
      .then((data) => {
        // 코스 목록 상태 업데이트 => 기존 코스 목록에 새로 가져온 코스 목록 data추가
        setCourseList((prevCourseList) => [...prevCourseList, ...data.courses]);
      })
      .catch((error) => {
        console.error("Error fetching more courses:", error);
      });
    isFetching = false;
  };

  return (
    <div id="test" className="w-full h-screen relative overflow-hidden">
      <Header />
      <Filter setSelect={setSelect} select={select} />
      {/* 해당 코스 목록 */}
      <div
        id="courseList"
        className={`w-full mx-auto h-full bg-white ease-linear duration-500 overflow-auto ${
          isScroll
            ? "rounded-none absolute top-[50px]"
            : "rounded-t-2xl absolute top-[285px]"
        } `}
      >
        {courseList.length > 0 ? (
          <>
            <CourseItem courseList={courseList} />
            <div className="h-[80px] flex justify-center my-3">
              더이상 불러올 코스가 없습니다.
            </div>
          </>
        ) : (
          <div className="h-[500px] flex flex-col justify-center items-center">
            <p className="">죄송합니다.</p>
            <p className=""> 코스가 존재하지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
