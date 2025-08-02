import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import OTPVerification from "../components/OTPVerification";
import HomePage from "../components/HomePage";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { initializeAuth } from "../redux/services/operations/initAuth";
import { logout } from "../redux/services/operations/authServices";
import AsyncStorageService, { STORAGE_KEYS } from "../utils/AsyncStorage";
import { router } from "expo-router";

// Main App Component wrapped with Redux Provider
function AppContent() {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  // Check for stored authentication on app startup
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("🔄 Checking authentication status...");
        setIsLoading(true);
        
        // Initialize auth from AsyncStorage
        const result = await dispatch(initializeAuth() as any);
        
        if (result.success) {
          console.log("✅ User is authenticated, navigating to tabs");
          setIsLoggedIn(true);
          // Navigate to tabs directly
          router.push('/(tabs)');
        } else {
          console.log("❌ User is not authenticated, showing login screen");
          setIsLoggedIn(false);
          setCurrentView("home");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setCurrentView("home");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  // Also check when token changes in Redux
  useEffect(() => {
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
      router.push('/(tabs)');
    } else if (!token && isLoggedIn) {
      console.log("🚪 Token cleared, user logged out - showing home screen");
      setIsLoggedIn(false);
      setCurrentView("home");
      // Ensure we're on the index route after logout
      router.replace('/');
    }
  }, [token, isLoggedIn]);

  const switchToSignup = () => setCurrentView("signup");
  const switchToLogin = () => setCurrentView("login");
  const switchToForgotPassword = () => setCurrentView("forgot");
  const switchToResetPassword = () => setCurrentView("reset");
  const switchToOTP = () => setCurrentView("otp");
  const backToLogin = () => setCurrentView("login");
  
  const goToHome = () => {
    console.log("🏠 Navigating to tabs after successful login/signup");
    setIsLoggedIn(true);
    router.push('/(tabs)');
  };
  
  const handleLogout = async () => {
    try {
      // Use the centralized logout service
      const result = await dispatch(logout() as any);
      
      if (result.success) {
        setIsLoggedIn(false);
        setCurrentView("home");
        console.log("🚪 User logged out successfully");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  const handleLogin = () => setCurrentView("login");

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Ionicons name="shield-checkmark" size={60} color="#151717" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
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
        <Toast />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#151717",
    marginTop: 20,
    fontWeight: "500",
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
