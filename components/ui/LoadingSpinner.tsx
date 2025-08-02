import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "../../contexts/ThemeContext";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  style?: any;
}

export function LoadingSpinner({
  size = 24,
  color,
  style,
}: LoadingSpinnerProps) {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);
  
  const spinnerColor = color || theme.colors.brand.primary;

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.spinner,
          animatedStyle,
          {
            width: size,
            height: size,
            borderColor: `${spinnerColor}20`,
            borderTopColor: spinnerColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    borderWidth: 2,
    borderRadius: 50,
  },
});
