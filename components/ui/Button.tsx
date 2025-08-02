import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../contexts/ThemeContext";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
    | "info"
    | "gradient";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  leftIcon,
  rightIcon,
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
      scale.value = withSpring(0.96);
      opacity.value = withTiming(0.8, { duration: 100 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 100 });
    });

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius.xl,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexDirection: "row" as const,
      overflow: "hidden" as const,
    };

    let variantStyle = {};
    let sizeStyle = {};

    // Size styles
    switch (size) {
      case "xs":
        sizeStyle = {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          minHeight: 32,
        };
        break;
      case "sm":
        sizeStyle = {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          minHeight: 36,
        };
        break;
      case "md":
        sizeStyle = {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          minHeight: 44,
        };
        break;
      case "lg":
        sizeStyle = {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.lg,
          minHeight: 52,
        };
        break;
      case "xl":
        sizeStyle = {
          paddingHorizontal: theme.spacing['2xl'],
          paddingVertical: theme.spacing.xl,
          minHeight: 60,
        };
        break;
      case "icon":
        sizeStyle = {
          width: 44,
          height: 44,
          paddingHorizontal: 0,
          paddingVertical: 0,
        };
        break;
    }

    // Variant styles
    switch (variant) {
      case "primary":
        variantStyle = {
          backgroundColor: theme.colors.brand.primary,
          ...theme.shadows.md,
        };
        break;
      case "secondary":
        variantStyle = {
          backgroundColor: theme.colors.surface.secondary,
          borderWidth: 1,
          borderColor: theme.colors.border.primary,
          ...theme.shadows.sm,
        };
        break;
      case "outline":
        variantStyle = {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: theme.colors.border.primary,
        };
        break;
      case "ghost":
        variantStyle = {
          backgroundColor: "transparent",
        };
        break;
      case "success":
        variantStyle = {
          backgroundColor: theme.colors.semantic.success,
          ...theme.shadows.md,
        };
        break;
      case "warning":
        variantStyle = {
          backgroundColor: theme.colors.semantic.warning,
          ...theme.shadows.md,
        };
        break;
      case "error":
        variantStyle = {
          backgroundColor: theme.colors.semantic.error,
          ...theme.shadows.md,
        };
        break;
      case "info":
        variantStyle = {
          backgroundColor: theme.colors.semantic.info,
          ...theme.shadows.md,
        };
        break;
      case "gradient":
        variantStyle = {
          ...theme.shadows.lg,
        };
        break;
    }

    if (disabled) {
      variantStyle = {
        ...variantStyle,
        backgroundColor: theme.colors.interactive.disabled,
        borderColor: theme.colors.border.secondary,
        opacity: 0.6,
        shadowOpacity: 0,
        elevation: 0,
      };
    }

    if (fullWidth) {
      sizeStyle = {
        ...sizeStyle,
        width: "100%",
      };
    }

    return {
      ...baseStyle,
      ...variantStyle,
      ...sizeStyle,
    };
  };

  const getTextStyle = () => {
    let textSize = theme.typography.fontSizes.base;
    let fontWeight = theme.typography.fontWeights.semibold;

    switch (size) {
      case "xs":
        textSize = theme.typography.fontSizes.xs;
        break;
      case "sm":
        textSize = theme.typography.fontSizes.sm;
        break;
      case "md":
        textSize = theme.typography.fontSizes.base;
        break;
      case "lg":
        textSize = theme.typography.fontSizes.lg;
        fontWeight = theme.typography.fontWeights.bold;
        break;
      case "xl":
        textSize = theme.typography.fontSizes.xl;
        fontWeight = theme.typography.fontWeights.bold;
        break;
    }

    let textColor = theme.colors.text.inverse;

    switch (variant) {
      case "secondary":
      case "outline":
      case "ghost":
        textColor = theme.colors.text.primary;
        break;
      case "primary":
      case "success":
      case "warning":
      case "error":
      case "info":
      case "gradient":
        textColor = theme.colors.text.inverse;
        break;
    }

    if (disabled) {
      textColor = theme.colors.text.disabled;
    }

    return {
      fontSize: textSize,
      fontWeight,
      color: textColor,
      textAlign: "center" as const,
    };
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === "outline" || variant === "ghost" || variant === "secondary" 
            ? theme.colors.text.primary 
            : theme.colors.text.inverse
          } 
        />
      ) : (
        <Text style={getTextStyle()}>{children}</Text>
      )}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  );

  if (variant === "gradient") {
    return (
      <GestureDetector gesture={tap}>
        <AnimatedLinearGradient
          colors={theme.colors.brand.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[getButtonStyle(), animatedStyle, style]}
        >
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={styles.gradientTouchable}
            activeOpacity={0.8}
          >
            {renderContent()}
          </TouchableOpacity>
        </AnimatedLinearGradient>
      </GestureDetector>
    );
  }

  return (
    <GestureDetector gesture={tap}>
      <AnimatedTouchable
        style={[getButtonStyle(), animatedStyle, style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {renderContent()}
      </AnimatedTouchable>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  gradientTouchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
