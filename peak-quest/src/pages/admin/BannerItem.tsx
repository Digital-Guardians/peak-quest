import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useService } from "../../context/ContextProvider";
import { Draggable } from "react-beautiful-dnd";

interface propBanner {
  index: number;
  info: any;
  select: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
}

function getStyle(style: any, snapshot: any) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}

export default function BannerItem({ info, index, select, setSelect }: propBanner) {
  const { url, tags, title } = info;

  const { setBannerInfo } = useService();

  return (
    <Draggable draggableId={info.id} index={index} key={info.id}>
      {(provided, snapshot) => (
        <div>
          <div className="flex justify-center items-center w-full h-[138px] text-xl text-darkGray font-bold border-b-[1px] border-gray">
            <div className="flex justify-center items-center w-[12%]">
              <div className="text-center leading-[35px] w-10 h-10 text-white bg-purple border border-purple rounded-[50%]">
                {index + 1}
              </div>
            </div>
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={getStyle(provided.draggableProps.style, snapshot)}
              className="flex justify-center items-center w-[15%]"
            >
              <img className="w-24 h-24 rounded-md" src={url} alt="" />
            </div>
            <div className="w-[58%] text-center">
              <div>{title}</div>
              <div className="text-lg font-normal">
                {/* {tags.split(",").map((tag) => {
                  return <span className="ml-2">#{tag}</span>;
                })} */}
              </div>
            </div>
            <div className="flex justify-center w-[15%] font-normal">
              <button
                className={`${
                  select ? "1/2" : ""
                } w-3/4 py-[9px] text-lg text-purple border border-purple rounded-[10px] transition-all duration-[1s] ease-in-out`}
                onClick={() => {
                  if (!select) {
                    setSelect((prev) => !prev);
                    setBannerInfo(info);
                  } else {
                    setBannerInfo(info);
                  }
                }}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
