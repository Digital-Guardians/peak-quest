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
    <div className="p-3 duration-300 ease-linear">
      {/* 제목 & 위치 */}
      <div className="flex items-center justify-between pl-1 sm:flex-col sm:items-start ">
        <p className="text-xl font-bold text-black sm:mb-1">내 근처에 있어요</p>
        <div className="flex items-center justify-center text-md text-darkGray sm:pl-1">
          <MdMyLocation />
          <p className="ml-1">서울특별시 서대문구</p>
        </div>
      </div>
      {/* km 버튼 */}
      <div className="mb-4 mt-3">
        <button
          className={
            distance === 10
              ? "mr-2 h-[30px] w-[64px]  rounded-3xl border-0 bg-mint text-md font-bold text-white"
              : "mr-2 h-[30px] w-[64px] rounded-3xl border-[1px] border-gray text-md text-darkGray"
          }
          onClick={() => setDistance(10)}
        >
          10km
        </button>
        <button
          className={
            distance === 30
              ? "mr-2 h-[30px] w-[64px]  rounded-3xl border-0 bg-mint text-md font-bold text-white"
              : "mr-2 h-[30px] w-[64px] rounded-3xl border-[1px] border-gray text-md text-darkGray"
          }
          onClick={() => setDistance(30)}
        >
          10~30km
        </button>
        <button
          className={
            distance === 50
              ? "mr-2 h-[30px] w-[64px]  rounded-3xl border-0 bg-mint text-md font-bold text-white"
              : "mr-2 h-[30px] w-[64px] rounded-3xl border-[1px] border-gray text-md text-darkGray"
          }
          onClick={() => setDistance(50)}
        >
          50km
        </button>
      </div>
      {/* course 목록 */}
      {nearCourseList && (
        <CourseItem courseList={nearCourseList} isMine={false} />
      )}
    </div>
  );
}
