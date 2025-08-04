import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
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
  Target,
  Sparkles,
  Zap,
  Star,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import ThemeToggle from "../../../components/ThemeToggle";
import ChatbotButton from "../../../components/ChatbotButton";
import ChatbotPopup from "../../../components/ChatbotPopup";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [animatedValues] = useState({
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(50),
    scaleAnim: new Animated.Value(0.8),
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValues.fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues.slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(animatedValues.scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    {
      id: 1,
      title: "Simulators",
      description: "Experience how fraud schemes work from the inside",
      icon: Brain,
      color: "#6366f1",
      gradient: ["#6366f1", "#8b5cf6"],
      route: "/(tabs)/simulator",
    },
    {
      id: 2,
      title: "Quizzes",
      description: "Test your knowledge of everything that you learned",
      icon: Flag,
      color: "#10b981",
      gradient: ["#10b981", "#059669"],
      route: "/pages/QuizzesScreen",
    },

    {
      id: 4,
      title: "Education Center",
      description: "Comprehensive fraud awareness resources",
      icon: GraduationCap,
      color: "#f59e0b",
      gradient: ["#f59e0b", "#d97706"],
      route: "/(app)/(tabs)/education",
    },
    {
      id: 5,
      title: "Story Mode",
      description: "Practice real-world financial decisions",
      icon: Target,
      color: "#ef4444",
      gradient: ["#ef4444", "#dc2626"],
      route: "/pages/ScenarioHub",
    },
  ];

  const stats = [
    { label: "Schemes Exposed", value: "50+", icon: Eye, color: "#6366f1" },
    { label: "Users Protected", value: "10K+", icon: Shield, color: "#10b981" },
    { label: "Success Rate", value: "95%", icon: TrendingUp, color: "#f59e0b" },
  ];

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ translateY: animatedValues.slideAnim }],
              },
            ]}
          >
            <View style={styles.headerContent}>
              <View style={styles.welcomeSection}>
                <View style={styles.sparkleContainer}>
                  <Sparkles size={24} color="#fbbf24" />
                  <Text style={styles.greeting}>Welcome back!</Text>
                  <Zap size={20} color="#60a5fa" />
                </View>
                <Text style={styles.subtitle}>
                  Ready to master financial security? ✨
                </Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <ThemeToggle />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View
            style={[
              styles.statsContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ scale: animatedValues.scaleAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Star size={20} color="#fbbf24" />
              <Text style={styles.sectionTitle}>Your Impact Dashboard</Text>
            </View>
            <View style={styles.statsRow}>
              {stats.map((stat, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.statCard,
                    {
                      transform: [
                        {
                          translateY: animatedValues.slideAnim.interpolate({
                            inputRange: [0, 50],
                            outputRange: [0, 50 + index * 10],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={[stat.color + "20", stat.color + "10"]}
                    style={styles.statCardGradient}
                  >
                    <View style={[styles.statIconContainer, { backgroundColor: stat.color + "20" }]}>
                      <stat.icon size={24} color={stat.color} />
                    </View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </LinearGradient>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Features Grid */}
          <Animated.View
            style={[
              styles.featuresContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ translateY: animatedValues.slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Zap size={20} color="#60a5fa" />
              <Text style={styles.sectionTitle}>Explore Features</Text>
            </View>
            <View style={styles.featuresGrid}>
              {features.map((feature) => (
                <Animated.View
                  key={feature.id}
                  style={[
                    styles.featureCard,
                    {
                      transform: [
                        {
                          translateY: animatedValues.slideAnim.interpolate({
                            inputRange: [0, 50],
                            outputRange: [0, 30 + feature.id * 5],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => router.push(feature.route as any)}
                    activeOpacity={0.8}
                    style={styles.featureButton}
                  >
                    <LinearGradient
                      colors={feature.gradient}
                      style={styles.featureGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.featureIconContainer}>
                        <feature.icon size={28} color="white" />
                      </View>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDescription}>
                        {feature.description}
                      </Text>
                      <View style={styles.featureArrow}>
                        <Text style={styles.featureArrowText}>→</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Quick Tips */}
          <Animated.View
            style={[
              styles.tipsContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ translateY: animatedValues.slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.tipEmoji}>💡</Text>
              <Text style={styles.sectionTitle}>Pro Tip of the Day</Text>
            </View>
            <LinearGradient
              colors={["#1e293b", "#334155"]}
              style={styles.tipCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.tipContent}>
                <View style={styles.tipHeader}>
                  <View style={styles.tipIconContainer}>
                    <Shield size={24} color="#10b981" />
                  </View>
                  <Text style={styles.tipTitle}>🚨 Red Flag Alert!</Text>
                </View>
                <Text style={styles.tipText}>
                  If someone promises "guaranteed returns" with no risk, it's
                  likely a scam. Real investments always carry some level of
                  risk. Stay vigilant! 🛡️
                </Text>
                <View style={styles.tipFooter}>
                  <Text style={styles.tipFooterText}>
                    Tap to learn more security tips →
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </ScrollView>

        {/* Floating Elements */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingElement1,
            {
              opacity: animatedValues.fadeAnim,
              transform: [
                {
                  rotate: animatedValues.slideAnim.interpolate({
                    inputRange: [0, 50],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Sparkles size={16} color="#fbbf24" />
        </Animated.View>

        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingElement2,
            {
              opacity: animatedValues.fadeAnim,
              transform: [
                {
                  rotate: animatedValues.slideAnim.interpolate({
                    inputRange: [0, 50],
                    outputRange: ["360deg", "0deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Star size={12} color="#60a5fa" />
        </Animated.View>

        <Animated.View
          style={[
            styles.floatingElement,
            styles.floatingElement3,
            {
              opacity: animatedValues.fadeAnim,
              transform: [
                {
                  scale: animatedValues.scaleAnim.interpolate({
                    inputRange: [0.8, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Zap size={14} color="#f59e0b" />
        </Animated.View>

        {/* Floating Chatbot Button */}
        <ChatbotButton onPress={() => setPopupVisible(true)} />

        {/* Popup */}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  welcomeSection: {
    flex: 1,
  },
  sparkleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 4,
    lineHeight: 22,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  statCardGradient: {
    padding: 20,
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    fontWeight: "500",
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  featureCard: {
    width: (width - 56) / 2,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  featureButton: {
    width: "100%",
    height: "100%",
  },
  featureGradient: {
    padding: 24,
    height: 180,
    justifyContent: "space-between",
    position: "relative",
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  featureDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 18,
    flex: 1,
  },
  featureArrow: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  featureArrowText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipEmoji: {
    fontSize: 20,
  },
  tipCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tipContent: {
    padding: 24,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    flex: 1,
  },
  tipText: {
    fontSize: 15,
    color: "#e2e8f0",
    lineHeight: 22,
    marginBottom: 16,
  },
  tipFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  tipFooterText: {
    fontSize: 13,
    color: "#10b981",
    fontWeight: "600",
  },
  floatingElement: {
    position: "absolute",
    zIndex: 1,
  },
  floatingElement1: {
    top: 120,
    right: 30,
  },
  floatingElement2: {
    top: 200,
    left: 30,
  },
  floatingElement3: {
    bottom: 200,
    right: 50,
  },
});

export default HomeScreen;
              </Text>
              <View style={styles.tipContent}>
                <Text style={[styles.tipTitle, { color: theme.colors.text }]}>
                  Red Flag Alert!
                </Text>
                <Text
                  style={[
                    styles.tipText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  If someone promises "guaranteed returns" with no risk, it's
                  likely a scam. Real investments always carry some level of
                  risk.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Floating Chatbot Button */}
        <ChatbotButton onPress={() => setPopupVisible(true)} />

        {/* Popup */}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#b8b8b8",
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.11)",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#b8b8b8",
    textAlign: "center",
    marginTop: 4,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: (width - 50) / 2,
    height: 160,
    marginBottom: 15,
    borderRadius: 16,
    overflow: "hidden",
  },
  featureGradient: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 12,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 16,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#b8b8b8",
    lineHeight: 20,
  },
});

export default HomeScreen;
