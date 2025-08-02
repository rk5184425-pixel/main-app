import React from "react";
import { View, ViewStyle } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";

interface ProgressProps {
  value: number; // 0-100
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  showLabel?: boolean;
  animated?: boolean;
  style?: ViewStyle;
}

export function Progress({
  value,
  size = "md",
  variant = "default",
  showLabel = false,
  animated = true,
  style,
}: ProgressProps) {
  const { theme } = useTheme();
  const progress = useSharedValue(0);

  React.useEffect(() => {
    const clampedValue = Math.max(0, Math.min(100, value));
    if (animated) {
      progress.value = withTiming(clampedValue / 100, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = clampedValue / 100;
    }
  }, [value, animated]);

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { height: 4, borderRadius: 2 };
      case "lg":
        return { height: 12, borderRadius: 6 };
      default: // md
        return { height: 8, borderRadius: 4 };
    }
  };

  const getVariantColor = () => {
    switch (variant) {
      case "success":
        return theme.colors.success;
      case "warning":
        return theme.colors.warning;
      case "error":
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.muted,
    overflow: "hidden",
    ...getSizeStyles(),
  };

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const progressBarStyle: ViewStyle = {
    height: "100%",
    backgroundColor: getVariantColor(),
    borderRadius: getSizeStyles().borderRadius,
  };

  return (
    <View style={[containerStyle, style]}>
      <Animated.View style={[progressBarStyle, progressAnimatedStyle]} />
    </View>
  );
}
