import React, { useState } from "react";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import WishBtn from "./WishBtn";
import copy from "copy-to-clipboard";
import { changeEnglish } from "../../helper/changeAreaName";

// CourseItem 컴포넌트의 속성 타입을 수정
interface CourseItemProps {
  courseList: Course[];
}

interface Course {
  id: string;
  title: string;
  writer: string;
  thumbnail: string;
  views: number;
  recommendations: number;
  distance: number;
  area: string;
}

export default function CourseItem({ courseList }: CourseItemProps) {
  const handleCopy = () => {
    alert("링크가 복사되었습니다!");
  };
  return (
    <div className="w-full p-3 grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-3">
      {/* 각각의 CourseItem */}
      {courseList.map((course) => (
        <div
          key={course.id}
          className="max-w-full h-[196px] flex flex-col justify-center border-[2px] border-[#f2f2f2] rounded-lg box-border relative"
        >
          {/* 코스 이미지 */}
          <div className="max-w-full h-[100px] relative sm:h-[110px]">
            <img
              className="w-full h-full rounded-t-lg "
              src={`${course.thumbnail}`}
              alt={`${course.title}`}
            />
            <div className="w-full h-full bg-gradient-to-b from-black/20 rounded-t-lg absolute top-0 left-0" />
          </div>
          {/* 공유 버튼 */}
          <div
            className="w-[23px] h-[23px] flex items-center justify-center bg-black/20 text-white text-md border-[1px] border-white rounded-full absolute top-2 right-9 cursor-pointer"
            onClick={() => {
              copy(
                `http://localhost:5173/area/${changeEnglish(
                  course.area
                )}/courselist/coursedetail/${course.id}`
              );
              alert("링크가 복사되었습니다!");
            }}
          >
            <FiShare />
          </div>
          {/* 스크랩 버튼 */}
          <WishBtn courseId={Number(course.id)} />
          {/* 코스 설명 */}
          <div className="p-2 w-full h-[96px] flex flex-col items-start justify-evenly sm:h-[86px]">
            <p className="text-lg text-black font-bold">{course.title}</p>
            <p className="text-md text-darkGray mb-1">{course.writer}님</p>
            <div className="w-full flex justify-start items-center text-xs text-darkGray sm:justify-end">
              <div className="flex justify-center items-center mr-2">
                <AiFillEye />
                <p className="ml-1">{course.views}</p>
              </div>
              <div className="flex justify-center items-center">
                <AiFillLike />
                <p className="ml-1">{course.recommendations}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
