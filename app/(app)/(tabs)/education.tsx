import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
  Easing,
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
  Sparkles,
  Star,
  Zap,
} from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { router } from "expo-router";
import LessonsPage from "../pages/LessonsPage";

const EducationScreen = () => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<
    "glossary" | "lessons" | "resources"
  >("lessons");
  const [animatedValues] = useState({
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(30),
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValues.fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues.slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const glossaryItems = [
    {
      term: "Ponzi Scheme",
      definition:
        "A fraudulent investment operation that pays returns to existing investors using capital from new investors, rather than from legitimate business operations.",
      example:
        "Bernie Madoff's investment scandal was one of the largest Ponzi schemes in history.",
      color: "#ef4444",
    },
    {
      term: "Pyramid Scheme",
      definition:
        "A business model that recruits members via a promise of payments for enrolling others into the scheme, rather than supplying investments or sale of products.",
      example:
        "A pyramid scheme might involve members paying an entry fee and earning money solely by bringing in new recruits.",
      color: "#f59e0b",
    },
    {
      term: "Identity Theft",
      definition:
        "The fraudulent acquisition and use of someone's personal information, usually for financial gain.",
      example:
        "Hackers used stolen social security numbers to open credit cards in victims’ names.",
      color: "#8b5cf6",
    },
    {
      term: "Credit Card Fraud",
      definition:
        "Unauthorized use of another person's credit card information to make purchases or withdraw funds.",
      example:
        "A fraudster used a skimming device at an ATM to steal card data and make unauthorized purchases.",
      color: "#06b6d4",
    },
    {
      term: "Phishing Scam",
      definition:
        "A cyber attack where criminals pose as legitimate institutions to lure individuals into providing sensitive data such as passwords and banking information.",
      example:
        "A victim received an email that looked like it was from their bank, asking them to confirm account details via a fake link.",
      color: "#10b981",
    },
    {
      term: "Investment Fraud",
      definition:
        "Deceptive practices to convince individuals to invest in worthless, nonexistent, or misrepresented investment opportunities.",
      example:
        "The company promised unrealistic returns on fake cryptocurrency investments.",
    },
    {
      term: "Mortgage Fraud",
      definition:
        "A type of fraud involving the misrepresentation of information to obtain a mortgage loan or better loan terms dishonestly.",
      example:
        "A buyer lied about their income and assets to get approved for a larger mortgage.",
    },
    {
      term: "Tax Scam",
      definition:
        "A fraudulent scheme where scammers promise large tax refunds or reduced liabilities through false information or illegal methods.",
      example:
        "A fake tax preparer filed false returns to claim inflated deductions for clients and took a cut of the refunds.",
    },
    {
      term: "Lottery and Sweepstakes Fraud",
      definition:
        "Scammers tell victims they’ve won a lottery or prize but must pay fees or taxes upfront to claim it.",
      example:
        "The victim received a letter claiming they won a foreign lottery and had to wire money for processing fees.",
    },
    {
      term: "Charity Scam",
      definition:
        "Fraudulent solicitation of donations for causes that don’t exist or don’t benefit the stated beneficiaries.",
      example:
        "After a natural disaster, scammers created fake websites to collect donations from well-meaning individuals.",
    },
    {
      term: "Debt Relief Scam",
      definition:
        "A scheme that falsely promises to reduce or eliminate a person’s debt in exchange for upfront fees, but delivers little or no actual relief.",
      example:
        "The company charged high fees and claimed they would negotiate with creditors but never followed through.",
    },
    {
      term: "Fake Check Scam",
      definition:
        "A scam where the victim is sent a counterfeit check and asked to send back money before the check clears and bounces.",
      example:
        "A victim was hired for a mystery shopper job, sent a fake check, and asked to send back a portion in gift cards.",
    },
    {
      term: "Online Banking Fraud",
      definition:
        "Unauthorized access to or manipulation of online banking accounts through hacking, phishing, or social engineering.",
      example:
        "Hackers used stolen credentials to transfer funds from the victim’s bank account to overseas accounts.",
    },
    {
      term: "Employment Fraud",
      definition:
        "Scams involving fake job offers that require payment for training, equipment, or background checks, but never lead to actual employment.",
      example:
        "A victim paid for a work-from-home training kit that never arrived and was unable to contact the employer again.",
    },
    {
      term: "Student Loan Scam",
      definition:
        "A fraud involving fake companies that offer to reduce or erase student loan debt in exchange for fees but provide no actual service.",
      example:
        "The student was tricked into paying a fee for loan forgiveness assistance that never materialized.",
    },
    {
      term: "Old Tax Regime",
      definition:
        "A tax system where taxpayers can reduce their taxable income through various deductions such as under Sections 80C, 80D, HRA, LTA, and home loan interest.",
      example:
        "A taxpayer reduced their tax by ₹1.5L using 80C and another ₹2L using home loan interest.",
    },
  ];

  const resources = [
    {
      title: "SEBI Investor Portal",
      description:
        "Securities and Exchange Board of India - Official investor protection portal",
      url: "https://www.sebi.gov.in",
      icon: Building2,
      color: "#6366f1",
    },
    {
      title: "RBI Consumer Education",
      description: "Reserve Bank of India - Banking and financial awareness",
      url: "https://www.rbi.org.in",
      icon: Building2,
      color: "#10b981",
    },
    {
      title: "Cybercrime Reporting",
      description: "Report financial fraud and cybercrime to authorities",
      url: "https://cybercrime.gov.in",
      icon: Shield,
      color: "#ef4444",
    },
    {
      title: "PFMS Scholarship",
      description:
        "Public Financial Management System - Government schemes verification",
      url: "https://pfms.nic.in",
      icon: GraduationCap,
      color: "#f59e0b",
    },
  ];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const renderGlossary = () => (
    <View>
      {glossaryItems.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.glossaryCard,
            {
              opacity: animatedValues.fadeAnim,
              transform: [
                {
                  translateY: animatedValues.slideAnim.interpolate({
                    inputRange: [0, 30],
                    outputRange: [0, 30 + index * 10],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              router.push("/pages/FraudDetails?fraud=" + item.term)
            }
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[item.color + "10", item.color + "05"]}
              style={styles.glossaryCardGradient}
            >
              <View style={styles.glossaryHeader}>
                <View style={[styles.termIconContainer, { backgroundColor: item.color + "20" }]}>
                  <Shield size={20} color={item.color} />
                </View>
                <Text style={styles.glossaryTerm}>{item.term}</Text>
                <ExternalLink size={20} color="#94a3b8" />
              </View>
              <Text style={styles.glossaryDefinition}>{item.definition}</Text>
              <View style={styles.exampleContainer}>
                <View style={styles.exampleIconContainer}>
                  <Lightbulb size={16} color="#fbbf24" />
                </View>
                <Text style={styles.glossaryExample}>{item.example}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Animated.View
        style={[
          styles.emergencyCard,
          {
            opacity: animatedValues.fadeAnim,
            transform: [{ translateY: animatedValues.slideAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={["#fef2f2", "#fee2e2"]}
          style={styles.emergencyGradient}
        >
          <View style={styles.emergencyHeader}>
            <View style={styles.emergencyIconContainer}>
              <Shield size={24} color="#dc2626" />
            </View>
            <Text style={styles.emergencyTitle}>🚨 Report Fraud Immediately</Text>
          </View>
          <Text style={styles.emergencyText}>
            If you've been a victim of fraud or suspect fraudulent activity,
            report it immediately through these official channels:
          </Text>
          <View style={styles.emergencyContacts}>
            <View style={styles.contactItem}>
              <View style={styles.contactIconContainer}>
                <Phone size={16} color="#dc2626" />
              </View>
              <Text style={styles.emergencyContact}>
                Cyber Crime Helpline: 1930
              </Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIconContainer}>
                <Globe size={16} color="#dc2626" />
              </View>
              <Text style={styles.emergencyContact}>cybercrime.gov.in</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIconContainer}>
                <Mail size={16} color="#dc2626" />
              </View>
              <Text style={styles.emergencyContact}>
                report.phishing@rbi.org.in
              >
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );

  const renderLessons = () => <LessonsPage />;

  const renderResources = () => (
    <View>
      {resources.map((resource, index) => (
        <Animated.View
          key={index}
          style={[
            styles.resourceCard,
            {
              opacity: animatedValues.fadeAnim,
              transform: [
                {
                  translateY: animatedValues.slideAnim.interpolate({
                    inputRange: [0, 30],
                    outputRange: [0, 20 + index * 8],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => handleLinkPress(resource.url)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[resource.color + "10", resource.color + "05"]}
              style={styles.resourceCardGradient}
            >
              <View style={styles.resourceHeader}>
                <View style={[styles.resourceIconContainer, { backgroundColor: resource.color + "20" }]}>
                  <resource.icon size={24} color={resource.color} />
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>{resource.title}</Text>
                  <Text style={styles.resourceDescription}>
                    {resource.description}
                  </Text>
                </View>
                <View style={styles.resourceArrow}>
                  <ExternalLink size={20} color="#94a3b8" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: animatedValues.fadeAnim,
              transform: [{ translateY: animatedValues.slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={["#1e293b", "#334155"]}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerContent}>
              <View style={styles.titleContainer}>
                <GraduationCap size={28} color="#fbbf24" />
                <Text style={styles.title}>Education Center</Text>
                <Sparkles size={20} color="#60a5fa" />
              </View>
              <Text style={styles.subtitle}>
                Master essential skills through our structured learning modules ✨
              >
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Enhanced Tab Navigation */}
        <Animated.View
          style={[
            styles.tabContainer,
            {
              opacity: animatedValues.fadeAnim,
              transform: [{ translateY: animatedValues.slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={["#1e293b", "#334155"]}
            style={styles.tabGradient}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "lessons" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("lessons")}
            >
              {selectedTab === "lessons" && (
                <LinearGradient
                  colors={["#6366f1", "#8b5cf6"]}
                  style={styles.activeTabGradient}
                />
              )}
              <Lightbulb
                size={20}
                color={selectedTab === "lessons" ? "white" : "#94a3b8"}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: selectedTab === "lessons" ? "white" : "#94a3b8",
                  },
                ]}
              >
                Lessons
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "glossary" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("glossary")}
            >
              {selectedTab === "glossary" && (
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  style={styles.activeTabGradient}
                />
              )}
              <BookOpen
                size={20}
                color={selectedTab === "glossary" ? "white" : "#94a3b8"}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: selectedTab === "glossary" ? "white" : "#94a3b8",
                  },
                ]}
              >
                Glossary
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "resources" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("resources")}
            >
              {selectedTab === "resources" && (
                <LinearGradient
                  colors={["#f59e0b", "#d97706"]}
                  style={styles.activeTabGradient}
                />
              )}
              <ExternalLink
                size={20}
                color={selectedTab === "resources" ? "white" : "#94a3b8"}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: selectedTab === "resources" ? "white" : "#94a3b8",
                  },
                ]}
              >
                Resources
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === "glossary" && renderGlossary()}
          {selectedTab === "lessons" && renderLessons()}
          {selectedTab === "resources" && renderResources()}
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  headerContent: {
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 22,
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabGradient: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    position: "relative",
    gap: 8,
  },
  activeTab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  activeTabGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  glossaryCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  glossaryCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
  },
  glossaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  termIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  glossaryTerm: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    flex: 1,
  },
  glossaryDefinition: {
    fontSize: 14,
    color: "#e2e8f0",
    lineHeight: 20,
    marginBottom: 16,
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    gap: 12,
  },
  exampleIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(251, 191, 36, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  glossaryExample: {
    fontSize: 13,
    color: "#cbd5e1",
    fontStyle: "italic",
    flex: 1,
    lineHeight: 18,
  },
  emergencyCard: {
    marginHorizontal: 2,
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  emergencyGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  emergencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  emergencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(220, 38, 38, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#dc2626",
    flex: 1,
  },
  emergencyText: {
    fontSize: 14,
    color: "#7f1d1d",
    marginBottom: 20,
    lineHeight: 20,
  },
  emergencyContacts: {
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  emergencyContact: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7f1d1d",
    flex: 1,
  },
  resourceCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  resourceCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
  },
  resourceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  resourceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 18,
  },
  resourceArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EducationScreen;
    </View>
  );

  return (
    <LinearGradient
      colors={[theme.colors.background[0], theme.colors.background[1]]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Education Center
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Master essential skills through our structured learning modules.
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: "#a59d9d24",
                borderColor: theme.colors.border,
                borderWidth: 0.3,
              },
              selectedTab === "lessons" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("lessons")}
          >
            <Lightbulb
              size={20}
              color={selectedTab === "lessons" ? "white" : theme.colors.icon}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === "lessons" ? "white" : theme.colors.icon,
                },
              ]}
            >
              Lessons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: "#a59d9d24",
                borderColor: theme.colors.border,
                borderWidth: 0.3,
              },
              selectedTab === "glossary" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("glossary")}
          >
            <BookOpen
              size={20}
              color={selectedTab === "glossary" ? "white" : theme.colors.icon}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === "glossary" ? "white" : theme.colors.icon,
                },
              ]}
            >
              Glossary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: "#a59d9d24",
                borderColor: theme.colors.border,
                borderWidth: 0.3,
              },
              selectedTab === "resources" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("resources")}
          >
            <ExternalLink
              size={20}
              color={selectedTab === "resources" ? "white" : theme.colors.icon}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === "resources" ? "white" : theme.colors.icon,
                },
              ]}
            >
              Resources
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedTab === "glossary" && renderGlossary()}
          {selectedTab === "lessons" && renderLessons()}
          {selectedTab === "resources" && renderResources()}
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
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#b8b8b8",
    marginTop: 8,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: "#ff6b6b",
  },
  tabText: {
    color: "#b8b8b8",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  activeTabText: {
    color: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  glossaryCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  glossaryTerm: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4ecdc4",
    marginBottom: 10,
  },
  glossaryDefinition: {
    fontSize: 14,
    color: "white",
    lineHeight: 20,
    marginBottom: 15,
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 217, 61, 0.1)",
    borderRadius: 8,
    padding: 12,
  },
  exampleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  glossaryExample: {
    fontSize: 13,
    color: "#b8b8b8",
    fontStyle: "italic",
    flex: 1,
    lineHeight: 18,
  },
  tipCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipIconText: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
  },
  tipDescription: {
    fontSize: 14,
    color: "#b8b8b8",
    lineHeight: 20,
  },
  resourceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  resourceHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  resourceContent: {
    flex: 1,
    marginLeft: 15,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: "#b8b8b8",
    lineHeight: 18,
  },
  emergencyCard: {
    backgroundColor: "#FEF2F2",
    marginHorizontal: 2,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 12,
  },
  emergencyText: {
    fontSize: 14,
    color: "#7F1D1D",
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyContacts: {
    gap: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emergencyContact: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F1D1D",
  },
});

export default EducationScreen;
