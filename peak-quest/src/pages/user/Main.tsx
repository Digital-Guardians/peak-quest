import React from "react";
import createCourse from "../../assets/create-course.png";
import courseList from "../../assets/course-lists.png";
import { Link } from "react-router-dom";
import RankSection from "./RankSection";
import EventBanner from "./EventBanner";
import Nearby from "../../components/user/Nearby";
import Header from "../../components/Header";
import Login from "../../components/Login";

export default function Main() {
  return (
    <div className="bg-lightGray text-black">
      <Header />
      <div className="flex py-5 justify-center items-center text-xl md:text-lg md:leading-4 sm:text-md sm:leading-3 font-bold leading-7">
        <Link to={"/area"}>
          <div className="mr-2 relative">
            <p className="absolute top-3 left-3">
              나만의
              <br />
              코스 만들기
            </p>
            <img
              className="shadow-3xl"
              src={createCourse}
              alt="create-course"
            />
          </div>
        </Link>
        <Link to={"/area"}>
          <div className="ml-2 relative">
            <p className="absolute top-3 left-3">
              코스
              <br />
              둘러보기
            </p>
            <img className="shadow-3xl" src={courseList} alt="course-list" />
          </div>
        </Link>
      </div>
      {/* rankSection */}
      <div className="w-[430px] m-auto bg-white rounded-xl">
        {/* <RankSection /> */}
        {/* <EventBanner /> */}
        {/* nearbySection */}
        {/* <Nearby /> */}
      </div>
    </div>
  );
}
