import React, { useEffect, useState } from "react";
import { saveRecentCourse } from "../../helper/saveRecentCourse";
import { useNavigate, useParams } from "react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import copy from "copy-to-clipboard";
import { FiShare2 } from "react-icons/fi";
import { changeEnglish } from "../../helper/changeAreaName";
import { MdOutlineLocationOn } from "react-icons/md";
import { WiTime7 } from "react-icons/wi";
import { BiCurrentLocation } from "react-icons/bi";
import WishBtn from "../../components/user/WishBtn";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsShieldFillExclamation } from "react-icons/bs";
import CourseInfo from "../../components/user/courseDetail/CourseInfo";
import AlreadyModal from "../../components/user/courseDetail/AlreadyModal";
import ReportModal from "../../components/user/courseDetail/ReportModal";
import {
  courseLikes,
  getCourseDetail,
  onUserStateChanged,
} from "../../service/firebase";
import { useUserContext } from "../../context/userContext";

// 코스 타입 정의
interface Course {
  id: number;
  writer: string;
  title: string;
  area: string;
  thumbnail: string;
  checkedItems: string[];
  totalTimes: {
    hours: string;
    minutes: string;
  };
  totalDistances: string;
  level: number;
  lists: [
    {
      id: number;
      place: string;
      address_name: string;
      amenities: {
        hasFood: string;
        hasRestroom: string;
        hasWater: string;
      };
      position: {
        lat: number;
        lng: number;
      };
    }
  ];
  courseEditorText: string;
  selectOriginCourse: {
    id: number;
    frtrlNm: string;
    position: [{ lat: number; lng: number }];
  };
  tag: string[];
  uid: string;
}

