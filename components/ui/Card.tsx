import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeInDown, SlideInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../contexts/ThemeContext";

interface CardProps {
  children: React.ReactNode;
  style?: any;
  animated?: boolean;
  delay?: number;
  variant?: "default" | "elevated" | "outline" | "ghost" | "glass" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: any;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: any;
  size?: "sm" | "md" | "lg" | "xl";
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
  size = "md",
}: CardProps) {
  const { theme } = useTheme();

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius['2xl'],
      overflow: "hidden" as const,
    };

    let variantStyle = {};
    let sizeStyle = {};

    // Size styles
    switch (size) {
      case "sm":
        sizeStyle = {
          padding: theme.spacing.md,
        };
        break;
      case "md":
        sizeStyle = {
          padding: theme.spacing.lg,
        };
        break;
      case "lg":
        sizeStyle = {
          padding: theme.spacing.xl,
        };
        break;
      case "xl":
        sizeStyle = {
          padding: theme.spacing['2xl'],
        };
        break;
    }

    // Variant styles
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
      case "glass":
        variantStyle = {
          backgroundColor: theme.colors.surface.glass,
          borderWidth: 1,
          borderColor: theme.colors.border.secondary,
          ...theme.shadows.sm,
        };
        break;
      case "gradient":
        variantStyle = {
          ...theme.shadows.lg,
        };
        break;
    }

    return {
      ...baseStyle,
      ...variantStyle,
      ...sizeStyle,
    };
  };

  const renderCard = () => {
    if (variant === "gradient") {
      return (
        <LinearGradient
          colors={theme.colors.background.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[getCardStyle(), style]}
        >
          {children}
        </LinearGradient>
      );
    }

    return <View style={[getCardStyle(), style]}>{children}</View>;
  };

  if (animated) {
    return (
      <Animated.View
        entering={FadeInUp.delay(delay).springify().damping(15).stiffness(100)}
      >
        {renderCard()}
      </Animated.View>
    );
  }

  return renderCard();
}

export function CardHeader({ children, style }: CardHeaderProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          marginBottom: theme.spacing.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardTitle({ children, style, size = "md" }: CardTitleProps) {
  const { theme } = useTheme();

  const getTitleStyle = () => {
    let fontSize = theme.typography.fontSizes.lg;
    let fontWeight = theme.typography.fontWeights.bold;

    switch (size) {
      case "sm":
        fontSize = theme.typography.fontSizes.base;
        fontWeight = theme.typography.fontWeights.semibold;
        break;
      case "md":
        fontSize = theme.typography.fontSizes.lg;
        fontWeight = theme.typography.fontWeights.bold;
        break;
      case "lg":
        fontSize = theme.typography.fontSizes.xl;
        fontWeight = theme.typography.fontWeights.bold;
        break;
      case "xl":
        fontSize = theme.typography.fontSizes['2xl'];
        fontWeight = theme.typography.fontWeights.extrabold;
        break;
    }

    return {
      fontSize,
      fontWeight,
      color: theme.colors.text.primary,
      lineHeight: theme.typography.lineHeights.tight,
      marginBottom: theme.spacing.xs,
    };
  };

  return <Text style={[getTitleStyle(), style]}>{children}</Text>;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
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

export function CardContent({ children, style }: CardContentProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          marginTop: theme.spacing.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
