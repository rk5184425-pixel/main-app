import React from "react";
import { TextInput, TextInputProps, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface InputProps extends TextInputProps {
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
}

export function Input({ 
  variant = "default", 
  size = "md", 
  style, 
  ...props 
}: InputProps) {
  const { theme } = useTheme();

  const getInputStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      color: theme.colors.text,
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.normal,
    };

    // Size variations
    const sizeMap = {
      sm: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        fontSize: theme.typography.fontSizes.sm,
        minHeight: 36,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.typography.fontSizes.base,
        minHeight: 44,
      },
      lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        fontSize: theme.typography.fontSizes.lg,
        minHeight: 52,
      },
    };

    // Variant styles
    let variantStyle = {};
    switch (variant) {
      case "outline":
        variantStyle = {
          borderColor: theme.colors.border,
          backgroundColor: "transparent",
        };
        break;
      case "filled":
        variantStyle = {
          borderColor: "transparent",
          backgroundColor: theme.colors.muted,
        };
        break;
      default:
        variantStyle = {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        };
    }

    return {
      ...baseStyle,
      ...sizeMap[size],
      ...variantStyle,
    };
  };

  return (
    <TextInput
      style={[getInputStyle(), style]}
      placeholderTextColor={theme.colors.textMuted}
      {...props}
    />
  );
}
