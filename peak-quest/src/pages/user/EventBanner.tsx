import "slick-carousel/slick/slick.css";
import "./react-slick-dot.css";
import Slider from "react-slick";
import BannerItem from "./BannerItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

export default function EventBanner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch("./mock/banner.json")
      .then((res) => res.json())
      .then((data) => {
        setBanner(data.banner);
      });
  }, []);

  function PrevArrow(props: any) {
    return (
      <div
        className="absolute top-1/2 left-[10px] 
        translate-y-[-50%]
        w-10 h-10 rounded-full
        bg-black bg-opacity-30 text-center
        text-md font-bold
        z-10"
        onClick={props.onClick}
      >
        <div className="flex justify-center translate-y-1">
          <IoIosArrowBack className="relative text-[#D9D9D9] text-3xl left-[-2px]" />
        </div>
      </div>
    );
  }

  function NextArrow(props: any) {
    return (
      <div
        className="absolute top-1/2 right-[10px]
        translate-y-[-50%]
          w-10 h-10 rounded-full
      bg-black bg-opacity-30 text-center
        text-md font-bold
        z-10"
        onClick={props.onClick}
      >
        <div className="relative flex justify-center translate-y-1">
          <IoIosArrowForward className="relative text-[#D9D9D9] text-3xl right-[-2px]" />
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 2000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableHeight: true,
    touchThreshold: 20,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="p-4">
      {banner && (
        <Slider {...settings}>
          {banner.map((banner, i) => {
            return <BannerItem key={banner} banner={banner} />;
          })}
        </Slider>
      )}
    </div>
  );
}
