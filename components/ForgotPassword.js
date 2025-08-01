import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/services/operations/authServices";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ForgotPassword = ({ onBackToLogin, onOtpVerified }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Step 1: Email input and send OTP */}
      {step === 1 && (
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if (!email) {
              Toast.show({ type: "error", text1: "Enter your email!" });
              return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              Toast.show({ type: "error", text1: "Enter a valid email address!" });
              return;
            }
            console.log('[FORGOT PASSWORD] Dispatching forgotPassword with:', { email });
            dispatch(forgotPassword(email));
            setStep(2);
          }}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
        </TouchableOpacity>
      )}

      {/* Step 2: OTP input and verify */}
      {step === 2 && (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="key-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              // In a real app, verify OTP with backend here
              console.log('[FORGOT PASSWORD] OTP entered:', otp);
              if (onOtpVerified) onOtpVerified(email, otp);
            }}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Back to Login */}
      <TouchableOpacity onPress={onBackToLogin}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#151717",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginVertical: 10,
  },
  label: {
    fontWeight: "600",
    color: "#151717",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ecedec",
    borderWidth: 1.5,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#151717",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  link: {
    textAlign: "center",
    color: "#2d79f3",
    fontWeight: "500",
  },
});

export default ForgotPassword;