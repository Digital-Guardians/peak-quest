import React, { useEffect, useState } from "react";
import { MdMyLocation } from "react-icons/md";
import CourseItem from "./CourseItem";

export default function Nearby() {
  // 기본 거리 10km
  const [distance, setDistance] = useState(10);
  // 가까운 코스 목록
  const [nearCourseList, setNearCourseList] = useState();

  // 거리 선택 => 해당 거리 이내의 코스 불러오기
  useEffect(() => {
    if (distance === 10) {
      fetch("/mock/user/nearbyCourse_10.json")
        .then((res) => res.json())
        .then((data) => {
          setNearCourseList(data.courses);
        });
    } else if (distance === 30) {
      fetch("/mock/user/nearbyCourse_30.json")
        .then((res) => res.json())
        .then((data) => {
          setNearCourseList(data.courses);
        });
    } else {
      fetch("/mock/user/nearbyCourse_50.json")
        .then((res) => res.json())
        .then((data) => {
          setNearCourseList(data.courses);
        });
    }
  }, [distance]);

  return (
    <div className="p-3 ease-linear duration-300">
      {/* 제목 & 위치 */}
      <div className="flex justify-between items-center pl-1 sm:flex-col sm:items-start ">
        <p className="text-xl text-black font-bold sm:mb-1">내 근처에 있어요</p>
        <div className="flex justify-center items-center text-darkGray text-md sm:pl-1">
          <MdMyLocation />
          <p className="ml-1">서울특별시 서대문구</p>
        </div>
      </div>
      {/* km 버튼 */}
      <div className="mt-3 mb-4">
        <button
          className={
            distance === 10
              ? "w-[64px] h-[30px] bg-mint  text-md text-white border-0 font-bold rounded-3xl mr-2"
              : "w-[64px] h-[30px] text-md text-darkGray border-[1px] border-gray rounded-3xl mr-2"
          }
          onClick={() => setDistance(10)}
        >
          10km
        </button>
        <button
          className={
            distance === 30
              ? "w-[64px] h-[30px] bg-mint  text-md text-white border-0 font-bold rounded-3xl mr-2"
              : "w-[64px] h-[30px] text-md text-darkGray border-[1px] border-gray rounded-3xl mr-2"
          }
          onClick={() => setDistance(30)}
        >
          30km
        </button>
        <button
          className={
            distance === 50
              ? "w-[64px] h-[30px] bg-mint  text-md text-white border-0 font-bold rounded-3xl mr-2"
              : "w-[64px] h-[30px] text-md text-darkGray border-[1px] border-gray rounded-3xl mr-2"
          }
          onClick={() => setDistance(50)}
        >
          50km
        </button>
      </div>
      {/* course 목록 */}
      {nearCourseList && <CourseItem courseList={nearCourseList} />}
    </div>
  );
}
