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
import water from "../../assets/user/water.png";
import restroom from "../../assets/user/restroom.png";
import restaurant from "../../assets/user/restroom.png";
import KakaoMapLine from "../../components/user/course/KakaoMapLine";

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
      thumbnail: "/images/course/course2.png",
      area: "제주도",
    });
    saveRecentCourse({
      id: 2,
      title: "서울 속 시원한 숲 ㅇㅇㅇㅇ",
      thumbnail: "/images/course/course2.png",
      area: "수도권",
    });
  }, []);

  return (
    <>
      {course && (
        <div className="relative w-full">
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
          <div className="relative h-[450px] w-full max-w-[430px] overflow-hidden text-white sm:h-[380px]">
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
                {course.course_option.go_alone === "Y" && (
                  <div className="mr-2 mt-2 rounded-full border-[1px] border-white p-2 text-md font-bold sm:py-1">
                    혼자서도 가능한
                  </div>
                )}
                {course.course_option.can_bike === "Y" && (
                  <div className="mr-2 mt-2 rounded-full border-[1px] border-white p-2 text-md font-bold sm:py-1">
                    자전거 타고 갈 수 있는
                  </div>
                )}
                {course.course_option.day_to_day === "Y" && (
                  <div className="mr-2 mt-2 rounded-full border-[1px] border-white p-2 text-md font-bold sm:py-1">
                    당일치기 가능한
                  </div>
                )}
                {course.course_option.with_amenities === "Y" && (
                  <div className="mr-2 mt-2 rounded-full border-[1px] border-white p-2 text-md font-bold sm:py-1">
                    편의시설이 있는
                  </div>
                )}
                {course.course_option.with_pet === "Y" && (
                  <div className="mr-2 mt-2 rounded-full border-[1px] border-white p-2 text-md font-bold sm:py-1">
                    반려동물과 함께 갈 수 있는
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-3">
            {/* 지역, 시간, km */}
            <div className="flex h-[60px] w-full items-center justify-start border-b-[1px] border-gray text-md  text-darkGray sm:h-[55px]">
              <div className="mr-2 flex items-center justify-start">
                <div className="mr-1 text-xl sm:text-lg">
                  <MdOutlineLocationOn />
                </div>
                {course.detail_area}
              </div>
              <div className="mr-2 flex items-center justify-start">
                <div className="mr-1  text-xl sm:text-lg">
                  <WiTime7 />
                </div>
                {course.time}시간
              </div>
              <div className="flex items-center justify-start">
                <div className="mr-1  text-xl sm:text-lg">
                  <BiCurrentLocation />
                </div>
                {course.distance}km
              </div>
            </div>
            {/* 신고 */}
            <div className="relative mt-3 flex h-[40px] items-center justify-start rounded-lg bg-[#f1f1f1] px-3 text-md text-darkGray">
              <BsShieldFillExclamation />
              <p className="ml-2">이 코스 정보에 문제가 있나요?</p>
              <button
                className="absolute right-3 flex items-center justify-center font-bold"
                onClick={() => setOpen(true)}
              >
                신고하기
                <IoIosArrowForward />
              </button>
            </div>

            {/* 코스소개 */}
            <div className="my-5 text-xl font-bold text-black sm:text-lg">
              <p className="border-b-[1px] border-gray pb-3">코스 소개</p>
              <div className="mt-8 h-[270px] w-full rounded-lg bg-gray">
                <KakaoMapLine />
              </div>
              <div className="mt-10 ">
                {/* <div className="w-[8px] min-h-[210px] bg-mint absolute left-3 " /> */}
                <div>
                  {course.info.map((el, idx) => (
                    <div
                      key={idx}
                      className="mb-5 flex h-[50px] w-full items-center"
                    >
                      <div className="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-4 border-mint bg-white text-md font-bold text-mint sm:h-[25px] sm:w-[25px] sm:border-[3px]">
                        {idx + 1}
                      </div>
                      <div className="text-darkGray">{el.place}</div>
                      {/* 편의시설 */}
                      {el.amenities && (
                        <div className="ml-3 flex w-[100px] items-center justify-start">
                          {el.amenities.restaurant === "Y" && (
                            <img
                              className="mr-3 w-[25px] sm:mr-2 sm:w-[20px]"
                              src={restaurant}
                            />
                          )}
                          {el.amenities.restroom === "Y" && (
                            <img
                              className="mr-3 w-[25px] sm:mr-2 sm:w-[20px]"
                              src={restroom}
                            />
                          )}
                          {el.amenities.water === "Y" && (
                            <img
                              className="mr-3 w-[25px] sm:w-[20px]"
                              src={water}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* 관련 코스 */}
                <div className="relative mt-3 flex h-[40px] items-center justify-start rounded-lg bg-lightGreen px-3 text-md font-normal text-green sm:h-[55px]">
                  <div className="text-lg">
                    <AiFillQuestionCircle />
                  </div>
                  <p className="ml-2">
                    관련있는 산림청 코스 정보가
                    <br className="hidden sm:block " />
                    궁금하신가요?
                  </p>
                  <button
                    className="absolute right-3 flex items-center justify-center font-bold"
                    onClick={() => setOpen(true)}
                  >
                    보러가기
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
            </div>
            {/* 코스설명 */}
            <div className="my-10 text-xl font-bold text-black sm:text-lg">
              <p className="mb-8 border-b-[1px] border-gray pb-3 sm:mb-5">
                코스 설명
              </p>
              <div className="my-8 sm:my-8">
                <div className="flex items-center justify-start">
                  <div className="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-4 border-mint bg-white text-md font-bold text-mint sm:h-[25px] sm:w-[25px] sm:border-[3px]">
                    1
                  </div>
                  <div className="text-darkGray ">설악산</div>
                </div>
                <img
                  className="mt-5 h-[270px] w-full rounded-lg bg-gray"
                  src="#"
                />
                <div className="mt-5 text-md font-normal">
                  <p>어쩌구저쩌구 .. editor</p>
                </div>
              </div>
              <div className="my-8 sm:my-8">
                <div className="flex items-center justify-start">
                  <div className="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-4 border-mint bg-white text-md font-bold text-mint sm:h-[25px] sm:w-[25px] sm:border-[3px]">
                    2
                  </div>
                  <div className="text-darkGray">설악산 휴게소</div>
                </div>
                <img
                  className="mt-5 h-[270px] w-full rounded-lg bg-gray"
                  src="#"
                />
                <div className="mt-5 text-md font-normal">
                  <p>어쩌구저쩌구 .. editor</p>
                </div>
              </div>
              <div className="my-10 sm:my-8">
                <div className="flex items-center justify-start">
                  <div className="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-4 border-mint bg-white text-md font-bold text-mint sm:h-[25px] sm:w-[25px] sm:border-[3px]">
                    3
                  </div>
                  <div className="text-darkGray">대관령 양떼목장</div>
                </div>
                <img
                  className="mt-5 h-[270px] w-full rounded-lg bg-gray"
                  src="#"
                />
                <div className="mt-5 text-md font-normal">
                  <p>어쩌구저쩌구 .. editor</p>
                </div>
              </div>
            </div>
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
