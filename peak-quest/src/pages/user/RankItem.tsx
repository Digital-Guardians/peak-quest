import { IoEyeSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

interface RankItemProps {
  ranking: number;
  rank: rankType;
}

interface rankType {
  img_url: string;
  title: string;
  view: number;
  likes: number;
  nickname: string;
  tags: {
    toilet: boolean;
    restaurant: boolean;
    service: boolean;
  };
}

export default function RankItem({ ranking, rank }: RankItemProps) {
  const {
    img_url,
    title,
    view,
    likes,
    nickname,
    tags: { toilet, restaurant, service },
  } = rank;

  return (
    <div
      className={`w-[172px] h-[224px] pt-10
      rounded-lg ml-[12px] bg-${ranking === 0 ? "lightPurple" : "white"} 
      border-[2px] border-solid border-lightGray 
      flex flex-col justify-center
      text-center font-sans`}
    >
      <div className="relative">
        <img
          className="w-[21px] h-[28px] absolute top-[-4px] left-[50px]"
          src={`./images/rank/rank${ranking + 1}.png`}
          alt=""
        />
        <img className="w-[78px] h-[78px] m-auto" src={img_url} alt="" />
      </div>
      <div className="text-lg font-bold mt-2">{title}</div>
      <div className="text-md">{nickname}</div>
      <div className="flex justify-center mt-1/2 text-xs text-darkGray">
        <IoEyeSharp className="relative top-[50%] translate-y-[-50%] mr-[2px]" />
        <div className="mr-3">{view}</div>
        <AiFillLike className="relative top-[50%] translate-y-[-50%] mr-[2px]" />
        <div>{likes}</div>
      </div>
      <div className="w-[145px] h-full flex justify-center mx-auto mt-1 text-[8px]  text-green">
        {toilet && (
          <div className="h-[16px] mr-1 px-2 py-1/2 bg-lightGreen rounded-[4px] leading-4">
            화장실
          </div>
        )}
        {restaurant && (
          <div className="h-[16px] mr-1 px-2 py-1/2 bg-lightGreen rounded-[4px] leading-4">
            음식점
          </div>
        )}
        {service && (
          <div className="h-[16px] px-2 py-1/2 bg-lightGreen rounded-[4px] leading-4">편의시설</div>
        )}
      </div>
    </div>
  );
}
