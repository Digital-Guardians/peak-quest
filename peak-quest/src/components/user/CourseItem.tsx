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
      <div className="grid w-full grid-cols-2 gap-4 p-3 sm:grid-cols-1 sm:gap-3">
        {/* 각각의 CourseItem */}
        {courseList.map((course) => (
          <div
            key={course.id}
            className="relative box-border flex h-full max-w-full flex-col items-stretch justify-center rounded-lg border-[2px] border-[#f2f2f2]"
          >
            {/* 코스 이미지 */}
            <div
              className="relative h-[100px] max-w-full sm:h-[110px]"
              onClick={() => {
                navigate(
                  `/area/${changeEnglish(
                    course.area
                  )}/courselist/coursedetail/${course.id}`
                );
              }}
            >
              <img
                className="h-full w-full rounded-t-lg "
                src={`${course.thumbnail}`}
                alt={`${course.title}`}
              />
              <div className="absolute left-0 top-0 h-full w-full rounded-t-lg bg-gradient-to-b from-black/20" />
            </div>
            {/* 공유 버튼 */}
            <div
              className={`absolute top-2 flex h-[23px] w-[23px] cursor-pointer items-center justify-center rounded-full border-[1px] border-white bg-black/20 text-md text-white ${
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
            {isMine ? (
              <></>
            ) : (
              <WishBtn courseId={Number(course.id)} isDetail={false} />
            )}
            {/* 코스 설명 */}
            <div
              className="flex h-[96px] w-full flex-col items-start justify-evenly p-2 sm:h-[86px]"
              onClick={() => {
                navigate(
                  `/area/${changeEnglish(
                    course.area
                  )}/courselist/coursedetail/${course.id}`
                );
              }}
            >
              <p className="text-lg font-bold text-black">{course.title}</p>
              <p className="mb-1 text-md text-darkGray">{course.writer}님</p>
              <div className="flex w-full items-center justify-start text-sm text-darkGray sm:justify-end">
                <div className="mr-2 flex items-center justify-center">
                  <AiFillEye />
                  <p className="ml-1">{course.views}</p>
                </div>
                <div className="flex items-center justify-center">
                  <AiFillLike />
                  <p className="ml-1">{course.recommendations}</p>
                </div>
              </div>
            </div>
            {/* 내가 만든 코스에서 수정 & 삭제 버튼 */}
            {isMine ? (
              <div className="mb-2 flex w-full items-center justify-evenly text-md">
                <button
                  className="h-[34px] w-[84px] rounded-lg bg-mint text-white"
                  onClick={() => navigate(`/area/create/${course.id}`)}
                >
                  수정하기
                </button>
                <button
                  className="h-[34px] w-[84px] rounded-lg border-[1px] border-gray text-darkGray"
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
