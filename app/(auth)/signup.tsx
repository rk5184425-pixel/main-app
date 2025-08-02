import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupForm from "../../components/SignupForm";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { router } from "expo-router";
import ChatbotButton from "../../components/ChatbotButton";
import ChatbotPopup from "../../components/ChatbotPopup";
import ThemeToggle from "../../components/ThemeToggle";
import { Card, CardContent } from "../../components/ui/Card";

export default function SignupScreen() {
  const { signIn } = useAuth();
  const { theme } = useTheme();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSignupSuccess = () => {
    signIn();
    // Navigation will be handled by AuthProvider
  };

  const switchToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={theme.colors.background.heroGradient}
      style={styles.container}
    >
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Theme Toggle */}
          <View style={styles.themeToggleContainer}>
            <ThemeToggle />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: theme.colors.surface.glass }]}>
              <Ionicons 
                name="person-add" 
                size={64} 
                color={theme.colors.brand.primary} 
              />
            </View>
            <Text style={[styles.appTitle, { color: theme.colors.text.inverse }]}>
              Join FinEduGuard
            </Text>
            <Text style={[styles.appSubtitle, { color: theme.colors.text.inverse }]}>
              Start your journey to financial literacy
            </Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Card variant="glass" size="lg" animated delay={200}>
              <CardContent>
                <Text style={[styles.welcomeTitle, { color: theme.colors.text.primary }]}>
                  Create Account
                </Text>
                <Text style={[styles.welcomeSubtitle, { color: theme.colors.text.secondary }]}>
                  Sign up to access exclusive financial education content
                </Text>
                
                <SignupForm
                  onSwitchToLogin={switchToLogin}
                  onSignupSuccess={handleSignupSuccess}
                />
              </CardContent>
            </Card>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.text.inverse }]}>
              Your data is encrypted and secure
            </Text>
          </View>
        </ScrollView>

        {/* Chatbot */}
        <ChatbotButton onPress={() => setPopupVisible(true)} />
        <ChatbotPopup
          visible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        />
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  themeToggleContainer: {
    alignItems: "flex-end",
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  appSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
});