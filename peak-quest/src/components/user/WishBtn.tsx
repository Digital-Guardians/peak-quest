import React, { useState } from "react";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";

// WishBtn 컴포넌트의 속성 타입을 수정
interface WishBtnProps {
  courseId: number;
  isDetail: boolean;
}

export default function WishBtn({ courseId, isDetail }: WishBtnProps) {
  // 버튼 클릭 여부
  const [isWish, setIsWish] = useState(false);

  // 스크랩 or 취소
  const handleClick = () => {
    setIsWish(!isWish);
    // 해당 유저의 스크랩 api post
    console.log(courseId);
  };

  return (
    <div
      className={
        isDetail
          ? `h-full text-2xl sm:text-xl flex flex-col justify-center items-center cursor-pointer rounded-lg  ${
              isWish ? "text-green bg-lightGreen" : "text-darkGray bg-[#f1f1f1]"
            }`
          : "w-[23px] h-[23px] flex items-center justify-center bg-black/20 text-white text-lg border-[1px] border-white rounded-full absolute top-2 right-2 cursor-pointer"
      }
      onClick={handleClick}
    >
      {isWish ? <MdOutlineBookmark /> : <MdOutlineBookmarkBorder />}
      {isDetail && <p className="ml-1 text-lg sm:text-md">스크랩하기</p>}
    </div>
  );
}
