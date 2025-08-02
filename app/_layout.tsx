import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFrameworkReady } from "../hooks/useFrameworkReady";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { Provider } from "react-redux";
import { AuthProvider } from "../contexts/AuthContext";
import store from "../redux/store";

function ThemedStatusBar() {
  const { theme } = useTheme();
  return (
    <StatusBar 
      style={theme.isDark ? "light" : "dark"} 
      backgroundColor={theme.colors.background[0]}
    />
  );
}

function MainLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Slot />
          <ThemedStatusBar />
        </AuthProvider>
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
