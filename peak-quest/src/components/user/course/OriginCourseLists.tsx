import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { CourseNmProps } from "../../../types/forestTypes";

interface OriginCourseListsProps {
  fvsnStsfnFrtrlInfoList?: CourseNmProps[];
}

export default function OriginCourseLists({
  fvsnStsfnFrtrlInfoList,
}: OriginCourseListsProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleOpenPopup = (itemId: number) => {
    setIsPopupOpen(true); // 팝업 열기
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  console.log(fvsnStsfnFrtrlInfoList);

  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">기존 코스 목록</h1>

      {/* 기존 코스 리스트 팝업 */}
      {true && (
        <div className="fixed inset-0 z-30 m-auto flex max-w-[430px] items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black opacity-70"
            // onClick={handleCloseMapPopup}
          />
          <div className="relative flex w-full items-center justify-center rounded-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2">
            <ul className="w-full p-4">
              {fvsnStsfnFrtrlInfoList?.map((item) => (
                <li>{item.frtrlNm}</li>
              ))}
            </ul>
            {/* 닫기 버튼 */}
            <button
              className="absolute right-2 top-2 text-darkGray"
              //   onClick={handleCloseMapPopup}
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
