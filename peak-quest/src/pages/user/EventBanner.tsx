import "slick-carousel/slick/slick.css";
import "./react-slick-dot.css";
import Slider from "react-slick";
import BannerItem from "./BannerItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getMainBanner } from "../../service/firebase";
import { banner } from "../../types/type";

export default function EventBanner() {
  const [banner, setBanner] = useState<banner[]>([]);
  const [test, setTest] = useState<banner[]>([]);

  useEffect(() => {
    getMainBanner().then((res) => {
      const data = res;

      const newData = data.map((item) => ({
        id: item.id,
        img_url: item.url,
        title: item.title,
        tags: item.tag,
        link: item.link,
      }));
      console.log(newData);

      setTest(newData);
    });

    fetch("./mock/banner.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setBanner(data.banner);
      });
  }, []);

  console.log(banner);

  function PrevArrow(props: any) {
    return (
      <div
        className="absolute top-1/2 left-[10px] 
        translate-y-[-50%]Ô
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

  console.log(test);

  return (
    <div className="p-4">
      {test && (
        <Slider {...settings}>
          {test.map((banner, i) => {
            return <BannerItem key={banner} banner={banner} />;
          })}
        </Slider>
      )}
    </div>
  );
}
