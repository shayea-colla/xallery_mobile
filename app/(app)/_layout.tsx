import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { Redirect } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { fetchUserProfile } from "@/network";

import { useSession } from "@/authentication/ctx";

export const unstable_settings = {
  initialRouteName: "createRoom",
};

export default function Layout() {
  const theme = useTheme();
  const { isLoading, session, api, setUser, user } = useSession();

  // The problem is that this query is being executed at the very first when there is no session yet, to solve this problem , you need to make it to wait until the session evaluate
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => fetchUserProfile(api),
    enabled: !!session,
  });

  if (profile.isFetching) {
    console.log("fetching");
  }
  useEffect(() => {
    if (profile.data) {
      setUser(profile.data);
    }
  }, [profile.data]);

  const userLoaded = user == null && profile.isLoading;
  //    true = true         && true ( go ahead and load the user info ) ... don't show the application
  //    false = false ( user exist )         && true (still loading info , no need to load it, since user is already populated ) ... show the application
  //    false = false ( user exist )         && false (finished loading, user exist) ... show the application
  //    false = true ( user doesn't exist )         && false (finished loading, couldn't fetch user info) ... show the application ( set user to null)
  // Check if token exist and the user is not loaded yet
  if (isLoading || userLoaded) {
    console.log("still loading...");
    return null;
  }

  // Redirect if token doesn't exist
  if (!session) {
    SplashScreen.hideAsync();
    return <Redirect href="/login" />;
  }

  SplashScreen.hideAsync();

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.secondary,
    },
    tabBarText: {
      color: theme.colors.onSurface,
    },
  });

  return (
    <Stack initialRouteName="createRoom" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="users/[userId]" />
      <Stack.Screen name="[roomId]" />
      <Stack.Screen
        name="createRoom"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerTitleAlign: "center",
          title: 'Create New Room'
        }}
      />
    </Stack>
  );
}
