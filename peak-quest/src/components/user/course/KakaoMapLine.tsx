import { Map, Polyline, MapInfoWindow } from "react-kakao-maps-sdk";

interface CourseInfoProps {
  courseInfo: [
    {
      id: number;
      place: string;
      address_name: string;
      amenities: {
        hasFood: string;
        hasRestroom: string;
        hasWater: string;
      };
      position: {
        lat: number;
        lng: number;
      };
    }
  ];
}

export default function KakaoMapLine({ courseInfo }: CourseInfoProps) {
  const filterLists = courseInfo.map((v) => v.position);

  const center =
    filterLists.length > 0
      ? {
          lat: +filterLists[Math.ceil(filterLists.length / 2) - 1].lat,
          lng: +filterLists[Math.ceil(filterLists.length / 2) - 1].lng,
        }
      : { lat: 37.5274984, lng: 126.9165114 };

  const path =
    filterLists.length > 1
      ? filterLists.map((position) => ({
          lat: +position.lat,
          lng: +position.lng,
        }))
      : [];

  const startPosition = courseInfo[0]?.position;
  const endPosition = courseInfo[courseInfo.length - 1].position;

  return (
    <Map // 지도를 표시할 Container
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={12} // 지도의 확대 레벨
    >
      <Polyline
        path={[path]}
        strokeWeight={5} // 선의 두께
        strokeColor={"#6B4BFB"} // 선의 색깔
        strokeOpacity={0.7} // 선의 불투명도
        strokeStyle={"solid"} // 선의 스타일
      />

      <MapInfoWindow
        position={{
          lat: +startPosition.lat,
          lng: +startPosition.lng,
        }}
        removable={true} // 인포윈도우를 닫을 수 있는 x버튼
      >
        <div
          style={{
            fontSize: "12px",
            padding: "5px",
            color: "#009288",
          }}
        >
          Start🚴🏻: {courseInfo[0].place}
        </div>
      </MapInfoWindow>
      <MapInfoWindow
        position={{
          lat: +endPosition.lat,
          lng: +endPosition.lng,
        }}
        removable={true} // 인포윈도우를 닫을 수 있는 x버튼
      >
        <div
          style={{
            width: "100%",
            fontSize: "11px",
            padding: "5px 10px",
            color: "#009288",
          }}
        >
          Finish🚩: {courseInfo[courseInfo.length - 1].place}
        </div>
      </MapInfoWindow>
    </Map>
  );
}

const courseInfo = [
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
