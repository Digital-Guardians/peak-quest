import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { TransformedResult } from "../../../types/forestTypes";
import { MapBtn } from "../../../assets/icon";
import KaKaoMapMarker from "./KaKaoMapMarker";
import { OriginCourseNms } from "../../../pages/user/CourseEdit";

interface OriginCourseListsProps {
  originCourseLists?: TransformedResult[];
  selectOriginCourse?: TransformedResult;
  selectedOriginCourse: (selectOrigin: TransformedResult) => void;
}

export default function OriginCourseLists({
  originCourseLists,
  selectOriginCourse,
  selectedOriginCourse,
}: OriginCourseListsProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [isSelectedOriginCourse, setIsSelectedOriginCourse] = useState(false);
  const submittedOriginCouse = () => {
    setIsSelectedOriginCourse(true);
  };

  const saveOriginCourse = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedItemId = e.currentTarget.id;

    const selectedItem = originCourseLists?.find(
      (item) => item.frtrlNm === selectedItemId
    );

    if (selectedItem) {
      handleOpenPopup();
      selectedOriginCourse(selectedItem);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">기존 코스 목록</h1>
      <h6 className="mb-2 text-md text-darkGray">
        선택하신 지역 위치 기반 기존 산림청 코스 목록 결과 입니다.
      </h6>

      <div className="mb-2 w-full rounded-lg border-2 border-gray p-2 text-center">
        {selectOriginCourse ? (
          selectOriginCourse.frtrlNm
        ) : (
          <span className="text-darkGray">목록에서 코스를 선택해주세요</span>
        )}
      </div>

      <ul className="h-[300px] w-full overflow-auto rounded-lg border border-gray py-3 text-darkGray">
        {originCourseLists?.length === 0 && <div>검색 결과가 없습니다.</div>}
        {originCourseLists?.map((item, index) => (
          <li
            onClick={saveOriginCourse}
            key={index}
            id={item.frtrlNm}
            className="flex cursor-pointer items-center justify-between space-x-2 px-5 py-2 hover:bg-lightGray"
          >
            <div className="flex items-center space-x-2">
              <h3 className="mt-[2px] flex h-5 w-5 items-center justify-center rounded-full border border-darkGray text-sm">
                {index + 1}
              </h3>

              <h2>{item.frtrlNm}</h2>
            </div>
            <div className="text-md opacity-70 transition-all duration-200 hover:opacity-100">
              <MapBtn />
            </div>
          </li>
        ))}
      </ul>

      {isPopupOpen && (
        <div className="fixed inset-0 z-30 m-auto flex max-w-[430px] items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={handleClosePopup}
          />
          <div className="relative flex w-full items-center justify-center rounded-lg bg-white p-8 text-black shadow-3xl sm:p-6">
            <KaKaoMapMarker
              selectOriginCourse={selectOriginCourse}
              handleClosePopup={handleClosePopup}
              submittedOriginCouse={submittedOriginCouse}
            />
            <button
              className="absolute right-2 top-2 text-darkGray"
              onClick={handleClosePopup}
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
