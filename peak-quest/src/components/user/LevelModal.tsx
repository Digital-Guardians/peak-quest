import React, { SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

interface LwvelModalProps {
  setPopUp: React.Dispatch<SetStateAction<boolean>>;
}

export default function LevelModal({ setPopUp }: LwvelModalProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={() => setPopUp(false)}
      />
      <div className="relative flex items-center justify-center rounded-lg bg-white p-5 text-black shadow-3xl">
        <div>
          <div className="absolute right-2 top-2">
            <IoClose className="text-gray" onClick={() => setPopUp(false)} />
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
  );
}

const peakQuestLevelInfos = [
  {
    level: "⭐ 트래킹 입문자",
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
