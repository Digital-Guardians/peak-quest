import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CourseItem from "../../components/user/CourseItem";
import UserModal from "../../components/user/mypage/UserModal";

// 코스 타입 정의
interface Course {
  // 코스 속성들
  id: string;
  title: string;
  writer: string;
  thumbnail: string;
  views: number;
  recommendations: number;
  distance: number;
  area: string;
}

export default function MyCourseList() {
  // 페이지 이동을 위함
  const navigate = useNavigate();
  // 내가 만든 코스
  const [myCourseList, setMyCourseList] = useState<Course[]>([]);
  // 데이터를 불러오는 중인지 확인
  let isFetching = false;
  // 모달
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // 첫 렌더링시 데이터 호출
    moreMyCourses();

    // courseList를 담는 div 컴포넌트
    const content = document.getElementById("my-courseList");

    // 스크롤 핸들러
    const handleScroll = () => {
      if (content && myCourseList.length > 0) {
        console.log("scroll");

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const { scrollHeight } = content;

        if (!isFetching && scrollPosition + windowHeight >= scrollHeight) {
          console.log("END");
          isFetching = true;
          moreMyCourses();
        }
      }
    };

    // 스크롤 이벤트 리스너 추가
    window?.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moreMyCourses = () => {
    // myCourse
    // fetch(`/mock/user/myPage_myCourseList.json`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMyCourseList((prevCourseList) => [
    //       ...prevCourseList,
    //       ...data.courses,
    //     ]);
    //     if (data.courses.length === 0) {
    //       document.body.style.overflow = "hidden";
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching more courses:", error);
    //   });
    isFetching = false;
  };

  return (
    <div className="w-max-[430px] bg-[#f9f9f9] flex flex-col justify-center items-center">
      {/* header */}
      <div className="w-full h-[50px] sm:h-[48px] pt-1 sm:pt-2 bg-white text-xl sm:text-lg font-bold text-center leading-loose ease-linear duration-300 sticky top-0 z-20 shadow-3xl">
        {/* 뒤로 가기 버튼 */}
        <div
          className="text-2xl sm:text-xl ease-linear duration-300 absolute top-3 left-3"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </div>
        <p>내가 만든 코스</p>
      </div>
      <div id="my-courseList" className="w-full h-full relative">
        {open && (
          <UserModal
            order={["delete", "/mock/user/myPage_myCourseList.json"]}
            setOpen={setOpen}
            content={"이 코스를 삭제하시겠습니까?"}
            subContent={["삭제하시면 코스 정보가 영구적으로 사라져요!"]}
            firstStatus={"삭제"}
            secondStatus={"취소"}
          />
        )}
        {/* 내가 만든 코스 */}
        {myCourseList.length > 0 ? (
          <>
            <CourseItem courseList={myCourseList} isMine={true} />
          </>
        ) : (
          <div className="h-screen flex flex-col justify-center items-center p-3 text-lg sm:text-md">
            <img
              className="w-[45px] h-[60px] mb-3"
              src="../../src/assets/user/trophy.png"
            />
            <p className="mb-1">앗 ! 아직 만들어진 코스가 없어요.</p>
            <p>
              <span className="font-bold text-green">나만의 코스</span>를
              공유하고 <span className="font-bold text-green">랭킹 1위</span>에
              도전하세요.
            </p>
            <a
              className="w-[43%] sm:w-[51%] h-[30px] sm:h-[25px] flex justify-center items-center font-bold text-md text-white bg-mint mt-4 sm:mt-2 border-b-[1px] border-mint  rounded-lg"
              href="/area/create"
            >
              지금 코스 만들러 가기
              <div className="text-lg">
                <IoIosArrowForward />
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
