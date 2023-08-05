// 현재 위치 gps
export const getLocation = (
  setLocation: (arg0: { lat: number; lng: number }) => void
) => {
  if (navigator.geolocation) {
    var options = { timeout: 60000 }; // 시간 제한 두기
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // 이용 가능하면 geolocation 가져오기
        let lat = position.coords.latitude; // 위도
        let lng = position.coords.longitude; // 경도
        setLocation({ lat: lat, lng: lng });
      },
      function (error) {
        // gps 사용 불가능 => 기본으로 산림비전센터 잡음
        if (error.code === 1) {
          console.log("GPS추적불가 ..");
        } else if (error.code === 2) {
          console.log("GPS추적불가 ..");
        }
      },
      options
    );
  } else {
    // gps 사용 불가능 => 기본으로 산림비전센터
    console.log("GPS추적불가 ..");
  }
  return location;
};
