import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { sendOtp, signUp } from "../redux/services/operations/authServices";
import { setSignUpData } from "../redux/slices/authSlice";
import OAuthButtons from "./OAuthButtons";
import Toast from "react-native-toast-message";

const SignupForm = ({ onSignupSuccess }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!email) return Alert.alert("Error", "Enter email first!");
    try {
      console.log("Calling sendOtp with email:", email);
      await dispatch(sendOtp(email)); // ✅ Correct way
      Alert.alert("Success", "OTP sent successfully!");
      setOtpSent(true);

      // Store sign up data for final signup
      dispatch(
        setSignUpData({
          firstName,
          lastName,
          email,
          password,
        })
      );
      // Switch to OTP view
      if (onSignupSuccess) onSignupSuccess();
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    }
  };

  // ✅ Final Signup
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match!");
    }
    if (!otp) {
      return Alert.alert("Error", "Enter OTP before signup!");
    }
    try {
      const finalData = { firstName, lastName, email, password, otp };
      await dispatch(signUp(finalData)); // ✅ Fixed
      Alert.alert("Success", "Signup successful!");
    } catch (error) {
      Alert.alert("Error", "Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      {!otpSent ? (
        <>
          {/* First Name */}
          <Text style={styles.label}>First Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Last Name */}
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email */}
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

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Confirm your Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              {agreeToTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              I agree to the <Text style={styles.link}>Terms & Conditions</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (!firstName) {
                Toast.show({ type: "error", text1: "Enter your first name!" });
                return;
              }
              if (!lastName) {
                Toast.show({ type: "error", text1: "Enter your last name!" });
                return;
              }
              if (!email) {
                Toast.show({ type: "error", text1: "Enter your email!" });
                return;
              }
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                Toast.show({ type: "error", text1: "Enter a valid email address!" });
                return;
              }
              if (!password) {
                Toast.show({ type: "error", text1: "Enter your password!" });
                return;
              }
              if (password.length < 6) {
                Toast.show({ type: "error", text1: "Password must be at least 6 characters!" });
                return;
              }
              if (!confirmPassword) {
                Toast.show({ type: "error", text1: "Confirm your password!" });
                return;
              }
              if (password !== confirmPassword) {
                Toast.show({ type: "error", text1: "Passwords do not match!" });
                return;
              }
              if (!otp) {
                Toast.show({ type: "error", text1: "Enter OTP before signup!" });
                return;
              }
              if (!agreeToTerms) {
                Toast.show({ type: "error", text1: "You must agree to the terms!" });
                return;
              }
              setLoading(true);
              try {
                await dispatch(signUp({ firstName, lastName, email, password, otp }));
                Alert.alert("Success", "Signup successful!");
              } catch (error) {
                Alert.alert("Error", "Signup failed");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* OTP Input */}
          <Text style={styles.label}>OTP</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="key-outline" size={20} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Complete Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      <OAuthButtons />
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ecedec",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#151717",
    borderColor: "#151717",
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 14,
    flex: 1,
  },
  link: {
    color: "#2d79f3",
    fontWeight: "500",
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
});

export default SignupForm;
