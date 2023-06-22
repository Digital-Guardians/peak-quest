import React from "react";

interface RecentCourse {
  id: number;
  title: string;
  thumbnail: string;
  area: string;
}

export const saveRecentCourse = (course: RecentCourse) => {
  let localStorageData: string | null =
    localStorage.getItem("recent_course") || null;

  let recentCourseList: RecentCourse[];

  if (localStorageData !== null) {
    // 만약, 저장된 데이터가 있으면 JSON -> object로 변경하여 저장
    recentCourseList = JSON.parse(localStorageData);
  } else {
    recentCourseList = [];
  }

  if (recentCourseList.length === 0) {
    // localStorage 최근 본 코스가 없으면 ? => 바로 저장
    // 현재 detail 페이지의 코스 저장
    recentCourseList = recentCourseList.concat(course);
  } else {
    // localStorage 최근 본 코스가 있으면? => 중복 검사
    let count = 0;

    // 같은 courseId가 있으면 count ++
    for (let i = 0; i < recentCourseList.length; i++) {
      if (recentCourseList[i].id === course.id) {
        count += 1;
      }
    }

    //  반복 검사 후, count = 0 이면 중복데이터(객체)가 없다면 저장
    if (count === 0) {
      recentCourseList = recentCourseList.concat(course);
    }
  }

  // // 6개가 넘어가면 shift를 통해 앞에 값 삭제
  if (recentCourseList.length > 6) {
    recentCourseList.shift();
  }

  // // 가장 최근 코스가 제일 위로
  recentCourseList = recentCourseList.reverse();

  // localStorage에 데이터를 JSON 자료형으로 저장
  localStorage.setItem("recent_course", JSON.stringify(recentCourseList));
};
