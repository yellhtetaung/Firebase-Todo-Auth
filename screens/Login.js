import React, { useEffect, useState } from "react";
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
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login({ navigation }) {
  const background = require("../assets/background.jpg");

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.currentUser) {
    navigation.navigate("Todo");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Todo");
      }
    });
  }

  const login = async () => {
    if (email != "" && password != "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("Todo", { user: userCredential.user });
        })
        .catch((error) => setErrorMessage(error.message));
    }
  };

  return (
    <ImageBackground source={background} style={AppStyles.imageContainer}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
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

        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightTextInput,
            AppStyles.lightText,
          ]}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#DEDEDE"
          secureTextEntry
        />

        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Don't have an account?</Text>
          <InlineTextButton
            text="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>

        <View style={[AppStyles.rowContainer, AppStyles.bottomMargin]}>
          <Text style={AppStyles.lightText}>Forgotten you password?</Text>
          <InlineTextButton
            text="Reset"
            onPress={() => navigation.navigate("ResetPassword")}
          />
        </View>

        <Button title="Login" color="#f7b267" onPress={login} />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
