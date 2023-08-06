import { useCallback, useContext, useState } from "react";
import { UserContext, UserContextType } from "./userContext";

export default function UserProvider({ children }: { children: React.ReactNode }) {
  // 로그인 팝업 상태
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [user, setUser] = useState();
  // 로그인 팝업 열기
  const handleOpenLoginPopup = useCallback(() => {
    setIsOpenLogin(true);
  }, []);
  // 로그인 팝업 닫기
  const handleCloseLoginPopup = useCallback(() => {
    setIsOpenLogin(false);
  }, []);

  const loginValue: UserContextType = {
    isOpenLogin,
    handleOpenLoginPopup,
    handleCloseLoginPopup,
    user,
    setUser,
  };

  return <UserContext.Provider value={loginValue}>{children}</UserContext.Provider>;
}
