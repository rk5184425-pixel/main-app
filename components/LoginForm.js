import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/services/operations/authServices";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for icons
import Toast from "react-native-toast-message";
import OAuthButtons from "./OAuthButtons";

const LoginForm = ({ onSwitchToSignup, onForgotPassword, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  return (
    <View style={styles.container}>
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

      {/* Remember me */}
      <View style={styles.row}>
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            onPress={() => setRememberMe(!rememberMe)}
          >
            {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>
        <Text style={styles.link} onPress={onForgotPassword}>
          Forgot password?
        </Text>
      </View>

      {/* Sign in */}
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
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
          await dispatch(login(email, password));
          const token = useSelector((state) => state.auth?.token);
          if (token && onLoginSuccess) onLoginSuccess();
        }}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={onSwitchToSignup}>
          Sign Up
        </Text>
      </Text>

      <Text style={styles.orText}>Or With</Text>

      {/* Social buttons */}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ecedec",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#151717",
    borderColor: "#151717",
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 14,
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
  signupText: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 5,
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ededef",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    flex: 1,
    marginHorizontal: 5,
  },
});

export default LoginForm;
