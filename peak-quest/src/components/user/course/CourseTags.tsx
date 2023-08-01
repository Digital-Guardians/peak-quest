import React, { useState, ChangeEvent } from "react";

interface CourseTagsProps {
  tags: string[];
  handleTagsChange: (tags: string[]) => void;
}

export default function CourseTags({
  tags,
  handleTagsChange,
}: CourseTagsProps) {
  const [tagInputValue, setTagInputValue] = useState<string>("");

  const handleTagInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 10);
    setTagInputValue(value);
  };

  const handleAddTags = () => {
    if (tagInputValue.trim() !== "") {
      const newTag = tagInputValue.trim();
      if (!tags.includes(newTag)) {
        const newTags = [newTag, ...tags];
        setTagInputValue("");
        handleTagsChange(newTags);
      }
    }
  };

  const handleRemoveTags = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    handleTagsChange(newTags);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tags.length < 5) {
      handleAddTags();
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-xl font-medium text-black">
          나만의 코스 태그 설정
        </h1>
        <div className="flex space-x-1">
          <p className="bg-lightGreen p-1 text-md leading-3 text-green sm:hidden">
            최대 5개까지
          </p>
          <p className="bg-lightGreen p-1 text-md leading-3 text-green sm:hidden">
            10글자 입력 가능
          </p>
        </div>
      </div>

      <div className="flex flex-wrap">
        {/* 입력 */}
        <div className="mb-2 w-full">
          <input
            type="text"
            value={tagInputValue}
            onChange={handleTagInputValue}
            onKeyUp={handleKeyUp}
            placeholder="나만의 코스가 가진 특징을 태그로 추가해주세요!"
            className="w-full rounded-lg border border-gray py-2 text-center text-md"
          />
        </div>
        {/* 태그 */}
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="relative mb-1 mr-1 whitespace-nowrap rounded-[80px] border border-gray px-4 py-2 text-md text-mint"
            >
              {tag}
              <button
                className="absolute right-2 top-[2px] text-sm text-darkGray"
                onClick={() => handleRemoveTags(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
