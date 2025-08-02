import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import SignupForm from "../../components/SignupForm";
import { router } from "expo-router";

export default function SignupScreen() {
  const handleSignupSuccess = () => {
    router.push("/(auth)/otp-verification");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={40} color="#151717" />
        <Text style={styles.appTitle}>FinEduGuard</Text>
        <Text style={styles.appSubtitle}>Create Your Account</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      </View>
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