import React, { useEffect } from "react";
import createCourse from "../../assets/create-course.png";
import courseList from "../../assets/course-lists.png";
import createCourse from "../../assets/course/create-course.png";
import courseList from "../../assets/course/course-lists.png";
import { Link } from "react-router-dom";
import RankSection from "./RankSection";
import EventBanner from "./EventBanner";
import Nearby from "../../components/user/Nearby";
import Header from "../../components/Header";
import Login from "../../components/Login";
import { useUserContext } from "../../context/userContext";
import { getStartBadge } from "../../service/firebase";

export default function Main() {
  const { user } = useUserContext();

  // useEffect(() => {
  //   console.log(user);

  //   if (user) {
  //     setInterval(() => {
  //       console.log(user);
  //     }, 2000);
  //   }
  // }, [user]);

  useEffect(() => {
    const badge = setInterval(() => {
      getStartBadge(user);
    }, 1000);

    setTimeout(() => {
      clearInterval(badge);
    }, 5000);
  }, [user]);

  return (
    <div className="bg-lightGray text-black">
      <Header />
      <div className="flex items-center justify-center py-5 text-xl font-bold leading-7 sm:text-md sm:leading-3 md:text-lg md:leading-4">
        <Link to={"/area/create"}>
          <div className="relative mr-2">
            <p className="absolute left-3 top-3">
              나만의
              <br />
              코스 만들기
            </p>
            <img className="shadow-3xl" src={createCourse} alt="create-course" />
          </div>
        </Link>
        <Link to={"/area"}>
          <div className="relative ml-2">
            <p className="absolute left-3 top-3">
              코스
              <br />
              둘러보기
            </p>
            <img className="shadow-3xl" src={courseList} alt="course-list" />
          </div>
        </Link>
      </div>
      {/* rankSection */}
      <div className="m-auto rounded-xl bg-white">
        <RankSection />
        {/* <RankSection /> */}
        <EventBanner />
        {/* nearbySection */}
        <Nearby />
      </div>
    </div>
  );
}
