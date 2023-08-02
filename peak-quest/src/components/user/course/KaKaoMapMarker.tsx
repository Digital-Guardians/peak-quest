import { Map, MapInfoWindow, MapMarker } from "react-kakao-maps-sdk";
import { OriginCourseNms } from "../../../pages/user/CourseEdit";
import { TransformedResult } from "../../../types/forestTypes";
import { useState } from "react";

interface KakaoMapMarkerProps {
  selectOriginCourse?: TransformedResult;
  handleClosePopup: () => void;
  submittedOriginCouse: () => void;
}

export default function KaKaoMapMarker({
  selectOriginCourse,
  handleClosePopup,
  submittedOriginCouse,
}: KakaoMapMarkerProps) {
  const saveOriginCourse = () => {
    handleClosePopup();
    submittedOriginCouse();
  };
  return (
    <div className="w-full">
      <Map
        center={{
          lat: selectOriginCourse?.position[0]?.lat || 0,
          lng: selectOriginCourse?.position[0]?.lng || 0,
        }}
        style={{
          width: "100%",
          height: "300px",
        }}
        level={4}
      >
        <MapMarker
          position={{
            lat: selectOriginCourse?.position[0]?.lat || 0,
            lng: selectOriginCourse?.position[0]?.lng || 0,
          }}
        />
        <MapInfoWindow
          position={{
            lat: (selectOriginCourse?.position[0]?.lat || 0) + 0.0008,
            lng: selectOriginCourse?.position[0]?.lng || 0,
          }}
          removable={true}
        >
          <div style={{ padding: "5px", color: "#000" }}>
            {selectOriginCourse?.frtrlNm}
          </div>
        </MapInfoWindow>
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
