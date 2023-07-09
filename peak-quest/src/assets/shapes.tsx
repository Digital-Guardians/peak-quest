// 도형 컴포넌트의 Props 타입 정의
export interface ShapeProps {
  // 도형의 고유한 식별자
  id: number;
}

export const ShapeOne = ({ id }: ShapeProps) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6.5" cy="6.5" r="6.5" fill="#FF9F9F" />
  </svg>
);

export const ShapeTwo = ({ id }: ShapeProps) => (
  <svg
    width="15"
    height="21"
    viewBox="0 0 15 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="2.8418"
      width="6.34347"
      height="20.7007"
      rx="2"
      transform="rotate(-26.6095 0 2.8418)"
      fill="#FAE85F"
    />
  </svg>
);

export const ShapeThree = ({ id }: ShapeProps) => (
  <svg
    width="7"
    height="7"
    viewBox="0 0 7 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3.5" cy="3.5" r="3.5" fill="#C9C8FF" />
  </svg>
);

export const ShapeFour = ({ id }: ShapeProps) => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="7.67188"
      width="9.20926"
      height="15.7611"
      rx="2"
      transform="rotate(29.1312 7.67188 0)"
      fill="#13CBBF"
    />
  </svg>
);

export const ShapeFive = ({ id }: ShapeProps) => (
  <svg
    width="7"
    height="7"
    viewBox="0 0 7 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3.5" cy="3.5" r="3.5" fill="#CECECE" />
  </svg>
);

export const ShapeSix = ({ id }: ShapeProps) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6.5" cy="6.5" r="6.5" fill="#9FDDFF" />
  </svg>
);

export const ShapeSeven = ({ id }: ShapeProps) => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="2.98633"
      width="6.72962"
      height="10.3067"
      rx="2"
      transform="rotate(-26.3473 0 2.98633)"
      fill="#6B4BFB"
    />
  </svg>
);
