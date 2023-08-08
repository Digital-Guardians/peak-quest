import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import BadgeComponent, { BadgeColorInfo } from "./Badge";
import congratulations from "../../../assets/congratulations.png";

// 뱃지 획득 팝업 타입 정의
export interface GetBadgePopupComponentProps {
  // NonNullable
  // - TypeScript의 타입 유틸리티 중 하나
  // - null 및 undefined를 제거하여 새로운 타입을 생성
  getBadgeInfo: NonNullable<BadgeColorInfo>;
  handleCloseGetPopUp: () => void;
}

// 뱃지 획특 팝업 컴포넌트
export default function GetBadgePopupComponent({
  getBadgeInfo,
  handleCloseGetPopUp,
}: GetBadgePopupComponentProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      <div
        onClick={handleCloseGetPopUp}
        className="absolute inset-0 bg-black opacity-70"
      />
      <div className="relative flex max-w-[430px] items-center justify-center rounded-lg bg-white p-5 text-center text-black shadow-3xl sm:p-2">
        <div className="relative">
          {/* 랜덤한 도형 */}
          <div className="absolute right-0 top-0">
            <img
              className="animate-float"
              src={congratulations}
              alt="축하 효과"
            />
          </div>
          {/* 팝업 내용 */}
          <div className="">
            <h2 className="text-2xl font-semibold text-black sm:mt-4 sm:text-xl">
              <p>축하해요!</p>
              <p>
                <strong className="text-mint">{getBadgeInfo.name}</strong>{" "}
                획득했어요
              </p>
            </h2>
            {/* 뱃지 */}
            <div className="my-5">
              <BadgeComponent
                name={getBadgeInfo.name}
                shortName={getBadgeInfo.shortName}
                image={getBadgeInfo.image}
                activeColor={getBadgeInfo.activeColor}
                activeTextColor={getBadgeInfo.activeTextColor}
                popupText={getBadgeInfo.popupText}
              />
            </div>
            <div className="my-2 rounded-lg bg-[#f8f8f8] p-2 py-2 text-center text-md text-darkGray">
              트레킹 정보통 , 트레킹 트랜드세터 뱃지도 모아 보세요!
            </div>
          </div>
          {/* 버튼 */}
          <div className="mt-4 flex items-center justify-center space-x-3 sm:text-md">
            <div className="w-1/2">
              <Link to="/mypage/badgelist">
                <button className="w-full cursor-pointer rounded-lg bg-mint p-2 text-white">
                  내 뱃지 둘러보기
                </button>
              </Link>
            </div>
            <div className="w-1/2">
              <button
                onClick={handleCloseGetPopUp}
                className="w-full rounded-lg bg-gray py-2 text-darkGray"
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
        {/* 닫기 버튼 */}
        <button
          onClick={handleCloseGetPopUp}
          className="absolute right-2 top-2 text-gray"
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
}
