import { ChangeEvent } from "react";

interface CourseTotalDistanceProps {
  totalDistances: string;
  handleTotalDistances: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseTotalDistance({
  totalDistances,
  handleTotalDistances,
}: CourseTotalDistanceProps) {
  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">총 거리</h1>
      <div className="relative w-full">
        <input
          type="number"
          name="hours"
          value={totalDistances + ""}
          className="w-full rounded-md border border-gray py-2 text-center"
          onChange={handleTotalDistances}
        />
        <span className="absolute right-4 top-2 text-darkGray">km</span>
      </div>
    </div>
  );
}
