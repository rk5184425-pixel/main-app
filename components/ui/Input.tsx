import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
}: InputProps) {
  const { theme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = () => {
    const baseStyle = {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 2,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: multiline ? theme.spacing.md : theme.spacing.sm,
      backgroundColor: theme.colors.surface.primary,
    };

    let borderColor = theme.colors.border.primary;
    
    if (error) {
      borderColor = theme.colors.semantic.error;
    } else if (isFocused) {
      borderColor = theme.colors.border.focus;
    }

    if (disabled) {
      return {
        ...baseStyle,
        borderColor: theme.colors.border.secondary,
        backgroundColor: theme.colors.surface.secondary,
        opacity: 0.6,
      };
    }

    return {
      ...baseStyle,
      borderColor,
    };
  };

  const getInputStyle = () => {
    return {
      flex: 1,
      fontSize: theme.typography.fontSizes.base,
      color: theme.colors.text.primary,
      minHeight: multiline ? 80 : undefined,
      textAlignVertical: multiline ? "top" as const : "center" as const,
    };
  };

  const getLabelStyle = () => {
    return {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.medium,
      color: error ? theme.colors.semantic.error : theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
    };
  };

  const getErrorStyle = () => {
    return {
      fontSize: theme.typography.fontSizes.sm,
      color: theme.colors.semantic.error,
      marginTop: theme.spacing.xs,
    };
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[{ width: "100%" }, style]}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={{ marginRight: theme.spacing.sm }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.tertiary}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={getInputStyle()}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ marginLeft: theme.spacing.sm }}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={theme.colors.text.tertiary} />
            ) : (
              <Eye size={20} color={theme.colors.text.tertiary} />
            )}
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <View style={{ marginLeft: theme.spacing.sm }}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
}
