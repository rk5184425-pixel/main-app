/**
 * 🔑 FORGOT PASSWORD
 */
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Sending reset link..." });

  try {
    const response = await apiConnector("POST", authApi.POST_FORGOT_PASSWORD_API, { email });
    Toast.show({ type: "success", text1: "Reset link sent!" });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error?.response?.data?.error || "Failed to send reset link",
    });
  }

  dispatch(setLoading(false));
};

/**
 * 🔑 RESET PASSWORD
 */
export const resetPassword = (password, resetToken) => async (dispatch) => {
  dispatch(setLoading(true));
  Toast.show({ type: "info", text1: "Resetting password..." });

  try {
    const response = await apiConnector("POST", authApi.POST_RESET_PASSWORD_API, { password, resetToken });
    Toast.show({ type: "success", text1: "Password reset successful!" });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error?.response?.data?.error || "Failed to reset password",
    });
  }

  dispatch(setLoading(false));
};
import Toast from "react-native-toast-message";
import { apiConnector } from "../apiConnector";
import { authApi } from "../api";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    // Save token and user in AsyncStorage
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error?.response?.data?.error || "Login Failed",
    });
  }

  dispatch(setLoading(false));
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

    // Save token and user in AsyncStorage
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error?.response?.data?.error || "Signup Failed",
    });
  }

  dispatch(setLoading(false));
};

/**
 * 🔐 SEND OTP
 */
export const sendOtp = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("📩 Sending OTP to:", email);
  Toast.show({ type: "info", text1: "Sending OTP..." });

  try {
    await apiConnector("POST", authApi.POST_SEND_OTP_API, { email });
    Toast.show({ type: "success", text1: "OTP sent successfully" });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error?.response?.data?.error || "Failed to send OTP",
    });
  }

  dispatch(setLoading(false));
};
