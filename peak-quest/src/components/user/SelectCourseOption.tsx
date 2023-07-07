import React, { useState } from "react";

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

  return (
    <div className="w-[91%] min-h-[160px] flex flex-col justify-around px-3 py-3 text-md text-darkGray font-bold sm:font-medium shadow-lg bg-white rounded-lg absolute top-[80px] z-50">
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

      <div className="h-[35px] flex justify-between items-center text-white mt-1">
        <button
          className="w-[48%] h-full  bg-green rounded-[8px]"
          onClick={() => {
            handleSelect(courseOption);
            setOpen(false);
          }}
        >
          적용하기
        </button>
        <button
          className="w-[48%] h-full  bg-gray rounded-[8px]"
          onClick={() => setOpen(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
}

