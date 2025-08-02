import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTheme } from "../../contexts/ThemeContext";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "sm" | "md" | "lg" | "icon";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  fullWidth?: boolean;
}

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: ButtonProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95);
      opacity.value = withTiming(0.8, { duration: 100 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 100 });
    });

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius.lg,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexDirection: "row" as const,
      ...theme.shadows.md,
    };

    let variantStyle = {};
    let sizeStyle = {};

    // Variant styles
    switch (variant) {
      case "primary":
        variantStyle = {
          backgroundColor: theme.colors.brand.primary,
        };
        break;
      case "secondary":
        variantStyle = {
          backgroundColor: theme.colors.interactive.secondary,
        };
        break;
      case "outline":
        variantStyle = {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: theme.colors.border.primary,
          shadowOpacity: 0,
          elevation: 0,
        };
        break;
      case "ghost":
        variantStyle = {
          backgroundColor: "transparent",
          shadowOpacity: 0,
          elevation: 0,
        };
        break;
      case "success":
        variantStyle = {
          backgroundColor: theme.colors.semantic.success,
        };
        break;
      case "warning":
        variantStyle = {
          backgroundColor: theme.colors.semantic.warning,
        };
        break;
      case "error":
        variantStyle = {
          backgroundColor: theme.colors.semantic.error,
        };
        break;
      case "info":
        variantStyle = {
          backgroundColor: theme.colors.semantic.info,
        };
        break;
    }

    // Size styles
    switch (size) {
      case "sm":
        sizeStyle = {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          minHeight: 40,
        };
        break;
      case "md":
        sizeStyle = {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          minHeight: 48,
        };
        break;
      case "lg":
        sizeStyle = {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.lg,
          minHeight: 56,
        };
        break;
      case "icon":
        sizeStyle = {
          padding: theme.spacing.md,
          minHeight: 48,
          minWidth: 48,
        };
        break;
    }

    const disabledStyle = disabled ? {
      opacity: 0.5,
      shadowOpacity: 0,
      elevation: 0,
    } : {};

    const fullWidthStyle = fullWidth ? { width: "100%" } : {};

    return {
      ...baseStyle,
      ...variantStyle,
      ...sizeStyle,
      ...disabledStyle,
      ...fullWidthStyle,
    };
  };

  const getTextStyle = () => {
    let textColor = theme.colors.text.inverse;
    let fontSize = theme.typography.fontSizes.base;

    // Variant text colors
    switch (variant) {
      case "outline":
      case "ghost":
        textColor = theme.colors.text.primary;
        break;
    }

    // Size text styles
    switch (size) {
      case "sm":
        fontSize = theme.typography.fontSizes.sm;
        break;
      case "lg":
        fontSize = theme.typography.fontSizes.lg;
        break;
    }

    return {
      color: textColor,
      fontSize,
      fontWeight: theme.typography.fontWeights.semibold,
      textAlign: "center" as const,
    };
  };

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={tap}>
        <AnimatedTouchable
          onPress={onPress}
          disabled={disabled || loading}
          style={[animatedStyle, getButtonStyle(), style]}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator 
              color={variant === "outline" || variant === "ghost" ? theme.colors.text.primary : theme.colors.text.inverse} 
              size="small" 
            />
          ) : (
            <Text style={getTextStyle()}>{children}</Text>
          )}
        </AnimatedTouchable>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
