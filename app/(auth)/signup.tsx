import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../contexts/ThemeContext";
import SignupForm from "../../components/SignupForm";
import { router } from "expo-router";

export default function SignupScreen() {
  const { theme } = useTheme();
  
  const handleSignupSuccess = () => {
    router.push("/(auth)/otp-verification");
  };

  return (
    <LinearGradient
      colors={theme.colors.background.gradient}
      style={styles.container}
    >
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface.primary }]}>
        <Ionicons 
          name="shield-checkmark" 
          size={48} 
          color={theme.colors.brand.primary} 
        />
        <Text style={[styles.appTitle, { color: theme.colors.text.primary }]}>
          FinEduGuard
        </Text>
        <Text style={[styles.appSubtitle, { color: theme.colors.text.secondary }]}>
          Create Your Account
        </Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 16,
    marginTop: 8,
    opacity: 0.8,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
});