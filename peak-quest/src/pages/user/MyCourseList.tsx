import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import CourseItem from "../../components/user/CourseItem";
import UserModal from "../../components/user/mypage/UserModal";

// 코스 타입 정의
interface Course {
  id: number;
  title: string;
  writer: string;
  thumbnail: string;
  views: number;
  recommendations: number;
  area: string;
  position: {
    lat: number;
    lng: number;
  };
}

export default function MyCourseList() {
  const { state } = useLocation();

  // console.log(state.myCourseList);
  // 페이지 이동을 위함
  const navigate = useNavigate();
  // 내가 만든 코스
  const [myCourseList, setMyCourseList] = useState<Course[]>(
    state.myCourseList
  );
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
    fetch(`/mock/user/myPage_myCourseList.json`)
      .then((res) => res.json())
      .then((data) => {
        setMyCourseList((prevCourseList) => [
          ...prevCourseList,
          ...data.courses,
        ]);
        if (data.courses.length === 0) {
          document.body.style.overflow = "hidden";
        }
      })
      .catch((error) => {
        console.error("Error fetching more courses:", error);
      });
    isFetching = false;
  };

  return (
    <div className="w-max-[430px] flex flex-col items-center justify-center bg-[#f9f9f9]">
      {/* header */}
      <div className="sticky top-0 z-20 h-[50px] w-full bg-white pt-1 text-center text-xl font-bold leading-loose shadow-3xl duration-300 ease-linear sm:h-[48px] sm:pt-2 sm:text-lg">
        {/* 뒤로 가기 버튼 */}
        <div
          className="absolute left-3 top-3 text-2xl duration-300 ease-linear sm:text-xl"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </div>
        <p>내가 만든 코스</p>
      </div>
      <div id="my-courseList" className="relative h-full w-full">
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
        <div className="min-h-[820px]">
          {myCourseList.length > 0 ? (
            <>
              <CourseItem courseList={myCourseList} isMine={true} />
            </>
          ) : (
            <div className="flex h-screen flex-col items-center justify-center p-3 text-lg sm:text-md">
              <img
                className="mb-3 h-[55px] w-[40px]"
                src="../../src/assets/user/trophy.png"
              />
              <p className="mb-1">앗 ! 아직 만들어진 코스가 없어요.</p>
              <p>
                <span className="font-bold text-green">나만의 코스</span>를
                공유하고 <span className="font-bold text-green">랭킹 1위</span>
                에 도전하세요.
              </p>
              <a
                className="mt-4 flex items-center justify-center border-b-[1px] border-mint text-md font-bold text-mint sm:mt-2"
                href="/area/create"
              >
                코스 만들러 가기 <IoIosArrowForward />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
