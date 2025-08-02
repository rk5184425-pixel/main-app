import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export interface Theme {
  isDark: boolean;
  colors: {
    // Background colors
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      gradient: string[];
    };
    // Surface colors
    surface: {
      primary: string;
      secondary: string;
      elevated: string;
      overlay: string;
    };
    // Text colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
    };
    // Brand colors
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
    // Semantic colors
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    // Interactive colors
    interactive: {
      primary: string;
      secondary: string;
      disabled: string;
      hover: string;
      pressed: string;
    };
    // Border and divider colors
    border: {
      primary: string;
      secondary: string;
      focus: string;
    };
    // Shadow colors
    shadow: {
      primary: string;
      secondary: string;
    };
    // Status colors for financial data
    financial: {
      profit: string;
      loss: string;
      neutral: string;
      profitBg: string;
      lossBg: string;
      neutralBg: string;
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
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
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
  };
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      tertiary: "#f1f5f9",
      gradient: ["#f8fafc", "#e2e8f0"],
    },
    surface: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      elevated: "#ffffff",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#64748b",
      disabled: "#94a3b8",
      inverse: "#ffffff",
    },
    brand: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      accent: "#f59e0b",
    },
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    interactive: {
      primary: "#3b82f6",
      secondary: "#64748b",
      disabled: "#94a3b8",
      hover: "#2563eb",
      pressed: "#1d4ed8",
    },
    border: {
      primary: "#e2e8f0",
      secondary: "#cbd5e1",
      focus: "#3b82f6",
    },
    shadow: {
      primary: "#000000",
      secondary: "#64748b",
    },
    financial: {
      profit: "#10b981",
      loss: "#ef4444",
      neutral: "#64748b",
      profitBg: "#dcfce7",
      lossBg: "#fee2e2",
      neutralBg: "#f1f5f9",
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
    },
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
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
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: {
      primary: "#0f172a",
      secondary: "#1e293b",
      tertiary: "#334155",
      gradient: ["#0f172a", "#1e293b"],
    },
    surface: {
      primary: "#1e293b",
      secondary: "#334155",
      elevated: "#475569",
      overlay: "rgba(0, 0, 0, 0.8)",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      disabled: "#64748b",
      inverse: "#0f172a",
    },
    brand: {
      primary: "#60a5fa",
      secondary: "#3b82f6",
      accent: "#fbbf24",
    },
    semantic: {
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      info: "#60a5fa",
    },
    interactive: {
      primary: "#60a5fa",
      secondary: "#94a3b8",
      disabled: "#64748b",
      hover: "#3b82f6",
      pressed: "#2563eb",
    },
    border: {
      primary: "#334155",
      secondary: "#475569",
      focus: "#60a5fa",
    },
    shadow: {
      primary: "#000000",
      secondary: "#0f172a",
    },
    financial: {
      profit: "#34d399",
      loss: "#f87171",
      neutral: "#94a3b8",
      profitBg: "#064e3b",
      lossBg: "#7f1d1d",
      neutralBg: "#334155",
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
    },
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
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
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setIsDark(colorScheme === "dark");

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
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
