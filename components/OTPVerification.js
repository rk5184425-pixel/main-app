import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { signUp, sendOtp } from "../redux/services/operations/authServices";

const OTPVerification = ({ onBackToSignup, onVerificationComplete }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const dispatch = useDispatch();

  // Get saved signup data from Redux
  const signUpData = useSelector((state) => state.auth?.signUpData);
  const loading = useSelector((state) => state.auth?.loading);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    console.log('[OTP] Step 1: User entered OTP:', otpString);
    if (otpString.length === 4) {
      console.log('[OTP] Step 2: Dispatching signUp with data:', { ...signUpData, otp: otpString });
      await dispatch(signUp({ ...signUpData, otp: otpString }));
      console.log('[OTP] Step 3: Signup API call completed, redirecting to HomePage');
      onVerificationComplete();
    } else {
      console.log('[OTP] Step 1b: OTP is not 4 digits, not verifying');
    }
  };

  const handleResend = () => {
    if (signUpData?.email) {
      dispatch(sendOtp(signUpData.email));
    }
  };

  if (!signUpData?.email) {
    onBackToSignup();
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>Enter OTP</Text>
      <Text style={styles.subHeading}>
        We have sent a verification code to your email address
      </Text>

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={loading}
      >
        <Text style={styles.verifyText}>
          {loading ? "Verifying..." : "Verify"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={onBackToSignup}>
        <Ionicons name="arrow-back" size={20} color="#151717" />
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendNote}>Didn't receive the code?</Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendBtn}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#151717",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    marginVertical: 20,
  },
  otpInput: {
    backgroundColor: "#f8f9fa",
    width: 50,
    height: 50,
    textAlign: "center",
    borderRadius: 10,
    fontWeight: "600",
    color: "#151717",
    fontSize: 18,
    borderWidth: 1.5,
    borderColor: "#ecedec",
  },
  verifyButton: {
    backgroundColor: "#151717",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  verifyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ecedec",
  },
  resendContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  resendNote: {
    fontSize: 14,
    color: "#777",
  },
  resendBtn: {
    fontSize: 14,
    color: "#2d79f3",
    fontWeight: "600",
    marginTop: 5,
  },
});

export default OTPVerification;
