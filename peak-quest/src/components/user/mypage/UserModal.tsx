import React, { useEffect, useState } from "react";

interface UserModalProps {
  setOpen: React.Dispatch<boolean>; // 모달 open 관련
  content: string; // 두꺼운 문장
  subContent: string[]; // 얇은 문장 => 여러 줄일 수도 있으니까 string 배열
  firstStatus: string; // 단어 형태로 전달 => ex. 00 하기
  secondStatus: string; // 원하는 아무거나 => 모달 닫는 용도
  order: string[]; // api 명령 & api url
}

export default function UserModal({
  setOpen,
  content,
  subContent,
  firstStatus,
  secondStatus,
  order,
}: UserModalProps) {
  // span 색 변경을 위함
  const [newContent, setNewContent] = useState<string[]>();
  useEffect(() => {
    // 모달이 열리면 scroll 막기
    document.body.style.overflow = "hidden";

    // 만약 firstStatus(버튼단어)와 동일한 말이 content에 있다면 split
    //  => newContent에 저장 후, 보여줌
    // 없다면 그대로 출력해서 보여줄 예정 !
    if (content.includes(firstStatus)) {
      setNewContent(content.split(firstStatus));
    }
  }, [open, content]);

  const handleClick = () => {
    // text 용
    // fetch(`${order}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     alert(`${firstStatus}가 완료되었습니다.`);
    //     setOpen(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching more courses:", error);
    //   });

    // api 연결
    if (order[0] === "delete") {
      console.log(order);
    } else if (order[0] === "put") {
      console.log(order);
    } else if (order[0] === "post") {
      console.log(order);
    } else if (order[0] === "get") {
      console.log(order);
    }

    // 다시 스크롤 가능
    document.body.style.overflow = "auto";
  };
  return (
    <div className="fixed top-[50px] z-10 mx-auto flex h-screen w-full max-w-[430px] items-center justify-center bg-black/60">
      <div className="flex h-[155px] w-[85%] max-w-[430px] flex-col items-center justify-center rounded-lg bg-white px-2 py-3 shadow-3xl sm:h-[145px] sm:w-[93%]">
        <p className="mb-1 text-lg font-bold text-black">
          {newContent ? (
            <>
              <span>{newContent[0]}</span>
              <span className="text-mint">{firstStatus}</span>
              <span>{newContent[1]}</span>
            </>
          ) : (
            content
          )}
        </p>
        {subContent.map((el, idx) => (
          <p key={idx} className="text-md text-darkGray">
            {el}
          </p>
        ))}
        <div className="mt-4 flex h-[40px] w-full items-center justify-evenly text-md">
          <button
            className="h-full w-[45%] rounded-lg bg-mint font-bold text-white"
            onClick={handleClick}
          >
            {firstStatus}하기
          </button>
          <button
            className="h-full w-[45%] rounded-lg bg-gray font-bold text-darkGray"
            onClick={() => {
              setOpen(false);
              // 다시 스크롤 가능
              document.body.style.overflow = "auto";
            }}
          >
            {secondStatus}
          </button>
        </div>
      </div>
    </div>
  );
}
