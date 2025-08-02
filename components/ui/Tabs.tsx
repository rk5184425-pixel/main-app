import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  style?: any;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
}

interface TabsListProps {
  children: React.ReactNode;
  style?: any;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  style?: any;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  style?: any;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  variant: "default" | "pills" | "underline";
  size: "sm" | "md" | "lg";
}>({
  value: "",
  onValueChange: () => {},
  variant: "default",
  size: "md",
});

export function Tabs({ 
  value, 
  onValueChange, 
  children, 
  style, 
  variant = "default",
  size = "md" 
}: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange, variant, size }}>
      <View style={[styles.tabs, style]}>{children}</View>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, style }: TabsListProps) {
  const { theme } = useTheme();
  const { variant, size } = React.useContext(TabsContext);

  const getListStyle = () => {
    const baseStyle = {
      flexDirection: "row" as const,
      marginBottom: theme.spacing.md,
    };

    let sizeStyle = {};
    let variantStyle = {};

    // Size styles
    switch (size) {
      case "sm":
        sizeStyle = {
          height: 36,
        };
        break;
      case "md":
        sizeStyle = {
          height: 44,
        };
        break;
      case "lg":
        sizeStyle = {
          height: 52,
        };
        break;
    }

    // Variant styles
    switch (variant) {
      case "default":
      case "pills":
        variantStyle = {
          backgroundColor: theme.colors.surface.secondary,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xs,
        };
        break;
      case "underline":
        variantStyle = {
          backgroundColor: "transparent",
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border.primary,
        };
        break;
    }

    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
    };
  };

  return <View style={[getListStyle(), style]}>{children}</View>;
}

export function TabsTrigger({
  value: triggerValue,
  children,
  style,
}: TabsTriggerProps) {
  const { theme } = useTheme();
  const { value, onValueChange, variant, size } = React.useContext(TabsContext);
  const isActive = value === triggerValue;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onValueChange(triggerValue);
  };

  const getTriggerStyle = () => {
    const baseStyle = {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    };

    let sizeStyle = {};
    let variantStyle = {};

    // Size styles
    switch (size) {
      case "sm":
        sizeStyle = {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
        };
        break;
      case "md":
        sizeStyle = {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        };
        break;
      case "lg":
        sizeStyle = {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
        };
        break;
    }

    // Variant styles
    switch (variant) {
      case "default":
      case "pills":
        variantStyle = {
          borderRadius: theme.borderRadius.lg,
          backgroundColor: isActive 
            ? theme.colors.brand.primary 
            : "transparent",
          ...theme.shadows.sm,
        };
        break;
      case "underline":
        variantStyle = {
          backgroundColor: "transparent",
          borderBottomWidth: 2,
          borderBottomColor: isActive 
            ? theme.colors.brand.primary 
            : "transparent",
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
    let fontSize = theme.typography.fontSizes.sm;
    
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

    return {
      fontSize,
      fontWeight: isActive 
        ? theme.typography.fontWeights.semibold 
        : theme.typography.fontWeights.medium,
      color: isActive 
        ? (variant === "underline" ? theme.colors.brand.primary : theme.colors.text.inverse)
        : theme.colors.text.secondary,
    };
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        style={[getTriggerStyle(), style]}
        activeOpacity={0.8}
      >
        <Text style={getTextStyle()}>
          {children}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function TabsContent({
  value: contentValue,
  children,
  style,
}: TabsContentProps) {
  const { theme } = useTheme();
  const { value } = React.useContext(TabsContext);

  if (value !== contentValue) {
    return null;
  }

  return (
    <View 
      style={[
        {
          marginTop: theme.spacing.sm,
        }, 
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    width: "100%",
  },
});
