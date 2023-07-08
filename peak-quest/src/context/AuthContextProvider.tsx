// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { onAdminStateChanged } from "../service/firebase";

// interface State {
//   admin: any;
//   setAdmin: Dispatch<SetStateAction<any>>;
// }

// const AuthContext = createContext<State | null>(null);

// export function AuthContextProvider({ children }: { children: ReactNode }) {

//   const value = {
//     admin,
//     setAdmin,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuthContext() {
//   return useContext(AuthContext);
// }
