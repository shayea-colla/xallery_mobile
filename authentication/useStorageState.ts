import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { user } from './AuthContext';

export type UseStateHook<T> = [[boolean, Session | null], (value: Session | null) => void];

type token = string | null | undefined

export type Session = string

function useAsyncState<T>(
  initialValue: [boolean, Session | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, Session | null], action: Session | null = null): [boolean, Session | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value:token) {
    if (value == null || value == undefined) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
}


function getProfileInfo() {
  return "user"
}

export function useStorageState(key: string):UseStateHook<Session> {
  // Public
  const [state, setState] = useAsyncState()

  // Get
  React.useEffect(() => {
    // Get the token from SecureStore
    SecureStore.getItemAsync(key).then(session => {
      setState(session)
    });

    // Get the user profile info from server


  }, [key]);

  // Set
  const setValue = React.useCallback(
    (session: Session | null) => {
      setState(session);
      setStorageItemAsync(key, session);
    },
    [key]
  );

  return [state, setValue];
}
