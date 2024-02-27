import React from 'react';
import { useStorageState } from './useStorageState';
import { AuthContext } from './AuthContext';
import { api } from "@/network/axios"
import { login_url } from '@/network/constants';
import { useRouter } from 'expo-router';


// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  // Require the buffer Object to encode into base64
  global.Buffer = require("buffer").Buffer

  async function Login(username: string, password: string) {
    /**
     * @returns {Promise}
     */
    // This function should throw an error if credentials are invalid, 

    // convert the username and password to base64 string
    const credentials = Buffer.from(`${username}:${password}`).toString("base64")

    

    // login request config
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: login_url,
      headers: { 
        'Authorization': `Basic ${credentials}`
      }

    };

    // make the actual login request , this line may throw and error
      try {
        const response = await api.request(config);

        if (response.status > 400) {
          throw new Error(response.data.detail); // Throw a specific error
        }
        const data: { expiry: Date, token: string } = response.data;
        setSession(data.token);

      } catch (error) {
        throw new Error(error.data.detail); // Pass on error message for better handling
      }
    }

  return (
    <AuthContext.Provider
      value={{
        Login: Login,
        Logout: () => setSession(null),
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}


async function sendLoginRequest(username: string, password: string) {

}