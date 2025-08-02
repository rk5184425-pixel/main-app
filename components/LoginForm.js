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
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/Button";
import OAuthButtons from "./OAuthButtons";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSwitchToSignup, 
  onForgotPassword, 
  onLoginSuccess 
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth?.loading);
  const token = useSelector((state: any) => state.auth?.token);
  
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
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    try {
      const result = await dispatch(login({ email, password }));
      if (result.type === "auth/login/fulfilled") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login successful!",
        });
        onLoginSuccess();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Login failed. Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Email */}
      <Text style={[styles.label, { 
        color: theme.colors.text,
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.medium,
        marginBottom: theme.spacing.xs,
      }]}>
        Email Address
      </Text>
      <View style={[styles.inputWrapper, { 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.md,
      }]}>
        <Mail size={20} color={theme.colors.textMuted} />
        <TextInput
          style={[styles.input, { 
            color: theme.colors.text,
            fontSize: theme.typography.fontSizes.base,
          }]}
          placeholder="Enter your email"
          placeholderTextColor={theme.colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <Text style={[styles.label, { 
        color: theme.colors.text,
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.medium,
        marginBottom: theme.spacing.xs,
      }]}>
        Password
      </Text>
      <View style={[styles.inputWrapper, { 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.sm,
      }]}>
        <Lock size={20} color={theme.colors.textMuted} />
        <TextInput
          style={[styles.input, { 
            color: theme.colors.text,
            fontSize: theme.typography.fontSizes.base,
          }]}
          placeholder="Enter your password"
          placeholderTextColor={theme.colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          {showPassword ? (
            <EyeOff size={20} color={theme.colors.textMuted} />
          ) : (
            <Eye size={20} color={theme.colors.textMuted} />
          )}
        </TouchableOpacity>
      </View>

      {/* Remember Me & Forgot Password */}
      <View style={[styles.optionsRow, { marginBottom: theme.spacing.lg }]}>
        <TouchableOpacity
          style={styles.rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, { 
            borderColor: theme.colors.border,
            backgroundColor: rememberMe ? theme.colors.primary : "transparent",
          }]}>
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={[styles.rememberText, { 
            color: theme.colors.textSecondary,
            fontSize: theme.typography.fontSizes.sm,
          }]}>
            Remember me
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={[styles.forgotText, { 
            color: theme.colors.primary,
            fontSize: theme.typography.fontSizes.sm,
          }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <Button
        onPress={handleLogin}
        loading={loading}
        style={{ marginBottom: theme.spacing.lg }}
      >
        Sign In
      </Button>

      {/* Divider */}
      <View style={[styles.divider, { marginBottom: theme.spacing.lg }]}>
        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
        <Text style={[styles.dividerText, { 
          color: theme.colors.textMuted,
          backgroundColor: theme.colors.background[0],
          fontSize: theme.typography.fontSizes.sm,
        }]}>
          or continue with
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
      </View>

      {/* OAuth Buttons */}
      <OAuthButtons />

      {/* Sign Up Link */}
      <View style={[styles.signupRow, { marginTop: theme.spacing.lg }]}>
        <Text style={[styles.signupText, { 
          color: theme.colors.textSecondary,
          fontSize: theme.typography.fontSizes.base,
        }]}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={onSwitchToSignup}>
          <Text style={[styles.signupLink, { 
            color: theme.colors.primary,
            fontSize: theme.typography.fontSizes.base,
            fontWeight: theme.typography.fontWeights.semibold,
          }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  rememberText: {},
  forgotText: {},
  divider: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {},
  signupLink: {},
});

export default LoginForm;
