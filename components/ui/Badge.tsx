import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  style?: any;
}

export function Badge({ children, variant = "default", size = "md", style }: BadgeProps) {
  const { theme } = useTheme();

  const getBadgeStyle = () => {
    const baseStyle = {
      alignSelf: "flex-start" as const,
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    };

    let sizeStyle = {};
    let variantStyle = {};

    // Size styles
    switch (size) {
      case "sm":
        sizeStyle = {
          paddingHorizontal: theme.spacing.xs,
          paddingVertical: 2,
          minHeight: 20,
        };
        break;
      case "md":
        sizeStyle = {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          minHeight: 24,
        };
        break;
      case "lg":
        sizeStyle = {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          minHeight: 32,
        };
        break;
    }

    // Variant styles
    switch (variant) {
      case "default":
        variantStyle = {
          backgroundColor: theme.colors.brand.primary,
          borderColor: theme.colors.brand.primary,
        };
        break;
      case "secondary":
        variantStyle = {
          backgroundColor: theme.colors.surface.secondary,
          borderColor: theme.colors.border.primary,
        };
        break;
      case "destructive":
        variantStyle = {
          backgroundColor: theme.colors.semantic.error,
          borderColor: theme.colors.semantic.error,
        };
        break;
      case "success":
        variantStyle = {
          backgroundColor: theme.colors.semantic.success,
          borderColor: theme.colors.semantic.success,
        };
        break;
      case "warning":
        variantStyle = {
          backgroundColor: theme.colors.semantic.warning,
          borderColor: theme.colors.semantic.warning,
        };
        break;
      case "info":
        variantStyle = {
          backgroundColor: theme.colors.semantic.info,
          borderColor: theme.colors.semantic.info,
        };
        break;
      case "outline":
        variantStyle = {
          backgroundColor: "transparent",
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

  const getTextStyle = () => {
    let fontSize = theme.typography.fontSizes.xs;
    let fontWeight = theme.typography.fontWeights.semibold;

    switch (size) {
      case "sm":
        fontSize = theme.typography.fontSizes.xs;
        break;
      case "md":
        fontSize = theme.typography.fontSizes.sm;
        break;
      case "lg":
        fontSize = theme.typography.fontSizes.base;
        break;
    }

    let textColor = theme.colors.text.inverse;

    switch (variant) {
      case "secondary":
      case "outline":
        textColor = theme.colors.text.primary;
        break;
      case "default":
      case "destructive":
      case "success":
      case "warning":
      case "info":
        textColor = theme.colors.text.inverse;
        break;
    }

    return {
      fontSize,
      fontWeight,
      color: textColor,
      textAlign: "center" as const,
    };
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={getTextStyle()}>{children}</Text>
    </View>
  );
}
