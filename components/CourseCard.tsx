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
import { useTheme } from "../contexts/ThemeContext";
import { Card, CardContent } from "./ui/Card";

const { width } = Dimensions.get("window");

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
  const { theme } = useTheme();

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return theme.colors.semantic.success;
      case "intermediate":
        return theme.colors.semantic.warning;
      case "advanced":
        return theme.colors.semantic.error;
      default:
        return theme.colors.brand.primary;
    }
  };

  const difficultyColor = getDifficultyColor(course.difficulty);

  return (
    <TouchableOpacity
      onPress={() => onStartCourse(course.id)}
      activeOpacity={0.8}
    >
      <Card 
        style={[
          styles.card, 
          { 
            borderLeftColor: course.color,
            borderLeftWidth: 4,
          }
        ]} 
        animated
      >
        <CardContent style={{ padding: theme.spacing.lg }}>
          {/* Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                { 
                  backgroundColor: `${course.color}20`,
                  borderRadius: theme.borderRadius.lg,
                },
              ]}
            >
              {getIconComponent()}
            </View>
            <View style={styles.headerRight}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: theme.colors.surface.secondary,
                    borderRadius: theme.borderRadius.full,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: theme.colors.text.secondary,
                      fontSize: theme.typography.fontSizes.xs,
                      fontWeight: theme.typography.fontWeights.semibold,
                    },
                  ]}
                >
                  {course.lessons.length} Lessons
                </Text>
              </View>
              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor: `${difficultyColor}20`,
                    borderRadius: theme.borderRadius.lg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    {
                      color: difficultyColor,
                      fontSize: theme.typography.fontSizes.xs,
                      fontWeight: theme.typography.fontWeights.semibold,
                    },
                  ]}
                >
                  {course.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* Title and Description */}
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSizes.xl,
                fontWeight: theme.typography.fontWeights.bold,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            {course.title}
          </Text>
          
          <Text
            style={[
              styles.description,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSizes.base,
                lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
                marginBottom: theme.spacing.lg,
              },
            ]}
          >
            {course.description}
          </Text>

          {/* Footer */}
          <View style={styles.footer}>
            {/* Meta Container */}
            <View style={styles.metaContainer}>
              <View
                style={[
                  styles.durationContainer,
                  {
                    backgroundColor: theme.colors.surface.secondary,
                    borderRadius: theme.borderRadius.full,
                  },
                ]}
              >
                <Clock size={16} color={theme.colors.text.tertiary} />
                <Text
                  style={[
                    styles.durationText,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSizes.sm,
                      fontWeight: theme.typography.fontWeights.medium,
                    },
                  ]}
                >
                  {course.totalDuration} min total
                </Text>
              </View>

              {course.rating && (
                <View style={styles.ratingContainer}>
                  <Star size={16} color={theme.colors.semantic.warning} fill={theme.colors.semantic.warning} />
                  <Text
                    style={[
                      styles.ratingText,
                      {
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSizes.sm,
                        fontWeight: theme.typography.fontWeights.semibold,
                      },
                    ]}
                  >
                    {course.rating}
                  </Text>
                </View>
              )}
            </View>

            {/* Progress Container */}
            {progress > 0 && (
              <View
                style={[
                  styles.progressContainer,
                  {
                    backgroundColor: theme.colors.surface.secondary,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.md,
                  },
                ]}
              >
                <View style={styles.progressHeader}>
                  <Text
                    style={[
                      styles.progressLabel,
                      {
                        color: theme.colors.text.secondary,
                        fontSize: theme.typography.fontSizes.sm,
                        fontWeight: theme.typography.fontWeights.medium,
                      },
                    ]}
                  >
                    Progress
                  </Text>
                  <Text
                    style={[
                      styles.progressPercent,
                      {
                        color: theme.colors.brand.primary,
                        fontSize: theme.typography.fontSizes.sm,
                        fontWeight: theme.typography.fontWeights.bold,
                      },
                    ]}
                  >
                    {Math.round(progress)}%
                  </Text>
                </View>
                <View
                  style={[
                    styles.progressBar,
                    {
                      backgroundColor: theme.colors.border.secondary,
                      borderRadius: theme.borderRadius.sm,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      { 
                        width: `${progress}%`, 
                        backgroundColor: course.color,
                        borderRadius: theme.borderRadius.sm,
                      },
                    ]}
                  />
                </View>
              </View>
            )}

            {/* Action Button */}
            <TouchableOpacity
              style={[
                styles.button,
                { 
                  backgroundColor: course.color,
                  borderRadius: theme.borderRadius.lg,
                  ...theme.shadows.sm,
                },
              ]}
              onPress={() => onStartCourse(course.id)}
              activeOpacity={0.8}
            >
              <BookOpen size={18} color={theme.colors.text.inverse} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: theme.colors.text.inverse,
                    fontSize: theme.typography.fontSizes.base,
                    fontWeight: theme.typography.fontWeights.semibold,
                  },
                ]}
              >
                {progress > 0 ? "Continue Learning" : "Start Course"}
              </Text>
            </TouchableOpacity>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    width: width * 0.85,
    alignSelf: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {},
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  difficultyText: {},
  title: {
    lineHeight: 28,
  },
  description: {},
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
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  durationText: {},
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {},
  progressContainer: {},
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {},
  progressPercent: {},
  progressBar: {
    height: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    paddingVertical: 16,
  },
  buttonText: {},
});
