import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { Amenities, ListItem } from "../../../pages/user/CourseEdit";

interface Place {
  id: string;
  position: any;
  content: string;
  address_name: string;
  y: string;
  x: string;
}

interface Info {
  content: string;
  address_name: string;
  id: string;
  y: string;
  x: string;
}

interface KakaoMapProps {
  place: string;
  lists: ListItem[];
  setLists: Dispatch<SetStateAction<ListItem[]>>;
  onPlaceChange: (place: string) => void;
  handleCloseMapPopup: () => void;
  amenities: Amenities;
}

export default function KakaoMapSearch({
  place,
  setLists,
  onPlaceChange,
  handleCloseMapPopup,
  amenities,
}: KakaoMapProps) {
  // 선택된 장소 정보를 저장하는 상태
  const [info, setInfo] = useState<Info | null>(null);
  // 지도를 저장하는 상태
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  // 키워드 검색 결과 리스트
  const [markers, setMarkers] = useState<Place[]>([]);
  // 팝업 input Value
  const [searchMarker, setSearchMarker] = useState<string>(place);

  const handleSearchMarker = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMarker(event.target.value);
  };

  const onSearchMarker = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onPlaceChange(searchMarker);
  };

  // 마커를 클릭했을 때 정보를 담아주는 함수
  const handleMarkerClick = (marker: Place) => {
    const newItem: ListItem = {
      id: +marker.id,
      place: marker.content,
      amenities: {
        ...amenities,
      },
      position: {
        lat: marker.position.lat,
        lng: marker.position.lng,
      },
      address_name: marker.address_name,
    };

    setLists((prevLists) => [...prevLists, newItem]);
    onPlaceChange(""); // 입력창 초기화
    handleCloseMapPopup(); // 카카오맵 팝업 닫기
  };

  useEffect(() => {
    // map이 null이면 아무 작업도 수행하지 않음
    if (!map) return;

    // 장소 검색 객체 생성
    const ps = new kakao.maps.services.Places();

    // 검색 결과 리스트나 마커를 클릭했을 때 장소명을 표출할 인포윈도우 생성
    const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 키워드로 장소 검색
    ps.keywordSearch(
      place,
      (
        data: kakao.maps.services.PlacesSearchResultItem[],
        status: kakao.maps.services.Status
      ) => {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          let datas = data.slice(0, 5);

          for (var i = 0; i < datas.length; i++) {
            markers.push({
              position: {
                lat: datas[i].y,
                lng: datas[i].x,
              },
              content: datas[i].place_name,
              address_name: datas[i].address_name,
              id: datas[i].id,
            });
            bounds.extend(new kakao.maps.LatLng(+datas[i].y, +datas[i].x));
          }
          // 키워드 검색 결과 저장
          // @ts-ignore
          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map!.setBounds(bounds);

          // 페이지 번호를 표출합니다
          //   displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }
    );
  }, [map, place]);

  useEffect(() => {
    if (markers.length > 0) {
      const [firstMarker] = markers;
      const { lat, lng } = firstMarker.position;
      map!.setCenter(new kakao.maps.LatLng(lat, lng));
    }
  }, [markers, map]);

  return (
    <div className="relative h-[550px] w-full">
      <form
        onSubmit={onSearchMarker}
        className="relative mb-3 flex items-center justify-between"
      >
        <input
          className="w-4/5 border border-gray p-2 font-medium text-darkGray"
          type="text"
          value={searchMarker}
          onChange={handleSearchMarker}
        />
        <button
          type="submit"
          className="w-1/5  whitespace-nowrap border border-mint bg-mint p-2 text-white"
        >
          검색
        </button>
      </form>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "300px",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
        <ZoomControl position={kakao.maps.ControlPosition.BOTTOMRIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      </Map>
      <ul className="mt-2 h-[200px] overflow-y-scroll">
        {markers.map((marker, idx) => (
          <li
            onClick={() => handleMarkerClick(marker)}
            key={marker.id}
            className="my-2 cursor-pointer py-1 transition-all duration-200 hover:bg-lightGreen"
          >
            <div className="flex items-center space-x-2">
              <div className="aspect-ratio flex h-7 w-7 items-center justify-center rounded-full bg-mint p-2 leading-7 text-white">
                {idx + 1}
              </div>
              <div className="flex flex-col items-start justify-center whitespace-nowrap text-left">
                <div className="text-lg font-medium">{marker.content}</div>
                <div className="text-md font-light text-darkGray">
                  {marker.address_name}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
