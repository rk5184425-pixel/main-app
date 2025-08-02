import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { Eye, EyeOff } from "lucide-react-native";

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
  label?: string;
  error?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outline";
  required?: boolean;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  style,
  label,
  error,
  disabled = false,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  leftIcon,
  rightIcon,
  size = "md",
  variant = "default",
  required = false,
}: InputProps) {
  const { theme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = new Animated.Value(0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const getInputContainerStyle = () => {
    const baseStyle = {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 2,
    };

    let sizeStyle = {};
    let variantStyle = {};

    // Size styles
    switch (size) {
      case "sm":
        sizeStyle = {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: multiline ? theme.spacing.md : theme.spacing.sm,
          minHeight: 40,
        };
        break;
      case "md":
        sizeStyle = {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: multiline ? theme.spacing.lg : theme.spacing.md,
          minHeight: 48,
        };
        break;
      case "lg":
        sizeStyle = {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: multiline ? theme.spacing.xl : theme.spacing.lg,
          minHeight: 56,
        };
        break;
    }

    // Variant styles
    switch (variant) {
      case "default":
        variantStyle = {
          backgroundColor: theme.colors.surface.primary,
          borderColor: theme.colors.border.primary,
        };
        break;
      case "filled":
        variantStyle = {
          backgroundColor: theme.colors.surface.secondary,
          borderColor: "transparent",
        };
        break;
      case "outline":
        variantStyle = {
          backgroundColor: "transparent",
          borderColor: theme.colors.border.primary,
        };
        break;
    }

    let borderColor = variantStyle.borderColor;
    
    if (error) {
      borderColor = theme.colors.semantic.error;
    } else if (isFocused) {
      borderColor = theme.colors.border.focus;
    }

    if (disabled) {
      return {
        ...baseStyle,
        ...sizeStyle,
        borderColor: theme.colors.border.secondary,
        backgroundColor: theme.colors.surface.secondary,
        opacity: 0.6,
      };
    }

    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
      borderColor,
      ...theme.shadows.sm,
    };
  };

  const getInputStyle = () => {
    let fontSize = theme.typography.fontSizes.base;

    switch (size) {
      case "sm":
        fontSize = theme.typography.fontSizes.sm;
        break;
      case "md":
        fontSize = theme.typography.fontSizes.base;
        break;
      case "lg":
        fontSize = theme.typography.fontSizes.lg;
        break;
    }

    return {
      flex: 1,
      fontSize,
      fontWeight: theme.typography.fontWeights.normal,
      color: theme.colors.text.primary,
      textAlignVertical: multiline ? "top" as const : "center" as const,
    };
  };

  const getLabelStyle = () => {
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
      fontWeight: theme.typography.fontWeights.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    };
  };

  const getErrorStyle = () => {
    return {
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.normal,
      color: theme.colors.semantic.error,
      marginTop: theme.spacing.xs,
    };
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderPasswordToggle = () => {
    if (!secureTextEntry) return null;

    return (
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.passwordToggle}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {isPasswordVisible ? (
          <EyeOff size={20} color={theme.colors.text.tertiary} />
        ) : (
          <Eye size={20} color={theme.colors.text.tertiary} />
        )}
      </TouchableOpacity>
    );
  };

  const placeholderTextColor = disabled 
    ? theme.colors.text.disabled 
    : theme.colors.text.tertiary;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={getLabelStyle()}>
            {label}
            {required && <Text style={{ color: theme.colors.semantic.error }}> *</Text>}
          </Text>
        </View>
      )}
      
      <Animated.View
        style={[
          getInputContainerStyle(),
          {
            borderColor: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [
                error ? theme.colors.semantic.error : theme.colors.border.primary,
                error ? theme.colors.semantic.error : theme.colors.border.focus,
              ],
            }),
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={getInputStyle()}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {secureTextEntry && renderPasswordToggle()}
        {rightIcon && !secureTextEntry && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>
      
      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  passwordToggle: {
    marginLeft: 12,
    padding: 4,
  },
});
