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
    <div className="w-full max-w-[430px] h-screen flex justify-center items-center bg-black/60 fixed top-[50px] z-10 mx-auto">
      <div className="w-[85%] max-w-[430px] sm:w-[93%] h-[155px] sm:h-[145px] flex flex-col justify-center items-center bg-white py-3 px-2 shadow-3xl rounded-lg">
        <p className="text-lg font-bold text-black mb-1">
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
        <div className="w-full h-[40px] flex justify-evenly items-center text-md mt-4">
          <button
            className="w-[45%] h-full bg-mint text-white font-bold rounded-lg"
            onClick={handleClick}
          >
            {firstStatus}하기
          </button>
          <button
            className="w-[45%] h-full bg-gray text-darkGray font-bold rounded-lg"
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
