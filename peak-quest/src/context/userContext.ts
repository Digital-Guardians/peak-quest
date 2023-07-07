import { createContext, useContext } from "react";

export interface UserContextType {
  isOpenLogin: boolean;
  handleOpenLoginPopup: () => void;
  handleCloseLoginPopup: () => void;
}

export const UserContext = createContext<UserContextType>(null!);

export const useUserContext = (): UserContextType => useContext(UserContext);
