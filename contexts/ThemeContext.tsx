import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Theme {
  isDark: boolean;
  colors: {
    background: Array<string>; // For gradients
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    icon: string;
    border: string;
    borderLight: string;
    shadow: string;
    profit: string;
    loss: string;
    breakEven: string;
    gradientStart: string;
    gradientEnd: string;
    overlay: string;
    accent: string;
    muted: string;
  };
  typography: {
    fontSizes: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
    };
    fontWeights: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeights: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: object;
    md: object;
    lg: object;
    xl: object;
  };
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: ["#ffffff", "#f8fafc"],
    surface: "rgba(255, 255, 255, 0.9)",
    card: "#ffffff",
    text: "#1f2937",
    textSecondary: "#6b7280",
    textMuted: "#9ca3af",
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    primaryDark: "#1d4ed8",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#06b6d4",
    icon: "#6b7280",
    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    shadow: "#000000",
    profit: "#dcfce7",
    loss: "#fee2e2",
    breakEven: "#fef3c7",
    gradientStart: "#3b82f6",
    gradientEnd: "#10b981",
    overlay: "rgba(0, 0, 0, 0.5)",
    accent: "#8b5cf6",
    muted: "#f1f5f9",
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 96,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 8,
    },
    xl: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.25,
      shadowRadius: 25,
      elevation: 12,
    },
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: ["#0f172a", "#1e293b"],
    surface: "rgba(30, 41, 59, 0.8)",
    card: "rgba(30, 41, 59, 0.6)",
    text: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textMuted: "#94a3b8",
    primary: "#60a5fa",
    primaryLight: "#93c5fd",
    primaryDark: "#2563eb",
    secondary: "#64748b",
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
    info: "#06b6d4",
    icon: "#e2e8f0",
    border: "#475569",
    borderLight: "#334155",
    shadow: "#000000",
    profit: "#166534",
    loss: "#991b1b",
    breakEven: "#a16207",
    gradientStart: "#1e40af",
    gradientEnd: "#059669",
    overlay: "rgba(0, 0, 0, 0.7)",
    accent: "#a855f7",
    muted: "#1e293b",
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 96,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 8,
    },
    xl: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.4,
      shadowRadius: 25,
      elevation: 12,
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@finguard_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTheme(isDark);
    }
  }, [isDark, isLoaded]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(JSON.parse(savedTheme));
      } else {
        // Default to system preference
        const colorScheme = Appearance.getColorScheme();
        setIsDark(colorScheme === "dark");
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      const colorScheme = Appearance.getColorScheme();
      setIsDark(colorScheme === "dark");
    } finally {
      setIsLoaded(true);
    }
  };

  const saveTheme = async (darkMode: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (darkMode: boolean) => {
    setIsDark(darkMode);
  };

  const theme = isDark ? darkTheme : lightTheme;

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
