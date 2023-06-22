import React, { ChangeEvent, useRef, useState } from "react";
// 1. 배너
import CourseBanner from "../../components/user/course/CourseBanner";
// 2. 제목
import MyCourseTitle from "../../components/user/course/MyCourseTitle";
// 3. 썸네일
import UploadThumbnail from "../../components/user/course/UploadThumbnail";
// 4. 지역 선택
import SelectCourse from "../../components/user/course/SelectCourse";
import { AreaOption, areaOptions } from "../../components/user/Filter";
// 5. 코스 분류
import CourseCategory from "../../components/user/course/CourseCategory";
// 6. 난이도
import CourseLevel from "../../components/user/course/CourseLevel";
// 7. 소요 시간
import CourseTotalTimes from "../../components/user/course/CourseTotalTimes";
// 8. 총 거리
import CourseTotalDistance from "../../components/user/course/CourseTotalDistance";
// 9. 나만의 코스 목록
import MyCourseLists from "../../components/user/course/MyCourseLists";
// 10. 기존 코스 정보

// 11. 해시 태그
import CourseTags from "../../components/user/course/CourseTags";
// 12. 코스 상세 설명
import CourseEditor from "../../components/user/course/CourseEditor";

// **타입 정의**
// 7. 소요 시간
export interface TotalTimeProps {
  hours: string;
  minutes: string;
}

// 9. 코스 목록
export interface ListItem {
  id: number;
  place: string;
  amenities: Amenities;
}

// 9. 코스 목록
export interface Amenities {
  hasRestroom: boolean;
  hasFood: boolean;
  hasWater: boolean;
}

