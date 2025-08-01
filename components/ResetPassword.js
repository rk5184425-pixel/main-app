import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/services/operations/authServices";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ResetPassword = ({ onBackToLogin }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password</Text>

      {/* Reset Token */}
      <Text style={styles.label}>Reset Token</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="key-outline" size={20} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Enter reset token"
          value={resetToken}
          onChangeText={setResetToken}
        />
      </View>

      {/* New Password */}
      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Ionicons 
            name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
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
          placeholder="Confirm new password"
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

      {/* Submit */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          if (!resetToken) {
            Toast.show({ type: "error", text1: "Enter reset token!" });
            return;
          }
          if (!newPassword) {
            Toast.show({ type: "error", text1: "Enter new password!" });
            return;
          }
          if (!confirmPassword) {
            Toast.show({ type: "error", text1: "Confirm your new password!" });
            return;
          }
          if (newPassword.length < 6) {
            Toast.show({ type: "error", text1: "Password must be at least 6 characters!" });
            return;
          }
          if (newPassword !== confirmPassword) {
            Toast.show({ type: "error", text1: "Passwords do not match!" });
            return;
          }
          console.log('[RESET PASSWORD] Dispatching resetPassword with:', { newPassword, resetToken });
          dispatch(resetPassword(newPassword, resetToken));
        }}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
      </TouchableOpacity>

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

export default ResetPassword;