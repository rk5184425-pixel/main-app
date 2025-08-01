import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import OTPVerification from "../components/OTPVerification";
import HomePage from "../components/HomePage";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const switchToSignup = () => setCurrentView("signup");
  const switchToLogin = () => setCurrentView("login");
  const switchToForgotPassword = () => setCurrentView("forgot");
  const switchToResetPassword = () => setCurrentView("reset");
  const switchToOTP = () => setCurrentView("otp");
  const backToLogin = () => setCurrentView("login");
  const goToHome = () => {
    setCurrentView("home");
    setIsLoggedIn(true);
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentView("home");
  };
  const handleLogin = () => setCurrentView("login");

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationIndependentTree>
        <NavigationContainer>
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
              {currentView === "home" && (
                <HomePage
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              )}
              {currentView === "login" && (
                <LoginForm
                  onSwitchToSignup={switchToSignup}
                  onForgotPassword={switchToForgotPassword}
                  onLoginSuccess={goToHome}
                />
              )}
              {currentView === "signup" && (
                <SignupForm
                  onSwitchToLogin={switchToLogin}
                  onSignupSuccess={switchToOTP}
                />
              )}
              {currentView === "forgot" && (
                <ForgotPassword
                  onBackToLogin={backToLogin}
                  onOtpVerified={(email, otp) => setCurrentView("reset")}
                />
              )}
              {currentView === "reset" && (
                <ResetPassword onBackToLogin={backToLogin} />
              )}
              {currentView === "otp" && (
                <OTPVerification
                  onBackToSignup={switchToSignup}
                  onVerificationComplete={goToHome}
                />
              )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © 2024 FinEduGuard. All rights reserved.
              </Text>
            </View>
          </View>
        </NavigationContainer>
      </NavigationIndependentTree>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
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
    justifyContent: "center",
    width: "100%",
  },
  footer: {
    padding: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});
