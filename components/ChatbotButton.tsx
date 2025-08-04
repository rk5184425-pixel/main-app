import React, { useRef, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from "react-native";
import { MessageCircle, Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ChatbotButtonProps {
  onPress: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(100)).current; // Start off-screen
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating button bounce animation
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();

    // Slide-up entry animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    // Sparkle rotation animation
    const sparkleRotation = () => {
      Animated.timing(sparkleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        sparkleAnim.setValue(0);
        sparkleRotation();
      });
    };
    sparkleRotation();
  }, [pulseAnim, slideAnim, sparkleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: pulseAnim },
            { translateY: slideAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={["#6366f1", "#8b5cf6"]}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MessageCircle color="#fff" size={24} />
          <Animated.View
            style={[
              styles.sparkleContainer,
              {
                transform: [
                  {
                    rotate: sparkleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Sparkles size={12} color="#fbbf24" />
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 36,
    right: 24,
    zIndex: 1000,
  } as ViewStyle,
  buttonContainer: {
    borderRadius: 28,
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  sparkleContainer: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatbotButton;
