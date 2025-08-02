import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Theme {
  isDark: boolean;
  colors: {
    // Background colors
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      gradient: string[];
      heroGradient: string[];
      cardGradient: string[];
    };
    // Surface colors
    surface: {
      primary: string;
      secondary: string;
      tertiary: string;
      elevated: string;
      overlay: string;
      glass: string;
    };
    // Text colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
      accent: string;
    };
    // Brand colors
    brand: {
      primary: string;
      secondary: string;
      accent: string;
      gradient: string[];
    };
    // Semantic colors
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
      successBg: string;
      warningBg: string;
      errorBg: string;
      infoBg: string;
    };
    // Interactive colors
    interactive: {
      primary: string;
      secondary: string;
      disabled: string;
      hover: string;
      pressed: string;
      ripple: string;
    };
    // Border and divider colors
    border: {
      primary: string;
      secondary: string;
      tertiary: string;
      focus: string;
      accent: string;
    };
    // Shadow colors
    shadow: {
      primary: string;
      secondary: string;
      accent: string;
    };
    // Status colors for financial data
    financial: {
      profit: string;
      loss: string;
      neutral: string;
      profitBg: string;
      lossBg: string;
      neutralBg: string;
      profitAccent: string;
      lossAccent: string;
    };
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
      '5xl': number;
    };
    fontWeights: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
    };
    lineHeights: {
      tight: number;
      normal: number;
      relaxed: number;
      loose: number;
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
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    full: number;
  };
  shadows: {
    none: any;
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    xl: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      tertiary: "#f1f5f9",
      quaternary: "#e2e8f0",
      gradient: ["#ffffff", "#f8fafc"],
      heroGradient: ["#667eea", "#764ba2"],
      cardGradient: ["#ffffff", "#f8fafc"],
    },
    surface: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      tertiary: "#f1f5f9",
      elevated: "#ffffff",
      overlay: "rgba(0, 0, 0, 0.5)",
      glass: "rgba(255, 255, 255, 0.25)",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#64748b",
      disabled: "#94a3b8",
      inverse: "#ffffff",
      accent: "#3b82f6",
    },
    brand: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      accent: "#f59e0b",
      gradient: ["#3b82f6", "#1e40af"],
    },
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
      successBg: "#dcfce7",
      warningBg: "#fef3c7",
      errorBg: "#fee2e2",
      infoBg: "#dbeafe",
    },
    interactive: {
      primary: "#3b82f6",
      secondary: "#64748b",
      disabled: "#94a3b8",
      hover: "#2563eb",
      pressed: "#1d4ed8",
      ripple: "rgba(59, 130, 246, 0.12)",
    },
    border: {
      primary: "#e2e8f0",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      focus: "#3b82f6",
      accent: "#f59e0b",
    },
    shadow: {
      primary: "#000000",
      secondary: "#64748b",
      accent: "#3b82f6",
    },
    financial: {
      profit: "#10b981",
      loss: "#ef4444",
      neutral: "#64748b",
      profitBg: "#dcfce7",
      lossBg: "#fee2e2",
      neutralBg: "#f1f5f9",
      profitAccent: "#059669",
      lossAccent: "#dc2626",
    },
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
      '5xl': 48,
    },
    fontWeights: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2.0,
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
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },
  shadows: {
    none: {
      shadowOpacity: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 8,
    },
    xl: {
      shadowColor: "#000000",
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
    background: {
      primary: "#0f172a",
      secondary: "#1e293b",
      tertiary: "#334155",
      quaternary: "#475569",
      gradient: ["#0f172a", "#1e293b"],
      heroGradient: ["#667eea", "#764ba2"],
      cardGradient: ["#1e293b", "#334155"],
    },
    surface: {
      primary: "#1e293b",
      secondary: "#334155",
      tertiary: "#475569",
      elevated: "#475569",
      overlay: "rgba(0, 0, 0, 0.8)",
      glass: "rgba(30, 41, 59, 0.25)",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      disabled: "#64748b",
      inverse: "#0f172a",
      accent: "#60a5fa",
    },
    brand: {
      primary: "#60a5fa",
      secondary: "#3b82f6",
      accent: "#fbbf24",
      gradient: ["#60a5fa", "#3b82f6"],
    },
    semantic: {
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      info: "#60a5fa",
      successBg: "#064e3b",
      warningBg: "#451a03",
      errorBg: "#7f1d1d",
      infoBg: "#1e3a8a",
    },
    interactive: {
      primary: "#60a5fa",
      secondary: "#94a3b8",
      disabled: "#64748b",
      hover: "#3b82f6",
      pressed: "#2563eb",
      ripple: "rgba(96, 165, 250, 0.12)",
    },
    border: {
      primary: "#334155",
      secondary: "#475569",
      tertiary: "#64748b",
      focus: "#60a5fa",
      accent: "#fbbf24",
    },
    shadow: {
      primary: "#000000",
      secondary: "#0f172a",
      accent: "#60a5fa",
    },
    financial: {
      profit: "#34d399",
      loss: "#f87171",
      neutral: "#94a3b8",
      profitBg: "#064e3b",
      lossBg: "#7f1d1d",
      neutralBg: "#334155",
      profitAccent: "#10b981",
      lossAccent: "#ef4444",
    },
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
      '5xl': 48,
    },
    fontWeights: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2.0,
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
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },
  shadows: {
    none: {
      shadowOpacity: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 8,
    },
    xl: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.6,
      shadowRadius: 25,
      elevation: 12,
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@theme_preference";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDark(JSON.parse(savedTheme));
        } else {
          // If no saved preference, use system preference
          const colorScheme = Appearance.getColorScheme();
          setIsDark(colorScheme === "dark");
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
        // Fallback to system preference
        const colorScheme = Appearance.getColorScheme();
        setIsDark(colorScheme === "dark");
      } finally {
        setIsLoaded(true);
      }
    };

    loadThemePreference();

    // Listen for system theme changes only if no user preference is saved
    const subscription = Appearance.addChangeListener(async ({ colorScheme }) => {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === null) {
        setIsDark(colorScheme === "dark");
      }
    });

    return () => subscription?.remove();
  }, []);

  const setTheme = async (darkMode: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(darkMode));
      setIsDark(darkMode);
    } catch (error) {
      console.error("Error saving theme preference:", error);
      setIsDark(darkMode);
    }
  };

  const toggleTheme = () => {
    setTheme(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  // Don't render children until theme is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, setTheme }}>
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
