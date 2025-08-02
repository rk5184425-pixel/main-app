import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background.primary,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.brand.primary} />
      </View>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
