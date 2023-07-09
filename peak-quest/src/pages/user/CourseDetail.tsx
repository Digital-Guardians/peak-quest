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
import {
  AiOutlineLike,
  AiFillLike,
  AiFillQuestionCircle,
} from "react-icons/ai";
import { BsShieldFillExclamation } from "react-icons/bs";

// 코스 타입 정의
interface Course {
  // 코스 속성들
  id: number;
  writer: string;
  title: string;
  area: string;
  detail_area: string;
  thumbnail: string;
  course_option: {
    go_alone: string;
    day_to_day: string;
    with_pet: string;
    with_amenities: string;
    can_bike: string;
  };
  time: number;
  distance: number;
  level: number;
  info: [
    {
      id: number;
      place: string;
      amenities: {
        water: string;
        restaurant: string;
        restroom: string;
      };
    }
  ];
  content: string;
  tag: string[];
}

export default function CourseDetail() {
  // navigate
  const navigate = useNavigate();
  // 해당 코스의 id 가져오기
  const { id } = useParams();
  // 코스
  const [course, setCourse] = useState<Course>();
  // 코스 옵션
  const [courseOption, setCourseOption] = useState<string[]>();
  // 추천버튼
  const [isRecommend, setIsRecommend] = useState<boolean>(false);
  // 신고 모달
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // api 연결
    fetch(`/mock/user/course_detail.json`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        // console.log(data.course);
      })
      .catch((error) => {
        console.error("Error fetching more courses:", error);
      });
    // 최근 본 코스 테스트용 코드
    saveRecentCourse({
      id: 1,
      title: "최근adsfa sfsafaㅇㅁㄹㄴㅁ ㅇㄹㄴㄻㄹㅇㄴ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "제주도",
    });
    saveRecentCourse({
      id: 2,
      title: "서울 속 시원한 숲 ㅇㅇㅇㅇ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "수도권",
    });
  }, []);

  return (
    <>
      {course && (
        <div className="w-full relative">
          {/* header */}
          <div className="w-full h-[50px] sm:h-[48px] pt-1 sm:pt-2 text-white text-xl sm:text-lg font-bold text-center leading-loose ease-linear duration-300 absolute top-0 z-50">
            {/* 뒤로 가기 버튼 */}
            <div
              className="text-2xl sm:text-xl ease-linear duration-300 absolute top-3 left-3"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack />
            </div>
            <p>{course.writer} 님의 코스</p>
            {/* 공유버튼 */}
            <div
              className="flex items-center justify-center text-xl sm:text-lg  cursor-pointer absolute top-3 right-3"
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
          <div className="w-full max-w-[430px] h-[450px] sm:h-[380px] text-white overflow-hidden relative">
            <img
              className="w-full h-full"
              src={`${course.thumbnail}`}
              alt={`${course.title}`}
            />
            {/* 그라데이션 */}
            <div className="w-full h-full bg-gradient-to-b from-black/60 to-black/0 absolute top-0 left-0" />
            {/* 코스 필터 */}
            <div className="absolute left-3 bottom-5 flex flex-col justify-center pr-2">
              <p className="text-2xl font-bold sm:text-xl">{course.title}</p>
              <div className="flex justify-start items-center flex-wrap">
                <div className="mt-2 mr-2 text-md font-bold p-2  sm:py-1 border-[1px] border-white rounded-full">
                  {course.area}
                </div>
                {course.course_option.go_alone === "Y" && (
                  <div className="mt-2 mr-2 text-md font-bold p-2 sm:py-1 border-[1px] border-white rounded-full">
                    혼자서도 가능한
                  </div>
                )}
                {course.course_option.can_bike === "Y" && (
                  <div className="mt-2 mr-2 text-md font-bold p-2 sm:py-1 border-[1px] border-white rounded-full">
                    자전거 타고 갈 수 있는
                  </div>
                )}
                {course.course_option.day_to_day === "Y" && (
                  <div className="mt-2 mr-2 text-md font-bold p-2 sm:py-1 border-[1px] border-white rounded-full">
                    당일치기 가능한
                  </div>
                )}
                {course.course_option.with_amenities === "Y" && (
                  <div className="mt-2 mr-2 text-md font-bold p-2 sm:py-1 border-[1px] border-white rounded-full">
                    편의시설이 있는
                  </div>
                )}
                {course.course_option.with_pet === "Y" && (
                  <div className="mt-2 mr-2 text-md font-bold p-2 sm:py-1 border-[1px] border-white rounded-full">
                    반려동물과 함께 갈 수 있는
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-3">
            {/* 지역, 시간, km */}
            <div className="w-full h-[60px] sm:h-[55px] flex justify-start items-center text-md text-darkGray  border-b-[1px] border-gray">
              <div className="flex justify-start items-center mr-2">
                <div className="text-xl sm:text-lg mr-1">
                  <MdOutlineLocationOn />
                </div>
                {course.detail_area}
              </div>
              <div className="flex justify-start items-center mr-2">
                <div className="text-xl  sm:text-lg mr-1">
                  <WiTime7 />
                </div>
                {course.time}시간
              </div>
              <div className="flex justify-start items-center">
                <div className="text-xl  sm:text-lg mr-1">
                  <BiCurrentLocation />
                </div>
                {course.distance}km
              </div>
            </div>
            {/* 신고 */}
            <div className="h-[40px] flex justify-start items-center text-md text-darkGray bg-[#f1f1f1] mt-3 px-3 rounded-lg relative">
              <BsShieldFillExclamation />
              <p className="ml-2">이 코스 정보에 문제가 있나요?</p>
              <button
                className="flex justify-center items-center absolute right-3 font-bold"
                onClick={() => setOpen(true)}
              >
                신고하기
                <IoIosArrowForward />
              </button>
            </div>

            {/* 코스소개 */}
            <div className="my-5 text-black text-xl sm:text-lg font-bold">
              <p className="pb-3 border-b-[1px] border-gray">코스 소개</p>
              <div className="w-full h-[270px] bg-gray mt-8 rounded-lg">
                kakao map
              </div>
              <div className="mt-10 ">
                {/* <div className="w-[8px] min-h-[210px] bg-mint absolute left-3 " /> */}
                <div>
                  {course.info.map((el, idx) => (
                    <div
                      key={idx}
                      className="w-full h-[50px] flex items-center mb-5"
                    >
                      <div className="w-[30px] sm:w-[25px] h-[30px] sm:h-[25px] bg-white mr-2 flex justify-center items-center border-4 sm:border-[3px] border-mint rounded-full text-md text-mint font-bold">
                        {idx + 1}
                      </div>
                      <div className="text-darkGray">{el.place}</div>
                      {/* 편의시설 */}
                      {el.amenities && (
                        <div className="w-[100px] flex justify-start items-center ml-3">
                          {el.amenities.restaurant === "Y" && (
                            <img
                              className="w-[25px] sm:w-[20px] mr-3 sm:mr-2"
                              src="../../../../src/assets/user/restaurant.png"
                            />
                          )}
                          {el.amenities.restroom === "Y" && (
                            <img
                              className="w-[25px] sm:w-[20px] mr-3 sm:mr-2"
                              src="../../../../src/assets/user/restroom.png"
                            />
                          )}
                          {el.amenities.water === "Y" && (
                            <img
                              className="w-[25px] sm:w-[20px] mr-3"
                              src="../../../../src/assets/user/water.png"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* 관련 코스 */}
                <div className="h-[40px] sm:h-[55px] flex justify-start items-center text-md text-green font-normal bg-lightGreen mt-3 px-3 rounded-lg relative">
                  <div className="text-lg">
                    <AiFillQuestionCircle />
                  </div>
                  <p className="ml-2">
                    관련있는 산림청 코스 정보가
                    <br className="hidden sm:block " />
                    궁금하신가요?
                  </p>
                  <button
                    className="flex justify-center items-center absolute right-3 font-bold"
                    onClick={() => setOpen(true)}
                  >
                    보러가기
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
            </div>
            {/* 코스설명 */}
            <div className="my-10 text-black text-xl sm:text-lg font-bold">
              <p className="mb-8 sm:mb-5 pb-3 border-b-[1px] border-gray">
                코스 설명
              </p>
              <div className="my-8 sm:my-8">
                <div className="flex justify-start items-center">
                  <div className="w-[30px] sm:w-[25px] h-[30px] sm:h-[25px] bg-white mr-2 flex justify-center items-center border-4 sm:border-[3px] border-mint rounded-full text-md text-mint font-bold">
                    1
                  </div>
                  <div className="text-darkGray ">설악산</div>
                </div>
                <img
                  className="w-full h-[270px] bg-gray mt-5 rounded-lg"
                  src="#"
                />
                <div className="mt-5 text-md font-normal">
                  <p>어쩌구저쩌구 .. editor</p>
                </div>
              </div>
              <div className="my-8 sm:my-8">
                <div className="flex justify-start items-center">
                  <div className="w-[30px] sm:w-[25px] h-[30px] sm:h-[25px] bg-white mr-2 flex justify-center items-center border-4 sm:border-[3px] border-mint rounded-full text-md text-mint font-bold">
                    2
                  </div>
                  <div className="text-darkGray">설악산 휴게소</div>
                </div>
                <img
                  className="w-full h-[270px] bg-gray mt-5 rounded-lg"
                  src="#"
                />
                <div className="mt-5 text-md font-normal">
                  <p>어쩌구저쩌구 .. editor</p>
                </div>
              </div>
              <div className="my-10 sm:my-8">
                <div className="flex justify-start items-center">
                  <div className="w-[30px] sm:w-[25px] h-[30px] sm:h-[25px] bg-white mr-2 flex justify-center items-center border-4 sm:border-[3px] border-mint rounded-full text-md text-mint font-bold">
                    3
                  </div>
                  <div className="text-darkGray">대관령 양떼목장</div>
                </div>
                <img
                  className="w-full h-[270px] bg-gray mt-5 rounded-lg"
                  src="#"
                />
                <div className="mt-5 text-md font-normal">
                  <p>어쩌구저쩌구 .. editor</p>
                </div>
              </div>
            </div>
            {/* hashtag */}
            {course.tag && (
              <div className="flex justify-start items-center mb-8 pb-5 border-b-[1px] border-gray">
                {course.tag.map((el, idx) => (
                  <div
                    className="text-sm text-green bg-lightGreen py-2 px-3 sm:py-1 sm:px-2 rounded-lg sm:rounded-md mr-3"
                    key={idx}
                  >
                    # {el}
                  </div>
                ))}
              </div>
            )}
            {/* 추천 & 스크랩 btn */}
            <div className="w-full h-[60px] sm:h-[50px] my-5 flex justify-evenly items-center text-lg sm:text-md font-bold">
              <div
                className={`w-[45%] h-full flex flex-col justify-center items-center rounded-lg cursor-pointer 
              ${
                isRecommend
                  ? "text-green bg-lightGreen"
                  : "text-darkGray bg-[#f1f1f1]"
              }`}
                onClick={() => {
                  setIsRecommend(!isRecommend);
                  // api 호출
                  console.log("recommend", course.id);
                }}
              >
                <div className="text-2xl sm:text-xl">
                  {isRecommend ? <AiFillLike /> : <AiOutlineLike />}
                </div>
                추천하기
              </div>
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[45%] h-full">
                <WishBtn courseId={course.id} isDetail={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
