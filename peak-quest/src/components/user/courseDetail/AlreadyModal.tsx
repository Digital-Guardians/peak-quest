import React, { useEffect } from "react";

interface AlreadyModalProps {
  selectOriginCourse: {
    id: number;
    frtrlNm: string;
    position: [
      {
        lat: number;
        lng: number;
      }
    ];
  };

  setOpenAlready: React.Dispatch<boolean>; // 모달 open 관련
}

export default function AlreadyModal({
  selectOriginCourse,
  setOpenAlready,
}: AlreadyModalProps) {
  useEffect(() => {
    // 모달이 열리면 scroll 막기
    document.body.style.overflow = "hidden";
  }, [open]);

  return (
    <div>
      <div className="fixed top-0 z-10 mx-auto flex h-screen w-full max-w-[430px] items-center justify-center bg-black/60">
        <div className="flex w-[85%] max-w-[430px] flex-col items-center justify-center rounded-lg bg-white px-2 py-3 shadow-3xl  sm:w-[93%]">
          <p className="mb-1 text-lg font-bold text-mint">관련 코스 정보</p>

          <div className="mb-2 mt-2 h-[20px] text-black underline ">
            <a
              href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${selectOriginCourse.frtrlNm}`}
              target="_blank"
            >
              - {selectOriginCourse.frtrlNm}
            </a>
          </div>

          <div className="mt-4 flex h-[40px] w-full items-center justify-evenly text-md">
            <button
              className="h-full w-[30%] rounded-lg bg-gray font-bold text-darkGray"
              onClick={() => {
                setOpenAlready(false);
                // 다시 스크롤 가능
                document.body.style.overflow = "auto";
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
