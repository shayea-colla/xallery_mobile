import FontAwesome from "@expo/vector-icons/FontAwesome"
import { PaperProvider, useTheme } from 'react-native-paper';
import { DarkTheme, LightTheme as DefaultTheme } from '@/constants/Theme'
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect} from 'react';
import { SessionProvider } from '@/authentication/ctx';
import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(app)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const queryClient = new QueryClient()

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);


  if (!loaded) {
    return null;
  }

  return <RootLayoutStack />;
}


function RootLayoutStack() {
  const colorScheme = useColorScheme();
  const theme = useTheme()

  return (
    <QueryClientProvider client={queryClient} >
      <SessionProvider>
        <PaperProvider theme={colorScheme == "dark" ? DarkTheme : DefaultTheme}>
          <StatusBar  backgroundColor={theme.colors.secondary} />
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ presentation: "card", headerShown: false }} />
          </Stack>
        </PaperProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