export default function CourseEdit() {
  // 2. 코스 제목
  // myCourseTitle :string
  const [myCourseTitle, setMyCourseTitle] = useState<string>("");
  const handleMyCourseTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyCourseTitle(event.target.value);
  };

  // 3. 썸네일
  // **이슈**
  // 이미지 URL로 보낼지 FormData로 보낼지 확인
  // previewImgUrl :string
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

  // 4. 지역 선택
  // **참고**
  // /user/Filter 파일에 있는 AreaOption 가져옴
  // selectedOption :{ value: string, label: string }
  const [selectedOption, setSelectedOption] = useState<AreaOption | null>(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const handleSelectOption = (option: AreaOption) => {
    setSelectedOption(option);
    setIsOptionsVisible(false);
  };
  const toggleOptions = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  // 5. 코스 분류
  // **이슈**
  // CourseCategoryTypes 파일안에 있는 courseCategoryOptions에서 id값 확인할 것
  // checkedItems :string[]
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
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

  // 6. 난이도
  // level :number
  const [level, setLevel] = useState<number>(0);
  const handleLevel = (value: number): void => {
    setLevel(value);
  };

  // 7. 소요 시간
  // totalTimes : { hours: string, minutes: string }
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
      }
      // **몇시간까지 허용?**
      // else if (timeValue > 12) {
      //   timeValue = 12;
      // }
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

  // 8. 총 거리
  // **이슈**
  // 2.5 와 같이 소수점 입력 안됨
  // totalDistances :string
  const [totalDistances, setTotalDistances] = useState<string>("");
  const handleTotalDistances = (event: ChangeEvent<HTMLInputElement>) => {
    let distanceValue = parseInt(event.target.value);

    if (isNaN(distanceValue)) {
      distanceValue = 0;
    }

    if (distanceValue < 0) {
      distanceValue = 0;
    }

    setTotalDistances(distanceValue + "");
  };

  // 9. 나만의 코스 목록
  // lists : [{ id :number, place :string, amenities : { hasFood :boolean, hasRestroom :boolean, hasWater :boolean } }]
  const [lists, setLists] = useState<ListItem[]>([]);
  const [place, setPlace] = useState<string>("");
  const [amenities, setAmenities] = useState<Amenities>({
    hasRestroom: false,
    hasFood: false,
    hasWater: false,
  });
  // 코스 목록 추가
  const handleAddListItem = () => {
    const newItem: ListItem = {
      id: Date.now(),
      place,
      amenities: { ...amenities },
    };

    setLists([...lists, newItem]);
    setPlace("");
    setAmenities({
      hasRestroom: false,
      hasFood: false,
      hasWater: false,
    });
  };
  // 코스 삭제
  const handleRemoveListItem = (id: number) => {
    const updatedLists = lists.filter((item) => item.id !== id);
    setLists(updatedLists);
  };
  // 편의시설 선택
  const handleToggleAmenity = (
    itemId: number,
    amenityType: keyof Amenities
  ) => {
    const updatedLists = lists.map((list) => {
      if (list.id === itemId) {
        return {
          ...list,
          amenities: {
            ...list.amenities,
            [amenityType]: !list.amenities[amenityType],
          },
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  // 10. 기존 코스 정보

  // 11. 해시 태그
  // tags :string[]
  const [tags, setTags] = useState<string[]>([]);
  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  // 12. 코스 상세 설명
  // courseEditorText :string
  const [courseEditorText, setCourseEditorText] = useState<string>("");

  return (
    <div>
      {/* 1. 배너 */}
      <CourseBanner />
      {/* 2. 제목 */}
      <div className="mb-8 px-3">
        <MyCourseTitle handleMyCourseTitle={handleMyCourseTitle} />
      </div>
      {/* 3. 썸네일 */}
      <div className="mb-8 px-3">
        <UploadThumbnail
          previewImgUrl={previewImgUrl}
          thumbnailRef={thumbnailRef}
          handlePreviewImg={handlePreviewImg}
        />
      </div>
      {/* 4. 지역 선택 */}
      <div className="mb-8 px-3">
        <SelectCourse
          options={areaOptions}
          selectedOption={selectedOption}
          handleSelectOption={handleSelectOption}
          isOptionsVisible={isOptionsVisible}
          toggleOptions={toggleOptions}
        />
      </div>
      {/* 5. 코스 분류 */}
      <div className="mb-8 px-3">
        <CourseCategory
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      {/* 6. 난이도 */}
      <div className="mb-8 px-3">
        <CourseLevel level={level} handleLevel={handleLevel} />
      </div>
      {/* 7. 소요 시간 */}
      <div className="mb-8 px-3">
        <CourseTotalTimes
          totalTimes={totalTimes}
          handleTotalTimes={handleTotalTimes}
        />
      </div>
      {/* 8. 총 거리 */}
      <div className="mb-8 px-3">
        <CourseTotalDistance
          totalDistances={totalDistances}
          handleTotalDistances={handleTotalDistances}
        />
      </div>
      {/* 9. 나만의 코스 목록 */}
      <div className="mb-8 px-3">
        <MyCourseLists
          lists={lists}
          place={place}
          amenities={amenities}
          onAddListItem={handleAddListItem}
          onRemoveListItem={handleRemoveListItem}
          onToggleAmenity={handleToggleAmenity}
          onPlaceChange={setPlace}
          onAmenitiesChange={setAmenities}
        />
      </div>
      {/* 10. 기존 코스 정보 */}
      <div className="mb-8 px-3">기존 코스 정보</div>
      {/* 11. 해시 태그 */}
      <div className="mb-8 px-3">
        <CourseTags tags={tags} handleTagsChange={handleTagsChange} />
      </div>
      {/* 12. 코스 상세 설명 */}
      <div className="mb-8 px-2">
        <CourseEditor setCourseEditorText={setCourseEditorText} />
      </div>
      {/* 13. 추가 버튼 */}
      <div className="mb-8 px-2">
        <button className="mt-12 w-full rounded-md bg-green py-2 text-white">
          코스 등록하기
        </button>
      </div>
    </div>
  );
}
