import { createContext } from "react";

type AuthContextType = {
  Login: (username:string, password:string) => void;
  Logout: () => void;
  session?: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  Login: () => null,
  Logout: () => null,
  session: null,
  isLoading: false,
});
