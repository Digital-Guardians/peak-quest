import React, { ChangeEvent, useRef, useState } from "react";
import SelectCourse from "../../components/user/course/SelectCourse";
import CourseBanner from "../../components/user/course/CourseBanner";
import UploadThumbnail from "../../components/user/course/UploadThumbnail";
import MyCourseTitle from "../../components/user/course/MyCourseTitle";
import CourseCategory from "../../components/user/course/CourseCategory";
import WysiwygEditor from "../../components/user/ToastUiEditor";
// 지역 선택
import { AreaOption, areaOptions } from "../../components/user/Filter";
import CourseLevel from "../../components/user/course/CourseLevel";
import CourseTotalTimes from "../../components/user/course/CourseTotalTimes";

// import { Editor } from "@toast-ui/react-editor";
// import "@toast-ui/editor/dist/toastui-editor.css";

export interface TotalTimeProps {
  hours: string;
  minutes: string;
}

export default function CourseEdit() {
  const [myCourseTitle, setMyCourseTitle] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<AreaOption | null>(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // 코스 제목
  const handleMyCourseTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyCourseTitle(event.target.value);
  };

  // 지역 선택
  const handleSelectOption = (option: AreaOption) => {
    setSelectedOption(option);
    setIsOptionsVisible(false);
  };

  // 지역 선택 - 토글옵션창
  const toggleOptions = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  // 코스 분류
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;

    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  };

  // 썸네일
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);

  const handlePreviewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImgUrl(null);
    }
  };

  // 난이도
  const [level, setLevel] = useState<number>(0);

  // 난이도 선택 시 select 값 변경
  const handleLevel = (value: number): void => {
    setLevel(value);
  };

  // 소요시간
  const [totalTimes, setTotalTimes] = useState<TotalTimeProps>({
    hours: "",
    minutes: "",
  });

  const handleTotalTimes = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let timeValue = parseInt(value);

    if (isNaN(timeValue)) {
      timeValue = 0;
    }

    if (name === "hours") {
      if (timeValue < 0) {
        timeValue = 0;
      } else if (timeValue > 12) {
        timeValue = 12;
      }
    } else if (name === "minutes") {
      if (timeValue < 0) {
        timeValue = 0;
      } else if (timeValue > 59) {
        timeValue = 59;
      }
    }
    setTotalTimes((prevTotalTimes) => ({
      ...prevTotalTimes,
      [name]: timeValue.toString(),
    }));
  };

  return (
    <div>
      {/* 코스 배너 */}
      <CourseBanner />
      {/* 코스 제목 */}
      <div className="mb-8 px-3">
        <MyCourseTitle handleMyCourseTitle={handleMyCourseTitle} />
      </div>
      {/* 코스 썸네일 */}
      <div className="mb-8 px-3">
        <UploadThumbnail
          previewImgUrl={previewImgUrl}
          thumbnailRef={thumbnailRef}
          handlePreviewImg={handlePreviewImg}
        />
      </div>
      {/* 지역 선택 */}
      <div className="mb-8 px-3">
        <SelectCourse
          options={areaOptions}
          selectedOption={selectedOption}
          handleSelectOption={handleSelectOption}
          isOptionsVisible={isOptionsVisible}
          toggleOptions={toggleOptions}
        />
      </div>
      {/* 코스 분류 */}
      <div className="mb-8 px-3">
        <CourseCategory
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      {/* 난이도 */}
      <div className="mb-8 px-3">
        <CourseLevel level={level} handleLevel={handleLevel} />
      </div>
      {/* 소요 시간 */}
      <div className="mb-8 px-3">
        <CourseTotalTimes
          totalTimes={totalTimes}
          handleTotalTimes={handleTotalTimes}
        />
      </div>
      {/* <WysiwygEditor /> */}
    </div>
  );
}
