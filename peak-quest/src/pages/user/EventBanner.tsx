import "slick-carousel/slick/slick.css";
import "./react-slick-dot.css";
import Slider from "react-slick";
import BannerItem from "./BannerItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getMainBanner } from "../../service/firebase";

export default function EventBanner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    getMainBanner().then((res) => {
      const data = res;

      const newData: any = data.map((item) => ({
        id: item.id,
        img_url: item.url,
        title: item.title,
        tags: item.tag,
        link: item.link,
      }));

      console.log(newData);

      setBanner(newData);
    });
  }, []);
  function PrevArrow(props: any) {
    return (
      <div
        className="absolute left-[10px] top-1/2 
        z-10
        h-10 w-10 translate-y-[-50%]
        rounded-full bg-black bg-opacity-30
        text-center text-md
        font-bold"
        onClick={props.onClick}
      >
        <div className="flex translate-y-1 justify-center">
          <IoIosArrowBack className="relative left-[-2px] text-3xl text-[#D9D9D9]" />
        </div>
      </div>
    );
  }

  function NextArrow(props: any) {
    return (
      <div
        className="absolute right-[10px] top-1/2
        z-10
          h-10 w-10 translate-y-[-50%]
      rounded-full bg-black bg-opacity-30
        text-center text-md
        font-bold"
        onClick={props.onClick}
      >
        <div className="relative flex translate-y-1 justify-center">
          <IoIosArrowForward className="relative right-[-2px] text-3xl text-[#D9D9D9]" />
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
