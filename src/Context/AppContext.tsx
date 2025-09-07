import React, { createContext, useContext} from "react";

interface User {
  nombre: string;
  email?: string;
  photoURL?: string | null;
  createdAt?: Date;
  pin?: string;
 verificado: boolean | null;
}

export type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = () => useContext(AppContext);
