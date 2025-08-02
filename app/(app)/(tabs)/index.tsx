import React from "react";
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
import {
  Brain,
  Flag,
  BookOpen,
  GraduationCap,
  Eye,
  Shield,
  TrendingUp,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import ThemeToggle from "../../../components/ThemeToggle";
import { Card } from "../../../components/ui/Card";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const { theme } = useTheme();
  const features = [
    {
      id: 1,
      title: "Ponzi Simulator",
      description: "Experience how Ponzi schemes work from the inside",
      icon: Brain,
      color: theme.colors.error,
      route: "/pages/PonziSimulator",
    },
    {
      id: 2,
      title: "Red Flag Game",
      description: "Test your ability to spot fraud indicators",
      icon: Flag,
      color: theme.colors.warning,
      route: "/pages/redflags",
    },
    {
      id: 3,
      title: "Story Mode",
      description: "Learn through real-world case studies",
      icon: BookOpen,
      color: theme.colors.info,
      route: "/pages/story",
    },
    {
      id: 4,
      title: "Education Center",
      description: "Comprehensive fraud awareness resources",
      icon: GraduationCap,
      color: theme.colors.success,
      route: "/(app)/(tabs)/education",
    },
  ];

  const stats = [
    { label: "Schemes Exposed", value: "50+", icon: Eye },
    { label: "Users Protected", value: "10K+", icon: Shield },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
  ];

  const FeatureCard = ({ feature }: { feature: any }) => (
    <TouchableOpacity
      style={[styles.featureCard, { width: width * 0.85 }]}
      onPress={() => router.push(feature.route)}
      activeOpacity={0.9}
    >
      <Card variant="elevated" padding="lg">
        <View style={styles.featureContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
            <feature.icon size={32} color={feature.color} />
          </View>
          <View style={styles.featureText}>
            <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
              {feature.title}
            </Text>
            <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
              {feature.description}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const StatCard = ({ stat }: { stat: any }) => (
    <Card variant="elevated" padding="md" style={styles.statCard}>
      <View style={styles.statContent}>
        <stat.icon size={24} color={theme.colors.primary} />
        <Text style={[styles.statValue, { color: theme.colors.text }]}>
          {stat.value}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
          {stat.label}
        </Text>
      </View>
    </Card>
  );

  return (
    <LinearGradient
      colors={theme.colors.background}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={[styles.header, { paddingHorizontal: theme.spacing.lg }]}>
            <View>
              <Text style={[styles.greeting, { 
                color: theme.colors.text,
                fontSize: theme.typography.fontSizes['2xl'],
                fontWeight: theme.typography.fontWeights.bold,
              }]}>
                Welcome back!
              </Text>
              <Text style={[styles.subtitle, { 
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSizes.base,
                marginTop: theme.spacing.xs,
              }]}>
                Ready to expose some fraud?
              </Text>
            </View>
            <ThemeToggle />
          </View>

          {/* Stats Section */}
          <View style={[styles.section, { paddingHorizontal: theme.spacing.lg }]}>
            <Text style={[styles.sectionTitle, { 
              color: theme.colors.text,
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.semibold,
              marginBottom: theme.spacing.md,
            }]}>
              Impact Statistics
            </Text>
            <View style={styles.statsRow}>
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </View>
          </View>

          {/* Features Section */}
          <View style={[styles.section, { paddingHorizontal: theme.spacing.lg }]}>
            <Text style={[styles.sectionTitle, { 
              color: theme.colors.text,
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.semibold,
              marginBottom: theme.spacing.md,
            }]}>
              Interactive Learning
            </Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuresScroll}
            style={styles.featuresContainer}
          >
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </ScrollView>

          {/* Quick Actions */}
          <View style={[styles.section, { paddingHorizontal: theme.spacing.lg }]}>
            <Text style={[styles.sectionTitle, { 
              color: theme.colors.text,
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.semibold,
              marginBottom: theme.spacing.md,
            }]}>
              Quick Actions
            </Text>
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={[styles.quickAction, { backgroundColor: theme.colors.primary }]}
                onPress={() => router.push("/(app)/(tabs)/tools")}
              >
                <Text style={[styles.quickActionText, { 
                  color: "#ffffff",
                  fontSize: theme.typography.fontSizes.base,
                  fontWeight: theme.typography.fontWeights.semibold,
                }]}>
                  Security Tools
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.quickAction, { backgroundColor: theme.colors.secondary }]}
                onPress={() => router.push("/(app)/(tabs)/simulator")}
              >
                <Text style={[styles.quickActionText, { 
                  color: "#ffffff",
                  fontSize: theme.typography.fontSizes.base,
                  fontWeight: theme.typography.fontWeights.semibold,
                }]}>
                  Simulators
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  greeting: {
    lineHeight: 32,
  },
  subtitle: {
    lineHeight: 22,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    lineHeight: 28,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minHeight: 100,
  },
  statContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
  featuresContainer: {
    marginTop: 8,
  },
  featuresScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  featureCard: {
    marginRight: 4,
  },
  featureContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 24,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  quickAction: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionText: {
    textAlign: "center",
  },
});

export default HomeScreen;
