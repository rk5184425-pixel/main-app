import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  GraduationCap,
  Target,
  TrendingUp,
  Star,
  Users,
  Award,
  ChevronRight,
  BookOpen,
  Clock,
  ArrowLeft,
} from "lucide-react-native";
import { CourseCard } from "../../../components/CourseCard";
import { LessonViewer } from "../../../components/LessonViewer";
import { courses } from "../../../data/lessons";
import { Course, Lesson, Progress } from "../../../types/lesson";
import { router } from "expo-router";
import { useTheme } from "../../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import ThemeToggle from "../../../components/ThemeToggle";

const { width } = Dimensions.get("window");

const LessonsPage = () => {
  const { theme } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<Progress>({
    completedLessons: [],
    currentCourse: null,
    currentLesson: null,
    totalProgress: 0,
  });

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    router.push({
      pathname: "/pages/Lesson",
      params: {
        lessonId: lesson.id,
        courseId: selectedCourse?.id,
      },
    });
  };

  const handleLessonComplete = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
      totalProgress: prev.totalProgress + 1,
    }));
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
  };

  const StatsCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: string;
    icon: React.ComponentType<any>;
    color: string;
  }) => (
    <Card style={{ flex: 1, marginHorizontal: theme.spacing.xs }} variant="elevated">
      <CardContent>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.borderRadius.full,
              backgroundColor: `${color}20`,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: theme.spacing.sm,
            }}
          >
            <Icon size={20} color={color} />
          </View>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs,
            }}
          >
            {value}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.xs,
              color: theme.colors.text.secondary,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
        </View>
      </CardContent>
    </Card>
  );

  const CourseListItem = ({ course }: { course: Course }) => (
    <TouchableOpacity onPress={() => handleCourseSelect(course)} activeOpacity={0.8}>
      <Card style={{ marginBottom: theme.spacing.md }} animated>
        <CardContent>
          <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", flex: 1 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: theme.borderRadius.xl,
                  backgroundColor: `${theme.colors.brand.primary}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: theme.spacing.md,
                }}
              >
                <BookOpen size={28} color={theme.colors.brand.primary} />
              </View>
              
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.xs }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.lg,
                      fontWeight: theme.typography.fontWeights.semibold,
                      color: theme.colors.text.primary,
                      flex: 1,
                    }}
                  >
                    {course.title}
                  </Text>
                </View>
                
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.base,
                    color: theme.colors.text.secondary,
                    lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  {course.description}
                </Text>
                
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.md }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Clock size={14} color={theme.colors.text.tertiary} />
                      <Text
                        style={{
                          fontSize: theme.typography.fontSizes.xs,
                          color: theme.colors.text.tertiary,
                          marginLeft: theme.spacing.xs,
                        }}
                      >
                        {course.lessons.length} lessons
                      </Text>
                    </View>
                    
                    <View
                      style={{
                        paddingHorizontal: theme.spacing.sm,
                        paddingVertical: theme.spacing.xs,
                        borderRadius: theme.borderRadius.full,
                        backgroundColor: `${theme.colors.semantic.success}20`,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: theme.typography.fontSizes.xs,
                          fontWeight: theme.typography.fontWeights.medium,
                          color: theme.colors.semantic.success,
                          textTransform: "capitalize",
                        }}
                      >
                        {course.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            
            <ChevronRight size={20} color={theme.colors.text.tertiary} />
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  const LessonListItem = ({ lesson }: { lesson: Lesson }) => {
    const isCompleted = progress.completedLessons.includes(lesson.id);
    
    return (
      <TouchableOpacity onPress={() => handleLessonSelect(lesson)} activeOpacity={0.8}>
        <Card style={{ marginBottom: theme.spacing.md }} animated>
          <CardContent>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: isCompleted 
                      ? `${theme.colors.semantic.success}20` 
                      : `${theme.colors.brand.primary}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: theme.spacing.md,
                  }}
                >
                  {isCompleted ? (
                    <Award size={20} color={theme.colors.semantic.success} />
                  ) : (
                    <BookOpen size={20} color={theme.colors.brand.primary} />
                  )}
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.base,
                      fontWeight: theme.typography.fontWeights.medium,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    {lesson.title}
                  </Text>
                  
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Clock size={12} color={theme.colors.text.tertiary} />
                    <Text
                      style={{
                        fontSize: theme.typography.fontSizes.xs,
                        color: theme.colors.text.tertiary,
                        marginLeft: theme.spacing.xs,
                      }}
                    >
                      {lesson.duration} min
                    </Text>
                    
                    {isCompleted && (
                      <>
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: theme.colors.text.tertiary,
                            marginHorizontal: theme.spacing.sm,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: theme.typography.fontSizes.xs,
                            color: theme.colors.semantic.success,
                            fontWeight: theme.typography.fontWeights.medium,
                          }}
                        >
                          Completed
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
              
              <ChevronRight size={20} color={theme.colors.text.tertiary} />
            </View>
          </CardContent>
        </Card>
      </TouchableOpacity>
    );
  };

  if (selectedLesson) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        onComplete={() => handleLessonComplete(selectedLesson.id)}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <LinearGradient
      colors={theme.colors.background.gradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar 
          barStyle={theme.isDark ? "light-content" : "dark-content"} 
          backgroundColor={theme.colors.background.primary} 
        />

        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface.primary }]}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              {selectedCourse ? (
                <TouchableOpacity
                  onPress={handleBackToCourses}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.brand.primary}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: theme.spacing.md,
                  }}
                >
                  <ArrowLeft size={20} color={theme.colors.brand.primary} />
                </TouchableOpacity>
              ) : (
                <GraduationCap size={32} color={theme.colors.brand.primary} />
              )}
              
              <View style={{ marginLeft: selectedCourse ? 0 : theme.spacing.md }}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                  {selectedCourse ? selectedCourse.title : "Learning Center"}
                </Text>
                <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
                  {selectedCourse ? `${selectedCourse.lessons.length} lessons` : "Interactive courses & tutorials"}
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>
        </View>

        {/* Stats Section */}
        {!selectedCourse && (
          <View style={styles.statsContainer}>
            <View style={{ flexDirection: "row", marginHorizontal: theme.spacing.md }}>
              <StatsCard
                title="Total Courses"
                value={courses.length.toString()}
                icon={BookOpen}
                color={theme.colors.brand.primary}
              />
              <StatsCard
                title="Completed"
                value={progress.completedLessons.length.toString()}
                icon={Award}
                color={theme.colors.semantic.success}
              />
              <StatsCard
                title="In Progress"
                value="3"
                icon={TrendingUp}
                color={theme.colors.semantic.warning}
              />
            </View>
          </View>
        )}

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing['3xl'] }}
        >
          {selectedCourse ? (
            // Lesson List
            <>
              {/* Course Info */}
              <Card style={{ marginBottom: theme.spacing.lg }} variant="elevated">
                <CardContent>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.base,
                      color: theme.colors.text.secondary,
                      lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    {selectedCourse.description}
                  </Text>
                  
                  <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.lg }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Clock size={16} color={theme.colors.text.tertiary} />
                      <Text
                        style={{
                          fontSize: theme.typography.fontSizes.sm,
                          color: theme.colors.text.tertiary,
                          marginLeft: theme.spacing.xs,
                        }}
                      >
                        {selectedCourse.lessons.reduce((acc, lesson) => acc + lesson.duration, 0)} min total
                      </Text>
                    </View>
                    
                    <View
                      style={{
                        paddingHorizontal: theme.spacing.md,
                        paddingVertical: theme.spacing.sm,
                        borderRadius: theme.borderRadius.full,
                        backgroundColor: `${theme.colors.semantic.success}20`,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: theme.typography.fontSizes.sm,
                          fontWeight: theme.typography.fontWeights.medium,
                          color: theme.colors.semantic.success,
                          textTransform: "capitalize",
                        }}
                      >
                        {selectedCourse.difficulty}
                      </Text>
                    </View>
                  </View>
                </CardContent>
              </Card>

              {/* Lessons */}
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.xl,
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.md,
                }}
              >
                Lessons ({selectedCourse.lessons.length})
              </Text>
              
              {selectedCourse.lessons.map((lesson) => (
                <LessonListItem key={lesson.id} lesson={lesson} />
              ))}
            </>
          ) : (
            // Course List
            <>
              {/* Introduction */}
              <Card style={{ marginBottom: theme.spacing.lg }} variant="elevated">
                <CardContent>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.md }}>
                    <Target size={24} color={theme.colors.brand.primary} />
                    <Text
                      style={{
                        fontSize: theme.typography.fontSizes.lg,
                        fontWeight: theme.typography.fontWeights.semibold,
                        color: theme.colors.text.primary,
                        marginLeft: theme.spacing.sm,
                      }}
                    >
                      Master Financial Security
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.base,
                      color: theme.colors.text.secondary,
                      lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
                    }}
                  >
                    Comprehensive courses designed to protect you from financial fraud and enhance your money management skills.
                  </Text>
                </CardContent>
              </Card>

              {/* Courses */}
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.xl,
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.md,
                }}
              >
                Available Courses ({courses.length})
              </Text>
              
              {courses.map((course) => (
                <CourseListItem key={course.id} course={course} />
              ))}

              {/* Call to Action */}
              <Card style={{ marginTop: theme.spacing.xl }} variant="elevated">
                <CardContent>
                  <View style={{ alignItems: "center" }}>
                    <Star size={32} color={theme.colors.semantic.warning} />
                    <Text
                      style={{
                        fontSize: theme.typography.fontSizes.xl,
                        fontWeight: theme.typography.fontWeights.bold,
                        color: theme.colors.text.primary,
                        textAlign: "center",
                        marginTop: theme.spacing.md,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      Start Your Journey
                    </Text>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSizes.base,
                        color: theme.colors.text.secondary,
                        textAlign: "center",
                        marginBottom: theme.spacing.lg,
                      }}
                    >
                      Choose a course above to begin building your financial security knowledge.
                    </Text>
                    <Button
                      onPress={() => router.push("/(app)/(tabs)/simulator")}
                      variant="primary"
                      size="lg"
                    >
                      Try Interactive Simulators
                    </Button>
                  </View>
                </CardContent>
              </Card>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default LessonsPage;
