import { IoMdHelpCircleOutline } from "react-icons/io";
import { LevelButton } from "../../LevelButton";

interface CourseLevelProps {
  level: number;
  handleLevel: (value: number) => void;
}

export default function CourseLevel({ level, handleLevel }: CourseLevelProps) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <div>
          <h1 className="text-xl font-medium text-black">난이도</h1>
        </div>
        <IoMdHelpCircleOutline className="text-gray" />
      </div>
      <div>
        {courseLevelInfos.map((courseLevelInfo) => (
          <LevelButton
            key={courseLevelInfo.value}
            label={courseLevelInfo.label}
            value={courseLevelInfo.value}
            onClick={(value: number) => handleLevel(courseLevelInfo.value)}
            activeValue={level}
            style="border-gray text-darkGray"
          />
        ))}
      </div>
    </div>
  );
}

const courseLevelInfos = [
  {
    label: "전체",
    value: 0,
  },
  {
    label: "⭐ 입문자",
    value: 1,
  },
  {
    label: "⭐⭐ 초보자",
    value: 2,
  },
  {
    label: "⭐⭐⭐ 아마추어",
    value: 3,
  },
  {
    label: "⭐⭐⭐⭐ 박사",
    value: 4,
  },
  {
    label: "⭐⭐⭐⭐⭐ 달인",
    value: 5,
  },
];
