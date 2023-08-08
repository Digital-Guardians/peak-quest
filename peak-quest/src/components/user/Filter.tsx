import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { IoIosArrowDropdown } from "react-icons/io";
import SelectCourseOption from "./SelectCourseOption";
import { changeKorean } from "../../helper/changeAreaName";
import { LevelButton } from "../LevelButton";

// select, setSelect를 props로 전달받음
interface FilterProps {
  select: {
    areaName: string;
    courseOption: string[];
    level: number;
  };
  // 상태를 업데이트하기 위한 함수 전달
  //  => Filter 컴포넌트 내부에서 상태변경 후, courseList에 반영
  setSelect: React.Dispatch<
    React.SetStateAction<{
      areaName: string;
      courseOption: string[];
      level: number;
    }>
  >;
}

// 지역 변경 버튼
export interface AreaOption {
  value: string;
  label: string;
}

export const areaOptions: AreaOption[] = [
  { value: "capital", label: "수도권" },
  { value: "gangwon", label: "강원권" },
  { value: "chungcheong", label: "충청권" },
  { value: "jeolla", label: "전라권" },
  { value: "gyeongsang", label: "경상권" },
  { value: "jeju", label: "제주도" },
];

// 코스 선택 버튼
interface OptionButtonProps {
  value: string;
  onClick: (value: string) => void;
  isSelected: boolean;
}

function OptionButton({ value, onClick, isSelected }: OptionButtonProps) {
  // 선택된 버튼 스타일 변경
  const buttonStyle = `h-[35px] border-[1px] text-md px-3 mr-2 mb-2 rounded-full ${
    isSelected ? "border-mint text-white bg-mint" : "border-gray text-darkGray"
  }`;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <button className={buttonStyle} onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Filter({ select, setSelect }: FilterProps) {
  // 기본 선택 지역 => url
  const { AreaName } = useParams<{ AreaName?: string }>();
  const [areaSelect, setAreaSelect] = useState<boolean>(false);

  // 선택된 지역 페이지로 이동을 위함
  const navigate = useNavigate();

  // 지역선택이 바뀔때마다 select.areaName 변경
  useEffect(() => {
    if (AreaName !== undefined) handleSelect(AreaName);
  }, [AreaName]);

  // 난이도
  const [level, setLevel] = useState<number>(0);

  // 코스 유형 모달 open
  const [open, setOpen] = useState<boolean>(false);

  // 코스유형 & 난이도 선택 변경시 select 값 변경
  const handleSelect = (value: String | number | string[]): void => {
    if (AreaName !== undefined)
      setSelect((prevSelect) => ({
        ...prevSelect,
        areaName: AreaName,
        courseOption: Array.isArray(value) ? value : prevSelect.courseOption,
        level: typeof value === "number" ? value : prevSelect.level,
      }));
    if (typeof value === "number") setLevel(value);
  };

  return (
    <>
      {/* 전체 필터 부분 */}
      <div className="relative left-0">
        <div className="overflow-hidden">
          {/* 지역 이미지 */}
          <img
            className="h-[400px] w-full max-w-[430px] translate-y-[-10%] scale-x-125"
            src={`/images/area/${AreaName}.png`}
          />
          {/* 이미지 그라데이션 */}
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/90 to-black/50" />
        </div>
        <div className="absolute bottom-32 left-3 w-full max-w-[430px] text-white">
          <div className="flex items-center justify-start">
            {/* 지역 이름 */}
            <div
              className="relative ml-2 flex items-center justify-center text-xl font-bold"
              onClick={() => setAreaSelect(!areaSelect)}
            >
              {changeKorean(AreaName)}
              <div className="ml-1 pt-1 text-2xl font-bold">
                <IoIosArrowDropdown />
              </div>
              {/* 지역 변경 */}
              {areaSelect && (
                <div className="absolute left-[-10px] top-[35px] z-50 w-[110px] rounded-lg bg-white py-1 text-center text-lg font-medium text-darkGray shadow-lg">
                  {areaOptions.map((option) => (
                    <p
                      className={`border-b-[1px] border-gray py-2 last:border-none ${
                        select.areaName === option.label ? "text-green" : ""
                      }`}
                      key={option.label}
                      onClick={() => {
                        navigate(`/area/${option.value}/courselist`);
                        // 지역선택 변경 시 => 필터 값 초기화 & scroll to top
                        handleSelect([]);
                        handleSelect(0);
                        setAreaSelect(false);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      {option.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* 코스 유형 선택 */}
          <div
            id="courseOption"
            className={`${
              select.courseOption.length > 1
                ? "w-[90%] sm:w-[90%]"
                : "w-[55%] sm:w-[90%]"
            } relative my-2 mr-2 flex h-[35px] cursor-pointer items-center justify-between overflow-hidden break-keep rounded-2xl border-[1px] border-white bg-black/60 px-3 py-1 text-md leading-normal sm:w-[65%]`}
            onClick={() => setOpen(!open)}
          >
            {select.courseOption.length > 0 ? (
              <>
                {/* 코스 유형을 선택했을 경우 보여줌 => 20글자 이상이면, ... 표기 */}
                {select.courseOption.join(" / ").length > 30
                  ? select.courseOption.join(" / ").slice(0, 30) + "..."
                  : select.courseOption.join(" / ")}
              </>
            ) : (
              <> 코스 | 코스 유형을 선택해 주세요.</>
            )}
            <div className="ml-1">
              {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </div>
          </div>
          {/* 코스 유형 선택 팝업창 */}
          {open && (
            <SelectCourseOption
              setOpen={setOpen}
              handleSelect={handleSelect}
              select={select}
            />
          )}
          {/* 난이도 선택 */}
          <div>
            <LevelButton
              label="전체"
              value={0}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
              style="bg-black/60 border-white text-white"
            />
            <LevelButton
              label="⭐ 입문자"
              value={1}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
              style="bg-black/60 border-white text-white"
            />
            <LevelButton
              label="⭐⭐ 초보자"
              value={2}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
              style="bg-black/60 border-white text-white"
            />
            <LevelButton
              label="⭐⭐⭐ 아마추어"
              value={3}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
              style="bg-black/60 border-white text-white"
            />
            <LevelButton
              label="⭐⭐⭐⭐ 박사"
              value={4}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
              style="bg-black/60 border-white text-white"
            />
            <LevelButton
              label="⭐⭐⭐⭐⭐ 달인"
              value={5}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
              style="bg-black/60 border-white text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
