import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  TriangleAlert as AlertTriangle,
  Shield,
  Eye,
  ArrowLeft,
  Users,
  CreditCard,
  Smartphone,
  FileText,
} from "lucide-react-native";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/Card";
import { Button } from "../../../../components/ui/Button";
import ThemeToggle from "../../../../components/ThemeToggle";

export default function IdentityTheftSimulatorHome() {
  const router = useRouter();
  const { theme } = useTheme();

  const fraudMethods = [
    {
      title: "KYC Spoofing",
      description: "Learn how fraudsters fake identity verification",
      icon: FileText,
      color: theme.colors.semantic.error,
    },
    {
      title: "SIM Card Cloning",
      description: "Understand mobile number hijacking techniques",
      icon: Smartphone,
      color: theme.colors.semantic.warning,
    },
    {
      title: "Fake Customer Care",
      description: "Recognize social engineering attacks",
      icon: Users,
      color: theme.colors.brand.primary,
    },
    {
      title: "Identity-based Loan Fraud",
      description: "See how your identity can be used for loans",
      icon: CreditCard,
      color: theme.colors.semantic.info,
    },
  ];

  return (
    <LinearGradient
      colors={theme.colors.background.gradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface.primary }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => router.back()}
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
            
            <View style={{ flex: 1 }}>
              <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                Identity Theft Simulator
              </Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
                Educational cybersecurity experience
              </Text>
            </View>
            
            <ThemeToggle />
          </View>
        </View>

        <View style={styles.content}>
          {/* Main Title Card */}
          <Card style={{ marginBottom: theme.spacing.lg }} variant="elevated">
            <CardContent>
              <View style={{ alignItems: "center", marginBottom: theme.spacing.lg }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.semantic.error}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <AlertTriangle size={40} color={theme.colors.semantic.error} />
                </View>
                
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes['2xl'],
                    fontWeight: theme.typography.fontWeights.bold,
                    color: theme.colors.text.primary,
                    textAlign: "center",
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  The Data Leak
                </Text>
                
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.lg,
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                  }}
                >
                  When Oversharing Costs You
                </Text>
              </View>

              {/* Warning Box */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  backgroundColor: `${theme.colors.semantic.warning}20`,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  borderLeftWidth: 4,
                  borderLeftColor: theme.colors.semantic.warning,
                  marginBottom: theme.spacing.lg,
                }}
              >
                <Shield size={24} color={theme.colors.semantic.warning} />
                <View style={{ marginLeft: theme.spacing.sm, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.base,
                      fontWeight: theme.typography.fontWeights.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    Educational Simulation Only
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.sm,
                      color: theme.colors.text.secondary,
                      lineHeight: theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
                    }}
                  >
                    This app demonstrates how identity theft occurs to raise awareness about cybersecurity threats.
                  </Text>
                </View>
              </View>

              {/* Description */}
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.base,
                  color: theme.colors.text.secondary,
                  lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
                  textAlign: "center",
                }}
              >
                Experience a realistic simulation of how personal data can be misused through various fraud methods.
              </Text>
            </CardContent>
          </Card>

          {/* Fraud Methods */}
          <Text
            style={{
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
            }}
          >
            What You'll Learn
          </Text>

          {fraudMethods.map((method, index) => (
            <Card key={index} style={{ marginBottom: theme.spacing.md }} animated>
              <CardContent>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: theme.borderRadius.xl,
                      backgroundColor: `${method.color}20`,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: theme.spacing.md,
                    }}
                  >
                    <method.icon size={24} color={method.color} />
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
                      {method.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSizes.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {method.description}
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}

          {/* Start Button */}
          <Card style={{ marginTop: theme.spacing.lg }} variant="elevated">
            <CardContent>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.lg,
                    fontWeight: theme.typography.fontWeights.semibold,
                    color: theme.colors.text.primary,
                    textAlign: "center",
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  Ready to Begin?
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.base,
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  Start the interactive simulation to learn how to protect yourself from identity theft.
                </Text>
                <Button
                  onPress={() => router.push("/pages/identityTheftSimulator/simulation")}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Eye size={20} color={theme.colors.text.inverse} />
                    <Text
                      style={{
                        color: theme.colors.text.inverse,
                        fontSize: theme.typography.fontSizes.base,
                        fontWeight: theme.typography.fontWeights.semibold,
                        marginLeft: theme.spacing.sm,
                      }}
                    >
                      Start Simulation
                    </Text>
                  </View>
                </Button>
              </View>
            </CardContent>
          </Card>
        </View>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
