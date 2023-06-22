import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface bannerData {
  img_url: string;
  link: string;
  tags: string;
  content: string;
  title: string;
}

const defaultBannerData: bannerData = {
  img_url: "",
  link: "",
  tags: "",
  content: "",
  title: "",
};

interface State {
  bannerInfo: bannerData;
  setBannerInfo: Dispatch<SetStateAction<bannerData>>;
}

const ApiContext = createContext<State | null>(null);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [bannerInfo, setBannerInfo] = useState<bannerData>(defaultBannerData);

  return (
    <ApiContext.Provider value={{ bannerInfo, setBannerInfo }}>{children}</ApiContext.Provider>
  );
}

export function useService() {
  const service = useContext(ApiContext);
  if (!service) {
    throw new Error("useService must be used within an ApiContextProvider");
  }
  return service;
}
