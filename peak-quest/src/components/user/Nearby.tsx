import React, { useEffect, useState } from "react";
import { MdMyLocation } from "react-icons/md";
import CourseItem from "./CourseItem";
import { getLocation } from "../../helper/getLocation";
import Address from "./Address";
import { calcDistance } from "../../helper/calcDistance";
import { useUserContext } from "../../context/userContext";
import { getCourseList, onUserStateChanged } from "../../service/firebase";

interface Location {
  lat: number;
  lng: number;
}

interface NearByCourse {
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

export default function Nearby() {
  // 로딩여부 => 로딩중이면 true
  const [loading, setLoading] = useState<boolean>(true);
  // 기본 거리 10km
  const [distance, setDistance] = useState(10);
  // 가까운 코스 목록
  const [nearCourseList, setNearCourseList] = useState<NearByCourse[]>([]);
  // 현재 위치 => 기본값 산림비전센터
  const [location, setLocation] = useState<Location>();
  const { user, setUser } = useUserContext();

  // 근처 코스 정보 가져오기 (distance = 유저가 선택한 거리 값)
  const getCourse = (distance: number) => {
    // 초기화
    setNearCourseList([]);
    onUserStateChanged(setUser);
    const fetchNearourseList = async () => {
      const data = await getCourseList();
      // console.log(data);
      // console.log(distance);
      if (data.length > 0) {
        data.forEach((el: NearByCourse) => {
          if (location) {
            // 계산 된 거리 값
            let distanceFromLocation = calcDistance(
              el.position.lat,
              el.position.lng,
              location.lat,
              location.lng
            );
            // 0 ~ 10, 10.1 ~30, 30.1 ~50
            // 20씩 차이나서 .. -20
            if (
              distanceFromLocation > 0 &&
              distanceFromLocation > distance - 20 &&
              distanceFromLocation <= distance
            ) {
              // 코스 el 저장
              setNearCourseList((prevCourseList) => [...prevCourseList, el]);
            }
          }
        });
      }
    };
    fetchNearourseList();
    // // 초기화
    // setNearCourseList([]);
    // if (location) {
    //   // 코스 불러와서 거리 계산하고 해당 값만 저장
    //   fetch("/mock/user/nearbyCourse.json")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // console.log(distance);
    //       if (data.courses.length > 0) {
    //         data.courses.forEach((el: NearByCourse) => {
    //           // 계산 된 거리 값
    //           let distanceFromLocation = calcDistance(
    //             el.position.lat,
    //             el.position.lng,
    //             location.lat,
    //             location.lng
    //           );
    //           // 0 ~ 10, 10.1 ~30, 30.1 ~50
    //           // 20씩 차이나서 .. -20
    //           if (
    //             distanceFromLocation > 0 &&
    //             distanceFromLocation > distance - 20 &&
    //             distanceFromLocation <= distance
    //           ) {
    //             // 코스 el 저장
    //             setNearCourseList((prevCourseList) => [...prevCourseList, el]);
    //           }
    //         });
    //       }
    //     });
    // }
  };

  useEffect(() => {
    // 위치 불러오기
    getLocation(setLocation);
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(false);
      // 처음 렌더링시 => 10km
      getCourse(distance);
    }
  }, [location, distance]);

  return (
    <div className="mt-10 p-3 duration-300 ease-linear">
      {/* 제목 & 위치 */}
      <div className="flex items-center justify-between pl-1 sm:flex-col sm:items-start ">
        <p className="text-xl font-bold text-black sm:mb-1">내 근처에 있어요</p>
        <div className="flex items-center justify-center text-md text-darkGray sm:pl-1">
          <MdMyLocation />
          {location && <Address location={location} />}
        </div>
      </div>
      {/* km 버튼 */}
      <div className="mb-4 mt-3">
        <button
          className={
            distance === 10
              ? "mr-2 h-[30px] w-[70px]  rounded-3xl border-0 bg-mint text-md font-bold text-white"
              : "mr-2 h-[30px] w-[70px] rounded-3xl border-[1px] border-gray text-md text-darkGray"
          }
          onClick={() => setDistance(10)}
        >
          0 ~ 10km
        </button>
        <button
          className={
            distance === 30
              ? "mr-2 h-[30px] w-[70px]  rounded-3xl border-0 bg-mint text-md font-bold text-white"
              : "mr-2 h-[30px] w-[70px] rounded-3xl border-[1px] border-gray text-md text-darkGray"
          }
          onClick={() => setDistance(30)}
        >
          10 ~ 30km
        </button>
        <button
          className={
            distance === 50
              ? "mr-2 h-[30px] w-[70px]  rounded-3xl border-0 bg-mint text-md font-bold text-white"
              : "mr-2 h-[30px] w-[70px] rounded-3xl border-[1px] border-gray text-md text-darkGray"
          }
          onClick={() => setDistance(50)}
        >
          30 ~ 50km
        </button>
      </div>
      {/* course 목록 */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        nearCourseList && (
          <CourseItem courseList={nearCourseList} isMine={false} />
        )
      )}
    </div>
  );
}
