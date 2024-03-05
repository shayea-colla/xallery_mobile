import { createContext } from "react";
import { Session } from './useStorageState'
import axios, { Axios } from "axios";
import { user } from '@/types'

export const USER_TYPE = {
  NORMAL: "NORMAL",
  DESIGNER: "DESIGNER"
}

type AuthContextType = {
  Login: (username:string, password:string) => void;
  Logout: () => void;
  api: Axios,
  user: user | null,
  setUser: (user: user | null) => void
  session: Session | null;
  isLoading: boolean;
}



// Create the Auth Context and pass initial values
export const AuthContext = createContext<AuthContextType>({
  Login: () => null,
  Logout: () => null,
  api: axios.create(),
  user: null,
  setUser: () => null,
  session: null,
  isLoading: false,
});