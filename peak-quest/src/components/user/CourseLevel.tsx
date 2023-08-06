import { IoMdHelpCircleOutline } from "react-icons/io";
import { LevelButton } from "../LevelButton";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface CourseLevelProps {
  level: number;
  handleLevel: (value: number) => void;
}

export default function CourseLevel({ level, handleLevel }: CourseLevelProps) {
  // 난이도 팝업
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenPopUp = () => {
    setIsOpen(true);
  };
  const handleClosePopUp = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-medium text-black">난이도</h1>
        <div onClick={handleOpenPopUp}>
          <IoMdHelpCircleOutline className="text-gray" />
        </div>
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
      {/* 팝업 */}
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={handleClosePopUp}
          />
          <div className="relative flex items-center justify-center rounded-lg bg-white p-5 text-black shadow-3xl">
            <div>
              <div className="absolute right-2 top-2">
                <IoClose className="text-gray" onClick={handleClosePopUp} />
              </div>
              <h1 className="my-2 text-center text-2xl font-semibold sm:text-xl">
                픽퀘스트 난이도
              </h1>
              <ul>
                {peakQuestLevelInfos.map((peakQuestLevelInfo) => (
                  <li key={peakQuestLevelInfo.level} className="my-3">
                    <p className="font-semibold sm:text-md">
                      {peakQuestLevelInfo.level}
                    </p>
                    <p className="text-md sm:text-sm">
                      {peakQuestLevelInfo.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
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

const peakQuestLevelInfos = [
  {
    level: "⭐ 트래킹 신생아",
    description: "#트래킹은 처음이라 #트린이 #가벼운코스",
  },
  {
    level: "⭐⭐ 트래킹 초보",
    description: "#부담없는 코스 #아직은 초보에요 #갈 길이 멀다 ",
  },
  {
    level: "⭐⭐⭐ 트래킹 아마추어",
    description: "#트래킹 좀 해봤다 #유경험자 #트래킹루틴",
  },
  {
    level: "⭐⭐⭐⭐ 트래킹 박사",
    description: "#장기 트래킹도 거뜬 #오트완 #지치지 않아",
  },
  {
    level: "⭐⭐⭐⭐⭐ 트래킹 달인",
    description: "#트래킹이 제일 쉬워요 #도전적인 #마라톤 러버",
  },
];
