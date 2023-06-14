import React, { useState } from "react";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";

// WishBtn 컴포넌트의 속성 타입을 수정
interface WishBtnProps {
  courseId: number;
}

export default function WishBtn({ courseId }: WishBtnProps) {
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
      className="w-[23px] h-[23px] flex items-center justify-center  bg-black/20 text-white text-lg border-[1px] border-white rounded-full absolute top-2 right-2 cursor-pointer"
      onClick={handleClick}
    >
      {isWish ? <MdOutlineBookmark /> : <MdOutlineBookmarkBorder />}
    </div>
  );
}
