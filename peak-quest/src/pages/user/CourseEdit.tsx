import React, { ChangeEvent, useRef, useState } from "react";
import SelectCourse from "../../components/user/course/SelectCourse";
import CourseBanner from "../../components/user/course/CourseBanner";
import UploadThumbnail from "../../components/user/course/UploadThumbnail";
import MyCourseTitle from "../../components/user/course/MyCourseTitle";
import CourseCategory from "../../components/user/course/CourseCategory";
import WysiwygEditor from "../../components/user/ToastUiEditor";

// import { Editor } from "@toast-ui/react-editor";
// import "@toast-ui/editor/dist/toastui-editor.css";

export interface Option {
  value: string;
  label: string;
}

export default function CourseEdit() {
  const [myCourseTitle, setMyCourseTitle] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // 지역 선택 - 옵션
  const options: Option[] = [
    { value: "0", label: "수도권" },
    { value: "1", label: "강원권" },
    { value: "2", label: "충청권" },
    { value: "3", label: "전라권" },
    { value: "4", label: "경상권" },
    { value: "5", label: "제주도" },
  ];

  // 코스 제목
  const handleMyCourseTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyCourseTitle(event.target.value);
  };

  // 지역 선택
  const handleSelectOption = (option: Option) => {
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
          options={options}
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
      {/* <WysiwygEditor /> */}
    </div>
  );
}
