import myCourse from "../../../assets/course/mycourse_icon.png";

export default function CourseBanner() {
  return (
    <div className="relative h-[333px] overflow-hidden">
      <div className="absolute left-8 top-7 z-[1] text-[32px] font-medium sm:text-[26px]">
        <p className="text-green">나만의 코스,</p>
        <p className="-mt-2 text-[#494949]">지금 만들어 볼까요?</p>
      </div>
      <div className="h-[550px] w-[550px] -translate-x-[100px] -translate-y-[270px] overflow-hidden rounded-full bg-[#e3fffd] sm:-translate-x-[200px] sm:-translate-y-[280px]">
        <img
          src={myCourse}
          className="absolute -bottom-5 right-12 w-[210px]"
          alt="my-course-icon"
        />
      </div>
    </div>
  );
}
