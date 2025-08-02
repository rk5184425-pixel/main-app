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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
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
  Brain,
  Eye,
  BookOpen,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import ThemeToggle from "../../../components/ThemeToggle";
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
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

const simulatorModules: SimulatorModule[] = [
  {
    id: "ponzi-scheme-simulator",
    title: "Ponzi Scheme Simulator",
    description: "Experience how Ponzi schemes work from the inside and learn to identify red flags",
    icon: TrendingUp,
    category: "fraud",
    route: "/pages/PonziSimulator",
    difficulty: "intermediate",
    estimatedTime: "15-20 min",
  },
  {
    id: "identity-theft-simulator",
    title: "Identity Theft Simulator",
    description: "Learn how identity thieves operate and protect your personal information",
    icon: Shield,
    category: "fraud",
    route: "/pages/identityTheftSimulator",
    difficulty: "beginner",
    estimatedTime: "10-15 min",
  },
  {
    id: "phishing-email-simulator",
    title: "Phishing Email Simulator",
    description: "Practice identifying phishing emails and social engineering tactics",
    icon: Lock,
    category: "fraud",
    route: "/pages/phishingSimulator",
    difficulty: "beginner",
    estimatedTime: "8-12 min",
  },
  {
    id: "investment-fraud-simulator",
    title: "Investment Fraud Simulator",
    description: "Navigate through various investment scam scenarios and learn protection strategies",
    icon: DollarSign,
    category: "fraud",
    route: "/pages/investmentFraudSimulator",
    difficulty: "advanced",
    estimatedTime: "20-25 min",
  },
  {
    id: "loan-scam-simulator",
    title: "Loan Scam Simulator",
    description: "Experience loan fraud scenarios and learn to verify legitimate lenders",
    icon: CreditCard,
    category: "fraud",
    route: "/pages/loanScamSimulator",
    difficulty: "intermediate",
    estimatedTime: "12-18 min",
  },
  {
    id: "charity-scam-simulator",
    title: "Charity Scam Simulator",
    description: "Learn to distinguish between legitimate charities and fraudulent schemes",
    icon: Users,
    category: "fraud",
    route: "/pages/charityScamSimulator",
    difficulty: "beginner",
    estimatedTime: "10-15 min",
  },
  {
    id: "lottery-fraud-simulator",
    title: "Lottery Fraud Simulator",
    description: "Understand how lottery and sweepstakes scams work and how to avoid them",
    icon: Star,
    category: "fraud",
    route: "/pages/lotteryFraudSimulator",
    difficulty: "beginner",
    estimatedTime: "8-12 min",
  },
  {
    id: "sim-cloning-simulator",
    title: "SIM Cloning Simulator",
    description: "Learn about SIM swap attacks and mobile security vulnerabilities",
    icon: Smartphone,
    category: "fraud",
    route: "/pages/identityTheftSimulator/sim-cloning",
    difficulty: "advanced",
    estimatedTime: "15-20 min",
  },
];

