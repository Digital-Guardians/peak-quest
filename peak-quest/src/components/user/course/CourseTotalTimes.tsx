import React, { ChangeEvent } from "react";
import { TotalTimeProps } from "../../../pages/user/CourseEdit";

interface CourseTotalTimeProps {
  totalTimes: TotalTimeProps;
  handleTotalTimes: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseTotalTimes({
  totalTimes,
  handleTotalTimes,
}: CourseTotalTimeProps) {
  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">소요시간</h1>
      <div className="flex items-center justify-between space-x-2">
        <div className="relative w-full">
          <input
            type="number"
            name="hours"
            value={totalTimes.hours}
            className="w-full rounded-md border border-gray py-2 text-center"
            onChange={handleTotalTimes}
          />
          <span className="absolute right-4 top-2 text-darkGray">시간</span>
        </div>
        <div className="relative w-full">
          <input
            type="number"
            name="minutes"
            value={totalTimes.minutes}
            className="w-full rounded-md border border-gray py-2 text-center"
            onChange={handleTotalTimes}
          />
          <span className="absolute right-4 top-2 text-darkGray">분</span>
        </div>
      </div>
    </div>
  );
}
