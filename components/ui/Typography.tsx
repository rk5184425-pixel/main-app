import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface TypographyProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label";
  color?: "primary" | "secondary" | "muted" | "error" | "success" | "warning";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

export function Typography({
  variant = "body",
  color,
  weight,
  align = "left",
  style,
  children,
  ...props
}: TypographyProps) {
  const { theme } = useTheme();

  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "h1":
        return {
          fontSize: theme.typography.fontSizes['4xl'],
          fontWeight: theme.typography.fontWeights.bold,
          lineHeight: theme.typography.lineHeights.tight,
        };
      case "h2":
        return {
          fontSize: theme.typography.fontSizes['3xl'],
          fontWeight: theme.typography.fontWeights.bold,
          lineHeight: theme.typography.lineHeights.tight,
        };
      case "h3":
        return {
          fontSize: theme.typography.fontSizes['2xl'],
          fontWeight: theme.typography.fontWeights.semibold,
          lineHeight: theme.typography.lineHeights.tight,
        };
      case "h4":
        return {
          fontSize: theme.typography.fontSizes.xl,
          fontWeight: theme.typography.fontWeights.semibold,
          lineHeight: theme.typography.lineHeights.normal,
        };
      case "caption":
        return {
          fontSize: theme.typography.fontSizes.sm,
          fontWeight: theme.typography.fontWeights.normal,
          lineHeight: theme.typography.lineHeights.normal,
        };
      case "label":
        return {
          fontSize: theme.typography.fontSizes.sm,
          fontWeight: theme.typography.fontWeights.medium,
          lineHeight: theme.typography.lineHeights.normal,
        };
      default: // body
        return {
          fontSize: theme.typography.fontSizes.base,
          fontWeight: theme.typography.fontWeights.normal,
          lineHeight: theme.typography.lineHeights.normal,
        };
    }
  };

  const getTextColor = (): string => {
    if (color) {
      switch (color) {
        case "primary":
          return theme.colors.primary;
        case "secondary":
          return theme.colors.textSecondary;
        case "muted":
          return theme.colors.textMuted;
        case "error":
          return theme.colors.error;
        case "success":
          return theme.colors.success;
        case "warning":
          return theme.colors.warning;
        default:
          return theme.colors.text;
      }
    }
    return theme.colors.text;
  };

  const getTextWeight = (): string => {
    if (weight) {
      return theme.typography.fontWeights[weight];
    }
    return getVariantStyle().fontWeight as string;
  };

  const textStyle: TextStyle = {
    ...getVariantStyle(),
    color: getTextColor(),
    fontWeight: getTextWeight(),
    textAlign: align,
  };

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
}