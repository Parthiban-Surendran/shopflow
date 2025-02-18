import { StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors,network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import axios from "axios";

const { height, width } = Dimensions.get("window");

const sendInstructionsHandle = async (email,navigation) => {
  if (!email) {
    Alert.alert("Error", "Please enter an email address.");
    return;
  }

  try {
const response = await axios.post(`${network.serverip}/user/forgotPassword`, null, {
      params: { email:email }
    });

    Alert.alert("Success", response.data.message);
  } catch (error) {
    if(error.response.status===404){
        Alert.alert("Message", "Reset Link Will Be Sent to your Account");
                navigation.navigate("login")

        }
  }
};

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState(""); // State to manage email

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Reset Password</Text>
        <Text style={styles.screenNameParagraph}>
          Enter the email associated with your account and we'll send an email
          with instructions to reset the password.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder={"Enter your Email Address"}
          value={email} // Bind the email state to the input value
          setValue={setEmail} // This updates the email state when the text changes
        />
      </View>
      <CustomButton
        text={"Send Instruction"}
        onPress={() => sendInstructionsHandle(email,navigation)} // Make sure the email is passed to the function
        radius={5}
      />
    </ScrollView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
    width: width * 0.8, // Use percentage of screen width for better responsiveness
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
    width: width * 0.8, // Use percentage of screen width
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
});
