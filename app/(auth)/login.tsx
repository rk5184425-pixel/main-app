import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shield } from "lucide-react-native";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { router } from "expo-router";
import { Card } from "../../components/ui/Card";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { theme } = useTheme();

  const handleLoginSuccess = () => {
    signIn();
    // Navigation will be handled by AuthProvider
  };

  const switchToSignup = () => {
    router.push("/(auth)/signup");
  };

  const switchToForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  return (
    <LinearGradient
      colors={theme.colors.background}
      style={styles.container}
    >
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={[styles.header, { marginBottom: theme.spacing['2xl'] }]}>
            <View style={[styles.logoContainer, { 
              backgroundColor: `${theme.colors.primary}20`,
              marginBottom: theme.spacing.lg,
            }]}>
              <Shield size={48} color={theme.colors.primary} />
            </View>
            <Text style={[styles.appTitle, { 
              color: theme.colors.text,
              fontSize: theme.typography.fontSizes['3xl'],
              fontWeight: theme.typography.fontWeights.bold,
            }]}>
              FinGuard
            </Text>
            <Text style={[styles.appSubtitle, { 
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSizes.base,
              marginTop: theme.spacing.xs,
            }]}>
              Secure Financial Education
            </Text>
          </View>

          {/* Form Container */}
          <Card variant="elevated" padding="lg" style={styles.formCard}>
            <LoginForm
              onSwitchToSignup={switchToSignup}
              onForgotPassword={switchToForgotPassword}
              onLoginSuccess={handleLoginSuccess}
            />
          </Card>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    textAlign: "center",
    lineHeight: 40,
  },
  appSubtitle: {
    textAlign: "center",
    lineHeight: 22,
  },
  formCard: {
    width: "100%",
  },
});