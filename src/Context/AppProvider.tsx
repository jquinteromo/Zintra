import  { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";

type AppProviderProps = {
  children: ReactNode;
};

interface User {
  nombre: string;
  email?: string;
  photoURL?: string | null;
  createdAt?: Date;
  pin?: string;
verificado: boolean | null;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AppContext.Provider value={{ user,  setUser }}>
      {children}
    </AppContext.Provider>
  );
};
