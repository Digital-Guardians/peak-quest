import { bannerData } from "../../types/type";
import React from "react";

interface propBanner {
  banner: bannerData;
}

export default function BannerItem({ banner }: propBanner) {
  const { img_url, link, title, tags } = banner;

  return (
    <div className="relative cursor-pointer overflow-hidden" onClick={() => window.open(`${link}`)}>
      <div className="absolute left-6 top-7 z-20 text-white">
        {/* <div className="text-xl font-bold">{title}</div> */}
        <div className="mt-1 text-lg">
          {/* {tags?.split(",").map((tag) => {
            return <span>#{tag} </span>;
          })} */}
        </div>
      </div>
      {/* <div className="absolute w-[400px] h-[175px] bg-gradient-to-b from-black to-transparent opacity-60" /> */}
      <img className="h-[370px] w-[400px] rounded-lg" src={img_url} alt={title} />
    </div>
  );
}
