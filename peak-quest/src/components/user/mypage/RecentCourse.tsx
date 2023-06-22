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
    <div className="w-full p-3 grid grid-cols-2 gap-2 sm:gap-2 ease-linear duration-300">
      {recentCourseList.length > 0 &&
        recentCourseList.map((course) => (
          <div
            key={course.id}
            className="max-w-full flex flex-col justify-center"
          >
            <div className="max-w-full h-[85px] relative">
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
  );
}
