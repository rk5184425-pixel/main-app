import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react-native";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isDark ? 1 : 0,
        [0, 1],
        [theme.colors.brand.accent, theme.colors.brand.primary]
      ),
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    rotation.value = withTiming(rotation.value + 180, { duration: 300 });
    toggleTheme();
  };

  const getToggleStyle = () => {
    return {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.full,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      borderWidth: 2,
      borderColor: theme.colors.border.primary,
      ...theme.shadows.md,
    };
  };

  return (
    <AnimatedTouchable
      style={[
        getToggleStyle(),
        backgroundAnimatedStyle,
        animatedStyle,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {isDark ? (
        <Moon size={24} color={theme.colors.text.inverse} />
      ) : (
        <Sun size={24} color={theme.colors.text.inverse} />
      )}
    </AnimatedTouchable>
  );
};

export default ThemeToggle;