export default function CourseDetail() {
  const { user, setUser } = useUserContext();
  // navigate
  const navigate = useNavigate();
  // 해당 코스의 id 가져오기
  const { courseId } = useParams();
  // 코스
  const [course, setCourse] = useState<Course>();
  // 추천버튼
  const [isRecommend, setIsRecommend] = useState<boolean>(false);
  // 신고 모달
  const [openReport, setOpenReport] = useState<boolean>(false);
  // 관련코스 모달
  const [openAlready, setOpenAlready] = useState<boolean>(false);

  useEffect(() => {
    onUserStateChanged(setUser);

    // 코스상세 가져오기
    const fetchCourseDetail = async () => {
      if (courseId) {
        const data = await getCourseDetail(parseInt(courseId));
        setCourse(data);
        if (data) {
          // 최근 본 코스 추가
          saveRecentCourse({
            id: parseInt(courseId),
            title: data.course.title,
            thumbnail: data.course.thumbnail,
            area: data.course.area,
          });
        }
      }
    };

    fetchCourseDetail();

    // (async () => {
    //   const data = await getCourseDetail(parseInt(courseId));
    //   setCourse(data);
    //   console.log(data);
    //   if (data) {
    //     // 최근 본 코스 추가
    //     saveRecentCourse({
    //       id: data.course.id,
    //       title: data.course.title,
    //       thumbnail: data.course.thumbnail,
    //       area: data.course.area,
    //     });
    //   }
    // })();
  }, [courseId]);

  return (
    <>
      {course && (
        <div className="relative w-full">
          {openReport && <ReportModal setOpenReport={setOpenReport} />}
          {openAlready && (
            <AlreadyModal
              selectOriginCourse={course.selectOriginCourse}
              setOpenAlready={setOpenAlready}
            />
          )}
          {/* header */}
          <div className="absolute top-0 z-50 h-[50px] w-full pt-1 text-center text-xl font-bold leading-loose text-white duration-300 ease-linear sm:h-[48px] sm:pt-2 sm:text-lg">
            {/* 뒤로 가기 버튼 */}
            <div
              className="absolute left-3 top-3 text-2xl duration-300 ease-linear sm:text-xl"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack />
            </div>
            <p>{course.writer} 님의 코스</p>
            {/* 공유버튼 */}
            <div
              className="absolute right-3 top-3 flex cursor-pointer  items-center justify-center text-xl sm:text-lg"
              onClick={() => {
                copy(
                  `http://localhost:5173/area/${changeEnglish(
                    course.area
                  )}/courselist/coursedetail/${course.id}`
                );
                alert("링크가 복사되었습니다!");
              }}
            >
              <FiShare2 />
            </div>
          </div>
          {/* 썸네일 */}
          <div className="relative h-[390px] w-full max-w-[430px] overflow-hidden text-white sm:h-[380px]">
            <img
              className="h-full w-full"
              src={`${course.thumbnail}`}
              alt={`${course.title}`}
            />
            {/* 그라데이션 */}
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/60 to-black/0" />
            {/* 코스 필터 */}
            <div className="absolute bottom-5 left-3 flex flex-col justify-center pr-2">
              <p className="text-2xl font-bold sm:text-xl">{course.title}</p>
              <div className="flex flex-wrap items-center justify-start">
                <div className="mr-2 mt-2 rounded-full border-[1px] border-white  p-2 text-md font-bold sm:py-1">
                  {course.area}
                </div>
                {course.checkedItems &&
                  course.checkedItems.map((items, idx) => (
                    <div
                      key={idx}
                      className="mr-2 mt-2 rounded-full border-[1px] border-white p-2 text-md font-bold sm:py-1"
                    >
                      {items}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="px-3">
            {/* 지역, 시간, km */}
            <div className="flex h-[60px] w-full items-center justify-start border-b-[1px] border-gray text-md  text-darkGray sm:h-[55px]">
              <div className="mr-5 flex items-center justify-start">
                <div className="mr-1 text-xl sm:text-lg">
                  <MdOutlineLocationOn />
                </div>
                {course.area}
              </div>
              <div className="mr-5 flex items-center justify-start">
                <div className="mr-1  text-xl sm:text-lg">
                  <WiTime7 />
                </div>
                {course.totalTimes.hours}시 {course.totalTimes.minutes}분
              </div>
              <div className="flex items-center justify-start">
                <div className="mr-1  text-xl sm:text-lg">
                  <BiCurrentLocation />
                </div>
                {course.totalDistances}km
              </div>
            </div>
            {/* 신고 */}
            <div className="relative mt-3 flex h-[40px] items-center justify-start rounded-lg bg-[#f1f1f1] px-3 text-md text-darkGray">
              <BsShieldFillExclamation />
              <p className="ml-2">이 코스 정보에 문제가 있나요?</p>
              <button
                className="absolute right-3 flex items-center justify-center font-bold"
                onClick={() => setOpenReport(true)}
              >
                신고하기
                <IoIosArrowForward />
              </button>
            </div>
            {/* 코스소개 & 설명 */}
            <CourseInfo
              courseInfo={course.lists}
              selectOriginCourse={course.selectOriginCourse}
              openAlready={openAlready}
              setOpenAlready={setOpenAlready}
              courseEditorText={course.courseEditorText}
            />
            {/* hashtag */}
            {course.tag && (
              <div className="mb-8 flex items-center justify-start border-b-[1px] border-gray pb-5">
                {course.tag.map((el, idx) => (
                  <div
                    className="mr-3 rounded-lg bg-lightGreen px-3 py-2 text-sm text-green sm:rounded-md sm:px-2 sm:py-1"
                    key={idx}
                  >
                    # {el}
                  </div>
                ))}
              </div>
            )}
            {/* 추천 & 스크랩 btn */}
            <div className="my-5 flex h-[60px] w-full items-center justify-evenly text-lg font-bold sm:h-[50px] sm:text-md">
              <div
                className={`flex h-full w-[45%] cursor-pointer flex-col items-center justify-center rounded-lg 
              ${
                isRecommend
                  ? "bg-lightGreen text-green"
                  : "bg-[#f1f1f1] text-darkGray"
              }`}
                onClick={() => {
                  setIsRecommend(!isRecommend);
                  courseLikes(course.id);
                  // api 호출
                  console.log("recommend", course.id);
                }}
              >
                <div className="text-2xl sm:text-xl">
                  {isRecommend ? <AiFillLike /> : <AiOutlineLike />}
                </div>
                추천하기
              </div>
              <div className="h-full w-[1px] bg-white" />
              <div className="h-full w-[45%]">
                <WishBtn courseId={course.id} isDetail={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
