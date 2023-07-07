import { ChangeEvent } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { courseCategoryOptions } from "./CourseCategoryTypes";

interface CourseCategoryProps {
  checkedItems: string[];
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseCategory({
  checkedItems,
  handleCheckboxChange,
}: CourseCategoryProps) {
  const isChecked = (id: string) => checkedItems.includes(id);
  return (
    <div>
      <h1 className="mb-2 text-xl font-medium text-black">코스 분류</h1>
      <div className="rounded-md border border-gray">
        {courseCategoryOptions.map((option) => (
          <label htmlFor={option.id} className="block p-2" key={option.id}>
            <input
              type="checkbox"
              id={option.id}
              className="hidden"
              onChange={handleCheckboxChange}
            />
            <div className="flex items-center space-x-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  isChecked(option.id) ? "bg-mint" : "border border-gray"
                }`}
              >
                <AiOutlineCheck
                  className={`${
                    isChecked(option.id) ? "text-white" : "hidden"
                  }`}
                />
              </div>
              <div className="text-[14px] md:text-lg">{option.label}</div>
              <div className="text-md text-darkGray md:hidden">
                {option.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
