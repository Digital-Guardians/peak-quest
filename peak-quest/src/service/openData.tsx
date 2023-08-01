import axios, { AxiosInstance } from "axios";
import {
  CourseNmProps,
  GetFvsnStsfnFrtrlInfoListProps,
  TransformedResult,
} from "../types/forestTypes";

const API_KEY = import.meta.env.VITE_OPEN_DATA_API_KEY_D;

class openDataApi {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  async getFvsnStsfnFrtrlInfoList() {
    try {
      const response = await this.axiosInstance.get(
        "http://apis.data.go.kr/B553662/fvsnStsfnFrtrlInfoService/getFvsnStsfnFrtrlInfoList",
        {
          params: {
            serviceKey: API_KEY,
            type: "json",
            pageNo: 1,
            numOfRows: 10000,
          },
        }
      );

      const data: GetFvsnStsfnFrtrlInfoListProps[] =
        response.data.response.body.items.item;
      const set = new Set<CourseNmProps>();

      data.forEach((item: GetFvsnStsfnFrtrlInfoListProps) => {
        if (item.orgnPlaceTpeNm === "등산로입구") {
          const place = {
            frtrlNm: item.frtrlNm,
            lat: item.lat,
            lot: item.lot,
          };
          set.add(place);
        }
      });

      const result = Array.from<CourseNmProps>(set);
      result.sort((a, b) => a.lat - b.lat);
      const transformedResult = result.reduce<TransformedResult[]>(
        (accumulator, currentValue) => {
          // 이미 리스트에 있는지 확인합니다.
          const existingIndex = accumulator.findIndex(
            (item) => item.frtrlNm === currentValue.frtrlNm
          );

          // 만약 리스트에 이미 있다면, 새로운 위치를 추가합니다.
          if (existingIndex > -1) {
            let foundElem = accumulator[existingIndex];
            return [
              ...accumulator.slice(0, existingIndex),
              {
                ...foundElem,
                position: [
                  ...foundElem.position,
                  { lat: currentValue.lat, lng: currentValue.lot },
                ],
              },
              ...accumulator.slice(existingIndex + 1),
            ];
          } else {
            // 아니면 새로운 항목을 추가합니다.
            return [
              ...accumulator,
              {
                frtrlNm: currentValue.frtrlNm,
                position: [{ lat: currentValue.lat, lng: currentValue.lot }],
              },
            ];
          }
        },
        []
      );
      transformedResult.sort((a, b) => a.frtrlNm.localeCompare(b.frtrlNm));
      return transformedResult;
    } catch (error) {
      console.log(error);
    }
  }

  // async getBkmtnWalrgCrseInfoList() {
  //   try {
  //     const response = await this.axiosInstance.get(
  //       "http://apis.data.go.kr/B553662/bkmtnWalrgCrseInfoService/getBkmtnWalrgCrseInfoList",
  //       {
  //         params: {
  //           serviceKey: API_KEY,
  //           type: "json",
  //           pageNo: 1,
  //           numOfRows: 10000,
  //         },
  //       }
  //     );
  //     const set = new Set();
  //     const data: getBkmtnWalrgCrseInfoListProps[] =
  //       response.data.response.body.items.item;
  //     data.map((item: getBkmtnWalrgCrseInfoListProps) => set.add(item.frtrlNm));

  //     const dataArr = Array.from(set);

  //     const result: {
  //       [key: string]: { [key: string]: { name: string | null } };
  //     } = {};

  //     for (let i = 0; i < dataArr.length; i++) {
  //       const item = dataArr[i];
  //       const matches = item.match(/^(.+?)\s(\d+코스)(?:\s)?\((.+?)\)$/);

  //       if (matches && matches.length === 4) {
  //         const region = matches[1];
  //         const course = matches[2];
  //         const name = matches[3];

  //         if (!result[region]) {
  //           result[region] = {};
  //         }

  //         result[region][course] = { name: name !== "_" ? name : null };
  //       }
  //     }

  //     console.log("bb", result);

  //     // const result = data.map((item: getBkmtnWalrgCrseInfoListProps) => ({
  //     //   frtrlNm: item.frtrlNm,
  //     //   lat: item.lat,
  //     //   lot: item.lot,
  //     // }));
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export const openDataAPI = new openDataApi();
