// OAuthButtons.js
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { useDispatch } from "react-redux";
import { signUp, login } from "../redux/services/operations/authServices";
import { useTheme } from "../contexts/ThemeContext";

export default function OAuthButtons() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then((res) => res.json())
        .then((user) => {
          // Send user info to backend for login/signup
          dispatch(login(user.email, user.id)); // Or dispatch(signUp(...))
        });
    }
  }, [response]);

  const getSocialButtonStyle = () => {
    return {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      borderColor: theme.colors.border.primary,
      borderWidth: 1.5,
      borderRadius: theme.borderRadius.lg,
      height: 52,
      flex: 1,
      marginHorizontal: theme.spacing.xs,
      backgroundColor: theme.colors.surface.primary,
      paddingHorizontal: theme.spacing.md,
      ...theme.shadows.sm,
    };
  };

  return (
    <View style={{ gap: theme.spacing.md }}>
      <TouchableOpacity 
        style={getSocialButtonStyle()} 
        onPress={() => promptAsync()}
        activeOpacity={0.8}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: theme.borderRadius.full,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.sm,
          }}
        >
          <Ionicons name="logo-google" size={18} color="#DB4437" />
        </View>
        <Text
          style={{
            fontSize: theme.typography.fontSizes.base,
            fontWeight: theme.typography.fontWeights.medium,
            color: theme.colors.text.primary,
          }}
        >
          Continue with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={getSocialButtonStyle()}
        activeOpacity={0.8}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: theme.borderRadius.full,
            backgroundColor: "#4267B2",
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.sm,
          }}
        >
          <Ionicons name="logo-facebook" size={18} color="#fff" />
        </View>
        <Text
          style={{
            fontSize: theme.typography.fontSizes.base,
            fontWeight: theme.typography.fontWeights.medium,
            color: theme.colors.text.primary,
          }}
        >
          Continue with Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
}
