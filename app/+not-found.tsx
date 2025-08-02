import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Home, AlertTriangle } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <LinearGradient colors={theme.colors.background.gradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Error Icon */}
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: theme.borderRadius.full,
              backgroundColor: `${theme.colors.semantic.error}20`,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: theme.spacing.xl,
            }}
          >
            <AlertTriangle size={60} color={theme.colors.semantic.error} />
          </View>

          {/* Error Code */}
          <Text
            style={{
              fontSize: theme.typography.fontSizes['4xl'],
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
            }}
          >
            404
          </Text>

          {/* Error Title */}
          <Text
            style={{
              fontSize: theme.typography.fontSizes['2xl'],
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.semantic.error,
              marginBottom: theme.spacing.sm,
            }}
          >
            Page Not Found
          </Text>

          {/* Error Description */}
          <Text
            style={{
              fontSize: theme.typography.fontSizes.base,
              color: theme.colors.text.secondary,
              textAlign: "center",
              lineHeight: theme.typography.fontSizes.base * theme.typography.lineHeights.normal,
              marginBottom: theme.spacing['2xl'],
              paddingHorizontal: theme.spacing.lg,
            }}
          >
            Oops! The page you're looking for doesn't exist or has been moved to a different location.
          </Text>

          {/* Helpful Card */}
          <Card style={{ marginBottom: theme.spacing.xl, width: "90%" }} variant="elevated">
            <CardContent>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.base,
                  color: theme.colors.text.primary,
                  fontWeight: theme.typography.fontWeights.medium,
                  textAlign: "center",
                  marginBottom: theme.spacing.sm,
                }}
              >
                What you can do:
              </Text>
              <View style={{ gap: theme.spacing.sm }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.sm,
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                  }}
                >
                  • Check the URL for typos
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.sm,
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                  }}
                >
                  • Go back to the previous page
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.sm,
                    color: theme.colors.text.secondary,
                    textAlign: "center",
                  }}
                >
                  • Return to the home screen
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <View style={{ gap: theme.spacing.md, width: "80%" }}>
            <Button
              onPress={() => router.push("/(app)/(tabs)")}
              variant="primary"
              size="lg"
              fullWidth
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Home size={20} color={theme.colors.text.inverse} />
                <Text
                  style={{
                    color: theme.colors.text.inverse,
                    fontSize: theme.typography.fontSizes.base,
                    fontWeight: theme.typography.fontWeights.semibold,
                    marginLeft: theme.spacing.sm,
                  }}
                >
                  Go to Home
                </Text>
              </View>
            </Button>

            <Button
              onPress={() => router.back()}
              variant="outline"
              size="lg"
              fullWidth
            >
              Go Back
            </Button>
          </View>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
