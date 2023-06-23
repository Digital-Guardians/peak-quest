import React, { useEffect, useState } from "react";

interface RecentCourse {
  id: string;
  title: string;
  thumbnail: string;
  area: string;
}

export default function RecentCourse() {
  let localStorageData: string | null =
    localStorage.getItem("recent_course") || "{}";

  let recentCourseList: RecentCourse[] = JSON.parse(localStorageData);

  return (
    <>
      {recentCourseList.length > 0 ? (
        <div className="p-3 grid grid-cols-2 gap-2 sm:gap-2 ease-linear duration-300">
          {recentCourseList.map((course) => (
            <div key={course.id} className="flex flex-col justify-center">
              <div className="h-[85px] relative">
                {/* 썸네일 */}
                <img
                  className="w-full h-full rounded-lg "
                  src={`${course.thumbnail}`}
                  alt={`${course.title}`}
                />
                <p className="py-[2px] px-[10px] bg-green/30 text-md text-white font-bold rounded-2xl absolute bottom-2 right-2">
                  {course.area}
                </p>
              </div>
              <p className="pt-2 pl-1 text-black text-[14px]  whitespace-break-spaces sm:text-md">
                {course.title.length >= 12
                  ? course.title.slice(0, 12) + "..."
                  : course.title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[200px] flex flex-col justify-center items-center p-3 text-[14px]">
          {/* 이미지 출처 : https://icon-icons.com/ko/download/47538/PNG/512/ */}
          <img
            className="h-[35%] "
            // src="../../src/assets/user/mountains_mountain.png"
            src="../../src/assets/user/mountain.png"
          />
          <p>아직 확인해 본 코스가 없어요.</p>
          <p>
            <span className="font-bold text-green">픽퀘스트</span>의
            <span className="font-bold text-green"> 특별한 코스들</span>을 한 번
            둘러보세요.
          </p>
        </div>
      )}
    </>
  );
}
