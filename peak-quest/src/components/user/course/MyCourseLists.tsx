import { XDeleteBtn } from "../../../assets/icon";
import { Amenities, ListItem } from "../../../pages/user/CourseEdit";

// Tailwind CSS classes
const buttonClasses = "w-1/3 h-10 transition-colors duration-300";
const defaultButtonClasses = "text-darkGray bg-[#F9FAFB]";
const activeButtonClasses = "text-white bg-mint";

interface MyCourseListsProps {
  lists: ListItem[];
  place: string;
  amenities: Amenities;
  onAddListItem: () => void;
  onRemoveListItem: (id: number) => void;
  onToggleAmenity: (itemId: number, amenityType: keyof Amenities) => void;
  onPlaceChange: (place: string) => void;
  onAmenitiesChange: (amenities: Amenities) => void;
}

export default function MyCourseLists({
  lists,
  place,
  amenities,
  onAddListItem,
  onRemoveListItem,
  onToggleAmenity,
  onPlaceChange,
  onAmenitiesChange,
}: MyCourseListsProps) {
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPlaceChange(e.target.value);
  };

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
              {/* 코스 장소 입력 */}
              <input
                type="text"
                className="w-full rounded-t-lg border border-gray p-2 text-center font-medium text-darkGray"
                value={item.place}
                onChange={handlePlaceChange}
                readOnly
              />

              {/* 편의시설 버튼 */}
              <div className="relative -mt-[1px] mb-3 flex items-center justify-evenly rounded-b-lg border border-gray">
                {/* 화장실 */}
                <button
                  className={`${buttonClasses} ${
                    item.amenities.hasRestroom
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
                    item.amenities.hasFood
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
                    item.amenities.hasFood ? " bg-white" : "bg-gray"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-1/3 h-full w-[1px] ${
                    item.amenities.hasFood ? " bg-white" : "bg-gray"
                  }`}
                />
                {/* 식수대 */}
                <button
                  className={`${buttonClasses} ${
                    item.amenities.hasWater
                      ? activeButtonClasses
                      : defaultButtonClasses
                  } whitespace-nowrap rounded-br-lg`}
                  onClick={() => onToggleAmenity(item.id, "hasWater")}
                >
                  식수대
                </button>
              </div>

              {/* 삭제 버튼 */}
              <button
                className="absolute right-2 top-2 tracking-widest text-gray "
                onClick={() => onRemoveListItem(item.id)}
              >
                <XDeleteBtn />
              </button>
            </li>
          ))}
          {/* 코스 입력창 */}
          <div className="relative">
            {/* 코스 장소 입력 */}
            <input
              type="text"
              className="w-full rounded-t-lg border border-gray p-2 text-center text-darkGray focus:outline-none"
              value={place}
              onChange={handlePlaceChange}
            />

            {/* 편의시설 버튼 */}
            <div className="relative -mt-[1px] mb-3 flex items-center justify-evenly rounded-b-lg border border-gray">
              {/* 화장실 */}
              <button
                className={`${buttonClasses} ${
                  amenities.hasRestroom
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
                  amenities.hasFood ? activeButtonClasses : defaultButtonClasses
                } whitespace-nowrap `}
                onClick={() => handleAmenitiesChange("hasFood")}
              >
                음식점
              </button>
              {/* border */}
              <div
                className={`absolute bottom-0 right-1/3 h-full w-[1px] ${
                  amenities.hasFood ? " bg-white" : "bg-gray"
                }`}
              />
              <div
                className={`absolute bottom-0 left-1/3 h-full w-[1px] ${
                  amenities.hasFood ? " bg-white" : "bg-gray"
                }`}
              />
              {/* 식수대 */}
              <button
                className={`${buttonClasses} ${
                  amenities.hasWater
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
          <input
            type="text"
            className="w-full rounded-t-lg border border-gray p-2 text-center text-darkGray"
            value={place}
            onChange={handlePlaceChange}
          />

          {/* 편의시설 버튼 */}
          <div className="relative -mt-[1px] mb-3 flex items-center justify-evenly rounded-b-lg border border-gray">
            {/* 화장실 */}
            <button
              className={`${buttonClasses} ${
                amenities.hasRestroom
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
                amenities.hasFood ? activeButtonClasses : defaultButtonClasses
              } whitespace-nowrap `}
              onClick={() => handleAmenitiesChange("hasFood")}
            >
              음식점
            </button>
            {/* border */}
            <div
              className={`absolute bottom-0 right-1/3 h-full w-[1px] ${
                amenities.hasFood ? " bg-white" : "bg-gray"
              }`}
            />
            <div
              className={`absolute bottom-0 left-1/3 h-full w-[1px] ${
                amenities.hasFood ? " bg-white" : "bg-gray"
              }`}
            />
            {/* 식수대 */}
            <button
              className={`${buttonClasses} ${
                amenities.hasWater ? activeButtonClasses : defaultButtonClasses
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
        onClick={onAddListItem}
        disabled={!place}
      >
        +
      </button>
    </div>
  );
}
