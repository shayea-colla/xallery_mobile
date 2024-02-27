import * as SecureStore from 'expo-secure-store';
import * as React from 'react';

export type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

// Should I store all info about specific user ?

// export type Session = {
//   firstName?: string,
//   lastName?: string,
//   username: string,
//   email: string,
//   picture: URL,
//   discription?: string,
//   type: string,
//   dataJoined: Date,
//   likedPictures: number[],
//   likedRooms: number[],
//   followers: number[],
//   following: number[],
//   token: string,
// }

export type Session = string

function useAsyncState<T>( initialValue: [boolean, Session | null] = [true, null],): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, Session | null], action: Session | null = null): [boolean, Session | null] => [false, action], initialValue) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
}


export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  React.useEffect(() => {
    SecureStore.getItemAsync(key).then(value => {
    setState(value);
    });
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
