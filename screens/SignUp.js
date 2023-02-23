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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export default function SignUp({ navigation }) {
  const background = require("../assets/background.jpg");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidataionMessage] = useState("");

  const validateAndSet = (value, valueToCompaer, setValue) => {
    if (value != valueToCompaer) {
      setValidataionMessage("Password do not match");
    } else {
      setValidataionMessage("");
    }
    setValue(value);
  };

  const signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredrential) => {
          sendEmailVerification(auth.currentUser);
          navigation.navigate("Todo", {
            user: userCredrential.user,
          });
        })
        .catch((error) => {
          setValidataionMessage(error.message);
        });
    }
  };

  return (
    <ImageBackground source={background} style={AppStyles.imageContainer}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Sign Up</Text>
        <Text style={[AppStyles.errorText]}>{validationMessage}</Text>
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
          onChangeText={(value) =>
            validateAndSet(value, confirmPassword, setPassword)
          }
          placeholder="Password"
          placeholderTextColor="#DEDEDE"
          secureTextEntry
        />
        <TextInput
          style={[
            AppStyles.textInput,
            AppStyles.lightTextInput,
            AppStyles.lightText,
          ]}
          value={confirmPassword}
          onChangeText={(value) =>
            validateAndSet(value, password, setConfirmPassword)
          }
          placeholder="Confirm Password"
          placeholderTextColor="#DEDEDE"
          secureTextEntry
        />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Already have an account?</Text>
          <InlineTextButton
            text="Login"
            onPress={() => navigation.popToTop()}
          />
        </View>
        <Button title="Sign Up" color="#f7b267" onPress={signUp} />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
