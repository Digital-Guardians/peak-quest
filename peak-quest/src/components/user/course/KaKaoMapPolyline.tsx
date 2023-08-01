import { Map, MapMarker, Polygon, Polyline } from "react-kakao-maps-sdk";
import { OriginCourseNms } from "../../../pages/user/CourseEdit";
import { TransformedResult } from "../../../types/forestTypes";
import { useState } from "react";

interface KakaoMapMarkerProps {
  selectOriginCourse?: TransformedResult;
  handleClosePopup: () => void;
  handleOriginCourse: (originCourse: OriginCourseNms) => void;
}

export default function KaKaoMapPolyline({
  selectOriginCourse,
  handleClosePopup,
  handleOriginCourse,
}: KakaoMapMarkerProps) {
  const saveOriginCourse = () => {
    handleClosePopup();
    // handleOriginCourse();
  };

  const startImage = {
    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png",
    // size: [50, 45],
    // options: {
    //   offset: [15, 43],
    // },
    size: { width: 50, height: 45 },
    options: {
      offset: { x: 15, y: 43 },
    },
  };

  const startDragImage = {
    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png",
    // size: [50, 64],
    // options: {
    //   offset: [15, 54],
    // },
    size: { width: 50, height: 64 },
    options: {
      offset: { x: 15, y: 54 },
    },
  };

  const endImage = {
    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png",
    // size: [50, 45],
    // options: {
    //   offset: [15, 43],
    // },
    size: { width: 50, height: 45 },
    options: {
      offset: { x: 15, y: 43 },
    },
  };

  const endDragImage = {
    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png",
    // size: [50, 64],
    // options: {
    //   offset: [15, 54],
    // },
    size: { width: 50, height: 64 },
    options: {
      offset: { x: 15, y: 54 },
    },
  };
  const [start, setStart] = useState(startImage);
  const [end, setEnd] = useState(endImage);
  return (
    <div className="w-full">
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: selectOriginCourse?.position[0]?.lat || 0,
          lng: selectOriginCourse?.position[0]?.lng || 0,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "300px",
        }}
        level={4} // 지도의 확대 레벨
      >
        <MapMarker // 마커를 생성하고 지도에 표시합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: selectOriginCourse?.position[0]?.lat || 0,
            lng: selectOriginCourse?.position[0]?.lng || 0,
          }}
          image={start}
          draggable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onDragStart={() => setStart(startDragImage)} // 마커가 이동하면 이미지를 변경합니다
          onDragEnd={() => setStart(startImage)} // 마커가 이동하면 이미지를 변경합니다
        />
        <MapMarker // 마커를 생성하고 지도에 표시합니다
          position={{
            // 마커가 표시될 위치입니다
            lat:
              selectOriginCourse?.position[
                selectOriginCourse.position.length - 1
              ]?.lat || 0,
            lng:
              selectOriginCourse?.position[
                selectOriginCourse.position.length - 1
              ]?.lng || 0,
          }}
          image={end}
          draggable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onDragStart={() => setEnd(endDragImage)} // 마커가 이동하면 이미지를 변경합니다
          onDragEnd={() => setEnd(endImage)} // 마커가 이동하면 이미지를 변경합니다
        />
      </Map>
      <div className="mt-2 flex justify-between space-x-3">
        <button
          onClick={handleClosePopup}
          className="w-1/2 rounded-lg border-2 border-gray px-4 py-2 text-darkGray"
        >
          취소
        </button>
        <button
          onClick={saveOriginCourse}
          className="w-1/2 rounded-lg border-2 border-mint bg-mint px-4 py-2 text-white"
        >
          적용
        </button>
      </div>
    </div>
  );
}
