import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppStyles from "../styles/AppStyles";
import InlineTextButton from "../components/InlineTextButton";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword({ navigation }) {
  const background = require("../assets/background.jpg");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <ImageBackground source={background} style={AppStyles.imageContainer}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>
          Reset Password
        </Text>
        <Text style={[AppStyles.errorText]}>{errorMessage}</Text>
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightTextInput,
            AppStyles.lightText,
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#DEDEDE"
        />

        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Already have an account?</Text>
          <InlineTextButton
            text="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <Button
          title="Reset Password"
          color="#f7b267"
          onPress={resetPassword}
        />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
