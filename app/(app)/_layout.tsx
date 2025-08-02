import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import Animated, { FadeIn } from "react-native-reanimated";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <LinearGradient
        colors={theme.colors.background.gradient}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          entering={FadeIn.springify()}
          style={{
            alignItems: "center",
            padding: theme.spacing['2xl'],
            backgroundColor: theme.colors.surface.glass,
            borderRadius: theme.borderRadius['2xl'],
            ...theme.shadows.lg,
          }}
        >
          <LoadingSpinner size="lg" variant="primary" />
          <Text 
            style={{ 
              color: theme.colors.text.primary, 
              marginTop: theme.spacing.lg,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.semibold,
              textAlign: "center",
            }}
          >
            Loading FinEduGuard
          </Text>
          <Text 
            style={{ 
              color: theme.colors.text.secondary, 
              marginTop: theme.spacing.xs,
              fontSize: theme.typography.fontSizes.sm,
              textAlign: "center",
            }}
          >
            Preparing your secure environment...
          </Text>
        </Animated.View>
      </LinearGradient>
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
      <Stack.Screen name="pages" />
    </Stack>
  );
}
