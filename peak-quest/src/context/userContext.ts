import { createContext, useContext } from "react";

export interface UserContextType {
  isOpenLogin: boolean;
  handleOpenLoginPopup: () => void;
  handleCloseLoginPopup: () => void;
  user: any;
  setUser: (user: any) => void;
}

export const UserContext = createContext<UserContextType>(null!);

export const useUserContext = (): UserContextType => useContext(UserContext);
