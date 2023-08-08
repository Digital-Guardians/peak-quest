import { Map, Polyline, MapInfoWindow } from "react-kakao-maps-sdk";

interface KakaoMapLineAlreadyProps {
  selectOriginCourse: {
    id: number;
    frtrlNm: string;
    position: [
      {
        lat: number;
        lng: number;
      }
    ];
  };
}

export default function KakaoMapLineAlready({
  selectOriginCourse,
}: KakaoMapLineAlreadyProps) {
  const positionList = selectOriginCourse.position;

  const center =
    positionList.length > 0
      ? {
          lat: +positionList[Math.ceil(positionList.length / 2) - 1].lat,
          lng: +positionList[Math.ceil(positionList.length / 2) - 1].lng,
        }
      : { lat: 37.5274984, lng: 126.9165114 };

  const path =
    positionList.length > 1
      ? positionList.map((position) => ({
          lat: +position.lat,
          lng: +position.lng,
        }))
      : [];

  const startPosition = positionList[0];
  const endPosition = positionList[positionList.length - 1];

  return (
    <Map // 지도를 표시할 Container
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={8} // 지도의 확대 레벨
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
          Start🚴🏻
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
          Finish🚩
        </div>
      </MapInfoWindow>
    </Map>
  );
}
