import axios, { AxiosInstance } from "axios";
import {
  GetFvsnStsfnFrtrlInfoListProps,
  getBkmtnWalrgCrseInfoListProps,
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
      // const data = response.data.response.body.items.item;

      // const result = data.map((item: GetFvsnStsfnFrtrlInfoListProps) => ({
      //   frtrlNm: item.frtrlNm,
      //   lat: item.lat,
      //   lot: item.lot,
      // }));

      // return result;
      const data = response.data.response.body.items.item;
      const set = new Set();

      data.forEach((item: GetFvsnStsfnFrtrlInfoListProps) => {
        if (item.orgnPlaceTpeNm === "등산로입구") {
          const asd = {
            frtrlNm: item.frtrlNm,
            lat: item.lat,
            lot: item.lot,
            orgnPlaceTpeNm: item.orgnPlaceTpeNm,
          };
          set.add(asd);
        }
      });

      const result = Array.from(set);
      console.log("result", result);

      return result;
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
