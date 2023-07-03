import "./page.css";
import OutletContainer from "../../components/admin/OutletContainer";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import { useEffect, useState } from "react";
import BannerItem from "./BannerItem";
import { useService } from "../../context/ContextProvider";
import { IoIosArrowBack } from "react-icons/io";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { bannerData } from "../../types/type";
import { TiMediaStopOutline } from "react-icons/ti";

interface banner {
  key: string;
  id: string;
  img_url: string;
}

export default function Banner() {
  const [select, setSelect] = useState(false);
  const [banner, setBanner] = useState<bannerData[]>([]);
  const [list, setList] = useState<banner[]>([]);

  const { bannerInfo } = useService();

  const { img_url, link, tags, title, content } = bannerInfo;

  useEffect(() => {
    1;
    fetch("/mock/admin/banner.json")
      .then((res) => res.json())
      .then((data) => {
        setBanner(data.bannerItems);
      });
  }, []);

  useEffect(() => {
    1;
    fetch("/mock/admin/bannerList.json")
      .then((res) => res.json())
      .then((data) => {
        setList(data.banner);
      });
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId && source.index === destination.index)
    )
      return;

    if (source.droppableId === "bannerItems" && destination.droppableId === "banner") {
      const selectItem = banner.at(source.index); // 없으면 und

      if (selectItem) {
        const add = list.find((item) => item.id === selectItem.id);

        if (!add) {
          const newList = [
            ...list,
            {
              key: selectItem.id.split("-")[1],
              id: selectItem.id,
              img_url: selectItem.img_url,
            },
          ];

          setList(newList);
        }
      }
    } else if (source.droppableId === "banner") {
      const selectItem = list.at(source.index); // 없으면 und
      const newList = Array.from(list);

      if (destination.droppableId === "banner" && selectItem !== undefined) {
        newList.splice(source.index, 1);
        newList.splice(destination.index, 0, selectItem);

        console.log(newList);
        setList(newList);
      } else {
      }
    }
  };

  //저장할때는 시퀸스 번호만 넘긴다
  return (
    <>
      <OutletContainer>
        ß
        <PageLeft select={select}>
          <div className="flex w-full">
            {/* inputContainer */}
            <div className="flex w-full h-1/5 pb-9">
              <input
                className={`w-1/5  h-[60px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                placeholder="시작일"
              />
              <input
                className={`w-1/5  h-[60px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mx-[6px] pl-4 rounded-[10px] half:mx-1`}
                placeholder="종료일"
              />
              <input
                className={`w-3/5  h-[60px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mx-[6px] pl-4 rounded-[10px] half:mx-1`}
                placeholder="검색창"
              />
            </div>
          </div>
          {/* bannerContainer */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col w-full h-4/5">
              <div className="w-full h-1/3 mb-9">
                <div className="text-xl font-bold mb-[13px] ml-[5px]">
                  메인 배너를 최대 5개까지 선택해주세요.
                </div>
                <Droppable droppableId="banner" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex justify-center items-center w-full h-[186px] border border-purple rounded-[10px]"
                    >
                      {list &&
                        list.map((item, i) => (
                          <Draggable draggableId={item.key} index={i} key={item.key}>
                            {(provided) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <img
                                  className="w-[86px] h-[86px] ml-2 rounded-xl"
                                  src={item.img_url}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="w-full h-2/3">
                <div className="flex text-xl text-darkGray font-bold">
                  <div className="w-[12%] text-center pb-[13px] border-b border-gray">선택</div>
                  <div className="w-[15%] text-center pb-[13px] border-b border-gray">이미지</div>
                  <div className="w-[58%] text-center pb-[13px] border-b border-gray">
                    제목/설명
                  </div>
                  <div className="w-[15%] text-center pb-[13px] border-b border-gray">관리</div>
                </div>
              </div>
              <Droppable droppableId="bannerItems">
                {(provided) => (
                  <div
                    className="flex flex-col text-xl text-darkGray font-bold"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {banner &&
                      banner.map((info, i) => {
                        return (
                          // <Draggable draggableId={info.id} index={i}>
                          //   {(provided: any, snapshot: any) => (
                          //     <div
                          //       {...provided.dragHandleProps}
                          //       {...provided.draggableProps}
                          //       ref={provided.innerRef}
                          //       className={`${snapshot.isDragging ? "w-[80px]" : "w-full"}`}
                          //     >
                          <BannerItem
                            key={Math.random()}
                            index={i}
                            info={info}
                            select={select}
                            setSelect={setSelect}
                          />
                          //     </div>
                          //   )}
                          // </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </PageLeft>
        {/* <PageRight select={select}>
          <div className="flex flex-col min-w-[648px]">
            <div
              className="relative flex text-2xl font-bold cursor-pointer"
              onClick={() => {
                setSelect((prev) => !prev);
              }}
            >
              <IoIosArrowBack className="mt-[5px] mr-1 text-[28px]" />
              <div className="">베너 추가하기</div>
            </div>
            <div>
              <div className="mt-[42px] mb-1 text-xl text-darkGray">배너 제목</div>
              <input
                className={`w-full  h-[60px] ${
                  select ? "pl-2 text-lg" : ""
                } border border-[#D9D9D9] mr-[6px] pl-4 rounded-[10px] half:mx-1`}
                value={title ? title : ""}
                placeholder="이벤트나 행사 내용을 잘 나타낼 수 있는 제목을 적어주세요."
              />
              <div className="mt-1 text-md text-darkGray">
                최대 24자까지 배너 제목을 적어주세요.
              </div>
            </div>
            <div className="relative mt-[28px]">
              <div className="mb-1 text-xl text-darkGray">간단 설명</div>
              <textarea
                className={`w-full h-[207px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
                value={content}
                placeholder="이벤트, 행사에 대한 간단한 설명, 해시태그 등을 적어주세요."
              />
              <div className="relative top-[-2px] text-md text-darkGray">
                최대 60자까지 배너 제목을 적어주세요.
              </div>
            </div>
            <div className="relative mt-[28px]">
              <div className="mb-1 text-xl text-darkGray">베너 이미지</div>
              <div
                className={`flex justify-center overflow-hidden pl-4 pt-2 pb-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
              >
                <img className="max-h-[200px]" src={img_url} alt="" />
              </div>
            </div>
            <div className="relative mt-[28px]">
              <div className="mb-1 text-xl text-darkGray">링크</div>
              <input
                value={link}
                className={`w-full h-[60px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
              />
            </div>
            <div className="relative mt-[28px]">
              <div className="mb-1 text-xl text-darkGray">진행 기간</div>
              <div className="flex">
                <input
                  className={`w-1/2 h-[60px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
                />
                <input
                  className={`w-1/2 h-[60px] pl-4 pt-2 text-lg border border-[#D9D9D9] mr-[6px] rounded-[10px]`}
                />
              </div>
            </div>
            <div className="relative mt-[48px] mb-[120px]">
              <div className="flex font-bold">
                <button
                  className={`w-1/2 h-[60px] mr-2 text-lg text-purple bg-white border border-purple rounded-[10px]`}
                >
                  삭제하기
                </button>
                <button
                  className={`w-1/2 h-[60px]text-lg text-white bg-purple border border-purple rounded-[10px]`}
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </PageRight> */}
      </OutletContainer>
    </>
  );
}
