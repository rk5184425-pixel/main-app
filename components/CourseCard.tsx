import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
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

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: course.color }]}
      onPress={() => onStartCourse(course.id)}
      activeOpacity={0.95}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: course.color + "15" },
          ]}
        >
          {getIconComponent()}
        </View>
        <View style={styles.headerRight}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {course.lessons.length} Lessons
            </Text>
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{course.difficulty}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>

      <View style={styles.footer}>
        <View style={styles.metaContainer}>
          <View style={styles.durationContainer}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.durationText}>
              {course.totalDuration} min total
            </Text>
          </View>

          {course.rating && (
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.accent} />
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
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%`, backgroundColor: course.color },
                ]}
              />
            </View>
          </View>
        )}

        <View style={[styles.button, { backgroundColor: course.color }]}>
          <BookOpen size={18} color={colors.white} />
          <Text style={styles.buttonText}>
            {progress > 0 ? "Continue Learning" : "Start Course"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: width * 0.85,
    alignSelf: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderLeftWidth: 4,
    transform: [{ scale: 1 }],
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
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  badge: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  difficultyBadge: {
    backgroundColor: colors.primary + "15",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
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
    backgroundColor: colors.gray[50],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  durationText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  progressContainer: {
    backgroundColor: colors.gray[50],
    padding: 16,
    borderRadius: 12,
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
    color: colors.textSecondary,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray[200],
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
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
