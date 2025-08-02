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
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "scan"
    | "danger"
    | "warning"
    | "safe";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export function Button({
  children,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  style,
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

    switch (variant) {
      case "destructive":
        variantStyle = {
          backgroundColor: theme.colors.error,
          shadowColor: theme.colors.error,
        };
        break;
      case "outline":
        variantStyle = {
          borderWidth: 2,
          borderColor: theme.colors.border,
          backgroundColor: "transparent",
          shadowOpacity: 0.1,
        };
        break;
      case "secondary":
        variantStyle = {
          backgroundColor: theme.colors.secondary,
          shadowColor: theme.colors.secondary,
        };
        break;
      case "ghost":
        variantStyle = {
          backgroundColor: "transparent",
          shadowOpacity: 0,
        };
        break;
      case "scan":
        variantStyle = {
          backgroundColor: theme.colors.success,
          shadowColor: theme.colors.success,
        };
        break;
      case "danger":
        variantStyle = {
          backgroundColor: theme.colors.error,
          shadowColor: theme.colors.error,
        };
        break;
      case "warning":
        variantStyle = {
          backgroundColor: theme.colors.warning,
          shadowColor: theme.colors.warning,
        };
        break;
      case "safe":
        variantStyle = {
          backgroundColor: theme.colors.success,
          shadowColor: theme.colors.success,
        };
        break;
      default:
        variantStyle = {
          backgroundColor: theme.colors.primary,
          shadowColor: theme.colors.primary,
        };
    }

    switch (size) {
      case "sm":
        sizeStyle = {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          minHeight: 40,
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
          padding: theme.spacing.sm,
          minHeight: 48,
          minWidth: 48,
        };
        break;
      default:
        sizeStyle = {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          minHeight: 48,
        };
    }

    if (disabled) {
      variantStyle = {
        ...variantStyle,
        opacity: 0.5,
        shadowOpacity: 0,
      };
    }

    return { ...baseStyle, ...variantStyle, ...sizeStyle };
  };

  const getTextStyle = () => {
    let textColor = "#ffffff";
    let fontSize = theme.typography.fontSizes.base;

    switch (variant) {
      case "outline":
        textColor = theme.colors.text;
        break;
      case "ghost":
        textColor = theme.colors.text;
        break;
      default:
        textColor = "#ffffff";
    }

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
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={getTextStyle()}>{children}</Text>
          )}
        </AnimatedTouchable>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
