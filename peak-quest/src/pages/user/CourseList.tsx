import React, { useState, useEffect } from "react";
import CourseItem from "../../components/user/CourseItem";
import Filter from "../../components/user/Filter";

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
  const [courseList, setCourseList] = useState();
  // 스크롤 여부
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => console.log("select", select), [select]);

  return (
    <div className="w-full relative">
      <Filter setSelect={setSelect} select={select} />
      {/* 해당 코스 목록 */}
      <div className="w-full max-w-[430px] mx-auto bg-white rounded-t-2xl translate-y-[-28%]">
        {courseList ? (
          <CourseItem courseList={courseList} />
        ) : (
          <div className="h-[380px] flex flex-col justify-center items-center">
            <p className="">죄송합니다.</p>
            <p className=""> 코스가 존재하지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
