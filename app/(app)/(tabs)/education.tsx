import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BookOpen,
  Lightbulb,
  ExternalLink,
  Building2,
  Shield,
  GraduationCap,
  Globe,
  Phone,
  Mail,
  ChevronRight,
  AlertTriangle,
  Info,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { router } from "expo-router";
import LessonsPage from "../pages/LessonsPage";
import ThemeToggle from "../../../components/ThemeToggle";

const { width } = Dimensions.get("window");

const EducationScreen = () => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<
    "glossary" | "tips" | "resources"
  >("glossary");

  const glossaryItems = [
    {
      term: "Ponzi Scheme",
      definition:
        "A fraudulent investment operation that pays returns to existing investors using capital from new investors, rather than from legitimate business operations.",
      example:
        "Bernie Madoff's investment scandal was one of the largest Ponzi schemes in history.",
      severity: "high" as const,
    },
    {
      term: "Pyramid Scheme",
      definition:
        "A business model that recruits members via a promise of payments for enrolling others into the scheme, rather than supplying investments or sale of products.",
      example:
        "A pyramid scheme might involve members paying an entry fee and earning money solely by bringing in new recruits.",
      severity: "high" as const,
    },
    {
      term: "Identity Theft",
      definition:
        "The fraudulent acquisition and use of a person's private identifying information, usually for financial gain.",
      example:
        "Criminals might steal your social security number to open credit cards in your name.",
      severity: "critical" as const,
    },
    {
      term: "Phishing",
      definition:
        "A cybercrime where targets are contacted by email, telephone, or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data.",
      example:
        "Fake emails claiming to be from your bank asking you to verify your account details.",
      severity: "high" as const,
    },
    {
      term: "Social Engineering",
      definition:
        "The use of deception to manipulate individuals into divulging confidential or personal information that may be used for fraudulent purposes.",
      example:
        "A scammer calling and pretending to be from tech support to gain access to your computer.",
      severity: "medium" as const,
    },
    {
      term: "Investment Fraud",
      definition:
        "An offer using false or fraudulent claims to solicit investments or loans, or providing for the purchase, use, or trade of forged or counterfeit securities.",
      example:
        "Promises of guaranteed high returns with little to no risk involved.",
      severity: "high" as const,
    },
  ];

  const safetyTips = [
    {
      title: "Verify Before You Trust",
      description: "Always verify the legitimacy of investment opportunities through independent research.",
      icon: Shield,
      category: "investment",
    },
    {
      title: "Too Good to Be True",
      description: "Be skeptical of investment opportunities that promise guaranteed high returns with no risk.",
      icon: AlertTriangle,
      category: "general",
    },
    {
      title: "Protect Personal Information",
      description: "Never share sensitive personal or financial information over unsolicited calls or emails.",
      icon: Info,
      category: "privacy",
    },
    {
      title: "Research the Company",
      description: "Check if the investment company is registered with relevant financial authorities.",
      icon: Building2,
      category: "investment",
    },
    {
      title: "Seek Professional Advice",
      description: "Consult with licensed financial advisors before making significant investment decisions.",
      icon: GraduationCap,
      category: "professional",
    },
  ];

  const resources = [
    {
      title: "SEC Investor.gov",
      description: "Official SEC resource for investor education and protection",
      url: "https://www.investor.gov/",
      category: "government",
      icon: Building2,
    },
    {
      title: "FTC Consumer Information",
      description: "Federal Trade Commission's guide to avoiding scams",
      url: "https://consumer.ftc.gov/",
      category: "government",
      icon: Shield,
    },
    {
      title: "FINRA Investor Education",
      description: "Financial Industry Regulatory Authority educational resources",
      url: "https://www.finra.org/investors",
      category: "financial",
      icon: GraduationCap,
    },
    {
      title: "AARP Fraud Watch",
      description: "Resources and tools to help you spot and avoid fraud",
      url: "https://www.aarp.org/money/scams-fraud/",
      category: "consumer",
      icon: Globe,
    },
  ];

  const emergencyContacts = [
    {
      title: "SEC Complaint Center",
      contact: "1-800-SEC-0330",
      type: "phone" as const,
      description: "Report investment fraud",
    },
    {
      title: "FTC Fraud Hotline",
      contact: "1-877-FTC-HELP",
      type: "phone" as const,
      description: "Report consumer fraud",
    },
    {
      title: "FBI IC3",
      contact: "ic3.gov",
      type: "web" as const,
      description: "Internet Crime Complaint Center",
    },
  ];

  const TabButton = ({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[
        {
          flex: 1,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          marginHorizontal: theme.spacing.xs,
          backgroundColor: isActive ? theme.colors.brand.primary : theme.colors.surface.secondary,
          ...theme.shadows.sm,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: theme.typography.fontSizes.sm,
          fontWeight: theme.typography.fontWeights.semibold,
          color: isActive ? theme.colors.text.inverse : theme.colors.text.secondary,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const GlossaryItem = ({ item }: { item: typeof glossaryItems[0] }) => {
    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case "critical":
          return theme.colors.semantic.error;
        case "high":
          return theme.colors.semantic.warning;
        case "medium":
          return theme.colors.semantic.info;
        default:
          return theme.colors.text.tertiary;
      }
    };

    return (
      <Card style={{ marginBottom: theme.spacing.md }} animated>
        <CardHeader>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <CardTitle size="sm">{item.term}</CardTitle>
            <View
              style={{
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.full,
                backgroundColor: `${getSeverityColor(item.severity)}20`,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.xs,
                  fontWeight: theme.typography.fontWeights.medium,
                  color: getSeverityColor(item.severity),
                  textTransform: "uppercase",
                }}
              >
                {item.severity}
              </Text>
            </View>
          </View>
        </CardHeader>
        <CardContent>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.base,
              color: theme.colors.text.secondary,
              lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
              marginBottom: theme.spacing.md,
            }}
          >
            {item.definition}
          </Text>
          <View
            style={{
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.colors.surface.secondary,
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.brand.primary,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSizes.sm,
                fontWeight: theme.typography.fontWeights.medium,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
              }}
            >
              Example:
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.sm,
                color: theme.colors.text.secondary,
                fontStyle: "italic",
              }}
            >
              {item.example}
            </Text>
          </View>
        </CardContent>
      </Card>
    );
  };

  const SafetyTip = ({ tip }: { tip: typeof safetyTips[0] }) => (
    <Card style={{ marginBottom: theme.spacing.md }} animated>
      <CardContent>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: theme.borderRadius.full,
              backgroundColor: `${theme.colors.brand.primary}20`,
              justifyContent: "center",
              alignItems: "center",
              marginRight: theme.spacing.md,
            }}
          >
            <tip.icon size={24} color={theme.colors.brand.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.sm,
              }}
            >
              {tip.title}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.base,
                color: theme.colors.text.secondary,
                lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
              }}
            >
              {tip.description}
            </Text>
            <View
              style={{
                alignSelf: "flex-start",
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.md,
                backgroundColor: theme.colors.surface.secondary,
                marginTop: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.xs,
                  fontWeight: theme.typography.fontWeights.medium,
                  color: theme.colors.text.tertiary,
                  textTransform: "capitalize",
                }}
              >
                {tip.category}
              </Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );

  const ResourceItem = ({ resource }: { resource: typeof resources[0] }) => (
    <TouchableOpacity
      onPress={() => Linking.openURL(resource.url)}
      activeOpacity={0.8}
    >
      <Card style={{ marginBottom: theme.spacing.md }} animated>
        <CardContent>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: `${theme.colors.semantic.info}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: theme.spacing.md,
                }}
              >
                <resource.icon size={20} color={theme.colors.semantic.info} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.base,
                    fontWeight: theme.typography.fontWeights.semibold,
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {resource.title}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  {resource.description}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color={theme.colors.text.tertiary} />
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  const EmergencyContact = ({ contact }: { contact: typeof emergencyContacts[0] }) => (
    <Card style={{ marginBottom: theme.spacing.md }} variant="outline" animated>
      <CardContent>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.borderRadius.full,
              backgroundColor: `${theme.colors.semantic.error}20`,
              justifyContent: "center",
              alignItems: "center",
              marginRight: theme.spacing.md,
            }}
          >
            {contact.type === "phone" ? (
              <Phone size={20} color={theme.colors.semantic.error} />
            ) : contact.type === "email" ? (
              <Mail size={20} color={theme.colors.semantic.error} />
            ) : (
              <Globe size={20} color={theme.colors.semantic.error} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.base,
                fontWeight: theme.typography.fontWeights.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
              }}
            >
              {contact.title}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.xs,
              }}
            >
              {contact.description}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.sm,
                fontWeight: theme.typography.fontWeights.medium,
                color: theme.colors.brand.primary,
              }}
            >
              {contact.contact}
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case "glossary":
        return (
          <View>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
                textAlign: "center",
              }}
            >
              Understanding Financial Fraud Terms
            </Text>
            {glossaryItems.map((item, index) => (
              <GlossaryItem key={index} item={item} />
            ))}
          </View>
        );

      case "tips":
        return (
          <View>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
                textAlign: "center",
              }}
            >
              Essential Safety Tips
            </Text>
            {safetyTips.map((tip, index) => (
              <SafetyTip key={index} tip={tip} />
            ))}
          </View>
        );

      case "resources":
        return (
          <View>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.sm,
                textAlign: "center",
              }}
            >
              Educational Resources
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.base,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.xl,
                textAlign: "center",
              }}
            >
              Trusted sources for fraud prevention education
            </Text>
            {resources.map((resource, index) => (
              <ResourceItem key={index} resource={resource} />
            ))}

            <View
              style={{
                marginTop: theme.spacing.xl,
                padding: theme.spacing.lg,
                borderRadius: theme.borderRadius.xl,
                backgroundColor: `${theme.colors.semantic.error}10`,
                borderWidth: 1,
                borderColor: `${theme.colors.semantic.error}30`,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.semantic.error,
                  marginBottom: theme.spacing.md,
                  textAlign: "center",
                }}
              >
                🚨 Emergency Contacts
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing.lg,
                  textAlign: "center",
                }}
              >
                If you suspect fraud, report it immediately
              </Text>
              {emergencyContacts.map((contact, index) => (
                <EmergencyContact key={index} contact={contact} />
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={theme.colors.background.gradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface.primary }]}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <GraduationCap size={32} color={theme.colors.brand.primary} />
              <View style={{ marginLeft: theme.spacing.md }}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                  Education Center
                </Text>
                <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
                  Learn to protect yourself from fraud
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={[styles.tabContainer, { backgroundColor: theme.colors.surface.primary }]}>
          <TabButton
            title="Glossary"
            isActive={selectedTab === "glossary"}
            onPress={() => setSelectedTab("glossary")}
          />
          <TabButton
            title="Safety Tips"
            isActive={selectedTab === "tips"}
            onPress={() => setSelectedTab("tips")}
          />
          <TabButton
            title="Resources"
            isActive={selectedTab === "resources"}
            onPress={() => setSelectedTab("resources")}
          />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing['3xl'] }}
        >
          {renderContent()}
        </ScrollView>

        {/* Lessons Button */}
        <View style={[styles.bottomAction, { backgroundColor: theme.colors.surface.primary }]}>
          <Button
            onPress={() => router.push("/pages/LessonsPage" as any)}
            variant="primary"
            size="lg"
            fullWidth
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <BookOpen size={20} color={theme.colors.text.inverse} style={{ marginRight: theme.spacing.sm }} />
              <Text style={{ color: theme.colors.text.inverse, fontWeight: theme.typography.fontWeights.semibold }}>
                Start Interactive Lessons
              </Text>
            </View>
          </Button>
        </View>
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
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default EducationScreen;
