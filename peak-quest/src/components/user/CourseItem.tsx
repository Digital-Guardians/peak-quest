import React, { useState } from "react";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import WishBtn from "./WishBtn";
import copy from "copy-to-clipboard";
import { changeEnglish } from "../../helper/changeAreaName";
import { useNavigate } from "react-router-dom";
import UserModal from "./mypage/UserModal";

// CourseItem 컴포넌트의 속성 타입을 수정
interface CourseItemProps {
  courseList: Course[];
  isMine: boolean | void;
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

export default function CourseItem({ courseList, isMine }: CourseItemProps) {
  const navigate = useNavigate();
  // 수정모달
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {open && (
        <UserModal
          order={["delete", "/mock/user/myPage_myCourseList.json"]}
          setOpen={setOpen}
          content={"이 코스를 삭제하시겠습니까?"}
          subContent={["삭제하시면 코스 정보가 영구적으로 사라져요!"]}
          firstStatus={"삭제"}
          secondStatus={"취소"}
        />
      )}
      <div className="w-full p-3 grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-3">
        {/* 각각의 CourseItem */}
        {courseList.map((course) => (
          <div
            key={course.id}
            className="max-w-full h-full flex flex-col items-stretch justify-center border-[2px] border-[#f2f2f2] rounded-lg box-border relative"
          >
            {/* 코스 이미지 */}
            <div
              className="max-w-full h-[100px] relative sm:h-[110px]"
              onClick={() => {
                navigate(
                  `/area/${changeEnglish(
                    course.area
                  )}/courselist/coursedetail/${course.id}`
                );
              }}
            >
              <img
                className="w-full h-full rounded-t-lg "
                src={`${course.thumbnail}`}
                alt={`${course.title}`}
              />
              <div className="w-full h-full bg-gradient-to-b from-black/20 rounded-t-lg absolute top-0 left-0" />
            </div>
            {/* 공유 버튼 */}
            <div
              className={`w-[23px] h-[23px] flex items-center justify-center bg-black/20 text-white text-md border-[1px] border-white rounded-full cursor-pointer absolute top-2 ${
                isMine ? "right-2" : "right-9 "
              }`}
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
            {/* 스크랩 버튼 => 내가 만든 코스는 제외 */}
            {isMine ? <></> : <WishBtn courseId={Number(course.id)} />}
            {/* 코스 설명 */}
            <div
              className="p-2 w-full h-[96px] flex flex-col items-start justify-evenly sm:h-[86px]"
              onClick={() => {
                navigate(
                  `/area/${changeEnglish(
                    course.area
                  )}/courselist/coursedetail/${course.id}`
                );
              }}
            >
              <p className="text-lg text-black font-bold">{course.title}</p>
              <p className="text-md text-darkGray mb-1">{course.writer}님</p>
              <div className="w-full flex justify-start items-center text-sm text-darkGray sm:justify-end">
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
            {/* 내가 만든 코스에서 수정 & 삭제 버튼 */}
            {isMine ? (
              <div className="w-full flex justify-evenly items-center text-md mb-2">
                <button
                  className="w-[84px] h-[34px] rounded-lg bg-mint text-white"
                  onClick={() => navigate(`/area/create/${course.id}`)}
                >
                  수정하기
                </button>
                <button
                  className="w-[84px] h-[34px] rounded-lg border-[1px] border-gray text-darkGray"
                  onClick={() => setOpen(true)}
                >
                  삭제하기
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
