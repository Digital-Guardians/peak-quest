import "./page.css";
import OutletContainer from "../../components/admin/OutletContainer";
import PageLeft from "../../components/admin/PageLeft";
import PageRight from "../../components/admin/PageRight";
import { useEffect, useState } from "react";
import BannerItem from "./BannerItem";
import { useService } from "../../context/ContextProvider";
import { IoIosArrowBack } from "react-icons/io";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { bannerData } from "../../types/type";
import { imgUpload } from "../../service/imgUploader";
import {
  addBanner,
  addBannerImage,
  deleteBanner,
  getBannerItemList,
  getBannerList,
  itemDelete,
} from "../../service/firebase";
import { TiDeleteOutline } from "react-icons/ti";

interface banner {
  key: string;
  id: string;
  url: string;
}

const defaultBannerData: any = {
  id: "",
  url: "",
  link: "",
  tags: "",
  content: "",
  title: "",
  tag: "",
  date1: "",
  date2: "",
};

interface formData {
  title: string;
  content: string;
  url: string | ArrayBuffer | null;
  link: string;
  date1: string;
  date2: string;
  tag: string;
}

const defaultFormData: formData = {
  title: "",
  content: "",
  url: null, // SelectImg가 아닌 null로 수정
  link: "",
  date1: "",
  date2: "",
  tag: "",
};

