import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFrameworkReady } from "../hooks/useFrameworkReady";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { Provider, useDispatch } from "react-redux";
import store from "../redux/store";
import { useEffect } from "react";
import { initializeAuth } from "../redux/services/operations/initAuth";


function MainLayout() {
  useFrameworkReady();
  const dispatch = useDispatch();
  
  // Initialize auth state from AsyncStorage when app starts
  useEffect(() => {
    dispatch(initializeAuth() as any);
  }, [dispatch]);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          {/* <Stack.Screen name="pages/story" />
          <Stack.Screen name="pages/redflags" /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" backgroundColor="#1a1a2e" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}
