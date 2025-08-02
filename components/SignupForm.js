import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { sendOtp, signUp } from "../redux/services/operations/authServices";
import { setSignUpData } from "../redux/slices/authSlice";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardContent } from "./ui/Card";
import OAuthButtons from "./OAuthButtons";
import Toast from "react-native-toast-message";

const SignupForm = ({ onSignupSuccess }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!firstName) return Toast.show({ type: "error", text1: "Enter your first name!" });
    if (!lastName) return Toast.show({ type: "error", text1: "Enter your last name!" });
    if (!email) return Toast.show({ type: "error", text1: "Enter your email!" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return Toast.show({ type: "error", text1: "Enter a valid email address!" });
    if (!password) return Toast.show({ type: "error", text1: "Enter your password!" });
    if (password.length < 6) return Toast.show({ type: "error", text1: "Password must be at least 6 characters!" });
    if (!confirmPassword) return Toast.show({ type: "error", text1: "Confirm your password!" });
    if (password !== confirmPassword) return Toast.show({ type: "error", text1: "Passwords do not match!" });
    if (!agreeToTerms) return Toast.show({ type: "error", text1: "You must agree to the terms!" });
    
    try {
      setLoading(true);
      const response = await dispatch(sendOtp(email));
      setLoading(false);
      
      // Check if there was an error in the response
      if (response?.error) {
        const errorMessage = response.error;
        if (errorMessage.includes("User already exists") || errorMessage.includes("already exists")) {
          Toast.show({ 
            type: "error", 
            text1: "User already exists", 
            text2: "Please go to login page"
          });
        } else {
          Toast.show({ type: "error", text1: errorMessage });
        }
      } else {
        // Store signup data in Redux
        dispatch(setSignUpData({ firstName, lastName, email, password }));
        setOtpSent(true);
        Toast.show({ type: "success", text1: "OTP sent successfully!" });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending OTP:", error);
      Toast.show({ type: "error", text1: "Failed to send OTP. Please try again." });
    }
  };

  // ✅ Verify OTP and Sign Up
  const handleSignUp = async () => {
    if (!otp) return Toast.show({ type: "error", text1: "Enter the OTP!" });
    if (otp.length !== 6) return Toast.show({ type: "error", text1: "OTP must be 6 digits!" });

    try {
      setLoading(true);
      const response = await dispatch(signUp(firstName, lastName, email, password, confirmPassword, otp));
      setLoading(false);

      if (response?.error) {
        Toast.show({ type: "error", text1: response.error });
      } else {
        Toast.show({ type: "success", text1: "Account created successfully!" });
        onSignupSuccess?.();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error signing up:", error);
      Toast.show({ type: "error", text1: "Failed to create account. Please try again." });
    }
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

  if (otpSent) {
    return (
      <View style={getContainerStyle()}>
        {/* OTP Verification Header */}
        <View style={{ marginBottom: theme.spacing.xl, alignItems: "center" }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: theme.borderRadius.full,
              backgroundColor: `${theme.colors.brand.primary}20`,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: theme.spacing.md,
            }}
          >
            <Ionicons name="mail-outline" size={40} color={theme.colors.brand.primary} />
          </View>
          
          <Text
            style={{
              fontSize: theme.typography.fontSizes['2xl'],
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.text.primary,
              textAlign: "center",
              marginBottom: theme.spacing.sm,
            }}
          >
            Check Your Email
          </Text>
          
          <Text
            style={{
              fontSize: theme.typography.fontSizes.base,
              color: theme.colors.text.secondary,
              textAlign: "center",
            }}
          >
            We've sent a 6-digit verification code to {email}
          </Text>
        </View>

        {/* OTP Input */}
        <Input
          label="Verification Code"
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter 6-digit code"
          keyboardType="numeric"
          maxLength={6}
          leftIcon={<Ionicons name="key-outline" size={20} color={theme.colors.text.tertiary} />}
          style={{ marginBottom: theme.spacing.xl }}
        />

        {/* Verify Button */}
        <Button
          onPress={handleSignUp}
          disabled={loading}
          loading={loading}
          fullWidth={true}
          style={{ marginBottom: theme.spacing.lg }}
        >
          {loading ? "Verifying..." : "Verify & Create Account"}
        </Button>

        {/* Resend OTP */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.sm,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.sm,
            }}
          >
            Didn't receive the code?
          </Text>
          <TouchableOpacity onPress={handleSendOtp}>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.sm,
                color: theme.colors.brand.primary,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={getContainerStyle()}>
      {/* Welcome Text */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text
          style={{
            fontSize: theme.typography.fontSizes['2xl'],
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            textAlign: "center",
            marginBottom: theme.spacing.sm,
          }}
        >
          Create Account
        </Text>
        <Text
          style={{
            fontSize: theme.typography.fontSizes.base,
            color: theme.colors.text.secondary,
            textAlign: "center",
          }}
        >
          Join us to start your financial education journey
        </Text>
      </View>

      {/* Name Fields */}
      <View style={{ flexDirection: "row", gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
        <View style={{ flex: 1 }}>
          <Input
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
            leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.text.tertiary} />}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
            leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.text.tertiary} />}
          />
        </View>
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
        style={{ marginBottom: theme.spacing.md }}
      />

      {/* Confirm Password Input */}
      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        secureTextEntry={true}
        leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.tertiary} />}
        style={{ marginBottom: theme.spacing.lg }}
      />

      {/* Terms Agreement */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.xl,
        }}
        onPress={() => setAgreeToTerms(!agreeToTerms)}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: theme.borderRadius.sm,
            borderWidth: 2,
            borderColor: agreeToTerms ? theme.colors.brand.primary : theme.colors.border.primary,
            backgroundColor: agreeToTerms ? theme.colors.brand.primary : "transparent",
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.sm,
          }}
        >
          {agreeToTerms && <Ionicons name="checkmark" size={14} color={theme.colors.text.inverse} />}
        </View>
        <Text
          style={{
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.text.secondary,
            flex: 1,
          }}
        >
          I agree to the{" "}
          <Text style={{ color: theme.colors.brand.primary, fontWeight: theme.typography.fontWeights.medium }}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={{ color: theme.colors.brand.primary, fontWeight: theme.typography.fontWeights.medium }}>
            Privacy Policy
          </Text>
        </Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <Button
        onPress={handleSendOtp}
        disabled={loading}
        loading={loading}
        fullWidth={true}
        style={{ marginBottom: theme.spacing.lg }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      {/* Divider */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.lg,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.border.primary,
          }}
        />
        <Text
          style={{
            marginHorizontal: theme.spacing.md,
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.text.tertiary,
          }}
        >
          Or continue with
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.border.primary,
          }}
        />
      </View>

      {/* Social buttons */}
      <OAuthButtons />
    </View>
  );
};

export default SignupForm;