export default function Banner() {
  const [select, setSelect] = useState(false);
  const [list, setList] = useState<banner[]>([]);
  const [banner, setBanner] = useState<banner[]>([]);
  const [selectImg, setSelectImg] = useState<File | any>(null);
  const [formData, setFormData] = useState<formData>(defaultFormData);
  const [data, setData] = useState<bannerData[]>([defaultBannerData]);

  const { bannerInfo, setBannerInfo, admin } = useService();
  const { id, url, link, title, content, tag, date1, date2 } = bannerInfo;

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    getBannerList() //
      .then((data) => {
        const banner = Object.keys(data).map((key) => data[key]);
        // console.log(banner);

        setList(banner);
      });
  }, []);

  useEffect(() => {
    getBannerItemList() //
      .then((data) => {
        // console.log(data);
        const dataArray = Object.keys(data).map((key) => data[key]);
        setBanner(dataArray);
      });
  }, [data]);

  function handleInput(event: any) {
    const target = event.target.dataset.id;
    switch (target) {
      case "title":
        setFormData((prev) => ({ ...prev, [target]: event.target.value }));
        break;
      case "content":
        setFormData((prev) => ({ ...prev, [target]: event.target.value }));
        break;
      case "tag":
        setFormData((prev) => ({ ...prev, [target]: event.target.value }));
        break;
      case "link":
        setFormData((prev) => ({ ...prev, [target]: event.target.value }));
        break;
      case "date1":
        setFormData((prev) => ({ ...prev, [target]: event.target.value }));
        break;
      case "date2":
        setFormData((prev) => ({ ...prev, [target]: event.target.value }));
        break;
    }
  }

  function handleSubmit(event: any) {
    const target = event.target;

    if (target.dataset.id === "button") {
      event.preventDefault();
      if (target.name === "save") {
        // console.log("이미지");
        imgUpload(selectImg)
          .then((url) => addBannerImage(formData, url))
          .then((res) => setData(res));
        // console.log("업로드 완료");
      } else if (target.name === "delete") {
        deleteBanner(id).then((res: any) => setData(res));
      }
    }
  }

  const handleImageChange = (event: any) => {
    const { files, name, value } = event.target;

    // console.log("change");

    if (name === "file") {
      setSelectImg(files && files[0]);
      return;
    } else {
      setSelectImg(null);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (
      source.droppableId === "bannerItems" &&
      destination.droppableId === "banner"
    ) {
      const selectItem = banner.at(source.index); // 없으면 und
      if (selectItem) {
        const add = list.find((item) => item.id === selectItem.id);
        if (!add) {
          const newList = [
            ...list,
            {
              key: selectItem.id.split("-")[1],
              id: selectItem.id,
              url: selectItem.url,
            },
          ];
          setList(newList);
        } else {
          alert("이미 등록된 아이탬입니다.");
        }
      }
    } else if (source.droppableId === "banner") {
      const selectItem = list.at(source.index); // 없으면 und
      const newList = Array.from(list);

      if (destination.droppableId === "banner" && selectItem !== undefined) {
        newList.splice(source.index, 1);
        newList.splice(destination.index, 0, selectItem);

        // console.log(newList);
        setList(newList);
      } else {
      }
    }
  };

  function handleAddBannerItem() {
    if (select) {
      setBannerInfo(defaultBannerData);
    }
    setBannerInfo(defaultBannerData);
    setSelect(true);
  }

  function deleteItem(url: string) {
    const newData = list.filter((item) => item.url !== url);
    setList(newData);
  }

  //저장할때는 시퀸스 번호만 넘긴다
  return (
    <>
      {admin && (
        <OutletContainer>
          <PageLeft select={select}>
            <div className="flex w-full"></div>
            {/* bannerContainer */}
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex h-4/5 w-full flex-col transition-all duration-[1s]">
                <div className="mb-9 h-1/3 w-full">
                  <div className="flex justify-between">
                    <div className="mb-[24px] ml-[5px] text-xl font-bold">
                      메인 배너를 최대 5개까지 선택해주세요.
                    </div>
                    <div
                      className={`cursor-pointer ${
                        select ? "w-12" : ""
                      } h-10 w-20 rounded-[10px] border border-purple py-[6px] text-center text-lg text-purple ease-in-out hover:bg-purple hover:text-white`}
                      onClick={() => {
                        addBanner(list);
                        alert("저장되었습니다.");
                      }}
                    >
                      저장
                    </div>
                  </div>
                  <Droppable droppableId="banner" direction="horizontal">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex h-[186px] w-full items-center justify-center rounded-[10px] border border-purple"
                      >
                        {list &&
                          list.map((item, i) => (
                            <Draggable
                              draggableId={item.key}
                              index={i}
                              key={item.key}
                            >
                              {(provided) => (
                                <div
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <div className="relative">
                                    <img
                                      className="ml-2 h-[86px] w-[86px] rounded-xl"
                                      src={item.url}
                                    />
                                    <TiDeleteOutline
                                      onClick={() => {
                                        deleteItem(item.url);
                                      }}
                                      className="absolute right-[-4px] top-[-4px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-[50%] bg-white"
                                    ></TiDeleteOutline>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div className="h-2/3 w-full">
                  <div className="flex text-xl font-bold text-darkGray">
                    <div className="w-[12%] border-b border-gray pb-[13px] text-center">
                      선택
                    </div>
                    <div className="w-[15%] border-b border-gray pb-[13px] text-center">
                      이미지
                    </div>
                    <div className="w-[58%] border-b border-gray pb-[13px] text-center">
                      제목/설명
                    </div>
                    <div className="w-[15%] border-b border-gray pb-[13px] text-center">
                      관리
                    </div>
                  </div>
                </div>
                <Droppable droppableId="bannerItems">
                  {(provided) => (
                    <div
                      className="flex flex-col text-xl font-bold text-darkGray"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {banner &&
                        banner.map((info, i) => {
                          return (
                            <BannerItem
                              key={Math.random()}
                              index={i}
                              info={info}
                              select={select}
                              setSelect={setSelect}
                            />
                          );
                        })}
                      {provided.placeholder}
                      <div
                        className="my-6 flex cursor-pointer items-center justify-center"
                        onClick={handleAddBannerItem}
                      >
                        <div className="flex h-12 w-32 items-center justify-center rounded-xl border-[1px] border-gray hover:bg-gray hover:text-white">
                          + 추가하기
                        </div>
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          </PageLeft>
          {/* 확인하기 648px */}
          <PageRight select={select}>
            <form
              data-id="form"
              className="flex min-w-[648px] flex-col"
              onClick={handleSubmit}
            >
              <div
                className="relative flex cursor-pointer text-2xl font-bold"
                onClick={() => {
                  setSelect((prev) => !prev);
                }}
              >
                <IoIosArrowBack className="mr-1 mt-[5px] text-[28px]" />
                <div className="">
                  {bannerInfo.id === "" ? "배너 추가하기" : "베너 관리하기"}
                </div>
              </div>
              <div>
                <div className="mb-1 mt-[42px] text-xl text-darkGray">
                  배너 제목
                </div>
                <input
                  data-id="title"
                  className={`h-[60px]  w-full ${
                    select ? "pl-2 text-lg" : ""
                  } mr-[6px] rounded-[10px] border border-[#D9D9D9] pl-4 half:mx-1`}
                  onChange={handleInput}
                  value={title ? title : formData.title}
                  placeholder="이벤트나 행사 내용을 잘 나타낼 수 있는 제목을 적어주세요."
                />
                <div className="mt-1 text-md text-darkGray">
                  최대 24자까지 배너 제목을 적어주세요.
                </div>
              </div>
              <div className="relative mt-[28px]">
                <div className="mb-1 text-xl text-darkGray">간단 설명</div>
                <textarea
                  className={`mr-[6px] h-[207px] w-full rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
                  data-id="content"
                  onChange={handleInput}
                  value={content ? content : formData.content}
                  placeholder="이벤트, 행사에 대한 간단한 설명, 해시태그 등을 적어주세요."
                />
                <div className="relative top-[-2px] text-md text-darkGray">
                  최대 60자까지 배너 제목을 적어주세요.
                </div>
              </div>
              <div className="relative mt-[28px]">
                <div className="mb-1 text-xl text-darkGray">베너 이미지</div>
                <input
                  type="file"
                  name="file"
                  data-id="img"
                  onChange={handleImageChange}
                  className={`mr-[6px] flex justify-center overflow-hidden pb-2 pl-4 pt-2 text-lg`}
                />
                <div className="mb-1 text-xl text-darkGray">미리보기</div>
                <div
                  className={`mr-[6px] flex justify-center overflow-hidden rounded-[10px] border border-[#D9D9D9] pb-2 pl-4 pt-2 text-lg`}
                >
                  <img
                    className="max-h-[200px]"
                    src={url ? url : selectImg}
                    alt="미리보기"
                  />
                </div>
              </div>
              <div className="relative mt-[28px]">
                <div className="mb-1 text-xl text-darkGray">태그</div>
                <input
                  data-id="tag"
                  value={tag ? tag : formData.tag}
                  onChange={handleInput}
                  className={`mr-[6px] h-[60px] w-full rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
                />
                <div className="mt-1 text-md text-darkGray">
                  글자 사이에 ,를 넣어서 작성해주세요 ex ) 서울,동대문
                </div>
              </div>
              <div className="relative mt-[28px]">
                <div className="mb-1 text-xl text-darkGray">링크</div>
                <input
                  data-id="link"
                  value={link ? link : formData.link}
                  onChange={handleInput}
                  className={`mr-[6px] h-[60px] w-full rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
                />
              </div>
              <div className="relative mt-[28px]">
                <div className="mb-1 text-xl text-darkGray">진행 기간</div>
                <div className="flex">
                  <input
                    type="date"
                    data-id="date1"
                    value={date1 ? date1 : formData.date1}
                    onChange={handleInput}
                    className={`mr-[6px] h-[60px] w-1/2 rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
                  />
                  <input
                    type="date"
                    data-id="date2"
                    value={date2 ? date2 : formData.date2}
                    onChange={handleInput}
                    className={`mr-[6px] h-[60px] w-1/2 rounded-[10px] border border-[#D9D9D9] pl-4 pt-2 text-lg`}
                  />
                </div>
              </div>
              <div className="relative mb-[120px] mt-[48px]">
                <div className="flex font-bold">
                  <button
                    data-id="button"
                    name="delete"
                    className={`${
                      bannerInfo.id === "" ? "hidden" : ""
                    } mr-2 h-[60px] w-1/2 rounded-[10px] border border-purple bg-white text-lg text-purple`}
                  >
                    삭제하기
                  </button>
                  <button
                    data-id="button"
                    name="save"
                    className={`${
                      bannerInfo.id === "" ? "w-full" : "w-1/2"
                    } h-[60px] rounded-[10px] border border-purple bg-purple text-lg text-white`}
                  >
                    저장하기
                  </button>
                </div>
              </div>
            </form>
          </PageRight>
        </OutletContainer>
      )}
    </>
  );
}
