import { Tabs } from "expo-router";
import { Home, Brain, BookOpen, User, Wrench } from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { Platform } from "react-native";

export default function TabLayout() {
  const { theme, isDark } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface.primary,
          borderTopColor: theme.colors.border.primary,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 85 : 70,
          paddingBottom: Platform.OS === "ios" ? theme.spacing.lg : theme.spacing.sm,
          paddingTop: theme.spacing.sm,
          paddingHorizontal: theme.spacing.sm,
          borderTopLeftRadius: theme.borderRadius.xl,
          borderTopRightRadius: theme.borderRadius.xl,
          position: "absolute",
          ...theme.shadows.xl,
        },
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSizes.xs,
          fontWeight: theme.typography.fontWeights.semibold,
          marginTop: theme.spacing.xs,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarItemStyle: {
          borderRadius: theme.borderRadius.lg,
          marginHorizontal: theme.spacing.xs,
          paddingVertical: theme.spacing.xs,
        },

      }}
    >
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ size, color, focused }) => (
            <Wrench 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="simulator"
        options={{
          title: "Simulators",
          tabBarIcon: ({ size, color, focused }) => (
            <Brain 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color, focused }) => (
            <Home 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: "Learn",
          tabBarIcon: ({ size, color, focused }) => (
            <BookOpen 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color, focused }) => (
            <User 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}
