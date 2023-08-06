// 거리계산

// 하버사인(harvesine) 공식사용 : https://en.wikipedia.org/wiki/Haversine_formula
export const calcDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  // 위, 경도를 라디안으로 변환하는 함수
  function d2r(deg: number) {
    return (deg * Math.PI) / 180;
  }

  const R = 6371; // 지구 반지름(km) => WGS84좌표계

  // 위,경도를 라디안으로 변환
  const dLat = d2r(Math.abs(lat1 - lat2));
  const dLon = d2r(Math.abs(lon1 - lon2));

  // 변환한 라디안 값을 sin에 대입
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const sqrt = Math.sqrt(
    sinDLat * sinDLat +
      Math.cos(d2r(lat1)) * Math.cos(d2r(lat2)) * (sinDLon * sinDLon)
  );

  // 두 지점 사이의 거리
  return 2 * R * Math.asin(sqrt);
};
