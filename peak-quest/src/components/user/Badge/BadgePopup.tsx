import { IoClose } from "react-icons/io5";
import { BadgeInfoProps } from "../../../pages/user/BadgeList";
import BadgeComponent from "./Badge";

// 뱃지 팝업 타입 정의
export interface BadgePopupComponentProps {
  isClickPopUpOpen: boolean;
  badgeInfo: BadgeInfoProps;
  handleClosePopUp: () => void;
}

// 뱃지 팝업 컴포넌트
export default function BadgePopupComponent({
  isClickPopUpOpen,
  badgeInfo,
  handleClosePopUp,
}: BadgePopupComponentProps) {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-end justify-center ${
        isClickPopUpOpen ? "translate-y-0" : "translate-y-[999px]"
      }`}
    >
      <div
        onClick={handleClosePopUp}
        className="absolute inset-0 bg-black opacity-70"
      />
      <div
        className={`relative flex w-full max-w-[430px] items-center justify-center rounded-t-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2 ${
          isClickPopUpOpen
            ? "translate-y-0 transition duration-500"
            : "translate-y-[300px] transition duration-500"
        }`}
      >
        <div className="px-2 py-5">
          <BadgeComponent
            name={badgeInfo.name}
            shortName={badgeInfo.shortName}
            image={badgeInfo.image}
            activeColor={badgeInfo.activeColor}
            activeTextColor={badgeInfo.activeTextColor}
            popupText={badgeInfo.popupText}
          />
          <div>
            {/* 팝업 내용 */}
            <div>
              <div className="my-2 mt-5 text-lg text-darkGray sm:text-md">
                {badgeInfo.popupText}
              </div>
            </div>
          </div>
        </div>
        {/* 닫기 버튼 */}
        <button
          onClick={handleClosePopUp}
          className="absolute right-2 top-2 text-gray"
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
}
