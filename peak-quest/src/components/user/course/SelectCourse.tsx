import { MdArrowDropDown } from "react-icons/md";
import { Option } from "../../../pages/user/CourseEdit";

interface SelectCourseProps {
  options: Option[];
  selectedOption: Option | null;
  handleSelectOption: (option: Option) => void;
  isOptionsVisible: boolean;
  toggleOptions: () => void;
}

export default function SelectCourse({
  options,
  selectedOption,
  handleSelectOption,
  isOptionsVisible,
  toggleOptions,
}: SelectCourseProps) {
  return (
    <div className="relative w-full">
      <h1 className="mb-2 text-xl font-medium text-black">지역 선택</h1>
      <div
        className={`mb-3 flex cursor-pointer items-center justify-between rounded-md border border-gray bg-white px-4 py-2`}
        onClick={toggleOptions}
      >
        <div>
          {selectedOption ? selectedOption.label : "지역을 선택해 주세요."}
        </div>
        <div>
          <MdArrowDropDown
            className={`h-7 w-7  ${isOptionsVisible ? "rotate-180" : ""} `}
          />
        </div>
      </div>
      <div
        className={`rounded-md border border-gray bg-white ${
          isOptionsVisible ? "" : "hidden"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSelectOption(option)}
            className="cursor-pointer border-b border-gray py-3 text-center last:border-b-0 hover:text-green"
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
