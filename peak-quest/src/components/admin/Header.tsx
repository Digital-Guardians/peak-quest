import { BsShare } from "react-icons/bs";
import { MdOutlineIosShare } from "react-icons/md";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full h-[60px] bg-purple">
      <div className="ml-5 bg-white">로고입니다</div>
      <div className="flex text-base leading-6 font-light mr-5">
        <button className="border px-4 py-[5px] mr-3 text-white border-white rounded-lg">
          위젯 수정
        </button>
        <button className="flex items-center border px-5 py-[5px] mr-3 text-black border-white rounded-lg bg-white">
          <BsShare className="text-[14px] mr-2" />
          공유
        </button>
        <button className="flex items-center border px-5 py-[5px] mr-3 text-black border-white rounded-lg bg-white">
          <MdOutlineIosShare className="text-[14px] mr-2" />
          내보내기
        </button>
        <button className="flex items-center border px-5 py-[5px] text-black border-white rounded-lg bg-white">
          <div className="text-[12px] mr-2">✕</div>
          나가기
        </button>
      </div>
    </header>
  );
}
