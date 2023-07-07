import { ChangeEvent, RefObject } from "react";
import { HiPlusSm } from "react-icons/hi";

interface UploadThumbnailProps {
  previewImgUrl: string | null;
  thumbnailRef: RefObject<HTMLImageElement>;
  handlePreviewImg: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadThumbnail({
  previewImgUrl,
  thumbnailRef,
  handlePreviewImg,
}: UploadThumbnailProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-xl font-medium text-black">
          코스 썸네일 이미지
        </h1>
        <p className="bg-lightGreen p-1 text-md leading-3 text-green">
          이미지 추가
        </p>
      </div>
      <div className="w-full">
        <label htmlFor="thumbnail">
          <div className="flex cursor-pointer items-center justify-center rounded-lg border border-gray">
            {previewImgUrl ? (
              <div className="flex h-[240px] items-center justify-center overflow-hidden md:h-[180px]">
                <img
                  className="w-full"
                  src={previewImgUrl || ""}
                  alt="코스_썸네일"
                  ref={thumbnailRef}
                />
              </div>
            ) : (
              <div className="my-[90px] flex h-12 w-12 items-center justify-center rounded-full border border-gray md:my-[60px]">
                <HiPlusSm className="h-7 w-7 text-[#636363]" />
              </div>
            )}
          </div>
        </label>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePreviewImg}
        />
      </div>
    </div>
  );
}
