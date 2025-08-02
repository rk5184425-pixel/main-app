import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "warning" | "success" | "info";
  style?: any;
  size?: "sm" | "md" | "lg";
}

interface AlertTitleProps {
  children: React.ReactNode;
  style?: any;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: any;
}

export function Alert({ children, variant = "default", style, size = "md" }: AlertProps) {
  const { theme } = useTheme();

  const getAlertStyle = () => {
    const baseStyle = {
      flexDirection: "row" as const,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      ...theme.shadows.sm,
    };

    let sizeStyle = {};
    let variantStyle = {};

    // Size styles
    switch (size) {
      case "sm":
        sizeStyle = {
          padding: theme.spacing.sm,
        };
        break;
      case "md":
        sizeStyle = {
          padding: theme.spacing.md,
        };
        break;
      case "lg":
        sizeStyle = {
          padding: theme.spacing.lg,
        };
        break;
    }

    // Variant styles
    switch (variant) {
      case "destructive":
        variantStyle = {
          backgroundColor: theme.colors.semantic.errorBg,
          borderColor: theme.colors.semantic.error,
        };
        break;
      case "warning":
        variantStyle = {
          backgroundColor: theme.colors.semantic.warningBg,
          borderColor: theme.colors.semantic.warning,
        };
        break;
      case "success":
        variantStyle = {
          backgroundColor: theme.colors.semantic.successBg,
          borderColor: theme.colors.semantic.success,
        };
        break;
      case "info":
        variantStyle = {
          backgroundColor: theme.colors.semantic.infoBg,
          borderColor: theme.colors.semantic.info,
        };
        break;
      default:
        variantStyle = {
          backgroundColor: theme.colors.surface.secondary,
          borderColor: theme.colors.border.primary,
        };
        break;
    }

    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
    };
  };

  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return "alert-circle";
      case "warning":
        return "warning";
      case "success":
        return "checkmark-circle";
      case "info":
        return "information-circle";
      default:
        return "information-circle";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "destructive":
        return theme.colors.semantic.error;
      case "warning":
        return theme.colors.semantic.warning;
      case "success":
        return theme.colors.semantic.success;
      case "info":
        return theme.colors.semantic.info;
      default:
        return theme.colors.text.secondary;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "md":
        return 20;
      case "lg":
        return 24;
      default:
        return 20;
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(15).stiffness(100)}
      exiting={FadeOutUp.springify().damping(15).stiffness(100)}
      style={[getAlertStyle(), style]}
    >
      <Ionicons
        name={getIcon() as any}
        size={getIconSize()}
        color={getIconColor()}
        style={[styles.icon, { marginRight: theme.spacing.sm }]}
      />
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
}

export function AlertTitle({ children, style }: AlertTitleProps) {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        {
          fontSize: theme.typography.fontSizes.base,
          fontWeight: theme.typography.fontWeights.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xs,
          lineHeight: theme.typography.lineHeights.tight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        {
          fontSize: theme.typography.fontSizes.sm,
          fontWeight: theme.typography.fontWeights.normal,
          color: theme.colors.text.secondary,
          lineHeight: theme.typography.lineHeights.relaxed,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
});
