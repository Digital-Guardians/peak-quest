// 관련 컴포넌트
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
// 0. 메뉴탭
import { IoIosArrowBack } from "react-icons/io";
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
// import CourseEditor from "../../components/user/course/CourseEditor";
import { useNavigate } from "react-router-dom";
import { TransformedResult } from "../../types/forestTypes";
import OriginCourseLists from "../../components/user/course/OriginCourseLists";
import { addCourse, onUserStateChanged } from "../../service/firebase";
import { useUserContext } from "../../context/userContext";
import { IoClose } from "react-icons/io5";
import User from "../admin/User";
import { v4 as uuidv4 } from "uuid";
import CourseEditor from "../../components/user/course/CourseEditor";
import { imgUpload } from "../../service/imgUploader";

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
  position: { lat: string; lng: string };
  address_name: string;
}

// 9. 코스 목록
export interface Amenities {
  hasRestroom: "Y" | "N" | "";
  hasFood: "Y" | "N" | "";
  hasWater: "Y" | "N" | "";
}

export interface OriginCourseNms {
  originCourse: string;
  lat: number;
  lng: number;
}

export default function CourseEdit() {
  const { user, setUser } = useUserContext();
  // 0.페이지 이동을 위함
  const navigate = useNavigate();

  //uuid
  const uuid = uuidv4();

  // 2. 코스 제목
  // myCourseTitle :string
  const [myCourseTitle, setMyCourseTitle] = useState<string>("");
  const handleMyCourseTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.slice(0, 20);
    setMyCourseTitle(value);
  };

  // 3. 썸네일
  // **이슈**
  // 이미지 URL로 보낼지 FormData로 보낼지 확인
  // previewImgUrl :string
  const [previewImgUrl, setPreviewImgUrl] = useState<string>("");
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
      setPreviewImgUrl("");
    }
  };

  // 4. 지역 선택
  // **참고**
  // /user/Filter 파일에 있는 AreaOption 가져옴
  // selectedOption :{ value: string, label: string }
  const [selectedOption, setSelectedOption] = useState<AreaOption>({
    value: "",
    label: "",
  });
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
  // 키워드 검색 결과 리스트
  const [lists, setLists] = useState<ListItem[]>([]);
  // 키워드 input Value
  const [place, setPlace] = useState<string>("");
  // 편의시설 유무
  const [amenities, setAmenities] = useState<Amenities>({
    hasRestroom: "",
    hasFood: "",
    hasWater: "",
  });

  // 새로운 입력창을 추가하는 함수
  const handleAddNewInput = () => {
    const newItem: ListItem = {
      id: Math.random(),
      place: "",
      amenities: {
        hasRestroom: "",
        hasFood: "",
        hasWater: "",
      },
      position: {
        lat: "",
        lng: "",
      },
      address_name: "",
    };

    setLists([...lists, newItem]);
    setPlace("");
    setAmenities({
      hasRestroom: "",
      hasFood: "",
      hasWater: "",
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
            [amenityType]: list.amenities[amenityType] === "Y" ? "N" : "Y",
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

  // 공공데이터
  const [originCourseLists, setOriginCourseLists] = useState<
    TransformedResult[]
  >([]);

  const [selectOriginCourse, setSelectOriginCourse] =
    useState<TransformedResult>({
      frtrlNm: "",
      position: [{ lat: 0, lng: 0 }],
    });

  // 13. 최종 데이터
  const data = {
    myCourseTitle,
    previewImgUrl,
    selectedOption,
    checkedItems,
    level,
    totalTimes,
    selectOriginCourse,
    totalDistances,
    lists,
    tags,
    courseEditorText,
  };

  // console.log("myCourseTitle", myCourseTitle);
  // console.log("previewImgUrl", previewImgUrl);
  // console.log("selectedOption", selectedOption);
  // console.log("checkedItems", checkedItems);
  // console.log("level", level);
  // console.log("totalTimes", totalTimes);
  // console.log("totalDistances", totalDistances);
  // console.log("lists", lists);
  // console.log("tags", tags);
  // console.log("courseEditorText", courseEditorText);

  const selectedOriginCourse = (selectOrigin: TransformedResult) => {
    setSelectOriginCourse(selectOrigin);
  };

  useEffect(() => {
    onUserStateChanged(setUser);
    const fetchData = async () => {
      try {
        // const fvsnStsfnFrtrlInfo =
        //   await openDataAPI.getFvsnStsfnFrtrlInfoList();
        // console.log(fvsnStsfnFrtrlInfo);

        const response = await fetch("/mock/user/origin_course.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOriginCourseLists(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 페이지 진입 시 맨 위로 스크롤 이동
    window.scrollTo(0, 0);
  }, []);

  interface list {
    id: number;
    place: string;
    amenities: Amenities;
    position: {
      lat: string;
      lng: string;
    };
    address_name: string;
  }

  interface formdata {
    myCourseTitle: string;
    previewImgUrl: string;
    selectedOption: {
      value: string;
      label: string;
    };
    checkedItems: string[];
    level: number;
    totalTimes: {
      hours: string;
      minutes: string;
    };
    totalDistances: string;
    selectOriginCourse: TransformedResult;
    lists: ListItem[];
    tags: string[];
    courseEditorText: string;
  }

  // const defaultFormData: formdata = {
  //   myCourseTitle: "",
  //   previewImgUrl: "",
  //   selectedOption: "",
  //   checkedItems: [""],
  //   level: 0,
  //   totalTimes: {
  //     hours: "",
  //     minutes: "",
  //   },
  //   totalDistances: "",
  //   selectOriginCourse: {
  //     value: "",
  //     label: "",
  //   },
  //   lists: [],
  //   tags: [""],
  //   courseEditorText: "",
  // };

  // const [formData, setFormData] = useState<formdata>(defaultFormData);

  // function handleSubmit(data: formdata) {
  //   uploadImage(data.previewImgUrl) //
  //     .then((url) => {
  //       addCourse(data, url, user);
  //     });
  // }

  // 최종 확인 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true); // 팝업 열기
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  const handleSubmit = (data: formdata) => {
    console.log("최종", data);
    handleOpenPopup();
    imgUpload(data.previewImgUrl).then((url: any) =>
      addCourse(data, url, user, uuid)
    );
  };

  const onSubmitMyCourse = (data: formdata) => {
    handleSubmit(data);
    handleOpenPopup();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div>
      {/* 0. 메뉴탭 */}
      <div className="relative h-[50px] w-full items-center bg-white text-center text-2xl font-bold leading-[48px] text-black sm:text-xl">
        {/* 뒤로 가기 버튼 */}
        <div
          className="absolute left-3 top-3 cursor-pointer text-2xl"
          onClick={() => {
            if (location.pathname === "/area/create") {
              navigate("/");
            } else {
              navigate(-1);
            }
          }}
        >
          <IoIosArrowBack />
        </div>
        <div>나만의 코스 등록</div>
      </div>
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
          setLists={setLists}
          place={place}
          amenities={amenities}
          onAddNewInput={handleAddNewInput}
          onRemoveListItem={handleRemoveListItem}
          onToggleAmenity={handleToggleAmenity}
          onPlaceChange={setPlace}
          onAmenitiesChange={setAmenities}
        />
      </div>
      {/* 10. 기존 코스 정보 */}
      <div className="mb-8 px-3">
        <OriginCourseLists
          originCourseLists={originCourseLists}
          selectOriginCourse={selectOriginCourse}
          selectedOriginCourse={selectedOriginCourse}
        />
      </div>
      {/* 11. 해시 태그 */}
      <div className="mb-8 px-3">
        <CourseTags tags={tags} handleTagsChange={handleTagsChange} />
      </div>
      {/* 12. 코스 상세 설명 */}
      <div className="mb-8 px-2">
        <CourseEditor setCourseEditorText={setCourseEditorText} />
      </div>
      {/* 13. 추가 버튼 */}
      <div className="mb-5 px-2">
        <button
          className="mt-5 w-full rounded-md bg-green py-2 text-white"
          // onClick={() => handleSubmit(data)}
          onClick={handleOpenPopup}
        >
          코스 등록하기
        </button>
      </div>
      {/* 팝업 */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={handleClosePopup}
          />
          <div className="relative flex items-center justify-center rounded-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2">
            <div className="p-2">
              {/* 팝업 내용 */}
              <div className="">
                <h2 className="my-3 text-xl font-medium text-black">
                  코스를 <strong className="text-mint">등록</strong>
                  하시겠습니까?
                </h2>
              </div>
              {/* 버튼 */}
              <div className="mt-4 flex items-center justify-center sm:text-md">
                <div>
                  <button
                    className="mr-2 cursor-pointer rounded-lg bg-gray px-8 py-2 text-darkGray  sm:px-4 sm:py-2"
                    onClick={handleClosePopup}
                  >
                    취소
                  </button>
                </div>
                <div>
                  <button
                    className="rounded-lg  bg-mint px-8  py-2  text-white sm:px-4 sm:py-2"
                    onClick={() => onSubmitMyCourse(data)}
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
            {/* 닫기 버튼 */}
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
