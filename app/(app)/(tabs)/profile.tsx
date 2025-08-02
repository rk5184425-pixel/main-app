import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
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
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { setUser } from "../../../redux/slices/profileSlices";
import { router } from "expo-router";
import ThemeToggle from "../../../components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Progress } from "../../../components/ui/Progress";

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

    if (!userProfile) {
      loadUserData();
    } else {
      setUserData(userProfile);
    }
  }, [userProfile]);

  const userStats = {
    schemesExposed: 12,
    redFlagsSpotted: 45,
    storiesCompleted: 8,
    badgesEarned: 6,
    currentLevel: "Financial Detective",
    experiencePoints: 2450,
    nextLevelXP: 3000,
  };

  const badges = [
    { name: "Red Flag Spotter", icon: Flag, color: theme.colors.semantic.error, earned: true },
    { name: "Collapse Survivor", icon: Shield, color: theme.colors.semantic.success, earned: true },
    { name: "Financial Detective", icon: "🔍", color: theme.colors.brand.primary, earned: true },
    { name: "Story Master", icon: BookOpen, color: theme.colors.semantic.info, earned: true },
    { name: "Scheme Buster", icon: "⚖️", color: theme.colors.brand.accent, earned: true },
    { name: "Fraud Fighter", icon: "🛡️", color: theme.colors.semantic.warning, earned: true },
    { name: "Awareness Champion", icon: "📢", color: theme.colors.semantic.info, earned: false },
    { name: "Master Guardian", icon: "👑", color: theme.colors.brand.primary, earned: false },
  ];

  const menuItems = [
    {
      title: "Account Settings",
      subtitle: "Manage your account preferences",
      icon: Settings,
      color: theme.colors.text.secondary,
      onPress: () => router.push("/pages/settings"),
    },
    {
      title: "Notifications",
      subtitle: "Configure your alerts",
      icon: Bell,
      color: theme.colors.semantic.warning,
      onPress: () => router.push("/pages/notifications"),
    },
    {
      title: "Language & Region",
      subtitle: "Set your preferred language",
      icon: Globe,
      color: theme.colors.semantic.info,
      onPress: () => router.push("/pages/language"),
    },
    {
      title: "Help & Support",
      subtitle: "Get help and contact support",
      icon: HelpCircle,
      color: theme.colors.semantic.success,
      onPress: () => router.push("/pages/help"),
    },
    {
      title: "About",
      subtitle: "App version and information",
      icon: Info,
      color: theme.colors.text.tertiary,
      onPress: () => router.push("/pages/about"),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: signOut,
        },
      ]
    );
  };

  const progressPercentage = (userStats.experiencePoints / userStats.nextLevelXP) * 100;

  const renderBadge = (badge: typeof badges[0], index: number) => (
    <Animated.View
      key={badge.name}
      entering={FadeInUp.delay(index * 50).springify()}
      style={styles.badgeContainer}
    >
      <View style={[
        styles.badgeIcon,
        { 
          backgroundColor: badge.earned ? `${badge.color}20` : theme.colors.surface.secondary,
          borderColor: badge.earned ? badge.color : theme.colors.border.secondary,
        }
      ]}>
        {typeof badge.icon === "string" ? (
          <Text style={styles.badgeEmoji}>{badge.icon}</Text>
        ) : (
          <badge.icon 
            size={24} 
            color={badge.earned ? badge.color : theme.colors.text.disabled} 
          />
        )}
      </View>
      <Text style={[
        styles.badgeName,
        { 
          color: badge.earned ? theme.colors.text.primary : theme.colors.text.disabled,
          fontWeight: badge.earned ? theme.typography.fontWeights.semibold : theme.typography.fontWeights.normal,
        }
      ]}>
        {badge.name}
      </Text>
    </Animated.View>
  );

  const renderMenuItem = (item: typeof menuItems[0], index: number) => (
    <Animated.View
      key={item.title}
      entering={FadeInDown.delay(index * 50).springify()}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
            <item.icon size={20} color={item.color} />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: theme.colors.text.primary }]}>
              {item.title}
            </Text>
            <Text style={[styles.menuSubtitle, { color: theme.colors.text.secondary }]}>
              {item.subtitle}
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color={theme.colors.text.tertiary} />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={theme.colors.background.gradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View entering={FadeInDown.springify()} style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
              Profile
            </Text>
            <ThemeToggle />
          </Animated.View>

          {/* User Info Card */}
          <Animated.View entering={FadeInUp.delay(100).springify()}>
            <Card variant="elevated" size="lg" style={styles.userCard}>
              <CardContent>
                <View style={styles.userInfo}>
                  <View style={[styles.avatar, { backgroundColor: theme.colors.brand.primary }]}>
                    <User size={40} color={theme.colors.text.inverse} />
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={[styles.userName, { color: theme.colors.text.primary }]}>
                      {userData?.name || "John Doe"}
                    </Text>
                    <Text style={[styles.userEmail, { color: theme.colors.text.secondary }]}>
                      {userData?.email || "john.doe@example.com"}
                    </Text>
                    <Badge variant="success" size="sm" style={styles.levelBadge}>
                      {userStats.currentLevel}
                    </Badge>
                  </View>
                </View>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Progress Card */}
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <Card variant="default" size="lg" style={styles.progressCard}>
              <CardHeader>
                <CardTitle size="lg">Learning Progress</CardTitle>
                <CardDescription>
                  {userStats.experiencePoints} / {userStats.nextLevelXP} XP to next level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={progressPercentage} 
                  variant="success" 
                  size="lg" 
                  style={styles.progressBar}
                />
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                      {userStats.schemesExposed}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
                      Schemes Exposed
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                      {userStats.redFlagsSpotted}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
                      Red Flags Spotted
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                      {userStats.storiesCompleted}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
                      Stories Completed
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Badges Section */}
          <Animated.View entering={FadeInUp.delay(300).springify()}>
            <Card variant="default" size="lg" style={styles.badgesCard}>
              <CardHeader>
                <CardTitle size="lg">Achievements</CardTitle>
                <CardDescription>
                  {badges.filter(b => b.earned).length} of {badges.length} badges earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <View style={styles.badgesGrid}>
                  {badges.map(renderBadge)}
                </View>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <Animated.View entering={FadeInUp.delay(400).springify()}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Settings
              </Text>
            </Animated.View>
            <Card variant="default" size="md">
              <CardContent style={styles.menuContent}>
                {menuItems.map(renderMenuItem)}
              </CardContent>
            </Card>
          </View>

          {/* Logout Button */}
          <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.logoutSection}>
            <Button
              variant="outline"
              size="lg"
              onPress={handleLogout}
              leftIcon={<LogOut size={20} color={theme.colors.semantic.error} />}
              style={[styles.logoutButton, { borderColor: theme.colors.semantic.error }]}
            >
              <Text style={{ color: theme.colors.semantic.error, fontWeight: theme.typography.fontWeights.semibold }}>
                Logout
              </Text>
            </Button>
          </Animated.View>

          {/* Bottom Spacing */}
          <View style={{ height: 100 }} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
  },
  userCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  levelBadge: {
    alignSelf: "flex-start",
  },
  progressCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  progressBar: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  badgesCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeContainer: {
    width: "23%",
    alignItems: "center",
    marginBottom: 16,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginBottom: 8,
  },
  badgeEmoji: {
    fontSize: 20,
  },
  badgeName: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 12,
  },
  menuSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  menuContent: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  logoutSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  logoutButton: {
    borderWidth: 2,
  },
});

export default ProfileScreen;
