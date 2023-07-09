import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CourseItem from "../../components/user/CourseItem";
import UserModal from "../../components/user/mypage/UserModal";
import bookmark from "../../assets/user/bookmark.png";

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

export default function WishList() {
  // 페이지 이동을 위함
  const navigate = useNavigate();
  // 스크랩 코스
  const [wishCourseList, setWishCourseList] = useState<Course[]>([]);
  // 데이터를 불러오는 중인지 확인
  let isFetching = false;

  useEffect(() => {
    // 첫 렌더링시 데이터 호출
    moreWishCourses();

    // courseList를 담는 div 컴포넌트
    const content = document.getElementById("my-courseList");

    // 스크롤 핸들러
    const handleScroll = () => {
      if (content) {
        // console.log("scroll");

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const { scrollHeight } = content;

        if (!isFetching && scrollPosition + windowHeight >= scrollHeight) {
          // console.log("END");
          isFetching = true;
          moreWishCourses();
        }
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moreWishCourses = () => {
    // myCourseList랑 형태가 같아서 같은 mock data 사용
    fetch(`/mock/user/myPage.json`)
      .then((res) => res.json())
      .then((data) => {
        // setWishCourseList((prevCourseList) => [
        //   ...prevCourseList,
        //   ...data.courses,
        // ]);
        if (data.courses.length === 0) {
          console.log("나");
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
      <div className="sticky top-0 z-20 h-[50px] w-full bg-white text-center text-xl font-bold leading-loose shadow-3xl duration-300 ease-linear sm:h-[48px] sm:text-lg">
        {/* 뒤로 가기 버튼 */}
        <div
          className="absolute left-3 top-3 text-2xl duration-300 ease-linear sm:text-xl"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
        </div>
        <p>스크랩한 코스</p>
      </div>
      <div id="my-courseList" className="relative h-full w-full">
        {/* 스크랩 코스 */}
        {wishCourseList.length > 0 ? (
          <>
            <CourseItem courseList={wishCourseList} isMine={false} />
          </>
        ) : (
          <div className="flex h-screen flex-col items-center justify-center p-3 text-lg sm:text-md">
            <img className="mb-3 h-[50px]" src={bookmark} />
            <p>
              마음에 드는{" "}
              <span className="font-bold text-green">코스를 저장</span>
              하고 따라 걷다 보면
            </p>
            <p>
              <span className="font-bold text-green">즐거운 경험</span>을 할 수
              있을 거예요.
            </p>

            <a
              className="mt-4 flex h-[30px] w-[43%] items-center justify-center rounded-lg border-b-[1px] border-mint bg-mint text-md font-bold text-white sm:mt-2 sm:h-[25px]  sm:w-[51%]"
              href="/area/create"
            >
              코스 둘러보러 가기
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
