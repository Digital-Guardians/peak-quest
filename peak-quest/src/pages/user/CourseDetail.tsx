import React, { useEffect } from "react";
import { saveRecentCourse } from "../../helper/saveRecentCourse";

export default function CourseDetail() {
  useEffect(() => {
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
    saveRecentCourse({
      id: 3,
      title: "최근adsfasfsafa",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "수도권",
    });
    saveRecentCourse({
      id: 4,
      title: "최근adsfasfsafa",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "충청권",
    });
    saveRecentCourse({
      id: 5,
      title: "최 근ad gaggafdas",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "수도권",
    });
    saveRecentCourse({
      id: 6,
      title: "ㅇㄻ ㄹㅇㄴㅁㄹ ㄴㅁㄹㄴㅁㄹ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "강원권",
    });
    saveRecentCourse({
      id: 7,
      title: "최근 ㅁㄴㅇㄻㄹ ㄴㄹㄴㅁㄹㅇㄴ",
      thumbnail: "../../src/assets/user/course_image_2.png",
      area: "강원권",
    });
  }, []);

  return <div>CourseDetail</div>;
}
