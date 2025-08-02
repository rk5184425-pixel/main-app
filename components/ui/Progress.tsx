import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";

interface ProgressProps {
  value: number;
  style?: any;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  showGlow?: boolean;
}

export function Progress({ 
  value, 
  style, 
  variant = "default", 
  size = "md", 
  showGlow = true 
}: ProgressProps) {
  const { theme } = useTheme();
  const progressValue = Math.min(100, Math.max(0, value));
  const animatedWidth = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withSpring(progressValue, {
      damping: 15,
      stiffness: 100,
    });

    if (progressValue > 0 && showGlow) {
      glowOpacity.value = withTiming(1, { duration: 300 });
    } else {
      glowOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [progressValue, showGlow]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const getContainerStyle = () => {
    const baseStyle = {
      width: "100%",
      backgroundColor: theme.colors.surface.secondary,
      borderRadius: theme.borderRadius.full,
      overflow: "hidden" as const,
      position: "relative" as const,
    };

    let sizeStyle = {};

    switch (size) {
      case "sm":
        sizeStyle = {
          height: 4,
        };
        break;
      case "md":
        sizeStyle = {
          height: 8,
        };
        break;
      case "lg":
        sizeStyle = {
          height: 12,
        };
        break;
    }

    return {
      ...baseStyle,
      ...sizeStyle,
    };
  };

  const getProgressColor = () => {
    switch (variant) {
      case "success":
        return theme.colors.semantic.success;
      case "warning":
        return theme.colors.semantic.warning;
      case "danger":
        return theme.colors.semantic.error;
      case "info":
        return theme.colors.semantic.info;
      default:
        return theme.colors.brand.primary;
    }
  };

  const getGlowColor = () => {
    const progressColor = getProgressColor();
    // Create a semi-transparent version of the progress color for glow
    const alpha = theme.isDark ? 0.6 : 0.4;
    
    switch (variant) {
      case "success":
        return theme.isDark ? "rgba(52, 211, 153, 0.6)" : "rgba(16, 185, 129, 0.4)";
      case "warning":
        return theme.isDark ? "rgba(251, 191, 36, 0.6)" : "rgba(245, 158, 11, 0.4)";
      case "danger":
        return theme.isDark ? "rgba(248, 113, 113, 0.6)" : "rgba(239, 68, 68, 0.4)";
      case "info":
        return theme.isDark ? "rgba(96, 165, 250, 0.6)" : "rgba(59, 130, 246, 0.4)";
      default:
        return theme.isDark ? "rgba(96, 165, 250, 0.6)" : "rgba(59, 130, 246, 0.4)";
    }
  };

  return (
    <View style={[getContainerStyle(), style]}>
      <Animated.View
        style={[
          styles.progress,
          animatedStyle,
          { 
            backgroundColor: getProgressColor(),
            borderRadius: theme.borderRadius.full,
          },
        ]}
      />
      {showGlow && (
        <Animated.View
          style={[
            styles.glow,
            glowStyle,
            {
              backgroundColor: getGlowColor(),
              width: `${progressValue}%`,
              borderRadius: theme.borderRadius.full,
              shadowColor: getProgressColor(),
              ...theme.shadows.sm,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  glow: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
});
