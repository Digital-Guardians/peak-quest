import { Dispatch, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Amenities, ListItem } from "../../../pages/user/CourseEdit";
import KakaoMapSearch from "./KakaoMapSearch";
import { MapBtn } from "../../../assets/icon";

// Tailwind CSS classes
const buttonClasses = "w-1/3 h-10 transition-colors duration-300";
const defaultButtonClasses = "text-darkGray bg-[#F9FAFB]";
const activeButtonClasses = "text-white bg-mint";

interface MyCourseListsProps {
  lists: ListItem[];
  setLists: Dispatch<SetStateAction<ListItem[]>>;
  place: string;
  amenities: Amenities;
  onAddNewInput: () => void;
  onRemoveListItem: (id: number) => void;
  onToggleAmenity: (itemId: number, amenityType: keyof Amenities) => void;
  onPlaceChange: (place: string) => void;
  onAmenitiesChange: (amenities: Amenities) => void;
}

export default function MyCourseLists({
  lists,
  setLists,
  place,
  amenities,
  onAddNewInput,
  onRemoveListItem,
  onToggleAmenity,
  onPlaceChange,
  onAmenitiesChange,
}: MyCourseListsProps) {
  // 삭제 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleOpenPopup = (itemId: number) => {
    setIsPopupOpen(true); // 팝업 열기
    setSelectedItemId(itemId); // 선택된 아이템 아이디 설정
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  const handleDelete = () => {
    // 선택된 아이템 삭제 로직
    if (selectedItemId) {
      onRemoveListItem(selectedItemId); // 선택된 아이템 삭제 콜백 호출
      setIsPopupOpen(false); // 팝업 닫기
      setSelectedItemId(null); // 선택된 아이템 초기화
    }
  };

  // 카카오맵 팝업
  const [isMapOpen, setIsMapOpen] = useState(false);

  // 카카오맵 팝업 열기
  const handleOpenMapPopup = (event: React.FormEvent) => {
    event.preventDefault();
    if (place.trim() === "") return;
    setIsMapOpen(true);
  };

  // 카카오맵 팝업 닫기
  const handleCloseMapPopup = () => {
    setIsMapOpen(false);
  };

  // 장소 입력
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPlaceChange(e.target.value);
  };

  // 편의시설 유무 여부
  const handleAmenitiesChange = (amenityType: keyof Amenities) => {
    onAmenitiesChange({
      ...amenities,
      [amenityType]: amenities[amenityType] === "N" ? "Y" : "N",
    });
  };

  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">나만의 코스 목록</h1>
      {/* 코스 목록 */}
      {lists.length > 0 ? (
        <ul>
          {/* 코스 리스트 */}
          {lists.map((item) => (
            <li key={item.id} className="relative">
              {/* 팝업 */}
              {isPopupOpen && (
                <div className="fixed inset-0 z-30 flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-black opacity-70"
                    onClick={handleClosePopup}
                  />
                  <div className="relative flex items-center justify-center rounded-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2">
                    <div className="p-2">
                      {/* 팝업 내용 */}
                      <div className="">
                        <h2 className="text-2xl font-medium text-black sm:mt-4 sm:text-xl">
                          지점을 <strong className="text-mint">삭제</strong>
                          할까요?
                        </h2>
                        <div className="my-2 text-lg text-darkGray sm:text-md">
                          <p>삭제하시면 등록하신</p>
                          <p>편의시설 정보도 사라져요!</p>
                        </div>
                      </div>
                      {/* 버튼 */}
                      <div className="mt-4 flex items-center justify-center sm:text-md">
                        <div>
                          <button
                            className="mr-2 cursor-pointer rounded-lg bg-mint px-8 py-2 text-white sm:px-4 sm:py-2"
                            onClick={handleDelete}
                          >
                            삭제하기
                          </button>
                        </div>
                        <div>
                          <button
                            className="rounded-lg bg-gray px-8 py-2 text-darkGray sm:px-4 sm:py-2"
                            onClick={handleClosePopup}
                          >
                            돌아가기
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* 닫기 버튼 */}
                    <button
                      className="absolute right-2 top-2 text-darkGray"
                      onClick={handleClosePopup}
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                </div>
              )}
              {/* 코스 장소 입력 */}
              <input
                type="text"
                className="w-full rounded-t-lg border border-gray p-2 text-center font-medium text-darkGray"
                value={item.place}
                readOnly
              />
              {/* 편의시설 버튼 */}
              <div className="relative -mt-[1px] mb-3 flex items-center justify-evenly rounded-b-lg border border-gray">
                {/* 화장실 */}
                <button
                  className={`${buttonClasses} ${
                    item.amenities.hasRestroom === "Y"
                      ? activeButtonClasses
                      : defaultButtonClasses
                  } whitespace-nowrap rounded-bl-lg`}
                  onClick={() => onToggleAmenity(item.id, "hasRestroom")}
                >
                  화장실
                </button>
                {/* 음식점 */}
                <button
                  className={`${buttonClasses} ${
                    item.amenities.hasFood === "Y"
                      ? activeButtonClasses
                      : defaultButtonClasses
                  } whitespace-nowrap `}
                  onClick={() => onToggleAmenity(item.id, "hasFood")}
                >
                  음식점
                </button>
                {/* border */}
                <div
                  className={`absolute bottom-0 right-1/3 h-full w-[1px] ${
                    item.amenities.hasFood === "Y" ? " bg-white" : "bg-gray"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-1/3 h-full w-[1px] ${
                    item.amenities.hasFood === "Y" ? " bg-white" : "bg-gray"
                  }`}
                />
                {/* 식수대 */}
                <button
                  className={`${buttonClasses} ${
                    item.amenities.hasWater === "Y"
                      ? activeButtonClasses
                      : defaultButtonClasses
                  } whitespace-nowrap rounded-br-lg`}
                  onClick={() => onToggleAmenity(item.id, "hasWater")}
                >
                  식수대
                </button>
              </div>

              {/* 삭제 버튼 => 팝업으로 열림 */}
              <button
                className="absolute right-2 top-2 tracking-widest text-darkGray "
                onClick={() => handleOpenPopup(item.id)}
              >
                <IoClose />
              </button>
            </li>
          ))}
          {/* 코스 입력창 */}
          <div className="relative">
            {/* 코스 장소 입력 */}
            <form onSubmit={handleOpenMapPopup}>
              <input
                type="text"
                className="w-full rounded-t-lg border border-gray px-11 py-2 text-center text-darkGray focus:outline-none"
                value={place}
                onChange={handlePlaceChange}
              />
            </form>
            <div
              onClick={handleOpenMapPopup}
              className="absolute right-[16px] top-[10px] cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100"
            >
              <MapBtn />
            </div>
            {/* 편의시설 버튼 */}
            <div className="relative -mt-[1px] mb-3 flex items-center justify-evenly rounded-b-lg border border-gray">
              {/* 화장실 */}
              <button
                className={`${buttonClasses} ${
                  amenities.hasRestroom === "Y"
                    ? activeButtonClasses
                    : defaultButtonClasses
                } whitespace-nowrap rounded-bl-lg`}
                onClick={() => handleAmenitiesChange("hasRestroom")}
              >
                화장실
              </button>
              {/* 음식점 */}
              <button
                className={`${buttonClasses} ${
                  amenities.hasFood === "Y"
                    ? activeButtonClasses
                    : defaultButtonClasses
                } whitespace-nowrap `}
                onClick={() => handleAmenitiesChange("hasFood")}
              >
                음식점
              </button>
              {/* border */}
              <div
                className={`absolute bottom-0 right-1/3 h-full w-[1px] ${
                  amenities.hasFood === "Y" ? " bg-white" : "bg-gray"
                }`}
              />
              <div
                className={`absolute bottom-0 left-1/3 h-full w-[1px] ${
                  amenities.hasFood === "Y" ? " bg-white" : "bg-gray"
                }`}
              />
              {/* 식수대 */}
              <button
                className={`${buttonClasses} ${
                  amenities.hasWater === "Y"
                    ? activeButtonClasses
                    : defaultButtonClasses
                } whitespace-nowrap rounded-br-lg`}
                onClick={() => handleAmenitiesChange("hasWater")}
              >
                식수대
              </button>
            </div>
          </div>
        </ul>
      ) : (
        <div className="relative">
          {/* 코스 장소 입력 */}
          <form onSubmit={handleOpenMapPopup}>
            <input
              type="text"
              className="w-full rounded-t-lg border border-gray p-2 text-center text-darkGray"
              value={place}
              onChange={handlePlaceChange}
            />
          </form>
          <div
            onClick={handleOpenMapPopup}
            className="absolute right-[16px] top-[10px] cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100"
          >
            <MapBtn />
          </div>

          {/* 편의시설 버튼 */}
          <div className="relative -mt-[1px] mb-3 flex items-center justify-evenly rounded-b-lg border border-gray">
            {/* 화장실 */}
            <button
              className={`${buttonClasses} ${
                amenities.hasRestroom === "Y"
                  ? activeButtonClasses
                  : defaultButtonClasses
              } whitespace-nowrap rounded-bl-lg`}
              onClick={() => handleAmenitiesChange("hasRestroom")}
            >
              화장실
            </button>
            {/* 음식점 */}
            <button
              className={`${buttonClasses} ${
                amenities.hasFood === "Y"
                  ? activeButtonClasses
                  : defaultButtonClasses
              } whitespace-nowrap `}
              onClick={() => handleAmenitiesChange("hasFood")}
            >
              음식점
            </button>
            {/* border */}
            <div
              className={`absolute bottom-0 right-1/3 h-full w-[1px] ${
                amenities.hasFood === "Y" ? " bg-white" : "bg-gray"
              }`}
            />
            <div
              className={`absolute bottom-0 left-1/3 h-full w-[1px] ${
                amenities.hasFood === "Y" ? " bg-white" : "bg-gray"
              }`}
            />
            {/* 식수대 */}
            <button
              className={`${buttonClasses} ${
                amenities.hasWater === "Y"
                  ? activeButtonClasses
                  : defaultButtonClasses
              } whitespace-nowrap rounded-br-lg`}
              onClick={() => handleAmenitiesChange("hasWater")}
            >
              식수대
            </button>
          </div>
        </div>
      )}
      {/* 추가 버튼 */}
      <button
        className="borer-gray w-full cursor-pointer rounded-lg border py-1 text-xl text-gray hover:bg-mint hover:text-white"
        onClick={onAddNewInput}
        disabled={!place}
      >
        +
      </button>
      {/* 카카오맵 팝업 */}
      {isMapOpen && (
        <div className="fixed inset-0 z-30 m-auto flex max-w-[430px] items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={handleCloseMapPopup}
          />
          <div className="relative flex w-full items-center justify-center rounded-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2">
            <div className="w-full p-4">
              <KakaoMapSearch
                place={place}
                lists={lists}
                setLists={setLists}
                onPlaceChange={onPlaceChange}
                handleCloseMapPopup={handleCloseMapPopup}
                amenities={amenities}
              />
            </div>
            {/* 닫기 버튼 */}
            <button
              className="absolute right-2 top-2 text-darkGray"
              onClick={handleCloseMapPopup}
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
