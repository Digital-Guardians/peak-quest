export interface courseCategoryOption {
  id: string;
  label: string;
  description: string;
}

export const courseCategoryOptions = [
  {
    id: "one",
    label: "혼자서도 갈 수 있는",
    description: "같이 갈 사람 없어도 걱정 마세요.",
  },
  {
    id: "two",
    label: "반려동물과 함께 갈 수 있는",
    description: "산책겸 운동까지 일석이조!",
  },
  {
    id: "three",
    label: "당일치기 가능한",
    description: "마음은 가볍게, 짐도 가볍게!",
  },
  {
    id: "four",
    label: "자전거 타고 갈 수 있는",
    description: "튼튼한 하체, 준비되셨나요?",
  },
  {
    id: "five",
    label: "편의시설이 있는",
    description: "트래킹 중 화장실 또는 음식점 이용이 가능해요.",
  },
];
