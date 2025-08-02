import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";
import ChatbotButton from "../../components/ChatbotButton";
import ChatbotPopup from "../../components/ChatbotPopup";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [isPopupVisible, setPopupVisible] = useState(false);

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
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={40} color="#151717" />
        <Text style={styles.appTitle}>FinEduGuard</Text>
        <Text style={styles.appSubtitle}>Secure Financial Education</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <LoginForm
          onSwitchToSignup={switchToSignup}
          onForgotPassword={switchToForgotPassword}
          onLoginSuccess={handleLoginSuccess}
        />
      </View>
      {/* Floating Chatbot Button */}
      <ChatbotButton onPress={() => setPopupVisible(true)} />

      {/* Popup */}
      <ChatbotPopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#151717",
    marginTop: 10,
  },
  appSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
