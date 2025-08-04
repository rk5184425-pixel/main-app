import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Shield,
  DollarSign,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Trophy,
  Target,
  Sparkles,
} from "lucide-react-native";
import { Quiz, getUserProgress } from "../data/quizData";

interface QuizCardProps {
  quiz: Quiz;
  onPress: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onPress }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [glowAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isCompleted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isCompleted]);

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

  const progress = getUserProgress();
  const isCompleted = progress[quiz.id]?.completed || false;
  const score = progress[quiz.id]?.score || 0;
  const attempts = progress[quiz.id]?.attempts || 0;

  const CategoryIcon = quiz.category === "fraud" ? Shield : DollarSign;

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return {
          color: "#10b981",
          bg: "#d1fae5",
          gradient: ["#10b981", "#059669"],
          icon: Target,
        };
      case "intermediate":
        return {
          color: "#f59e0b",
          bg: "#fef3c7",
          gradient: ["#f59e0b", "#d97706"],
          icon: Zap,
        };
      case "advanced":
        return {
          color: "#ef4444",
          bg: "#fee2e2",
          gradient: ["#ef4444", "#dc2626"],
          icon: Trophy,
        };
      default:
        return {
          color: "#6b7280",
          bg: "#f3f4f6",
          gradient: ["#6b7280", "#4b5563"],
          icon: Star,
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(quiz.difficulty);
  const DifficultyIcon = difficultyConfig.icon;

  const getScoreColor = (score: number) => {
    if (score >= 4) return "#10b981";
    if (score >= 3) return "#f59e0b";
    return "#ef4444";
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
      onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      activeOpacity={0.8}
        style={styles.touchableCard}
    >
        <LinearGradient
          colors={
            isCompleted
              ? ["#1e293b", "#334155"]
              : ["#0f172a", "#1e293b"]
          }
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Completion Glow Effect */}
          {isCompleted && (
            <Animated.View
              style={[
                styles.completionGlow,
                {
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.7],
                  }),
                },
              ]}
            />
          )}

          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.categorySection}>
              <LinearGradient
                colors={
                  quiz.category === "fraud"
                    ? ["#ef4444", "#dc2626"]
                    : ["#6366f1", "#4338ca"]
                }
                style={styles.categoryIcon}
              >
                <CategoryIcon size={16} color="#ffffff" />
              </LinearGradient>
              <View
                style={[
                  styles.categoryBadge,
                  quiz.category === "fraud"
                    ? styles.fraudBadge
                    : styles.financialBadge,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    quiz.category === "fraud"
                      ? styles.fraudText
                      : styles.financialText,
                  ]}
                >
                  {quiz.category === "fraud"
                    ? "Fraud Protection"
                    : "Financial Mastery"}
                </Text>
              </View>
            </View>

            {isCompleted && (
              <View style={styles.completionBadge}>
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  style={[
                    styles.scoreContainer,
                  ]}
                >
                  <CheckCircle size={14} color="#ffffff" />
                  <Text style={styles.scoreText}>{score}/5</Text>
                  <Sparkles size={12} color="#fbbf24" />
                </LinearGradient>
                {attempts > 1 && (
                  <Text style={styles.attemptsText}>{attempts} attempts</Text>
                )}
              </View>
            )}
          </View>

          {/* Content Section */}
          <View style={styles.content}>
            <Text style={styles.title}>{quiz.title}</Text>
            <Text style={styles.description}>{quiz.description}</Text>
          </View>

          {/* Meta Information */}
          <View style={styles.metaSection}>
            <LinearGradient
              colors={difficultyConfig.gradient}
              style={styles.difficultyBadge}
            >
              <DifficultyIcon size={12} color="#ffffff" />
              <Text style={styles.difficultyText}>
                {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
              </Text>
            </LinearGradient>

            <View style={styles.timeContainer}>
              <Clock size={12} color="#94a3b8" />
              <Text style={styles.timeText}>{quiz.estimatedTime} min</Text>
            </View>
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <View style={styles.footerInfo}>
              <Text style={styles.questionCount}>5 Questions</Text>
              {isCompleted ? (
                <Text style={[styles.statusText, { color: getScoreColor(score) }]}>
                  Best: {score}/5 ({Math.round((score / 5) * 100)}%)
                </Text>
              ) : (
                <Text style={styles.statusText}>Ready to start</Text>
              )}
            </View>

            <LinearGradient
              colors={
                isCompleted
                  ? ["#f8fafc", "#e2e8f0"]
                  : ["#6366f1", "#4338ca"]
              }
              style={styles.actionButton}
            >
              {isCompleted ? (
                <>
                  <Trophy size={14} color="#6366f1" />
                  <Text style={styles.retakeButtonText}>Retake</Text>
                </>
              ) : (
                <>
                  <Zap size={14} color="#ffffff" />
                  <Text style={styles.startButtonText}>Start</Text>
                </>
              )}
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
    borderRadius: 20,
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
  completedCard: {
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  completionGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#10b981",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  categorySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fraudIcon: {
    backgroundColor: "#ef4444",
  },
  financialIcon: {
    backgroundColor: "#6366f1",
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  fraudBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  financialBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  fraudText: {
    color: "#fca5a5",
  },
  financialText: {
    color: "#a5b4fc",
  },
  completionBadge: {
    alignItems: "flex-end",
    gap: 4,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
  attemptsText: {
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: "500",
  },
  content: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
  },
  metaSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerInfo: {
    flex: 1,
  },
  questionCount: {
    fontSize: 12,
    color: "#e2e8f0",
    fontWeight: "600",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94a3b8",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButton: {
    backgroundColor: "#6366f1",
  },
  retakeButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  retakeButtonText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default QuizCard;
          >
            <CategoryIcon size={16} color="#ffffff" />
          </View>
          <View
            style={[
              styles.categoryBadge,
              quiz.category === "fraud"
                ? styles.fraudBadge
                : styles.financialBadge,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                quiz.category === "fraud"
                  ? styles.fraudText
                  : styles.financialText,
              ]}
            >
              {quiz.category === "fraud"
                ? "Fraud Protection"
                : "Financial Mastery"}
            </Text>
          </View>
        </View>

        {isCompleted && (
          <View style={styles.completionBadge}>
            <View
              style={[
                styles.scoreContainer,
                { backgroundColor: getScoreColor(score) },
              ]}
            >
              <CheckCircle size={14} color="#ffffff" />
              <Text style={styles.scoreText}>{score}/5</Text>
            </View>
            {attempts > 1 && (
              <Text style={styles.attemptsText}>{attempts} attempts</Text>
            )}
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>{quiz.title}</Text>
        <Text style={styles.description}>{quiz.description}</Text>
      </View>

      {/* Meta Information */}
      <View style={styles.metaSection}>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyConfig.bg },
          ]}
        >
          <DifficultyIcon size={12} color={difficultyConfig.color} />
          <Text
            style={[styles.difficultyText, { color: difficultyConfig.color }]}
          >
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Clock size={12} color="#6b7280" />
          <Text style={styles.timeText}>{quiz.estimatedTime} min</Text>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.questionCount}>5 Questions</Text>
          {isCompleted ? (
            <Text style={[styles.statusText, { color: getScoreColor(score) }]}>
              Best: {score}/5 ({Math.round((score / 5) * 100)}%)
            </Text>
          ) : (
            <Text style={styles.statusText}>Ready to start</Text>
          )}
        </View>

        <View
          style={[
            styles.actionButton,
            isCompleted ? styles.retakeButton : styles.startButton,
          ]}
        >
          {isCompleted ? (
            <>
              <Trophy size={14} color="#6366f1" />
              <Text style={styles.retakeButtonText}>Retake</Text>
            </>
          ) : (
            <>
              <Zap size={14} color="#ffffff" />
              <Text style={styles.startButtonText}>Start</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    position: "relative",
    overflow: "hidden",
  },
  completedCard: {
    borderColor: "#10b981",
    borderWidth: 1,
  },
  completionGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "140%",
    backgroundColor: "#10b981",
    opacity: 0.07,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  categorySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  fraudIcon: {
    backgroundColor: "#ef4444",
  },
  financialIcon: {
    backgroundColor: "#6366f1",
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  fraudBadge: {
    backgroundColor: "#fee2e2",
  },
  financialBadge: {
    backgroundColor: "#e0e7ff",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  fraudText: {
    color: "#dc2626",
  },
  financialText: {
    color: "#4338ca",
  },
  completionBadge: {
    alignItems: "flex-end",
    gap: 4,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
  attemptsText: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
  },
  content: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  metaSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerInfo: {
    flex: 1,
  },
  questionCount: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  startButton: {
    backgroundColor: "#6366f1",
  },
  retakeButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  retakeButtonText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default QuizCard;
