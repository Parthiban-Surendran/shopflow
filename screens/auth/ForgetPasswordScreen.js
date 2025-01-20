import { StyleSheet, Text, TouchableOpacity, View,Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const sendInstructionsHandle = async (email) => {

  if (!email) {
    Alert.alert("Error", "Please enter an email address.");
    return;
  }
  console.log(email)

  try {
    // Make the request to your backend
    const response = await axios.post("https://shopflow.onrender.com:5000/user/forgotPassword", { email });
//console.log(response)
    // If successful
    Alert.alert("Success", response.data.message);
  } catch (error) {
    // If there's an error, show it
    Alert.alert("Error", "Failed to send reset instructions. Please try again.");
  }
};


const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState(""); // State to manage email

  return (
    <View style={styles.container}>
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
        <View>
          <Text style={styles.screenNameText}>Reset Password</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Enter the email associated with your account and we'll send an email
            with instruction to reset the password.
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomInput placeholder={"Enter your Email Address"}
        value={email} // Bind the email state
                  onChangeText={setEmail}/>
      </View>
      <CustomButton
        text={"Send Instruction"}

        onPress={sendInstructionsHandle}
        radius={5}
      />
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
  },
});


//
//import React, { useState } from "react";
//import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
//import { Ionicons } from "@expo/vector-icons";
//import { colors } from "../../constants";
//import CustomInput from "../../components/CustomInput";
//import CustomButton from "../../components/CustomButton";
//import axios from "axios";
//
//// Function to handle sending instructions
//const sendInstructionsHandle = async (email) => {
//  if (!email) {
//    Alert.alert("Error", "Please enter an email address.");
//    return;
//  }
//
//  try {
//    // Make the request to your backend
//    const response = await axios.post("http://192.168.0.114:5000/user/forgotPassword", { email });
//
//    // If successful
//    Alert.alert("Success", response.data.message);
//  } catch (error) {
//    // If there's an error, show it
//    Alert.alert("Error", "Failed to send reset instructions. Please try again.");
//  }
//};
//
//// ForgetPasswordScreen component
//const ForgetPasswordScreen = ({ navigation }) => {
//  const [email, setEmail] = useState(""); // Manage email input
//
//  return (
//    <View style={styles.container}>
//      {/* Top bar with back button */}
//      <View style={styles.TopBarContainer}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//          <Ionicons
//            name="arrow-back-circle-outline"
//            size={30}
//            color={colors.muted}
//          />
//        </TouchableOpacity>
//      </View>
//
//      {/* Screen name and description */}
//      <View style={styles.screenNameContainer}>
//        <Text style={styles.screenNameText}>Reset Password</Text>
//        <Text style={styles.screenNameParagraph}>
//          Enter the email associated with your account, and we'll send an email with instructions to reset the password.
//        </Text>
//      </View>
//
//      {/* Email input */}
//      <View style={styles.formContainer}>
//        <CustomInput
//          placeholder={"Enter your Email Address"}
//          value={email} // Bind email to state
//          onChangeText={setEmail} // Update email when user types
//        />
//      </View>
//
//      {/* Send Instruction button */}
//      <CustomButton
//        text={"Send Instruction"}
//        onPress={() => sendInstructionsHandle(email)} // Pass email to function
//        radius={5}
//      />
//    </View>
//  );
//};
//
//export default ForgetPasswordScreen;
//
//// Styles for the screen
//const styles = StyleSheet.create({
//  container: {
//    flexDirection: "column", // Adjust layout direction
//    backgroundColor: colors.light,
//    alignItems: "center",
//    padding: 20,
//    flex: 1,
//  },
//  TopBarContainer: {
//    width: "100%",
//    flexDirection: "row",
//    justifyContent: "flex-start",
//    alignItems: "center",
//  },
//  screenNameContainer: {
//    marginTop: 20,
//    width: "100%",
//    flexDirection: "column",
//    alignItems: "flex-start",
//  },
//  screenNameText: {
//    fontSize: 30,
//    fontWeight: "800",
//    color: colors.muted,
//  },
//  screenNameParagraph: {
//    marginTop: 5,
//    fontSize: 15,
//  },
//  formContainer: {
//    marginTop: 20,
//    marginBottom: 30,
//    width: "100%",
//  },
//});
