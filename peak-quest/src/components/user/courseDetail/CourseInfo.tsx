import React from "react";
import water from "../../../assets/user/water.png";
import restroom from "../../../assets/user/restroom.png";
import restaurant from "../../../assets/user/restroom.png";
import KakaoMapLine from "../course/KakaoMapLine";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

interface CourseInfoProps {
  courseInfo: [
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
  selectOriginCourse: {
    id: number;
    frtrlNm: string;
    position: [{ lat: number; lng: number }];
  };
  openAlready: boolean;
  setOpenAlready: React.Dispatch<React.SetStateAction<boolean>>;
  courseEditorText: string;
}

export default function CourseInfo({
  courseInfo,
  setOpenAlready,
  courseEditorText,
}: CourseInfoProps) {
  return (
    <>
      {/* 코스소개 */}
      <div className="my-5 text-xl font-bold text-black sm:text-lg">
        <p className="border-b-[1px] border-gray pb-3">코스 소개</p>
        <div className="mt-8 h-[270px] w-full rounded-lg bg-gray">
          <KakaoMapLine courseInfo={courseInfo} />
        </div>
        <div className="mt-10 ">
          {/* <div className="absolute left-6 z-0 min-h-[210px] w-[8px] bg-mint" /> */}
          <div>
            {courseInfo &&
              courseInfo.map((el, idx) => (
                <div
                  key={el.id}
                  className="mb-5 flex h-[50px] w-full items-center"
                >
                  <div className="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-4 border-mint bg-white text-md font-bold text-mint sm:h-[25px] sm:w-[25px] sm:border-[3px]">
                    {idx + 1}
                  </div>
                  <div className="text-darkGray">{el.place}</div>
                  {/* 편의시설 */}
                  {el.amenities && (
                    <div className="ml-3 flex w-[100px] items-center justify-start">
                      {el.amenities.hasFood === "Y" && (
                        <img
                          className="mr-3 w-[25px] sm:mr-2 sm:w-[20px]"
                          src={restaurant}
                        />
                      )}
                      {el.amenities.hasRestroom === "Y" && (
                        <img
                          className="mr-3 w-[25px] sm:mr-2 sm:w-[20px]"
                          src={restroom}
                        />
                      )}
                      {el.amenities.hasWater === "Y" && (
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
              onClick={() => {
                setOpenAlready(true);
              }}
            >
              보러가기
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      {/* 코스설명 */}
      <div className="my-10  text-black">
        <p className="mb-8 border-b-[1px] border-gray pb-3 text-xl font-bold sm:mb-5 sm:text-lg">
          코스 설명
        </p>
        <div dangerouslySetInnerHTML={{ __html: courseEditorText }}></div>
      </div>
    </>
  );
}
