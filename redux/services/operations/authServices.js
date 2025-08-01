import Toast from "react-native-toast-message";
import { apiConnector } from "../apiConnector";
import { authApi } from "../api";
import { setLoading, setToken, logout as logoutAction } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlices";
import AsyncStorageService, { STORAGE_KEYS } from "../../../utils/AsyncStorage";

/**
 * 🔑 LOGIN USER
 */
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Logging in..." });

  try {
    const response = await apiConnector("POST", authApi.POST_LOGIN_USER_API, { email, password });

    Toast.show({ type: "success", text1: "Login Successful" });
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));

    // Save token and user in AsyncStorage using utility service
    console.log("Saving token to AsyncStorage:", response.data.token ? "Token exists" : "No token");
    await AsyncStorageService.setItem(STORAGE_KEYS.USER_TOKEN, response.data.token);
    
    console.log("Saving user data to AsyncStorage:", response.data.user ? "User exists" : "No user");
    await AsyncStorageService.setItem(STORAGE_KEYS.USER_PROFILE, response.data.user);
    
    // Save last login timestamp
    await AsyncStorageService.setItem(STORAGE_KEYS.LAST_LOGIN, new Date().toISOString());
    
    // Verify data was saved correctly
    const savedToken = await AsyncStorageService.getItem(STORAGE_KEYS.USER_TOKEN);
    const savedUser = await AsyncStorageService.getItem(STORAGE_KEYS.USER_PROFILE);
    console.log("Verification - Token saved correctly:", savedToken === response.data.token);
    console.log("Verification - User saved correctly:", JSON.stringify(savedUser) === JSON.stringify(response.data.user));
    console.log("Token and user saved to AsyncStorage during login");
    
    dispatch(setLoading(false));
    return { success: true, token: response.data.token, user: response.data.user };
  } catch (error) {
    const errorMessage = error?.response?.data?.error || "Login Failed";
    console.error("Login Error:", errorMessage);
    
    Toast.show({
      type: "error",
      text1: errorMessage,
    });
    
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 📝 SIGNUP USER
 */
export const signUp = (signUpData) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Signing up..." });

  try {
    const response = await apiConnector("POST", authApi.POST_SIGNUP_USER_API, signUpData);

    Toast.show({ type: "success", text1: "Signup Successful" });
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));

    // Save token and user in AsyncStorage using utility service
    console.log("Saving token to AsyncStorage after signup:", response.data.token ? "Token exists" : "No token");
    await AsyncStorageService.setItem(STORAGE_KEYS.USER_TOKEN, response.data.token);
    
    console.log("Saving user data to AsyncStorage after signup:", response.data.user ? "User exists" : "No user");
    await AsyncStorageService.setItem(STORAGE_KEYS.USER_PROFILE, response.data.user);
    
    // Save last login timestamp and mark onboarding as needed
    await AsyncStorageService.setItem(STORAGE_KEYS.LAST_LOGIN, new Date().toISOString());
    await AsyncStorageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
    
    // Verify data was saved correctly
    const savedToken = await AsyncStorageService.getItem(STORAGE_KEYS.USER_TOKEN);
    const savedUser = await AsyncStorageService.getItem(STORAGE_KEYS.USER_PROFILE);
    console.log("Verification - Token saved correctly after signup:", savedToken === response.data.token);
    console.log("Verification - User saved correctly after signup:", JSON.stringify(savedUser) === JSON.stringify(response.data.user));
    console.log("Token and user saved to AsyncStorage during signup");
    
    dispatch(setLoading(false));
    return { success: true, token: response.data.token, user: response.data.user };
  } catch (error) {
    const errorMessage = error?.response?.data?.error || "Signup Failed";
    console.error("Signup Error:", errorMessage);
    
    Toast.show({
      type: "error",
      text1: errorMessage,
    });
    
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🔐 SEND OTP
 */
export const sendOtp = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("📩 Sending OTP to:", email);
  Toast.show({ type: "info", text1: "Sending OTP..." });

  try {
    const response = await apiConnector("POST", authApi.POST_SEND_OTP_API, { email });
    Toast.show({ type: "success", text1: "OTP sent successfully" });
    dispatch(setLoading(false));
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error?.response?.data?.error || "Failed to send OTP";
    console.error("OTP Error:", errorMessage);
    
    Toast.show({
      type: "error",
      text1: errorMessage,
    });
    
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🔑 FORGOT PASSWORD
 */
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Sending reset link..." });

  try {
    const response = await apiConnector("POST", authApi.POST_FORGOT_PASSWORD_API, { email });
    Toast.show({ type: "success", text1: "Reset link sent!" });
    dispatch(setLoading(false));
    return { success: true, message: "Reset link sent successfully" };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Failed to send reset link";
    Toast.show({
      type: "error",
      text1: errorMessage,
    });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🔑 RESET PASSWORD
 */
export const resetPassword = (password, resetToken) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Resetting password..." });

  try {
    const response = await apiConnector("POST", authApi.POST_RESET_PASSWORD_API, { password, resetToken });
    
    // If we get a token, set it in Redux
    if (response?.data?.token) {
      dispatch(setToken(response.data.token));
      
      // If we also get user data, set it in Redux
      if (response?.data?.user) {
        dispatch(setUser(response.data.user));
        
        // Save token and user to AsyncStorage using utility service
        await AsyncStorageService.setItem(STORAGE_KEYS.USER_TOKEN, response.data.token);
        await AsyncStorageService.setItem(STORAGE_KEYS.USER_PROFILE, response.data.user);
        await AsyncStorageService.setItem(STORAGE_KEYS.LAST_LOGIN, new Date().toISOString());
        console.log("Token and user saved to AsyncStorage during password reset");
      }
    }
    
    Toast.show({ type: "success", text1: "Password reset successful!" });
    dispatch(setLoading(false));
    return { success: true, token: response?.data?.token, user: response?.data?.user };
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Failed to reset password";
    Toast.show({
      type: "error",
      text1: errorMessage,
    });
    dispatch(setLoading(false));
    return { error: errorMessage };
  }
};

/**
 * 🚪 LOGOUT USER
 */
export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    
    // Clear Redux state
    dispatch(logoutAction());
    
    // Clear AsyncStorage
    await AsyncStorageService.removeItem(STORAGE_KEYS.USER_TOKEN);
    await AsyncStorageService.removeItem(STORAGE_KEYS.USER_PROFILE);
    await AsyncStorageService.removeItem(STORAGE_KEYS.LAST_LOGIN);
    
    console.log("User logged out and AsyncStorage cleared");
    Toast.show({ type: "success", text1: "Logged out successfully" });
    
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error);
    Toast.show({
      type: "error",
      text1: "Error during logout",
    });
    dispatch(setLoading(false));
    return { error: "Logout failed" };
  }
};
