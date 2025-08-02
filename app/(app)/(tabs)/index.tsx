import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import {
  Brain,
  Flag,
  BookOpen,
  GraduationCap,
  Eye,
  Shield,
  TrendingUp,
  ChevronRight,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import ThemeToggle from "../../../components/ThemeToggle";
import ChatbotButton from "../../../components/ChatbotButton";
import ChatbotPopup from "../../../components/ChatbotPopup";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const { theme } = useTheme();
  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const features = [
    {
      id: 1,
      title: "Ponzi Simulator",
      description: "Experience how Ponzi schemes work from the inside",
      icon: Brain,
      color: theme.colors.semantic.error,
      route: "/pages/PonziSimulator",
      badge: "Interactive",
      badgeVariant: "destructive" as const,
    },
    {
      id: 2,
      title: "Red Flag Game",
      description: "Test your ability to spot fraud indicators",
      icon: Flag,
      color: theme.colors.semantic.warning,
      route: "/pages/redflags",
      badge: "Game",
      badgeVariant: "warning" as const,
    },
    {
      id: 3,
      title: "Story Mode",
      description: "Learn through real-world case studies",
      icon: BookOpen,
      color: theme.colors.brand.primary,
      route: "/pages/story",
      badge: "Educational",
      badgeVariant: "info" as const,
    },
    {
      id: 4,
      title: "Education Center",
      description: "Comprehensive fraud awareness resources",
      icon: GraduationCap,
      color: theme.colors.semantic.success,
      route: "/(app)/(tabs)/education",
      badge: "Learning",
      badgeVariant: "success" as const,
    },
  ];

  const stats = [
    { label: "Schemes Exposed", value: "50+", icon: Eye, color: theme.colors.brand.primary },
    { label: "Users Protected", value: "10K+", icon: Shield, color: theme.colors.semantic.success },
    { label: "Success Rate", value: "95%", icon: TrendingUp, color: theme.colors.semantic.info },
  ];

  const renderFeatureCard = (feature: typeof features[0], index: number) => (
    <Animated.View
      key={feature.id}
      entering={FadeInUp.delay(index * 100).springify()}
    >
      <TouchableOpacity
        onPress={() => router.push(feature.route as any)}
        style={styles.featureCardTouchable}
        activeOpacity={0.8}
      >
        <Card variant="elevated" size="lg" style={styles.featureCard}>
          <CardContent>
            <View style={styles.featureCardHeader}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}20` }]}>
                <feature.icon size={32} color={feature.color} />
              </View>
              <Badge variant={feature.badgeVariant} size="sm">
                {feature.badge}
              </Badge>
            </View>
            
            <CardTitle size="lg" style={styles.featureTitle}>
              {feature.title}
            </CardTitle>
            
            <CardDescription style={styles.featureDescription}>
              {feature.description}
            </CardDescription>
            
            <View style={styles.featureCardFooter}>
              <Text style={[styles.exploreText, { color: feature.color }]}>
                Explore
              </Text>
              <ChevronRight size={16} color={feature.color} />
            </View>
          </CardContent>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderStatCard = (stat: typeof stats[0], index: number) => (
    <Animated.View
      key={stat.label}
      entering={FadeInDown.delay(index * 100).springify()}
      style={styles.statCard}
    >
      <Card variant="glass" size="md">
        <CardContent style={styles.statCardContent}>
          <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
            <stat.icon size={24} color={stat.color} />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
            {stat.value}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
            {stat.label}
          </Text>
        </CardContent>
      </Card>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={theme.colors.background.gradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View entering={FadeInDown.springify()} style={styles.header}>
            <View>
              <Text style={[styles.greeting, { color: theme.colors.text.primary }]}>
                Welcome back!
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                Ready to expose some fraud?
              </Text>
            </View>
            <ThemeToggle />
          </Animated.View>

          {/* Hero Section */}
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <LinearGradient
              colors={theme.colors.background.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroSection}
            >
              <Text style={[styles.heroTitle, { color: theme.colors.text.inverse }]}>
                Master Financial Security
              </Text>
              <Text style={[styles.heroSubtitle, { color: theme.colors.text.inverse }]}>
                Learn to identify and avoid financial fraud through interactive simulations
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <Animated.View entering={FadeInUp.delay(300).springify()}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Impact Statistics
              </Text>
            </Animated.View>
            <View style={styles.statsGrid}>
              {stats.map(renderStatCard)}
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            <Animated.View entering={FadeInUp.delay(400).springify()}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Learning Modules
              </Text>
              <Text style={[styles.sectionSubtitle, { color: theme.colors.text.secondary }]}>
                Interactive experiences to build your fraud detection skills
              </Text>
            </Animated.View>
            
            <View style={styles.featuresGrid}>
              {features.map(renderFeatureCard)}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Chatbot */}
        <ChatbotButton onPress={() => setPopupVisible(true)} />
        <ChatbotPopup
          visible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  heroSection: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 32,
    borderRadius: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 24,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 24,
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statCardContent: {
    alignItems: "center",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  featuresContainer: {
    paddingHorizontal: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCardTouchable: {
    marginBottom: 4,
  },
  featureCard: {
    borderRadius: 20,
  },
  featureCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    marginBottom: 8,
  },
  featureDescription: {
    marginBottom: 16,
  },
  featureCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  exploreText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});

export default HomeScreen;
