// 코스 이름 변경

export const changeKorean = (areaName: string | undefined) => {
  areaName = areaName?.toLocaleLowerCase();
  // 영어로 된 AreaName => 한글로 변환
  switch (areaName) {
    case "capital":
      return "수도권";
    case "gangwon":
      return "강원권";
    case "chungcheong":
      return "충청권";
    case "jeolla":
      return "전라권";
    case "gyeongsang":
      return "경상권";
    case "jeju":
      return "제주도";
    // 없는 경우 => NotFound
    default:
      // window.open("/notfound");
      window.stop();
    // return "area/notfound";
  }
};

export const changeEnglish = (areaName: string | undefined) => {
  // 한글 => 영어
  switch (areaName) {
    case "수도권":
      return "capital";
    case "강원권":
      return "gangwon";
    case "충청권":
      return "chungcheong";
    case "전라권":
      return "jeolla";
    case "경상권":
      return "gyeongsang";
    case "제주도":
      return "jeju";
    // 없는 경우 => NotFound
    default:
      return "area/notfound";
  }
};
