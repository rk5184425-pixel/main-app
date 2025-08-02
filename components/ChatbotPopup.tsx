import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import { WebView } from "react-native-webview";
import { X, MessageCircle } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";

const { width, height } = Dimensions.get("window");

interface ChatbotPopupProps {
  visible: boolean;
  onClose: () => void;
}

const ChatbotPopup: React.FC<ChatbotPopupProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const slideAnim = React.useRef(new Animated.Value(width)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getPopupStyle = () => {
    return {
      width: width * 0.85,
      height: height * 0.7,
      backgroundColor: theme.colors.surface.primary,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderBottomLeftRadius: theme.borderRadius.xl,
      marginRight: 20,
      marginBottom: 20,
      overflow: "hidden",
      ...theme.shadows.lg,
    };
  };

  const getHeaderStyle = () => {
    return {
      backgroundColor: theme.colors.brand.primary,
      padding: theme.spacing.md,
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
    };
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="none"
    >
      <Animated.View 
        style={[
          styles.overlay, 
          { 
            backgroundColor: theme.colors.surface.overlay,
            opacity: fadeAnim,
          }
        ]}
      >
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          onPress={onClose}
          activeOpacity={1}
        />
        
        <Animated.View
          style={[
            getPopupStyle(),
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={getHeaderStyle()}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MessageCircle size={24} color={theme.colors.text.inverse} />
              <Text
                style={{
                  color: theme.colors.text.inverse,
                  fontSize: theme.typography.fontSizes.lg,
                  fontWeight: theme.typography.fontWeights.semibold,
                  marginLeft: theme.spacing.sm,
                }}
              >
                FinGuard Assistant
              </Text>
            </View>
            
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: theme.borderRadius.full,
                backgroundColor: `${theme.colors.text.inverse}20`,
                justifyContent: "center",
                alignItems: "center",
              }}
              activeOpacity={0.8}
            >
              <X size={20} color={theme.colors.text.inverse} />
            </TouchableOpacity>
          </View>

          {/* Loading State */}
          <View
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.colors.surface.primary,
              zIndex: 1,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: theme.borderRadius.full,
                backgroundColor: `${theme.colors.brand.primary}20`,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: theme.spacing.md,
              }}
            >
              <MessageCircle size={30} color={theme.colors.brand.primary} />
            </View>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.base,
                color: theme.colors.text.primary,
                fontWeight: theme.typography.fontWeights.medium,
                marginBottom: theme.spacing.sm,
              }}
            >
              Loading Assistant...
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSizes.sm,
                color: theme.colors.text.secondary,
                textAlign: "center",
                paddingHorizontal: theme.spacing.lg,
              }}
            >
              Your AI-powered financial education assistant is starting up
            </Text>
          </View>

          {/* Chatbot WebView */}
          <WebView
            source={{
              uri: "https://www.chatbase.co/chatbot-iframe/HfkB8AwS8RkSfjW84TkZB",
            }}
            style={styles.webView}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState={true}
            onLoadEnd={() => {
              // Hide loading state when WebView loads
              // You could add state management here if needed
            }}
          />
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  webView: {
    flex: 1,
  },
});

export default ChatbotPopup;
