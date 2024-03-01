import { createContext } from "react";
import { Session } from './useStorageState'
import axios, { Axios } from "axios";

export const USER_TYPE = {
  NORMAL: "NORMAL",
  DESIGNER: "DESIGNER"
}


export type user = {
  id: number,
  firstName?: string,
  lastName?: string,
  username: string,
  email: string,
  picture?: string, // picture is a string
  profilePicture?: URL,
  description?: string,
  following?: number,
  followers?: number,
  rooms: string[],
  type: "NORMAL" | "DESIGNER"
}


type AuthContextType = {
  Login: (username:string, password:string) => void;
  Logout: () => void;
  api: Axios,
  session: Session | null;
  isLoading: boolean;
}



// Create the Auth Context and pass initial values
export const AuthContext = createContext<AuthContextType>({
  Login: () => null,
  Logout: () => null,
  api: axios.create(),
  session: null,
  isLoading: false,
});
