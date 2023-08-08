// ** export **
// 난이도 버튼
export interface LevelButtonProps {
  label: string;
  value: number;
  onClick: (value: number) => void;
  activeValue: number;
  style: string;
}

// ** export **
export function LevelButton({
  label,
  value,
  onClick,
  activeValue,
  style,
}: LevelButtonProps) {
  const isActive = value === activeValue;
  const buttonStyle = `h-[33px] px-[10px] mr-2 mt-2 text-md font-bold border-[1px] rounded-full sm:h-[30px] sm:text-[10px] sm:px-4 ${
    // 참고용
    // isActive ? "bg-mint border-mint" : "bg-black/60 border-white"
    isActive ? "bg-mint border-mint text-white" : style
  }`;
  return (
    <button className={buttonStyle} onClick={() => onClick(value)}>
      {label}
    </button>
  );
}
