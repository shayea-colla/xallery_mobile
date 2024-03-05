import React from "react";
import { useStorageState } from "./useStorageState";
import { AuthContext } from "./AuthContext";
import { api } from "@/network/axios";
import { baseURL, login_url } from "@/network/constants";
import { transformData } from "@/utils";
import { user } from "@/types";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { transformUser } from "@/utils";

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("token");

  const [user, setUser] = React.useState<user | null>(null);

  const queryClient = useQueryClient();

  // Require the buffer Object to encode into base64
  global.Buffer = require("buffer").Buffer;

  async function Login(username: string, password: string) {
    /**
     * @returns {Promise}
     */
    // This function should throw an error if credentials are invalid,

    // convert the username and password to base64 string
    const credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    // Request config
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: login_url,
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    };

    try {
      // make the actual login request , this line might throw and error
      const response = await api.request(config);
      // If no error thrown , login succeed
      // Get the response data
      const data = transformData(response.data);

      // Set the current user
      setUser(transformUser(data.user));

      // Set the session token
      setSession(data.token);
    } catch (error) {
      if (error?.response?.status == 401) {
        throw new Error("Username or Password is incorrect"); // Throw a specific error
      }

      console.log(error);

      // Another Error accured, maybe network error
      throw new Error("Check your internet connection and try again");
    }
  }

  function Logout() {
    // Remove any catched information
    queryClient.removeQueries({ queryKey: ["profile"] });

    // logout the user
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        Login: Login,
        Logout: Logout,
        api: axios.create({
          baseURL: baseURL,
          headers: {
            Authorization: `TOKEN ${session}`,
          },
        }),
        user: user,
        setUser: setUser,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
