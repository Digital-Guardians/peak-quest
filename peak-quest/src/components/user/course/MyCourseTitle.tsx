import { ChangeEvent } from "react";

interface MyCourseTitleProps {
  handleMyCourseTitle: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function MyCourseTitle({
  handleMyCourseTitle,
}: MyCourseTitleProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-xl font-medium text-black">
          나만의 코스 제목
        </h1>
        <p className="bg-lightGreen p-1 text-md leading-3 text-green">
          20글자 입력 가능
        </p>
      </div>
      <input
        className="w-full rounded-lg border border-gray pb-3 pt-2 indent-4 placeholder:leading-3  md:placeholder:text-md"
        type="text"
        onChange={handleMyCourseTitle}
        placeholder="코스를 잘 표현할 수 있는 제목을 적어주세요."
        maxLength={20}
      />
    </div>
  );
}
