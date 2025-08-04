import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
  Easing,
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
  Sparkles,
  Star,
  Zap,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import { setUser } from "../../../redux/slices/profileSlices";
import { router } from "expo-router";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const userProfile = useSelector((state: any) => state.profile?.user);
  const [userData, setUserData] = useState(null);
  const [animatedValues] = useState({
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(30),
    scaleAnim: new Animated.Value(0.8),
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
      Animated.spring(animatedValues.scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
    { name: "Red Flag Spotter", icon: Flag, color: "#ef4444", gradient: ["#ef4444", "#dc2626"], earned: true },
    { name: "Collapse Survivor", icon: Shield, color: "#10b981", gradient: ["#10b981", "#059669"], earned: true },
    { name: "Financial Detective", icon: "🔍", color: "#6366f1", gradient: ["#6366f1", "#4338ca"], earned: true },
    { name: "Story Master", icon: BookOpen, color: "#8b5cf6", gradient: ["#8b5cf6", "#7c3aed"], earned: true },
    { name: "Scheme Buster", icon: "⚖️", color: "#f59e0b", gradient: ["#f59e0b", "#d97706"], earned: true },
    { name: "Fraud Fighter", icon: "🛡️", color: "#06b6d4", gradient: ["#06b6d4", "#0891b2"], earned: true },
    { name: "Awareness Champion", icon: "📢", color: "#ec4899", gradient: ["#ec4899", "#db2777"], earned: false },
    {
      name: "Master Educator",
      icon: GraduationCap,
      color: "#7c3aed",
      gradient: ["#7c3aed", "#6d28d9"],
      earned: false,
    },
  ];

  const achievements = [
    {
      title: "First Simulation",
      description: "Completed your first Ponzi scheme simulation",
      date: "2024-01-15",
      color: "#10b981",
    },
    {
      title: "Red Flag Expert",
      description: "Spotted 50 red flags in the detection game",
      date: "2024-01-20",
      color: "#f59e0b",
    },
    {
      title: "Story Enthusiast",
      description: "Completed 10 story mode scenarios",
      date: "2024-01-25",
      color: "#6366f1",
    },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            // Clear user state
            dispatch(setUser(null));

            // Use the auth context logout
            await signOut();
            // Navigation will be handled by AuthProvider
          } catch (error) {
            console.error("Error during logout:", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const progressPercentage =
    (userStats.experiencePoints / userStats.nextLevelXP) * 100;

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
            <LinearGradient
              colors={["#1e293b", "#334155"]}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.avatarContainer}>
                {userData?.avatar ? (
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: userData.avatar }}
                      style={styles.avatar}
                      resizeMode="cover"
                    />
                    <View style={styles.avatarGlow} />
                  </View>
                ) : (
                  <LinearGradient
                    colors={["#6366f1", "#8b5cf6"]}
                    style={styles.avatar}
                  >
                    <User size={40} color="white" />
                    <Animated.View
                      style={[
                        styles.sparkleOverlay,
                        {
                          opacity: animatedValues.scaleAnim,
                        },
                      ]}
                    >
                      <Sparkles size={16} color="#fbbf24" />
                    </Animated.View>
                  </LinearGradient>
                )}
              </View>
              <View style={styles.userInfo}>
                <View style={styles.nameContainer}>
                  <Text style={styles.userName}>
                    {userData
                      ? `${userData.firstName || ""} ${
                          userData.lastName || ""
                        }`.trim()
                      : "Fraud Fighter"}
                  </Text>
                  <Star size={20} color="#fbbf24" />
                </View>
                <View style={styles.levelContainer}>
                  <Zap size={16} color="#60a5fa" />
                  <Text style={styles.userLevel}>{userStats.currentLevel}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Progress Section */}
          <Animated.View
            style={[
              styles.progressContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ scale: animatedValues.scaleAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={["#1e293b", "#334155"]}
              style={styles.progressCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.progressHeader}>
                <Trophy size={20} color="#fbbf24" />
                <Text style={styles.sectionTitle}>Your Progress</Text>
              </View>
              <View style={styles.progressDetails}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    {userStats.experiencePoints} / {userStats.nextLevelXP} XP
                  </Text>
                  <Text style={styles.progressPercentage}>
                    {Math.round(progressPercentage)}%
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progressPercentage}%`,
                        opacity: animatedValues.scaleAnim,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressLabel}>
                  {userStats.nextLevelXP - userStats.experiencePoints} XP to next
                  level
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View
            style={[
              styles.statsContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ translateY: animatedValues.slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Brain size={20} color="#60a5fa" />
              <Text style={styles.sectionTitle}>Your Stats</Text>
            </View>
            <View style={styles.statsGrid}>
              {[
                { icon: Brain, value: userStats.schemesExposed, label: "Schemes Exposed", color: "#6366f1" },
                { icon: Flag, value: userStats.redFlagsSpotted, label: "Red Flags Spotted", color: "#ef4444" },
                { icon: BookOpen, value: userStats.storiesCompleted, label: "Stories Completed", color: "#10b981" },
                { icon: Trophy, value: userStats.badgesEarned, label: "Badges Earned", color: "#f59e0b" },
              ].map((stat, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.statCard,
                    {
                      transform: [
                        {
                          translateY: animatedValues.slideAnim.interpolate({
                            inputRange: [0, 30],
                            outputRange: [0, 20 + index * 5],
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

          {/* Badges Section */}
          <Animated.View
            style={[
              styles.badgesContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ translateY: animatedValues.slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Award size={20} color="#fbbf24" />
              <Text style={styles.sectionTitle}>Badges Collection</Text>
            </View>
            <View style={styles.badgesGrid}>
              {badges.map((badge, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.badgeCard,
                    !badge.earned && styles.badgeCardLocked,
                    {
                      transform: [
                        {
                          scale: animatedValues.scaleAnim.interpolate({
                            inputRange: [0.8, 1],
                            outputRange: [0.8, badge.earned ? 1 : 0.9],
                          }),
                        },
                      ],
                    },
                  ]}
                </LinearGradient>
                  <LinearGradient
                    colors={badge.earned ? badge.gradient : ["#374151", "#4b5563"]}
                    style={styles.badgeCardGradient}
                  >
                    {typeof badge.icon === "string" ? (
                      <Text
                        style={[
                          styles.badgeIconText,
                          { opacity: badge.earned ? 1 : 0.5 },
                        ]}
                      >
                        {badge.icon}
                      </Text>
                    ) : (
                      <badge.icon
                        size={24}
                        color={badge.earned ? "#ffffff" : "#6b7280"}
                      />
                    )}
                    <Text
                      style={[
                        styles.badgeName,
                        !badge.earned && styles.badgeNameLocked,
                      ]}
                    >
                      {badge.name}
                    </Text>
                    {badge.earned && (
                      <View style={styles.badgeSparkle}>
                        <Sparkles size={12} color="#fbbf24" />
                      </View>
                    )}
                  </LinearGradient>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Recent Achievements */}
          <Animated.View
            style={[
              styles.achievementsContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ translateY: animatedValues.slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Star size={20} color="#fbbf24" />
              <Text style={styles.sectionTitle}>Recent Achievements</Text>
            </View>
            {achievements.map((achievement, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.achievementCard,
                  {
                    transform: [
                      {
                        translateY: animatedValues.slideAnim.interpolate({
                          inputRange: [0, 30],
                          outputRange: [0, 15 + index * 5],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <LinearGradient
                  colors={[achievement.color + "20", achievement.color + "10"]}
                  style={styles.achievementCardGradient}
                >
                  <View style={[styles.achievementIcon, { backgroundColor: achievement.color + "20" }]}>
                    <Trophy size={24} color={achievement.color} />
                  </View>
                  <View style={styles.achievementContent}>
                    <Text style={styles.achievementTitle}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                    <Text style={styles.achievementDate}>{achievement.date}</Text>
                  </View>
                </LinearGradient>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Settings Section */}
          <Animated.View
            style={[
              styles.settingsContainer,
              {
                opacity: animatedValues.fadeAnim,
                transform: [{ translateY: animatedValues.slideAnim }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Shield size={20} color="#94a3b8" />
              <Text style={styles.sectionTitle}>Settings</Text>
            </View>

            {[
              { icon: Bell, label: "Notifications", color: "#10b981" },
              { icon: Globe, label: "Language", color: "#6366f1" },
              { icon: HelpCircle, label: "Help & Support", color: "#8b5cf6", route: "/pages/LearnScreen" },
              { icon: Info, label: "About", color: "#f59e0b" },
            ].map((setting, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingItem}
                onPress={() => setting.route && router.push(setting.route)}
              >
                <LinearGradient
                  colors={[setting.color + "20", setting.color + "10"]}
                  style={styles.settingItemGradient}
                >
                  <View style={[styles.settingIcon, { backgroundColor: setting.color + "20" }]}>
                    <setting.icon size={20} color={setting.color} />
                  </View>
                  <Text style={styles.settingText}>{setting.label}</Text>
                  <Text style={styles.chevron}>›</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.settingItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <LinearGradient
                colors={["#ef444420", "#ef444410"]}
                style={styles.settingItemGradient}
              >
                <View style={styles.settingIcon}>
                  <LogOut size={20} color="#ef4444" />
                </View>
                <Text style={[styles.settingText, styles.logoutText]}>
                  Logout
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
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
    marginBottom: 20,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  avatarContainer: {
    marginBottom: 16,
    position: "relative",
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    position: "relative",
  },
  avatarGlow: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 44,
    backgroundColor: "rgba(99, 102, 241, 0.3)",
    zIndex: -1,
  },
  sparkleOverlay: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(96, 165, 250, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  userLevel: {
    fontSize: 14,
    color: "#60a5fa",
    fontWeight: "600",
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  progressDetails: {
    gap: 12,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  progressPercentage: {
    fontSize: 16,
    color: "#fbbf24",
    fontWeight: "700",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fbbf24",
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  statCardGradient: {
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
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
  badgesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  badgeCard: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  badgeCardLocked: {
    opacity: 0.6,
  },
  badgeCardGradient: {
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    position: "relative",
    minHeight: 120,
    justifyContent: "center",
  },
  badgeIconText: {
    fontSize: 24,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 8,
  },
  badgeNameLocked: {
    color: "#6b7280",
  },
  badgeSparkle: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  achievementCardGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    gap: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 18,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  settingsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  settingItem: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  settingItemGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    gap: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  chevron: {
    fontSize: 24,
    color: "#94a3b8",
  },
  logoutItem: {
    marginTop: 10,
  },
  logoutText: {
    color: "#ef4444",
  },
});

export default ProfileScreen;
                  >
                    {badge.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Achievements */}
          <View style={styles.achievementsContainer}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <Trophy size={24} color="#ffd93d" />
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Settings Section */}
          <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <TouchableOpacity style={styles.settingItem}>
              <Bell size={24} color="#4ecdc4" />
              <Text style={styles.settingText}>Notifications</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Globe size={24} color="#45b7d1" />
              <Text style={styles.settingText}>Language</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => router.push("/pages/LearnScreen")}
            >
              <HelpCircle size={24} color="#96ceb4" />
              <Text style={styles.settingText}>Help & Support</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Info size={24} color="#ffd93d" />
              <Text style={styles.settingText}>About</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <LogOut size={24} color="#ff6b6b" />
              <Text style={[styles.settingText, styles.logoutText]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
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
    alignItems: "center",
    paddingVertical: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 16,
    color: "#4ecdc4",
    fontWeight: "600",
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  progressCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  progressPercentage: {
    fontSize: 16,
    color: "#4ecdc4",
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ecdc4",
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: "#b8b8b8",
    textAlign: "center",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
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
  badgesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  badgeCardLocked: {
    opacity: 0.5,
  },
  badgeIconText: {
    fontSize: 24,
  },
  badgeName: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },
  badgeNameLocked: {
    color: "#666",
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  achievementCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  achievementContent: {
    flex: 1,
    marginLeft: 15,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: "#b8b8b8",
    lineHeight: 18,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: "#666",
  },
  settingsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  settingItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "white",
    marginLeft: 15,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 24,
    color: "#b8b8b8",
  },
  logoutItem: {
    marginTop: 10,
  },
  logoutText: {
    color: "#ff6b6b",
  },
});

export default ProfileScreen;
