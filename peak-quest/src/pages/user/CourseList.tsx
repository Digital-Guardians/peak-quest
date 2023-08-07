import React, { useState, useEffect } from "react";
import CourseItem from "../../components/user/CourseItem";
import Filter from "../../components/user/Filter";
import Header from "../../components/Header";
import "../../components/user/scroll.css";
import { useParams } from "react-router-dom";

// 코스 타입 정의
interface Course {
  // 코스 속성들
  id: number;
  title: string;
  writer: string;
  thumbnail: string;
  views: number;
  recommendations: number;
  distance: number;
  area: string;
  level: number;
  option: string[];
  position: {
    lat: number;
    lng: number;
  };
}

export default function CourseList() {
  // 기본 선택 지역 => url
  const { AreaName } = useParams<{ AreaName?: string }>();
  // 코스 지역, 유형, 난이도 선택
  const [select, setSelect] = useState<{
    areaName: string;
    courseOption: string[];
    level: number;
  }>({
    areaName: AreaName ?? "error",
    courseOption: [],
    level: 0,
  });
  // 모든 코스 목록
  const [allCourseList, setAllCourseList] = useState<Course[]>([]);
  // 스크롤 시 업데이트 될 코스 목록 => 현재 보여지는 코스목록
  const [courseList, setCourseList] = useState<Course[]>([]);
  // 몇개씩 보여줄지?
  const itemPerPage = 8;
  // 스크롤 여부
  const [isScroll, setIsScroll] = useState<boolean>(false);
  // 데이터를 불러오는 중인지 확인
  let isFetching = false;

  useEffect(() => {
    // 렌더링시 데이터 호출 + 지역 선택 바뀔때마다 호출
    fetchCourses();
  }, [select.areaName]);

  useEffect(() => {
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
          isFetching = true;
          // fetchCourses();

          // 현재 보여지고 있는 페이지의 다음 페이지에 해당하는 코스 목록 추출 => 잘라서 !
          const nextPageItems = allCourseList.slice(
            courseList.length,
            courseList.length + itemPerPage
          );

          if (courseList.length < allCourseList.length) {
            // 보여지는 코스 목록에 추가 데이터 추가
            setCourseList((prevCourseList) => [
              ...prevCourseList,
              ...nextPageItems,
            ]);
          } else {
            console.log("END");
          }
          isFetching = false;
        }
      }
    };

    // id=courseList 컴포넌트에 스크롤 이벤트 리스너 추가
    content?.addEventListener("scroll", handleScroll);

    // id=courseList 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
    return () => {
      content?.removeEventListener("scroll", handleScroll);
    };
  }, [courseList]);

  useEffect(() => {
    // level이 변경될 때마다 allCourseList를 필터링하여 courseList를 업데이트
    const filteredLevel = allCourseList.filter((course) => {
      if (select.level === 0) {
        return true;
      }
      return course.level === select.level;
    });

    // courseOption으로도 필터링
    const filteredOption = filteredLevel.filter((course) => {
      // 선택한 옵션들이 모두 포함되어 있는지 확인
      return (
        select.courseOption.length === 0 ||
        select.courseOption.every((option) => course.option.includes(option))
      );
    });

    setCourseList(filteredOption.slice(0, itemPerPage));
  }, [select.level, select.courseOption]);

  const fetchCourses = () => {
    fetch(`/mock/user/courseList_${select.areaName.toLocaleLowerCase()}.json`)
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error("API 요청 실패");
      })
      .then((data) => {
        // 코스 목록 상태 업데이트 => 기존 코스 목록에 새로 가져온 코스 목록 data추가
        setAllCourseList(data.courses);
        setCourseList(data.courses.slice(0, itemPerPage));
      })
      .catch((error) => {
        setAllCourseList([]);
        setCourseList([]);
        console.error("Error fetching more courses:", error);
      });
    // page가 존재할 때 사용!
    // fetch(`/mock/user/courseList_${select.areaName.toLocaleLowerCase()_{page}}.json`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // 코스 목록 상태 업데이트 => 기존 코스 목록에 새로 가져온 코스 목록 data추가
    //       setCourseList((prevCourseList) => [...prevCourseList, ...data.courses]);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching more courses:", error);
    //     });
    isFetching = false;
  };

  return (
    <div id="test" className="relative h-screen w-full overflow-hidden">
      <Header />
      <Filter setSelect={setSelect} select={select} />
      {/* 해당 코스 목록 */}
      <div
        id="courseList"
        className={`scrollbar-custom mx-auto h-full w-full overflow-auto bg-white duration-700 ease-linear ${
          isScroll
            ? "absolute top-[50px] rounded-none"
            : "absolute top-[285px] rounded-t-2xl"
        } `}
      >
        {courseList.length > 0 ? (
          <>
            <CourseItem courseList={courseList} isMine={false} />
            <div className="my-3 flex h-[80px] justify-center">
              {/* 더이상 불러올 코스가 없습니다. */}
            </div>
          </>
        ) : (
          <div className="flex h-[500px] flex-col items-center justify-center">
            <p className="">죄송합니다.</p>
            <p className=""> 코스가 존재하지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
