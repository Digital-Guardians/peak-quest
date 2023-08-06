import React from "react";
import { useNavigate } from "react-router-dom";
import { changeEnglish } from "../../../helper/changeAreaName";
import mountain from "../../../assets/user/mountain.png";

interface RecentCourse {
  id: string;
  title: string;
  thumbnail: string;
  area: string;
}

export default function RecentCourse() {
  const navigte = useNavigate();
  let localStorageData: string | null =
    localStorage.getItem("recent_course") || "{}";

  let recentCourseList: RecentCourse[] = JSON.parse(localStorageData);

  return (
    <>
      {recentCourseList.length > 0 ? (
        <div className="h-min-[290px] grid grid-cols-2 grid-rows-2 gap-2 p-3 duration-300 ease-linear sm:gap-2">
          {recentCourseList.map((course) => (
            <div
              key={course.id}
              className="flex flex-col justify-center"
              onClick={() => {
                navigte(
                  `/area/${changeEnglish(
                    course.area
                  )}/courselist/coursedetail/${course.id}`
                );
              }}
            >
              <div className="relative h-[85px]">
                {/* 썸네일 */}
                <img
                  className="h-full w-full rounded-lg "
                  src={`${course.thumbnail}`}
                  alt={`${course.title}`}
                />
                <p className="absolute bottom-2 right-2 rounded-2xl bg-green/30 px-[10px] py-[2px] text-md font-bold text-white">
                  {course.area}
                </p>
              </div>
              <p className="whitespace-break-spaces pl-1 pt-2 text-[14px]  text-black sm:text-md">
                {course.title.length >= 12
                  ? course.title.slice(0, 12) + "..."
                  : course.title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] flex-col items-center justify-center p-3 text-[14px]">
          <img className="h-[25%] " src={mountain} />
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
