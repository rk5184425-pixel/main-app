import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/services/operations/authServices";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardContent } from "./ui/Card";
import OAuthButtons from "./OAuthButtons";

const LoginForm = ({ onSwitchToSignup, onForgotPassword, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const token = useSelector((state) => state.auth?.token);
  const { theme } = useTheme();
  
  // Handle login success when token changes
  useEffect(() => {
    if (token) {
      // Import router dynamically to avoid circular dependencies
      import("expo-router").then(({ router }) => {
        router.push('/(app)/(tabs)');
      });
    }
  }, [token]);

  const handleLogin = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Enter your email!" });
      return;
    }
    if (!password) {
      Toast.show({ type: "error", text1: "Enter your password!" });
      return;
    }
    // Add email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Enter a valid email address!",
      });
      return;
    }
    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password must be at least 6 characters!",
      });
      return;
    }
    console.log("[LOGIN] Dispatching login with:", { email, password });
    const response = await dispatch(login(email, password));
    
    // Handle specific error cases
    if (response?.error) {
      const errorMessage = response.error.toLowerCase();
      
      // If user doesn't exist, suggest signup
      if (errorMessage.includes("user not found") || errorMessage.includes("no user") || errorMessage.includes("doesn't exist")) {
        Toast.show({
          type: "error",
          text1: "User not found",
          text2: "Please sign up first",
          onPress: () => onSwitchToSignup()
        });
      }
      // If password is incorrect
      else if (errorMessage.includes("incorrect password") || errorMessage.includes("invalid password") || errorMessage.includes("wrong password")) {
        Toast.show({
          type: "error",
          text1: "Incorrect password",
          text2: "Please try again or reset your password",
          onPress: () => onForgotPassword()
        });
      }
      // Other errors are already handled by the Toast in the login function
    }
    // After login, onLoginSuccess will be called in useEffect when token changes
  };

  const getContainerStyle = () => {
    return {
      backgroundColor: theme.colors.surface.primary,
      padding: theme.spacing['2xl'],
      borderRadius: theme.borderRadius.xl,
      width: "90%",
      alignSelf: "center",
      marginTop: theme.spacing['3xl'],
      ...theme.shadows.lg,
    };
  };

  return (
    <View style={getContainerStyle()}>
      {/* Welcome Text */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text style={{
          fontSize: theme.typography.fontSizes['2xl'],
          fontWeight: theme.typography.fontWeights.bold,
          color: theme.colors.text.primary,
          textAlign: "center",
          marginBottom: theme.spacing.sm,
        }}>
          Welcome Back
        </Text>
        <Text style={{
          fontSize: theme.typography.fontSizes.base,
          color: theme.colors.text.secondary,
          textAlign: "center",
        }}>
          Sign in to continue your financial education journey
        </Text>
      </View>

      {/* Email Input */}
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.text.tertiary} />}
        style={{ marginBottom: theme.spacing.md }}
      />

      {/* Password Input */}
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true}
        leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.tertiary} />}
        style={{ marginBottom: theme.spacing.lg }}
      />

      {/* Remember me and Forgot password */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing.xl,
      }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={{
            width: 20,
            height: 20,
            borderRadius: theme.borderRadius.sm,
            borderWidth: 2,
            borderColor: rememberMe ? theme.colors.brand.primary : theme.colors.border.primary,
            backgroundColor: rememberMe ? theme.colors.brand.primary : "transparent",
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.sm,
          }}>
            {rememberMe && <Ionicons name="checkmark" size={14} color={theme.colors.text.inverse} />}
          </View>
          <Text style={{
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.text.secondary,
          }}>
            Remember me
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={{
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.brand.primary,
            fontWeight: theme.typography.fontWeights.medium,
          }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign in Button */}
      <Button
        onPress={handleLogin}
        disabled={loading}
        loading={loading}
        fullWidth={true}
        style={{ marginBottom: theme.spacing.lg }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      {/* Sign up link */}
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: theme.spacing.lg,
      }}>
        <Text style={{
          fontSize: theme.typography.fontSizes.base,
          color: theme.colors.text.secondary,
        }}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={onSwitchToSignup}>
          <Text style={{
            fontSize: theme.typography.fontSizes.base,
            color: theme.colors.brand.primary,
            fontWeight: theme.typography.fontWeights.medium,
          }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.lg,
      }}>
        <View style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.border.primary,
        }} />
        <Text style={{
          marginHorizontal: theme.spacing.md,
          fontSize: theme.typography.fontSizes.sm,
          color: theme.colors.text.tertiary,
        }}>
          Or continue with
        </Text>
        <View style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.border.primary,
        }} />
      </View>

      {/* Social buttons */}
      <OAuthButtons />
    </View>
  );
};

export default LoginForm;
