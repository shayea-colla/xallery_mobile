import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { user } from './AuthContext';
import { Platform } from 'react-native';

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

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

//export async function setStorageItemAsync(key: string, value:token) {
//    if (value == null || value == undefined) {
//      await SecureStore.deleteItemAsync(key);
//    } else {
//      await SecureStore.setItemAsync(key, value);
//    }
//}


function getProfileInfo() {
  return "user"
}

export function useStorageState(key: string):UseStateHook<Session> {
  // Public
  const [state, setState] = useAsyncState()

  // Get
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value);
      });
    }
  }, [key]);


  // Get
  //React.useEffect(() => {
  //  // Get the token from SecureStore
  //  SecureStore.getItemAsync(key).then(session => {
  //    setState(session)
  //  });

  //  // Get the user profile info from server


  //}, [key]);

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
