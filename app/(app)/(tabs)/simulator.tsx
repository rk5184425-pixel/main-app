import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import {
  Shield,
  CreditCard,
  TrendingUp,
  TriangleAlert as AlertTriangle,
  DollarSign,
  ChartBar as BarChart3,
  Users,
  Lock,
  Smartphone,
  Building,
  ChartPie as PieChart,
  Calculator,
  Zap,
  Star,
  ChevronRight,
  Target,
  Award,
  Sparkles,
  Brain,
} from "lucide-react-native";
import ChatbotButton from "../../../components/ChatbotButton";
import ChatbotPopup from "../../../components/ChatbotPopup";

const { width, height } = Dimensions.get("window");

interface SimulatorModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: "fraud" | "financial";
  route: string;
  gradient: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const simulatorModules: SimulatorModule[] = [
  {
    id: "ponzi-scheme-simulator",
    title: "Ponzi Scheme Simulator",
    description:
      "Master advanced fraud detection techniques using machine learning algorithms",
    icon: AlertTriangle,
    category: "fraud",
    route: "/pages/PonziSimulator",
    gradient: ["#ef4444", "#dc2626"],
    difficulty: "Intermediate",
  },
  {
    id: "charity-scam-simulator",
    title: "Charity Scam Simulator",
    description:
      "Master advanced fraud detection techniques using machine learning algorithms",
    icon: CreditCard,
    category: "fraud",
    route: "/pages/charityScamSimulator",
    gradient: ["#f59e0b", "#d97706"],
    difficulty: "Beginner",
  },
  {
    id: "identity-theft",
    title: "Identity Theft Simulation",
    description:
      "Learn to identify and prevent sophisticated identity theft schemes",
    icon: Users,
    category: "fraud",
    route: "/pages/identityTheftSimulator",
    gradient: ["#8b5cf6", "#7c3aed"],
    difficulty: "Advanced",
  },
  {
    id: "phishing-simulation",
    title: "Phishing Simulation",
    description: "Detect and counter advanced phishing attacks.",
    icon: Smartphone,
    category: "fraud",
    route: "/pages/PhishingSimulator",
    gradient: ["#06b6d4", "#0891b2"],
    difficulty: "Intermediate",
  },
  {
    id: "lottery-fraud-simulator",
    title: "Lottery Fraud Simulation",
    description:
      "Analyze complex transaction patterns to identify fraudulent activities",
    icon: AlertTriangle,
    category: "fraud",
    route: "/pages/lotteryFraudSimulator",
    gradient: ["#ec4899", "#db2777"],
    difficulty: "Beginner",
  },
  {
    id: "loan-fraud-simulator",
    title: "Loan Fraud Simulation",
    description:
      "Analyze complex transaction patterns to identify fraudulent activities",
    icon: DollarSign,
    category: "fraud",
    route: "/pages/loanScamSimulator",
    gradient: ["#10b981", "#059669"],
    difficulty: "Advanced",
  },
];

const getDifficultyColor = (difficulty: "Beginner" | "Intermediate" | "Advanced") => {
  switch (difficulty) {
    case "Beginner":
      return "#10B981";
    case "Intermediate":
      return "#F59E0B";
    case "Advanced":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};

const ModuleCard: React.FC<{ module: SimulatorModule; index: number }> = ({
  module,
  index,
}) => {
  const [animatedValue] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    router.push(module.route as any);
  };

  return (
    <Animated.View
      style={[
        styles.moduleCard,
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <LinearGradient
          colors={module.gradient}
          style={styles.moduleCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapper}>
                <module.icon size={28} color="#FFFFFF" strokeWidth={2} />
              </View>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(module.difficulty) },
                ]}
              >
                <Text style={styles.difficultyText}>{module.difficulty}</Text>
              </View>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDescription} numberOfLines={3}>
                {module.description}
              </Text>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.startText}>Start Simulation</Text>
              <View style={styles.arrowContainer}>
                <ChevronRight size={20} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CategoryHeader: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
}> = ({ title, subtitle, icon: Icon, color }) => (
  <View style={styles.categoryHeader}>
    <View style={[styles.categoryIcon, { backgroundColor: color + "20" }]}>
      <Icon size={24} color={color} strokeWidth={2} />
    </View>
    <View style={styles.categoryInfo}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categorySubtitle}>{subtitle}</Text>
    </View>
  </View>
);

