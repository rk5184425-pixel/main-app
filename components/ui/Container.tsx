import React from "react";
import { View, ViewStyle, ViewProps } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  direction?: "row" | "column";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  flex?: number;
  centered?: boolean;
}

export function Container({
  children,
  padding = "none",
  margin = "none",
  gap = "none",
  direction = "column",
  align = "stretch",
  justify = "flex-start",
  flex,
  centered = false,
  style,
  ...props
}: ContainerProps) {
  const { theme } = useTheme();

  const getSpacing = (size: string) => {
    const spacingMap = {
      none: 0,
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
      "2xl": theme.spacing["2xl"],
    };
    return spacingMap[size as keyof typeof spacingMap] || 0;
  };

  const containerStyle: ViewStyle = {
    flexDirection: direction,
    alignItems: centered ? "center" : align,
    justifyContent: centered ? "center" : justify,
    padding: getSpacing(padding),
    margin: getSpacing(margin),
    gap: getSpacing(gap),
    ...(flex !== undefined && { flex }),
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
}