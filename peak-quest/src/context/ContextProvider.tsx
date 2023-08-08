import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { bannerData, reportData, userData } from "../types/type";
import { useLocation } from "react-router-dom";

const defaultBannerData: any = {
  id: "",
  img_url: "",
  link: "",
  tags: "",
  content: "",
  title: "",
};

const defaultReportData: any = {
  id: 0,
  user_name: "",
  state: "",
  report_type: "",
  report_date: "",
  content: "",
  url: "",
  delete: "",
};

const defaultUserData: any = {
  user_name: "",
  role: "",
  email: "",
  state: "",
  ban: {
    ban_type: null,
    ban_content: null,
    ban_start_date: null,
    ban_end_date: null,
  },
  delete: {
    delete_state: "",
    delete_content: "",
    deleted_at: null,
  },
};

interface State {
  bannerInfo: bannerData;
  setBannerInfo: Dispatch<SetStateAction<bannerData>>;
  reportInfo: reportData;
  setReportInfo: Dispatch<SetStateAction<reportData>>;
  userInfo: userData;
  setUserInfo: Dispatch<SetStateAction<userData>>;
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  outerWidth: number;
  setOuterWidth: Dispatch<SetStateAction<number>>;
  select: string;
  setSelect: Dispatch<SetStateAction<string>>;
  user: any;
  setUser: any;
  admin: any;
  setAdmin: any;
  test: any;
  setTest: any;
}

const ApiContext = createContext<State | null>(null);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [bannerInfo, setBannerInfo] = useState<bannerData>(defaultBannerData);
  const [reportInfo, setReportInfo] = useState<reportData>(defaultReportData);
  const [userInfo, setUserInfo] = useState<userData>(defaultUserData);
  const [toggle, setToggle] = useState(true);
  const [outerWidth, setOuterWidth] = useState(window.outerWidth);

  const [select, setSelect] = useState("");
  const [admin, setAdmin] = useState();
  const [test, setTest] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname.split("/");
    setSelect(pathName[2]);
    const handleResize = () => {
      setOuterWidth(window.outerWidth);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (outerWidth <= 960) {
      setToggle(false);
    } else if (outerWidth > 960) {
      setToggle(true);
    } else {
      return;
    }
  }, [outerWidth]);

  const value: any = {
    bannerInfo,
    setBannerInfo,
    reportInfo,
    setReportInfo,
    userInfo,
    setUserInfo,
    toggle,
    setToggle,
    outerWidth,
    setOuterWidth,
    select,
    setSelect,
    admin,
    setAdmin,
    test,
    setTest,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useService() {
  const service = useContext(ApiContext);
  if (!service) {
    throw new Error("useService must be used within an ApiContextProvider");
  }
  return service;
}
