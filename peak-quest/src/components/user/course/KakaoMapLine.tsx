import { Map, Polyline } from "react-kakao-maps-sdk";

export default function KakaoMapLine() {
  const filterLists = lists.map((v) => v.position);

  const center =
    filterLists.length > 0
      ? {
          lat: +filterLists[Math.ceil(filterLists.length / 2)].lat,
          lng: +filterLists[Math.ceil(filterLists.length / 2)].lng,
        }
      : { lat: 33.450701, lng: 126.570667 };
  const path =
    filterLists.length > 1
      ? filterLists.map((position) => ({
          lat: +position.lat,
          lng: +position.lng,
        }))
      : [];

  return (
    <Map // 지도를 표시할 Container
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={7} // 지도의 확대 레벨
    >
      <Polyline
        path={[path]}
        strokeWeight={5} // 선의 두께
        strokeColor={"#ff0000"} // 선의 색깔
        strokeOpacity={0.7} // 선의 불투명도
        strokeStyle={"solid"} // 선의 스타일
      />
    </Map>
  );
}

const lists = [
  {
    id: 1831976441,
    place: "월류봉광장",
    amenities: {
      hasRestroom: "",
      hasFood: "",
      hasWater: "",
    },
    position: {
      lat: "36.2342337301581",
      lng: "127.89142504873",
    },
    address_name: "충북 영동군 황간면 원촌리 261",
  },
  {
    id: 8543252,
    place: "원촌교",
    amenities: {
      hasRestroom: "",
      hasFood: "",
      hasWater: "",
    },
    position: {
      lat: "36.2357102214594",
      lng: "127.895958043666",
    },
    address_name: "충북 영동군 황간면 원촌리",
  },
  {
    id: 15158579,
    place: "완정교",
    amenities: {
      hasRestroom: "",
      hasFood: "",
      hasWater: "",
    },
    position: {
      lat: "36.2497154685563",
      lng: "127.895321308536",
    },
    address_name: "충북 영동군 황간면 우매리",
  },
  {
    id: 21534402,
    place: "백화마을",
    amenities: {
      hasRestroom: "",
      hasFood: "",
      hasWater: "",
    },
    position: {
      lat: "36.2635061764301",
      lng: "127.897334787926",
    },
    address_name: "충북 영동군 황간면 우매리 255-42",
  },
  {
    id: 7896198,
    place: "반야사",
    amenities: {
      hasRestroom: "",
      hasFood: "",
      hasWater: "",
    },
    position: {
      lat: "36.28056772660704",
      lng: "127.90915876143492",
    },
    address_name: "충북 영동군 황간면 우매리 산 3",
  },
];

// // 하버사인(harvesine) 공식사용 : https://en.wikipedia.org/wiki/Haversine_formula
// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//   // 위, 경도를 라디안으로 변환하는 함수
//   function d2r(deg) {
//     return (deg * Math.PI) / 180;
//   }

//   const R = 6371; // 지구 반지름(km) => WGS84좌표계

//   // 위,경도를 라디안으로 변환
//   const dLat = d2r(Math.abs(lat1 - lat2));
//   const dLon = d2r(Math.abs(lon1 - lon2));

//   // 변환한 라디안 값을 sin에 대입
//   const sinDLat = Math.sin(dLat / 2);
//   const sinDLon = Math.sin(dLon / 2);

//   const sqrt = Math.sqrt(
//     sinDLat * sinDLat +
//       Math.cos(d2r(lat1)) * Math.cos(d2r(lat2)) * (sinDLon * sinDLon)
//   );

//   // 두 지점 사이의 거리
//   return 2 * R * Math.asin(sqrt);
// }
