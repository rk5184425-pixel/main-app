import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, BookOpen, Star, TrendingUp, Target } from "lucide-react-native";
import { Course } from "../types/lesson";

const { width } = Dimensions.get("window");

const colors = {
  primary: "#3B82F6",
  primaryLight: "#60A5FA",
  secondary: "#10B981",
  accent: "#8B5CF6",
  background: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  success: "#10B981",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
  },
};

interface CourseCardProps {
  course: Course;
  progress?: number;
  onStartCourse: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  progress = 0,
  onStartCourse,
}) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [glowAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (progress > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [progress]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getIconComponent = () => {
    switch (course.icon) {
      case "trending-up":
        return <TrendingUp size={24} color={course.color} />;
      case "star":
        return <Star size={24} color={course.color} />;
      case "target":
        return <Target size={24} color={course.color} />;
      default:
        return <BookOpen size={24} color={course.color} />;
    }
  };

  const getCourseGradient = () => {
    switch (course.color) {
      case "#3B82F6":
        return ["#3B82F6", "#1D4ED8"];
      case "#10B981":
        return ["#10B981", "#059669"];
      case "#8B5CF6":
        return ["#8B5CF6", "#7C3AED"];
      case "#F59E0B":
        return ["#F59E0B", "#D97706"];
      default:
        return ["#6B7280", "#4B5563"];
    }
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
      onPress={() => onStartCourse(course.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      activeOpacity={0.95}
        style={styles.touchableCard}
    >
        <LinearGradient
          colors={["#1e293b", "#334155"]}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Progress Glow Effect */}
          {progress > 0 && (
            <Animated.View
              style={[
                styles.progressGlow,
                {
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 0.5],
                  }),
                  backgroundColor: course.color,
                },
              ]}
            />
          )}

          <View style={styles.header}>
            <LinearGradient
              colors={getCourseGradient()}
              style={styles.iconContainer}
            >
              {getIconComponent()}
            </LinearGradient>
            <View style={styles.headerRight}>
              <View style={[styles.badge, { backgroundColor: course.color + "20" }]}>
                <Text style={[styles.badgeText, { color: course.color }]}>
                  {course.lessons.length} Lessons
                </Text>
              </View>
              <LinearGradient
                colors={[course.color + "30", course.color + "20"]}
                style={styles.difficultyBadge}
              >
                <Text style={[styles.difficultyText, { color: course.color }]}>
                  {course.difficulty}
                </Text>
              </LinearGradient>
            </View>
          </View>

          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.description}>{course.description}</Text>

          <View style={styles.footer}>
            <View style={styles.metaContainer}>
              <View style={styles.durationContainer}>
                <Clock size={16} color="#94a3b8" />
                <Text style={styles.durationText}>
                  {course.totalDuration} min total
                </Text>
              </View>

              {course.rating && (
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#fbbf24" />
                  <Text style={styles.ratingText}>{course.rating}</Text>
                </View>
              )}
            </View>

            {progress > 0 && (
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressPercent}>
                    {Math.round(progress)}%
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progress}%`,
                        backgroundColor: course.color,
                      },
                    ]}
                  />
                </View>
              </View>
            )}

            <LinearGradient
              colors={getCourseGradient()}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <BookOpen size={18} color="#ffffff" />
              <Text style={styles.buttonText}>
                {progress > 0 ? "Continue Learning" : "Start Course"}
              </Text>
            </LinearGradient>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
  touchableCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    position: "relative",
    overflow: "hidden",
  },
  progressGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    fontSize: 15,
    color: "#94a3b8",
    lineHeight: 22,
    marginBottom: 20,
  },
  footer: {
    gap: 16,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  durationText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#e2e8f0",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  progressContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94a3b8",
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "700",
    color: "#60a5fa",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
