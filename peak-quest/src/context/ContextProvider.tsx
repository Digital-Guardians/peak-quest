import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface bannerData {
  img_url: string;
  link: string;
  tags: string;
  content: string;
  title: string;
}

interface reportData {
  id: number;
  user_name: string;
  state: string;
  report_type: string;
  report_date: string;
  content: string;
  url: string;
  delete: string;
}

const defaultBannerData: bannerData = {
  img_url: "",
  link: "",
  tags: "",
  content: "",
  title: "",
};

const defaultReportData: reportData = {
  id: 0,
  user_name: "",
  state: "",
  report_type: "",
  report_date: "",
  content: "",
  url: "",
  delete: "",
};

interface State {
  bannerInfo: bannerData;
  setBannerInfo: Dispatch<SetStateAction<bannerData>>;
  reportInfo: reportData;
  setReportInfo: Dispatch<SetStateAction<reportData>>;
}

const ApiContext = createContext<State | null>(null);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [bannerInfo, setBannerInfo] = useState<bannerData>(defaultBannerData);
  const [reportInfo, setReportInfo] = useState<reportData>(defaultReportData);

  return (
    <ApiContext.Provider value={{ bannerInfo, setBannerInfo, reportInfo, setReportInfo }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useService() {
  const service = useContext(ApiContext);
  if (!service) {
    throw new Error("useService must be used within an ApiContextProvider");
  }
  return service;
}
