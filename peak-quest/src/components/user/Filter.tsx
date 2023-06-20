import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { IoIosArrowDropdown } from "react-icons/io";
import SelectCourseOption from "./SelectCourseOption";
import { changeKorean } from "../../helper/changeAreaName";

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
interface AreaOption {
  value: string;
  label: string;
}

const areaOptions: AreaOption[] = [
  { value: "capital", label: "수도권" },
  { value: "gangwon", label: "강원권" },
  { value: "chungcheong", label: "충청권" },
  { value: "jeolla", label: "전라권" },
  { value: "gyeongsang", label: "경상권" },
  { value: "jeju", label: "제주도" },
];

// 난이도 버튼
interface LevelButtonProps {
  label: string;
  value: number;
  onClick: (value: number) => void;
  activeValue: number;
}

function LevelButton({ label, value, onClick, activeValue }: LevelButtonProps) {
  const isActive = value === activeValue;
  const buttonStyle = `h-[33px] px-[10px] mr-2 mt-2 text-md text-white font-bold border-[1px] rounded-full sm:h-[30px] sm:text-[10px] sm:px-4 ${
    isActive ? "bg-mint border-mint" : "bg-black/60 border-white"
  }`;
  return (
    <button className={buttonStyle} onClick={() => onClick(value)}>
      {label}
    </button>
  );
}

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
            className="w-full max-w-[430px] h-[400px] translate-y-[-10%] scale-x-125"
            src={`../../src/assets/user/${changeKorean(AreaName)}.png`}
          />
          {/* 이미지 그라데이션 */}
          <div className="w-full h-full bg-gradient-to-b from-black/90 to-black/50 absolute top-0 left-0" />
        </div>
        <div className="w-full max-w-[430px] text-white absolute bottom-32 left-3">
          <div className="flex justify-start items-center">
            {/* 지역 이름 */}
            <div
              className="flex justify-center items-center text-xl font-bold ml-2 relative"
              onClick={() => setAreaSelect(!areaSelect)}
            >
              {changeKorean(AreaName)}
              <div className="text-2xl font-bold pt-1 ml-1">
                <IoIosArrowDropdown />
              </div>
              {/* 지역 변경 */}
              {areaSelect && (
                <div className="w-[110px] text-darkGray text-lg text-center font-medium bg-white py-1 rounded-lg shadow-lg absolute top-[35px] left-[-10px] z-50">
                  {areaOptions.map((option) => (
                    <p
                      className={`py-2 border-b-[1px] last:border-none border-gray ${
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
              select.courseOption.length > 1 ? "w-[90%]" : "w-[55%]"
            } h-[35px] overflow-hidden flex justify-between items-center py-1 px-3 mr-2 my-2 text-md border-[1px] border-white rounded-2xl bg-black/60 break-keep leading-normal sm:w-[65%] cursor-pointer relative`}
            onClick={() => setOpen(!open)}
          >
            {select.courseOption.length > 0 ? (
              <>
                {/* 코스 유형을 선택했을 경우 보여줌 => 20글자 이상이면, ... 표기 */}
                {select.courseOption.join(" / ").length > 30
                  ? select.courseOption.join(" / ").slice(0, 33) + "..."
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
            />
            <LevelButton
              label="⭐ 입문자"
              value={1}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
            />
            <LevelButton
              label="⭐⭐ 초보자"
              value={2}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
            />
            <LevelButton
              label="⭐⭐⭐ 아마추어"
              value={3}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
            />
            <LevelButton
              label="⭐⭐⭐⭐ 박사"
              value={4}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
            />
            <LevelButton
              label="⭐⭐⭐⭐⭐ 달인"
              value={5}
              onClick={(value: number) => handleSelect(value)}
              activeValue={level}
            />
          </div>
        </div>
      </div>
    </>
  );
}
