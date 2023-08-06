import React, { useEffect, useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface AddressProps {
  location: Location;
}

const { kakao } = window;

// 위치를 한글로 !

export default function Address(location: AddressProps) {
  // 현재 위치 저장 => 행정동
  const [address, setAddress] = useState();

  let geocoder = new kakao.maps.services.Geocoder();

  // 주소검색
  function searchAddrFromCoords(
    coords: { getLng: () => number; getLat: () => number },
    callback: {
      (result: string | any[], status: kakao.maps.services.Status): void;
      (
        result: kakao.maps.services.RegionCode[],
        status: kakao.maps.services.Status
      ): void;
    }
  ) {
    // 좌표로 행정동 주소 정보를 요청
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  // 행정동 주소 가져오기
  function displayLocationInfo(
    result: string | any[],
    status: kakao.maps.services.Status
  ) {
    if (status === kakao.maps.services.Status.OK) {
      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H'
        if (result[i].region_type === "H") {
          //   console.log(result[i].address_name);
          //  위경도에 따른 현재 주소값 저장
          setAddress(result[i].address_name);
          break;
        }
      }
    }
  }

  useEffect(() => {
    if (location)
      searchAddrFromCoords(
        new kakao.maps.LatLng(location.location.lat, location.location.lng),
        // new kakao.maps.LatLng(36.3597629, 127.385063),
        displayLocationInfo
      );
  }, [location]);

  return <p className="ml-1">{address}</p>;
}
