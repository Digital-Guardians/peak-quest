import React, { useState } from "react";
import { GrPowerReset } from "react-icons/gr";

// SelectCourseOption 속성
interface SelectCourseOptionProps {
  setOpen: React.Dispatch<boolean>;
  handleSelect: (value: number | string[]) => void;
  select: {
    areaName: string;
    courseOption: string[];
    level: number;
  };
}

// 코스 선택 버튼
interface OptionButtonProps {
  value: string;
  onClick: (value: string) => void;
  isSelected: boolean;
  courseOption: string[];
}

function OptionButton({
  value,
  onClick,
  isSelected,
  courseOption,
}: OptionButtonProps) {
  // 선택되어져 있는지 확인 => select 배열에 저장된 courseOption에 포함되는 지 확인
  const isActive = courseOption.includes(value);
  // 선택된 버튼 스타일 변경
  const buttonStyle = `h-[35px] border-[1px] text-md px-3 mr-2 mb-2 rounded-full ${
    isSelected || isActive
      ? "border-mint text-white bg-mint"
      : "border-gray text-darkGray"
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

export default function SelectCourseOption({
  setOpen,
  handleSelect,
  select,
}: SelectCourseOptionProps) {
  const [courseOption, setCourseOption] = useState<string[]>(
    select.courseOption
  );

  // 코스 옵션 변경
  const handleOption = (value: string): void => {
    if (courseOption.includes(value)) {
      const updatedValues = courseOption.filter((option) => option !== value);
      setCourseOption(updatedValues);
    } else {
      setCourseOption([...courseOption, value]);
    }
  };

  // 옵션을 초기화하는 함수
  const handleResetOptions = () => {
    setCourseOption([]); // courseOption을 빈 배열로 초기화
  };

  return (
    <div className="absolute top-[80px] z-50 flex min-h-[160px] w-[91%] flex-col justify-around rounded-lg bg-white px-3 py-3 text-md font-bold text-darkGray shadow-lg sm:font-medium">
      <div>
        <OptionButton
          value={"편의시설이 있는"}
          isSelected={courseOption.includes("편의시설이 있는")}
          onClick={handleOption}
          courseOption={courseOption}
        />
        <OptionButton
          value={"혼자서도 갈 수 있는"}
          isSelected={courseOption.includes("혼자서도 갈 수 있는")}
          onClick={handleOption}
          courseOption={courseOption}
        />
        <OptionButton
          value={"당일치기 가능한"}
          isSelected={courseOption.includes("당일치기 가능한")}
          onClick={handleOption}
          courseOption={courseOption}
        />
        <OptionButton
          value={"자전거 타고 갈 수 있는"}
          isSelected={courseOption.includes("자전거 타고 갈 수 있는")}
          onClick={handleOption}
          courseOption={courseOption}
        />
        <OptionButton
          value={"반려동물과 함께 갈 수 있는"}
          isSelected={courseOption.includes("반려동물과 함께 갈 수 있는")}
          onClick={handleOption}
          courseOption={courseOption}
        />
      </div>

      <button
        className="absolute right-8 text-xl"
        onClick={() => {
          handleResetOptions(); // 옵션 초기화 버튼
        }}
      >
        <GrPowerReset />
      </button>

      <div className="mt-1 flex h-[35px] items-center justify-between text-white">
        <button
          className="h-full w-[48%]  rounded-[8px] bg-green"
          onClick={() => {
            handleSelect(courseOption);
            setOpen(false);
          }}
        >
          적용하기
        </button>

        <button
          className="h-full w-[48%]  rounded-[8px] bg-gray"
          onClick={() => setOpen(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
}
