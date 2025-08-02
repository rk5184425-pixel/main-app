import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { signUp, sendOtp } from "../redux/services/operations/authServices";
import Toast from "react-native-toast-message";

const OTPVerification = ({ onBackToSignup, onVerificationComplete }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const dispatch = useDispatch();

  // Get saved signup data from Redux
  const signUpData = useSelector((state) => state.auth?.signUpData);
  const loading = useSelector((state) => state.auth?.loading);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    console.log('[OTP] Step 1: User entered OTP:', otpString);
    if (otpString.length === 4) {
      console.log('[OTP] Step 2: Dispatching signUp with data:', { ...signUpData, otp: otpString });
      Toast.show({ type: "info", text1: "Verifying OTP..." });
      const result = await dispatch(signUp({ ...signUpData, otp: otpString }));
      console.log('[OTP] Step 3: Signup API call completed');
      
      // Check if there was an error in the response
      if (result?.error) {
        const errorMessage = result.error.toLowerCase();
        
        // Handle specific error cases
        if (errorMessage.includes("user already exists") || errorMessage.includes("already registered")) {
          Toast.show({
            type: "error",
            text1: "User already exists",
            text2: "Please login instead"
          });
          
          // Import router dynamically to avoid circular dependencies
          const { router } = await import("expo-router");
          router.replace("/"); // Navigate to login page
          return;
        }
        
        // Handle invalid OTP
        if (errorMessage.includes("invalid otp") || errorMessage.includes("otp expired") || errorMessage.includes("incorrect otp")) {
          Toast.show({
            type: "error",
            text1: "Invalid or expired OTP",
            text2: "Please try again or request a new OTP"
          });
          return;
        }
        
        // For other errors, just show the error message
        Toast.show({
          type: "error",
          text1: "Verification failed",
          text2: result.error
        });
        return;
      }
      
      // Check if signup was successful by checking if token was set
      const token = result?.payload?.token || result?.token;
      if (token) {
        console.log('[OTP] Step 4: Redirecting to Tabs page');
        // Import router dynamically to avoid circular dependencies
        const { router } = await import("expo-router");
        router.push('/(app)/(tabs)');
      } else {
        // If no token was returned, still call the original callback
        onVerificationComplete();
      }
    } else {
      console.log('[OTP] Step 1b: OTP is not 4 digits, not verifying');
      Toast.show({ type: "error", text1: "Please enter a valid 4-digit OTP" });
    }
  };

  const handleResend = async () => {
    if (signUpData?.email) {
      Toast.show({ type: "info", text1: "Resending OTP..." });
      const response = await dispatch(sendOtp(signUpData.email));
      
      // Handle errors from sendOtp
      if (response?.error) {
        const errorMessage = response.error.toLowerCase();
        
        // Handle user already exists error
        if (errorMessage.includes("user already exists") || errorMessage.includes("already registered")) {
          Toast.show({
            type: "error",
            text1: "User already exists",
            text2: "Please login instead"
          });
          
          // Import router dynamically to avoid circular dependencies
          const { router } = await import("expo-router");
          router.replace("/"); // Navigate to login page
          return;
        }
        
        // For other errors
        Toast.show({
          type: "error",
          text1: "Failed to resend OTP",
          text2: response.error
        });
      } else {
        Toast.show({
          type: "success",
          text1: "OTP resent successfully",
          text2: "Please check your email"
        });
      }
    } else {
      Toast.show({ type: "error", text1: "Email not found. Please go back to signup." });
    }
  };

  if (!signUpData?.email) {
    onBackToSignup();
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Enter OTP</Text>
      <Text style={styles.subHeading}>
        We have sent a verification code to your email address
      </Text>

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={loading}
      >
        <Text style={styles.verifyText}>
          {loading ? "Verifying..." : "Verify"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={onBackToSignup}>
        <Ionicons name="arrow-back" size={20} color="#151717" />
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendNote}>Didn't receive the code?</Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendBtn}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#151717",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    marginVertical: 20,
  },
  otpInput: {
    backgroundColor: "#f8f9fa",
    width: 50,
    height: 50,
    textAlign: "center",
    borderRadius: 10,
    fontWeight: "600",
    color: "#151717",
    fontSize: 18,
    borderWidth: 1.5,
    borderColor: "#ecedec",
  },
  verifyButton: {
    backgroundColor: "#151717",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  verifyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ecedec",
  },
  resendContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  resendNote: {
    fontSize: 14,
    color: "#777",
  },
  resendBtn: {
    fontSize: 14,
    color: "#2d79f3",
    fontWeight: "600",
    marginTop: 5,
  },
});

export default OTPVerification;
