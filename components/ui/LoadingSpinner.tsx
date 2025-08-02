import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  color?: string;
  style?: any;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
}

export function LoadingSpinner({
  size = "md",
  color,
  style,
  variant = "default",
}: LoadingSpinnerProps) {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);
  
  const getSize = () => {
    if (typeof size === "number") return size;
    
    switch (size) {
      case "xs":
        return 16;
      case "sm":
        return 20;
      case "md":
        return 24;
      case "lg":
        return 32;
      case "xl":
        return 40;
      default:
        return 24;
    }
  };

  const getSpinnerColor = () => {
    if (color) return color;

    switch (variant) {
      case "primary":
        return theme.colors.brand.primary;
      case "secondary":
        return theme.colors.text.secondary;
      case "success":
        return theme.colors.semantic.success;
      case "warning":
        return theme.colors.semantic.warning;
      case "error":
        return theme.colors.semantic.error;
      default:
        return theme.colors.brand.primary;
    }
  };

  const spinnerSize = getSize();
  const spinnerColor = getSpinnerColor();

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000 }), 
      -1, 
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.spinner,
          animatedStyle,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderRadius: spinnerSize / 2,
            borderWidth: Math.max(2, spinnerSize / 12),
            borderColor: theme.isDark 
              ? `${spinnerColor}30` 
              : `${spinnerColor}20`,
            borderTopColor: spinnerColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    // Dynamic styles applied inline
  },
});
