import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RankItem from "./RankItem";

export default function RankSection() {
  const [rank, setRank] = useState([]);

  function PrevArrow(props: any) {
    return (
      <div
        className="absolute left-[-10px] top-1/2 
    z-10 h-4 w-4
  rounded-full bg-gray
    text-center text-md
    font-bold"
        onClick={props.onClick}
      >
        <div className="leading-[14px]">
          <span className="text-white">{"<"}</span>
        </div>
      </div>
    );
  }

  function NextArrow(props: any) {
    return (
      <div
        className="absolute right-[-10px] top-1/2
        z-10 h-4 w-4
      rounded-full bg-gray
        text-center text-md
        font-bold"
        onClick={props.onClick}
      >
        <div className="leading-[14px]">
          <span className="text-white">{">"}</span>
        </div>
      </div>
    );
  }

  const settings = {
    infinite: true,
    autoplaySpeed: 1500,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableHeight: true,
    touchThreshold: 20,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    fetch("./mock/rank.json")
      .then((res) => res.json())
      .then((data) => {
        let rankData = data.course_ranking.map(
          (e: { likes: number; view: number }) => {
            let score = e.likes * 10 + e.view;
            return { ...e, score };
          }
        );
        let sort = rankData.sort(
          (a: { score: number }, b: { score: number }) => b.score - a.score
        );
        setRank(sort);
      });
  }, []);

  return (
    <section className="w-[430px] p-5">
      <h1 className="mb-3 text-2xl font-bold">
        이번 달에 사랑받은 코스들이에요
      </h1>
      <Slider className="mt-1" {...settings}>
        {rank &&
          rank.map((e, i) => {
            return <RankItem key={i} rank={e} ranking={i} />;
          })}
      </Slider>
    </section>
  );
}
