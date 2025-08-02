import React, { useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react-native";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const themeProgress = useSharedValue(isDark ? 1 : 0);

  // Update theme progress when isDark changes
  useEffect(() => {
    themeProgress.value = withTiming(isDark ? 1 : 0, { duration: 300 });
  }, [isDark]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeProgress.value,
      [0, 1],
      [theme.colors.brand.accent, theme.colors.brand.primary]
    );

    return {
      backgroundColor,
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      themeProgress.value,
      [0, 0.5, 1],
      [1, 0, 1]
    );

    return {
      opacity,
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
      width: 56,
      height: 56,
      borderRadius: theme.borderRadius.full,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      borderWidth: 2,
      borderColor: theme.colors.border.primary,
      overflow: "hidden" as const,
      ...theme.shadows.lg,
    };
  };

  return (
    <AnimatedTouchable
      style={[
        getToggleStyle(),
        animatedStyle,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <AnimatedLinearGradient
        colors={isDark 
          ? [theme.colors.brand.primary, theme.colors.brand.secondary]
          : [theme.colors.brand.accent, "#fbbf24"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFillObject, backgroundAnimatedStyle]}
      />
      
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        {isDark ? (
          <Moon size={28} color={theme.colors.text.inverse} strokeWidth={2} />
        ) : (
          <Sun size={28} color={theme.colors.text.inverse} strokeWidth={2} />
        )}
      </Animated.View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThemeToggle;
