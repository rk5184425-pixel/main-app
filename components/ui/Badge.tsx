import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

export function Badge({ 
  children, 
  variant = "default", 
  size = "md", 
  style 
}: BadgeProps) {
  const { theme } = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingHorizontal: theme.spacing.xs,
          paddingVertical: 2,
          fontSize: theme.typography.fontSizes.xs,
          borderRadius: theme.borderRadius.sm,
        };
      case "lg":
        return {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.xs,
          fontSize: theme.typography.fontSizes.base,
          borderRadius: theme.borderRadius.md,
        };
      default: // md
        return {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs / 2,
          fontSize: theme.typography.fontSizes.sm,
          borderRadius: theme.borderRadius.sm,
        };
    }
  };

  const getVariantStyles = () => {
    const sizeStyles = getSizeStyles();
    
    switch (variant) {
      case "success":
        return {
          container: {
            backgroundColor: `${theme.colors.success}20`,
            borderWidth: 1,
            borderColor: theme.colors.success,
          },
          text: { color: theme.colors.success },
        };
      case "warning":
        return {
          container: {
            backgroundColor: `${theme.colors.warning}20`,
            borderWidth: 1,
            borderColor: theme.colors.warning,
          },
          text: { color: theme.colors.warning },
        };
      case "error":
        return {
          container: {
            backgroundColor: `${theme.colors.error}20`,
            borderWidth: 1,
            borderColor: theme.colors.error,
          },
          text: { color: theme.colors.error },
        };
      case "info":
        return {
          container: {
            backgroundColor: `${theme.colors.info}20`,
            borderWidth: 1,
            borderColor: theme.colors.info,
          },
          text: { color: theme.colors.info },
        };
      case "outline":
        return {
          container: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: theme.colors.border,
          },
          text: { color: theme.colors.text },
        };
      default:
        return {
          container: {
            backgroundColor: `${theme.colors.primary}20`,
            borderWidth: 1,
            borderColor: theme.colors.primary,
          },
          text: { color: theme.colors.primary },
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const containerStyle: ViewStyle = {
    alignSelf: "flex-start",
    paddingHorizontal: sizeStyles.paddingHorizontal,
    paddingVertical: sizeStyles.paddingVertical,
    borderRadius: sizeStyles.borderRadius,
    ...variantStyles.container,
  };

  const textStyle: TextStyle = {
    fontSize: sizeStyles.fontSize,
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: "center",
    ...variantStyles.text,
  };

  return (
    <View style={[containerStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}
