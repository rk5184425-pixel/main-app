import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Trophy,
  Flag,
  BookOpen,
  Brain,
  Award,
  Bell,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  Shield,
  GraduationCap,
  Settings,
  ChevronRight,
  Star,
  Target,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { setUser } from "../../../redux/slices/profileSlices";
import { router } from "expo-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import ThemeToggle from "../../../components/ThemeToggle";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const { theme } = useTheme();
  const userProfile = useSelector((state: any) => state.profile?.user);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const achievements = [
    { 
      name: "Red Flag Spotter", 
      icon: Flag, 
      color: theme.colors.semantic.error, 
      earned: true,
      description: "Identified 10+ fraud indicators",
      date: "2024-01-15",
    },
    { 
      name: "Fraud Fighter", 
      icon: Shield, 
      color: theme.colors.brand.primary, 
      earned: true,
      description: "Completed all fraud simulators",
      date: "2024-01-20",
    },
    { 
      name: "Financial Detective", 
      icon: Brain, 
      color: theme.colors.semantic.info, 
      earned: true,
      description: "Solved complex fraud cases",
      date: "2024-01-25",
    },
    { 
      name: "Story Master", 
      icon: BookOpen, 
      color: theme.colors.semantic.success, 
      earned: true,
      description: "Completed all educational stories",
      date: "2024-02-01",
    },
    { 
      name: "Scheme Buster", 
      icon: Target, 
      color: theme.colors.semantic.warning, 
      earned: true,
      description: "Exposed 5+ different schemes",
      date: "2024-02-05",
    },
    { 
      name: "Awareness Champion", 
      icon: TrendingUp, 
      color: theme.colors.brand.accent, 
      earned: false,
      description: "Share knowledge with 10 friends",
      date: null,
    },
  ];

  const stats = [
    {
      title: "Simulators Completed",
      value: "12",
      icon: Brain,
      color: theme.colors.brand.primary,
    },
    {
      title: "Fraud Types Learned",
      value: "8",
      icon: Flag,
      color: theme.colors.semantic.error,
    },
    {
      title: "Knowledge Score",
      value: "94%",
      icon: Trophy,
      color: theme.colors.semantic.success,
    },
    {
      title: "Days Active",
      value: "23",
      icon: Calendar,
      color: theme.colors.semantic.warning,
    },
  ];

  const menuItems = [
    {
      title: "Notifications",
      icon: Bell,
      color: theme.colors.semantic.info,
      onPress: () => Alert.alert("Notifications", "Notification settings coming soon!"),
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: theme.colors.semantic.success,
      onPress: () => Alert.alert("Privacy", "Privacy settings coming soon!"),
    },
    {
      title: "Language",
      icon: Globe,
      color: theme.colors.brand.primary,
      onPress: () => Alert.alert("Language", "Language settings coming soon!"),
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      color: theme.colors.semantic.warning,
      onPress: () => Alert.alert("Help", "Help center coming soon!"),
    },
    {
      title: "About",
      icon: Info,
      color: theme.colors.text.tertiary,
      onPress: () => Alert.alert("About", "FinEduGuard v1.0.0"),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => signOut(),
        },
      ]
    );
  };

  const StatsCard = ({ stat }: { stat: typeof stats[0] }) => (
    <Card style={{ flex: 1, marginHorizontal: theme.spacing.xs }} variant="elevated">
      <CardContent>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.borderRadius.full,
              backgroundColor: `${stat.color}20`,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: theme.spacing.sm,
            }}
          >
            <stat.icon size={20} color={stat.color} />
          </View>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.xl,
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs,
            }}
          >
            {stat.value}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.xs,
              color: theme.colors.text.secondary,
              textAlign: "center",
            }}
          >
            {stat.title}
          </Text>
        </View>
      </CardContent>
    </Card>
  );

  const AchievementCard = ({ achievement }: { achievement: typeof achievements[0] }) => (
    <Card 
      style={{ 
        marginBottom: theme.spacing.md,
        opacity: achievement.earned ? 1 : 0.6,
      }} 
      animated
    >
      <CardContent>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: theme.borderRadius.xl,
              backgroundColor: `${achievement.color}20`,
              justifyContent: "center",
              alignItems: "center",
              marginRight: theme.spacing.md,
            }}
          >
            <achievement.icon size={28} color={achievement.earned ? achievement.color : theme.colors.text.disabled} />
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.spacing.xs }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.semibold,
                  color: achievement.earned ? theme.colors.text.primary : theme.colors.text.disabled,
                  flex: 1,
                }}
              >
                {achievement.name}
              </Text>
              {achievement.earned && (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: theme.colors.semantic.success,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Star size={14} color={theme.colors.text.inverse} fill={theme.colors.text.inverse} />
                </View>
              )}
            </View>
            
            <Text
              style={{
                fontSize: theme.typography.fontSizes.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.xs,
              }}
            >
              {achievement.description}
            </Text>
            
            {achievement.earned && achievement.date && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Clock size={12} color={theme.colors.text.tertiary} />
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.xs,
                    color: theme.colors.text.tertiary,
                    marginLeft: theme.spacing.xs,
                  }}
                >
                  Earned on {new Date(achievement.date).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );

  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity onPress={item.onPress} activeOpacity={0.8}>
      <Card style={{ marginBottom: theme.spacing.sm }} animated>
        <CardContent>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: `${item.color}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: theme.spacing.md,
                }}
              >
                <item.icon size={20} color={item.color} />
              </View>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.base,
                  fontWeight: theme.typography.fontWeights.medium,
                  color: theme.colors.text.primary,
                }}
              >
                {item.title}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.text.tertiary} />
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalAchievements = achievements.length;

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
              <User size={32} color={theme.colors.brand.primary} />
              <View style={{ marginLeft: theme.spacing.md }}>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                  Profile
                </Text>
                <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
                  Your learning journey
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing['3xl'] }}
        >
          {/* User Info Card */}
          <Card style={{ marginBottom: theme.spacing.lg }} variant="elevated">
            <CardContent>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.brand.primary}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <User size={40} color={theme.colors.brand.primary} />
                </View>
                
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes['2xl'],
                    fontWeight: theme.typography.fontWeights.bold,
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {userData?.name || userProfile?.name || "John Doe"}
                </Text>
                
                <Text
                  style={{
                    fontSize: theme.typography.fontSizes.base,
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  {userData?.email || userProfile?.email || "john.doe@example.com"}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: `${theme.colors.semantic.success}20`,
                  }}
                >
                  <Trophy size={16} color={theme.colors.semantic.success} />
                  <Text
                    style={{
                      fontSize: theme.typography.fontSizes.sm,
                      fontWeight: theme.typography.fontWeights.semibold,
                      color: theme.colors.semantic.success,
                      marginLeft: theme.spacing.xs,
                    }}
                  >
                    {earnedAchievements.length}/{totalAchievements} Achievements
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: theme.spacing.lg, gap: theme.spacing.sm }}>
            {stats.map((stat, index) => (
              <StatsCard key={index} stat={stat} />
            ))}
          </View>

          {/* Achievements Section */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.xl,
                fontWeight: theme.typography.fontWeights.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}
            >
              Achievements
            </Text>
            
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          </View>

          {/* Settings Section */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.xl,
                fontWeight: theme.typography.fontWeights.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}
            >
              Settings
            </Text>
            
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </View>

          {/* Logout Button */}
          <Button
            onPress={handleLogout}
            variant="error"
            size="lg"
            fullWidth
            style={{ marginTop: theme.spacing.md }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <LogOut size={20} color={theme.colors.text.inverse} />
              <Text
                style={{
                  color: theme.colors.text.inverse,
                  fontWeight: theme.typography.fontWeights.semibold,
                  marginLeft: theme.spacing.sm,
                }}
              >
                Logout
              </Text>
            </View>
          </Button>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default ProfileScreen;
