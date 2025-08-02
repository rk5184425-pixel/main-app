import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react-native";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const progress = useSharedValue(theme.isDark ? 1 : 0);
  
  React.useEffect(() => {
    progress.value = withSpring(theme.isDark ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [theme.isDark]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.card, theme.colors.card]
    );
    
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.border, theme.colors.border]
    );

    return {
      backgroundColor,
      borderColor,
      transform: [{ scale: withSpring(1) }],
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${progress.value * 180}deg` },
        { scale: withSpring(0.9 + progress.value * 0.1) }
      ],
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.toggleButton,
        animatedStyle,
        theme.shadows.md,
      ]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Animated.View style={iconAnimatedStyle}>
        {theme.isDark ? (
          <Moon size={24} color={theme.colors.primary} />
        ) : (
          <Sun size={24} color={theme.colors.warning} />
        )}
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});

export default ThemeToggle;
