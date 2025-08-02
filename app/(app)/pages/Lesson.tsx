import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LessonViewer } from "../../components/LessonViewer";
import type { Lesson, Course } from "../../types/lesson"; // Adjust the import path as needed
import { useLocalSearchParams } from "expo-router";
import { goBack } from "expo-router/build/global-state/routing";
import { courses } from "../../data/lessons";
import { useState } from "react";

export default function Lesson() {
  const { lessonId, courseId } = useLocalSearchParams();
  const course = courses.find((c) => c.id === courseId);
  const [lesson, setLesson] = useState<Lesson | null>(course?.lessons[0]);
  //   let lesson = course?.lessons[0];
  const handleLessonComplete = () => {
    const nextLessonIndex =
      course.lessons.findIndex((l) => l.id === lesson.id) + 1;
    if (nextLessonIndex < course.lessons.length) {
      setLesson(course.lessons[nextLessonIndex]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LessonViewer
        lesson={lesson as unknown as Lesson}
        onBack={() => goBack()}
        onComplete={handleLessonComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