export default function SimulatorsScreen() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [headerAnimation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const fraudModules = simulatorModules.filter((m) => m.category === "fraud");
  const financialModules = simulatorModules.filter(
    (m) => m.category === "financial"
  );

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      {/* Hero Header */}
      <Animated.View
        style={[
          styles.heroHeader,
          {
            opacity: headerAnimation,
            transform: [
              {
                translateY: headerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={["#1e293b", "#334155"]}
          style={styles.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <View style={styles.brandContainer}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={["#6366f1", "#8b5cf6"]}
                  style={styles.logoGradient}
                >
                  <Brain size={32} color="#FFFFFF" strokeWidth={2.5} />
                </LinearGradient>
              </View>
              <View style={styles.brandTextContainer}>
                <View style={styles.brandTitleContainer}>
                  <Text style={styles.brandTitle}>FinSim Academy</Text>
                  <Sparkles size={20} color="#fbbf24" />
                </View>
                <Text style={styles.brandSubtitle}>
                  Professional Fraud Detection Training
                </Text>
              </View>
            </View>

            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNumber}>6</Text>
                <Text style={styles.heroStatLabel}>Simulators</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNumber}>98%</Text>
                <Text style={styles.heroStatLabel}>Success Rate</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNumber}>4.9★</Text>
                <Text style={styles.heroStatLabel}>Rating</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Fraud Detection Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: headerAnimation,
              transform: [
                {
                  translateY: headerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <CategoryHeader
            title="Fraud Detection & Prevention"
            subtitle="Master advanced fraud detection techniques"
            icon={Shield}
            color="#ef4444"
          />
          <View style={styles.modulesList}>
            {fraudModules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Floating Chatbot Button */}
      <ChatbotButton onPress={() => setPopupVisible(true)} />

      {/* Popup */}
      <ChatbotPopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroHeader: {
    paddingTop: 50,
    paddingBottom: 30,
    overflow: "hidden",
  },
  heroGradient: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroContent: {
    alignItems: "center",
    gap: 24,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logoContainer: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoGradient: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  brandTextContainer: {
    alignItems: "flex-start",
  },
  brandTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
    marginTop: 4,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  heroStat: {
    alignItems: "center",
    flex: 1,
  },
  heroStatNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  heroStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  categorySubtitle: {
    fontSize: 15,
    color: "#94a3b8",
    fontWeight: "400",
    lineHeight: 20,
  },
  modulesList: {
    gap: 20,
  },
  moduleCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  moduleCardGradient: {
    borderRadius: 20,
  },
  cardContent: {
    padding: 24,
    minHeight: 160,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardInfo: {
    flex: 1,
    marginBottom: 16,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  moduleDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  startText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
              </Text>
            </View>
          </View>

          {/* <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{simulatorModules.length}</Text>
              <Text style={styles.statLabel}>Simulators</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4.7</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View> */}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Fraud Detection Section */}
        <View style={styles.section}>
          <CategoryHeader
            title="Fraud Detection & Prevention"
            subtitle="Master advanced fraud detection techniques"
            icon={Shield}
            color="#DC2626"
          />
          <View style={styles.modulesList}>
            {fraudModules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </View>
        </View>

        {/* Financial Analysis Section */}
        {/* <View style={styles.section}>
          <CategoryHeader
            title="Financial Analysis & Modeling"
            subtitle="Build expertise in financial markets"
            icon={Building}
            color="#2563EB"
          />
          <View style={styles.modulesList}>
            {financialModules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </View>
        </View> */}
      </ScrollView>
      {/* Floating Chatbot Button */}
      <ChatbotButton onPress={() => setPopupVisible(true)} />

      {/* Popup */}
      <ChatbotPopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  heroHeader: {
    backgroundColor: "#1F2937",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "#374151",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 70,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  categorySubtitle: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "400",
    lineHeight: 20,
  },
  modulesList: {
    gap: 12,
  },
  moduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
    lineHeight: 24,
  },
  moduleDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  durationText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
