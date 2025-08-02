import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";

interface CardProps {
  children: React.ReactNode;
  style?: any;
  animated?: boolean;
  delay?: number;
  variant?: "default" | "elevated" | "outline" | "ghost";
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: any;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: any;
  size?: "sm" | "md" | "lg";
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: any;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: any;
}

export function Card({
  children,
  style,
  animated = false,
  delay = 0,
  variant = "default",
}: CardProps) {
  const { theme } = useTheme();

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
    };

    let variantStyle = {};

    switch (variant) {
      case "default":
        variantStyle = {
          backgroundColor: theme.colors.surface.primary,
          borderWidth: 1,
          borderColor: theme.colors.border.primary,
          ...theme.shadows.md,
        };
        break;
      case "elevated":
        variantStyle = {
          backgroundColor: theme.colors.surface.elevated,
          ...theme.shadows.lg,
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
    }

    return {
      ...baseStyle,
      ...variantStyle,
    };
  };

  if (animated) {
    return (
      <Animated.View
        entering={FadeInUp.delay(delay).springify()}
        style={[getCardStyle(), style]}
      >
        {children}
      </Animated.View>
    );
  }

  return <View style={[getCardStyle(), style]}>{children}</View>;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[{
      flexDirection: "column",
      marginBottom: theme.spacing.lg,
    }, style]}>
      {children}
    </View>
  );
}

export function CardTitle({ children, style, size = "md" }: CardTitleProps) {
  const { theme } = useTheme();
  
  const getTitleStyle = () => {
    let fontSize = theme.typography.fontSizes['2xl'];
    
    switch (size) {
      case "sm":
        fontSize = theme.typography.fontSizes.lg;
        break;
      case "md":
        fontSize = theme.typography.fontSizes['2xl'];
        break;
      case "lg":
        fontSize = theme.typography.fontSizes['3xl'];
        break;
    }

    return {
      fontSize,
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
      lineHeight: fontSize * theme.typography.lineHeights.tight,
    };
  };

  return <Text style={[getTitleStyle(), style]}>{children}</Text>;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  const { theme } = useTheme();
  
  return (
    <Text style={[{
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.secondary,
      lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
    }, style]}>
      {children}
    </Text>
  );
}

export function CardContent({ children, style }: CardContentProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[{
      paddingTop: 0,
    }, style]}>
      {children}
    </View>
  );
}