const ModuleCard: React.FC<{ module: SimulatorModule }> = ({ module }) => {
  const { theme } = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return theme.colors.semantic.success;
      case "intermediate":
        return theme.colors.semantic.warning;
      case "advanced":
        return theme.colors.semantic.error;
      default:
        return theme.colors.text.tertiary;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fraud":
        return theme.colors.semantic.error;
      case "financial":
        return theme.colors.brand.primary;
      default:
        return theme.colors.text.tertiary;
    }
  };

  const handlePress = () => {
    router.push(module.route as any);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card style={{ marginBottom: theme.spacing.md }} animated>
        <CardContent>
          <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", flex: 1 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: theme.borderRadius.xl,
                  backgroundColor: `${getCategoryColor(module.category)}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: theme.spacing.md,
                }}
              >
                <module.icon size={28} color={getCategoryColor(module.category)} />
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
                    {module.title}
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
                  {module.description}
                </Text>
                
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.md }}>
                    <View
                      style={{
                        paddingHorizontal: theme.spacing.sm,
                        paddingVertical: theme.spacing.xs,
                        borderRadius: theme.borderRadius.full,
                        backgroundColor: `${getDifficultyColor(module.difficulty)}20`,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: theme.typography.fontSizes.xs,
                          fontWeight: theme.typography.fontWeights.medium,
                          color: getDifficultyColor(module.difficulty),
                          textTransform: "capitalize",
                        }}
                      >
                        {module.difficulty}
                      </Text>
                    </View>
                    
                    <Text
                      style={{
                        fontSize: theme.typography.fontSizes.xs,
                        color: theme.colors.text.tertiary,
                      }}
                    >
                      {module.estimatedTime}
                    </Text>
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
};

const CategoryHeader: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
}> = ({ title, subtitle, icon: Icon, color, count }) => {
  const { theme } = useTheme();
  
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.lg,
        marginTop: theme.spacing.xl,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: theme.borderRadius.xl,
          backgroundColor: `${color}20`,
          justifyContent: "center",
          alignItems: "center",
          marginRight: theme.spacing.md,
        }}
      >
        <Icon size={24} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.text.primary,
              marginRight: theme.spacing.sm,
            }}
          >
            {title}
          </Text>
          <View
            style={{
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.borderRadius.full,
              backgroundColor: `${color}20`,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSizes.xs,
                fontWeight: theme.typography.fontWeights.semibold,
                color,
              }}
            >
              {count}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.text.secondary,
            marginTop: theme.spacing.xs,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const StatsCard: React.FC<{
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
}> = ({ title, value, icon: Icon, color }) => {
  const { theme } = useTheme();
  
  return (
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
              fontSize: theme.typography.fontSizes['2xl'],
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs,
            }}
          >
            {value}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.sm,
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
};

export default function SimulatorsScreen() {
  const { theme } = useTheme();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const fraudModules = simulatorModules.filter((m) => m.category === "fraud");
  const financialModules = simulatorModules.filter((m) => m.category === "financial");

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
              <Brain size={32} color={theme.colors.brand.primary} />
              <View style={{ marginLeft: theme.spacing.md }}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                  Fraud Simulators
                </Text>
                <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
                  Interactive learning experiences
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={{ flexDirection: "row", marginHorizontal: theme.spacing.md }}>
            <StatsCard
              title="Simulators"
              value={simulatorModules.length.toString()}
              icon={Target}
              color={theme.colors.brand.primary}
            />
            <StatsCard
              title="Fraud Types"
              value={fraudModules.length.toString()}
              icon={AlertTriangle}
              color={theme.colors.semantic.error}
            />
            <StatsCard
              title="Avg. Time"
              value="15m"
              icon={Award}
              color={theme.colors.semantic.success}
            />
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing['3xl'] }}
        >
          {/* Introduction */}
          <Card style={{ marginBottom: theme.spacing.lg }} variant="elevated">
            <CardContent>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.md }}>
                <Eye size={24} color={theme.colors.brand.primary} />
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.lg,
                    fontWeight: theme.typography.fontWeights.semibold,
                    color: theme.colors.text.primary,
                    marginLeft: theme.spacing.sm,
                  }}
                >
                  Learn Through Experience
                </Text>
              </View>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.base,
                  color: theme.colors.text.secondary,
                  lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
                }}
              >
                Our interactive simulators put you in realistic fraud scenarios, helping you recognize red flags and develop protective instincts through hands-on experience.
              </Text>
            </CardContent>
          </Card>

          {/* Fraud Simulators */}
          <CategoryHeader
            title="Fraud Detection"
            subtitle="Learn to identify and avoid common fraud schemes"
            icon={AlertTriangle}
            color={theme.colors.semantic.error}
            count={fraudModules.length}
          />
          
          {fraudModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}

          {/* Financial Simulators (if any) */}
          {financialModules.length > 0 && (
            <>
              <CategoryHeader
                title="Financial Planning"
                subtitle="Practice financial decision-making skills"
                icon={Calculator}
                color={theme.colors.brand.primary}
                count={financialModules.length}
              />
              
              {financialModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </>
          )}

          {/* Call to Action */}
          <Card style={{ marginTop: theme.spacing.xl }} variant="elevated">
            <CardContent>
              <View style={{ alignItems: "center" }}>
                <BookOpen size={32} color={theme.colors.brand.primary} />
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
                  Ready to Start Learning?
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.base,
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  Choose a simulator above to begin your fraud prevention education journey.
                </Text>
                <Button
                  onPress={() => router.push("/(app)/(tabs)/education")}
                  variant="primary"
                  size="lg"
                >
                  Explore Education Center
                </Button>
              </View>
            </CardContent>
          </Card>
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
}

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
