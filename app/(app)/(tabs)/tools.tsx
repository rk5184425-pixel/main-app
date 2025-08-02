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
  ChartBar as BarChart3,
  Building,
  ChartPie as PieChart,
  Calculator,
  Zap,
  ChevronRight,
  File,
  Link,
  Hash,
  Search,
  FileText,
  Globe,
  Eye,
  Smartphone,
  Lock,
  Target,
  Award,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import ThemeToggle from "../../../components/ThemeToggle";
import ChatbotButton from "../../../components/ChatbotButton";
import ChatbotPopup from "../../../components/ChatbotPopup";

const { width, height } = Dimensions.get("window");

interface ToolModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: "fraud" | "financial";
  route: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

const toolModules: ToolModule[] = [
  {
    id: "DocHashVerifier",
    title: "Document Hash Verifier",
    description: "Verify the integrity of documents using cryptographic hash functions",
    icon: File,
    category: "fraud",
    route: "/pages/DocHashVerifierTool",
    difficulty: "intermediate",
    estimatedTime: "5-10 min",
  },
  {
    id: "UrlAnalysis",
    title: "URL Analysis Tool",
    description: "Analyze suspicious URLs and detect potential phishing attempts",
    icon: Link,
    category: "fraud",
    route: "/pages/UrlAnalysisTool",
    difficulty: "beginner",
    estimatedTime: "3-5 min",
  },
  {
    id: "FdRdCalculator",
    title: "FD & RD Calculator",
    description: "Calculate returns on Fixed Deposits and Recurring Deposits",
    icon: Calculator,
    category: "financial",
    route: "/pages/FdAndRdCalculator",
    difficulty: "beginner",
    estimatedTime: "5-8 min",
  },
  {
    id: "SipCalculator",
    title: "SIP Calculator",
    description: "Plan your Systematic Investment Plan and calculate future value",
    icon: TrendingUp,
    category: "financial",
    route: "/pages/SipTool",
    difficulty: "intermediate",
    estimatedTime: "8-12 min",
  },
  {
    id: "TaxCalculator",
    title: "Tax Calculator",
    description: "Calculate your income tax and optimize tax planning strategies",
    icon: PieChart,
    category: "financial",
    route: "/pages/TaxCalculator",
    difficulty: "advanced",
    estimatedTime: "15-20 min",
  },
  {
    id: "HashGenerator",
    title: "Hash Generator",
    description: "Generate cryptographic hashes for data integrity verification",
    icon: Hash,
    category: "fraud",
    route: "/pages/HashGenerator",
    difficulty: "intermediate",
    estimatedTime: "5-8 min",
  },
  {
    id: "FraudAnalyzer",
    title: "Fraud Pattern Analyzer",
    description: "Analyze transaction patterns to detect potential fraudulent activities",
    icon: Search,
    category: "fraud",
    route: "/pages/FraudAnalyzer",
    difficulty: "advanced",
    estimatedTime: "20-25 min",
  },
  {
    id: "DocumentVault",
    title: "Secure Document Vault",
    description: "Store and manage important documents with encryption",
    icon: FileText,
    category: "fraud",
    route: "/pages/DocumentVault",
    difficulty: "intermediate",
    estimatedTime: "10-15 min",
  },
];

const ToolCard: React.FC<{ tool: ToolModule }> = ({ tool }) => {
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
    router.push(tool.route as any);
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
                  backgroundColor: `${getCategoryColor(tool.category)}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: theme.spacing.md,
                }}
              >
                <tool.icon size={28} color={getCategoryColor(tool.category)} />
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
                    {tool.title}
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
                  {tool.description}
                </Text>
                
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.md }}>
                    <View
                      style={{
                        paddingHorizontal: theme.spacing.sm,
                        paddingVertical: theme.spacing.xs,
                        borderRadius: theme.borderRadius.full,
                        backgroundColor: `${getDifficultyColor(tool.difficulty)}20`,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: theme.typography.fontSizes.xs,
                          fontWeight: theme.typography.fontWeights.medium,
                          color: getDifficultyColor(tool.difficulty),
                          textTransform: "capitalize",
                        }}
                      >
                        {tool.difficulty}
                      </Text>
                    </View>
                    
                    <Text
                      style={{
                        fontSize: theme.typography.fontSizes.xs,
                        color: theme.colors.text.tertiary,
                      }}
                    >
                      {tool.estimatedTime}
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

export default function ToolsScreen() {
  const { theme } = useTheme();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const fraudModules = toolModules.filter((m) => m.category === "fraud");
  const financialModules = toolModules.filter((m) => m.category === "financial");

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
              <Zap size={32} color={theme.colors.brand.primary} />
              <View style={{ marginLeft: theme.spacing.md }}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                  Financial Tools
                </Text>
                <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
                  Professional analysis & calculators
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
              title="Total Tools"
              value={toolModules.length.toString()}
              icon={Target}
              color={theme.colors.brand.primary}
            />
            <StatsCard
              title="Fraud Tools"
              value={fraudModules.length.toString()}
              icon={Shield}
              color={theme.colors.semantic.error}
            />
            <StatsCard
              title="Financial Tools"
              value={financialModules.length.toString()}
              icon={Calculator}
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
                  Professional Financial Tools
                </Text>
              </View>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.base,
                  color: theme.colors.text.secondary,
                  lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
                }}
              >
                Access a comprehensive suite of financial calculators and fraud detection tools designed for professionals and individuals alike.
              </Text>
            </CardContent>
          </Card>

          {/* Financial Tools */}
          <CategoryHeader
            title="Financial Calculators"
            subtitle="Plan, calculate, and optimize your financial decisions"
            icon={Calculator}
            color={theme.colors.brand.primary}
            count={financialModules.length}
          />
          
          {financialModules.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}

          {/* Fraud Detection Tools */}
          <CategoryHeader
            title="Fraud Detection"
            subtitle="Analyze and verify documents and transactions"
            icon={Shield}
            color={theme.colors.semantic.error}
            count={fraudModules.length}
          />
          
          {fraudModules.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}

          {/* Call to Action */}
          <Card style={{ marginTop: theme.spacing.xl }} variant="elevated">
            <CardContent>
              <View style={{ alignItems: "center" }}>
                <Award size={32} color={theme.colors.semantic.success} />
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
                  Need More Tools?
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.base,
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  Explore our simulators and educational content for comprehensive fraud prevention training.
                </Text>
                <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
                  <Button
                    onPress={() => router.push("/(app)/(tabs)/simulator")}
                    variant="primary"
                    size="md"
                  >
                    Try Simulators
                  </Button>
                  <Button
                    onPress={() => router.push("/(app)/(tabs)/education")}
                    variant="outline"
                    size="md"
                  >
                    Learn More
                  </Button>
                </View>
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
