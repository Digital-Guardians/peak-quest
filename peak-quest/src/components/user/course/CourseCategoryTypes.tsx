export interface courseCategoryOption {
  id: string;
  label: string;
  description: string;
}

// **이슈**
// 데이터 보내줄 때 id 변경할 것
export const courseCategoryOptions = [
  {
    id: "혼자서도 갈 수 있는",
    label: "혼자서도 갈 수 있는",
    description: "같이 갈 사람 없어도 걱정 마세요.",
  },
  {
    id: "반려동물과 함께 갈 수 있는",
    label: "반려동물과 함께 갈 수 있는",
    description: "산책겸 운동까지 일석이조!",
  },
  {
    id: "당일치기 가능한",
    label: "당일치기 가능한",
    description: "마음은 가볍게, 짐도 가볍게!",
  },
  {
    id: "자전거 타고 갈 수 있는",
    label: "자전거 타고 갈 수 있는",
    description: "튼튼한 하체, 준비되셨나요?",
  },
  {
    id: "편의시설이 있는",
    label: "편의시설이 있는",
    description: "트래킹 중 화장실 또는 음식점 이용이 가능해요.",
  },
];
