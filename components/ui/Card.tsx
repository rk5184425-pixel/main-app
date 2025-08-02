import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: any;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: any;
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
  variant = "default",
  padding = "md"
}: CardProps) {
  const { theme } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.card,
    };

    // Add padding
    const paddingMap = {
      none: 0,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
    };
    
    baseStyle.padding = paddingMap[padding];

    // Apply variant styles
    switch (variant) {
      case "elevated":
        return {
          ...baseStyle,
          ...theme.shadows.md,
        };
      case "outline":
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: "transparent",
        };
      default:
        return {
          ...baseStyle,
          ...theme.shadows.sm,
        };
    }
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({ children, style }: CardTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#1f2937",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    flexDirection: "column",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: "#9ca3af",
    lineHeight: 22,
  },
  content: {
    paddingTop: 0,
  },
});
