import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './auth/Register';

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true); // If token is present, set user as logged in
        } else {
          setIsLoggedIn(false); // If no token, set user as not logged in
        }
      } catch (error) {
        console.error('Error in checking auth status:', error);
        setIsLoggedIn(false); // Ensure to set state even if there's an error
      } finally {
        if (loaded) {
          SplashScreen.hideAsync().catch(error => {
            console.error('Error hiding splash screen:', error);
          });
        }
      }
    };

    checkAuthStatus(); // Check if user is authenticated
  }, [loaded]);

  if (!loaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      {isLoggedIn ? (
        <Stack screenOptions={{headerShown:false}} >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <Register />
      )}
    </ThemeProvider>
  );
}
