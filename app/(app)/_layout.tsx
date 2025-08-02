import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { View, Text, ActivityIndicator } from "react-native";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  // Show loading screen while checking authentication
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
        <Text style={{ 
          color: theme.colors.text.secondary, 
          marginTop: theme.spacing.md,
          fontSize: theme.typography.fontSizes.base,
        }}>
          Loading...
        </Text>
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Render the protected app
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      {/* <Stack.Screen name="pages" /> */}
    </Stack>
  );
}
