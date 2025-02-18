//import {
//  StyleSheet,
//  Image,
//  Text,
//  View,
//  StatusBar,
//  KeyboardAvoidingView,
//  ScrollView,
//} from "react-native";
//import React, { useState } from "react";
//import {useDispatch,useSelector} from "react-redux"
//import { colors,network } from "../../constants";
//import CustomInput from "../../components/CustomInput";
//import header_logo from "../../assets/logo/download.jpeg";
//import CustomButton from "../../components/CustomButton";
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import ProgressDialog from "react-native-progress-dialog";
//import InternetConnectionAlert from "react-native-internet-connection-alert";
//import EncryptedStorage from 'react-native-encrypted-storage';
//import * as actions from "../../states/actionTypes/actionTypes";
//import { fetchCart } from "../../states/actionCreaters/actionCreaters";
//
//const LoginScreen = ({ navigation ,route}) => {
//  const { fromScreen,product } = route.params || {}; // Get the 'fromScreen' parameter
//
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [error, setError] = useState("");
//  const [isloading, setIsloading] = useState(false);
//  const dispatch = useDispatch()
//
//  const _storeData = async (user) => {
//    try {
//      await EncryptedStorage.setItem("authUser", JSON.stringify(user));
//    } catch (error) {
//      setError("Failed to store user data.");
//    }
//  };
//
//  const loginHandle = async () => {
//    setIsloading(true);
//    setError(""); // Clear previous errors
//
//    // Input validation
//    // Input validation
//    if (!email.trim()) {
//      setIsloading(false);
//      return setError("Please enter your email");
//    }
//    if (!password.trim()) {
//      setIsloading(false);
//      return setError("Please enter your password");
//    }
//
//    // Email format validation using regex
//    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s.@]+$/;
//    if (!emailPattern.test(email)) {
//      setIsloading(false);
//      return setError("Email is not valid");
//    }
//
//    if (email.length < 6) {
//      setIsloading(false);
//      return setError("Email is too short");
//    }
//    if (password.length < 6) {
//      setIsloading(false);
//      return setError("Password must be at least 6 characters");
//    }
//
//    // API request
//    try {
//      const response = await fetch(`${network.serverip}/user/login`, {
//        method: "POST",
//        headers: {
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify({ email, password }),
//      });
//      await EncryptedStorage.setItem('user',JSON.stringify(email))
//      const text = await response.text();
//
//      let result;
//      try {
//        result = JSON.parse(text);
//      } catch (jsonError) {
//        throw new Error("Invalid JSON response from server");
//      }
//
//      await EncryptedStorage.setItem("userid",JSON.stringify(result.data.id))
//      await EncryptedStorage.setItem("authToken",(result.token))
//
//
//      if (response.ok && result?.status === "success") {
//      const token = await EncryptedStorage.getItem("authToken")
//      const userid = await EncryptedStorage.getItem("userid")
//            await EncryptedStorage.setItem('isLoggedIn',"true")
//             dispatch({ type: actions.LOGIN_SUCCESS, payload: response.data });
//
//                  if (token) {
//                    dispatch(fetchCart(userid));
//                  } else {
//                    console.error("Token is missing");
//                  }
//        _storeData(result.data);
//        setIsloading(false);
//
//        if (fromScreen && product) {
//          navigation.replace(fromScreen,{product:product});
//        } else if(fromScreen) {
//          navigation.replace(fromScreen);
//
//        }
//        else{
//          navigation.replace("tab", { user: result.data });
//
//        }
//      } else {
//        setIsloading(false);
//        setError(result.message || "Login failed");
//      }
//    } catch (error) {
//      setIsloading(false);
//      setError("Something went wrong. Please try again.");
//    }
//  };
//
//  return (
//    <InternetConnectionAlert onChange={() => {}}>
//      <KeyboardAvoidingView style={styles.container}>
//        <ScrollView style={{ flex: 1, width: "100%" }}>
//          <ProgressDialog visible={isloading} label={"Logging in..."} />
//          <StatusBar />
//          <View style={styles.welcomeContainer}>
//            <View>
//              <Text style={styles.welcomeText}>Welcome to ShopFlow</Text>
//              <Text style={styles.welcomeParagraph}>
//                Make your e-commerce easy
//              </Text>
//            </View>
//            <View>
//              <Image style={styles.logo} source={header_logo} />
//            </View>
//          </View>
//          <View style={styles.screenNameContainer}>
//            <Text style={styles.screenNameText}>Login</Text>
//          </View>
//          <View style={styles.formContainer}>
//            <CustomAlert message={error} type={"error"} />
//            <CustomInput
//              value={email}
//              setValue={setEmail}
//              placeholder={"Email"}
//              placeholderTextColor={colors.muted}
//              radius={5}
//            />
//            <CustomInput
//              value={password}
//              setValue={setPassword}
//              secureTextEntry={true}
//              placeholder={"Password"}
//              placeholderTextColor={colors.muted}
//              radius={5}
//            />
//            <View style={styles.forgetPasswordContainer}>
//              <Text
//                onPress={() => navigation.navigate("forgetpassword")}
//                style={styles.forgetText}
//              >
//                Forgot Password?
//              </Text>
//            </View>
//          </View>
//        </ScrollView>
//        <View style={styles.buttonContainer}>
//          <CustomButton text={"Login"} onPress={loginHandle} />
//        </View>
//        <View style={styles.bottomContainer}>
//          <Text>Don't have an account?</Text>
//          <Text
//            onPress={() => navigation.navigate("signup")}
//            style={styles.signupText}
//          >
//            Sign Up
//          </Text>
//        </View>
//      </KeyboardAvoidingView>
//    </InternetConnectionAlert>
//  );
//};
//
//export default LoginScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    width: "100%",
//    backgroundColor: colors.light,
//    alignItems: "center",
//    justifyContent: "center",
//    padding: 20,
//    flex: 1,
//  },
//  welcomeContainer: {
//    width: "100%",
//    flexDirection: "row",
//    justifyContent: "space-around",
//    alignItems: "center",
//    height: "30%",
//  },
//  formContainer: {
//    flex: 3,
//    justifyContent: "flex-start",
//    alignItems: "center",
//    width: "100%",
//    padding: 5,
//  },
//  logo: {
//    resizeMode: "contain",
//    width: 80,
//  },
//  welcomeText: {
//    fontSize: 42,
//    fontWeight: "bold",
//    color: colors.muted,
//  },
//  welcomeParagraph: {
//    fontSize: 15,
//    fontWeight: "500",
//    color: colors.primary_shadow,
//  },
//  forgetPasswordContainer: {
//    marginTop: 10,
//    width: "100%",
//    flexDirection: "row",
//    justifyContent: "flex-end",
//    alignItems: "center",
//  },
//  forgetText: {
//    fontSize: 15,
//    fontWeight: "600",
//  },
//  buttonContainer: {
//    justifyContent: "center",
//    width: "100%",
//  },
//  bottomContainer: {
//    marginTop: 10,
//    flexDirection: "row",
//    justifyContent: "center",
//  },
//  signupText: {
//    marginLeft: 2,
//    color: colors.primary,
//    fontSize: 15,
//    fontWeight: "600",
//  },
//  screenNameContainer: {
//    marginTop: 10,
//    width: "100%",
//    flexDirection: "row",
//    justifyContent: "flex-start",
//    alignItems: "center",
//  },
//  screenNameText: {
//    fontSize: 30,
//    fontWeight: "800",
//    color: colors.muted,
//  },
//});



import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/download.jpeg";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import EncryptedStorage from 'react-native-encrypted-storage';
import * as actions from "../../states/actionTypes/actionTypes";
import { fetchCart } from "../../states/actionCreaters/actionCreaters";

const LoginScreen = ({ navigation, route }) => {
  const { fromScreen, product } = route.params || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  console.log(fromScreen,product)

  const _storeData = async (user) => {
    try {
      await EncryptedStorage.setItem("authUser", JSON.stringify(user));
    } catch (error) {
      setError("Failed to store user data.");
    }
  };

  // **Email Validation Function**
  const isValidEmail = (email) => {
const emailRegex = /^[a-zA-Z]+([a-zA-Z0-9._%+@$&-]*[a-zA-Z0-9])?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // **Password Validation Function**
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const loginHandle = async () => {
    setIsloading(true);
    setError("");

    // **Input validation**
    if (!email.trim()) {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (!isValidEmail(email)) {
    console.log("True")
      setIsloading(false);
      Alert.alert("Error","Invalid Email. Please Enter Valid Email")
      return setError("Invalid email format. No special characters before '@'.");
    }

    if (!password.trim()) {
      setIsloading(false);
      return setError("Please enter your password");
    }
    if (!isValidPassword(password)) {
      setIsloading(false);
        Alert.alert("Error","Invalid Password. Please Enter Valid Password")

      return setError(
        "Password must be at least 8 characters, contain uppercase, lowercase, number, and special character."
      );
    }

    try {
      const response = await fetch(`${network.serverip}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
console.log("jkjk",response.data)
      await EncryptedStorage.setItem("user", JSON.stringify(email));
      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Invalid JSON response from server");
      }

      await EncryptedStorage.setItem("userid", JSON.stringify(result.data.id));
      await EncryptedStorage.setItem("authToken", result.token);

      if (response.ok && result?.status === "success") {
        const token = await EncryptedStorage.getItem("authToken");
        const userid = await EncryptedStorage.getItem("userid");

        await EncryptedStorage.setItem("isLoggedIn", "true");
        dispatch({ type: actions.LOGIN_SUCCESS, payload: result.data });

        if (token) {
          dispatch(fetchCart(userid));
        } else {
          console.error("Token is missing");
        }

        _storeData(result.data);
        setIsloading(false);

        if (fromScreen && product) {
          navigation.replace(fromScreen, { product });
          return
        } else if (fromScreen) {
          navigation.replace(fromScreen);
        } else {
          navigation.replace("tab", { user: result.data });
        }
      } else {
        setIsloading(false);
        setError(result.message || "Login failed");
      }
    } catch (error) {
      setIsloading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <InternetConnectionAlert onChange={() => {}}>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <ProgressDialog visible={isloading} label={"Logging in..."} />
          <StatusBar />
          <View style={styles.welcomeContainer}>
            <View>
              <Text style={styles.welcomeText}>Welcome to ShopFlow</Text>
              <Text style={styles.welcomeParagraph}>
                Make your e-commerce easy
              </Text>
            </View>
            <View>
              <Image style={styles.logo} source={header_logo} />
            </View>
          </View>
          <View style={styles.screenNameContainer}>
            <Text style={styles.screenNameText}>Login</Text>
          </View>
          <View style={styles.formContainer}>
            <CustomAlert message={error} type={"error"} />
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Email"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <View style={styles.forgetPasswordContainer}>
              <Text
                onPress={() => navigation.navigate("forgetpassword")}
                style={styles.forgetText}
              >
                Forgot Password?
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton text={"Login"} onPress={loginHandle} />
        </View>
        <View style={styles.bottomContainer}>
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate("signup")}
            style={styles.signupText}
          >
            Sign Up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  welcomeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.muted,
  },
  welcomeParagraph: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary_shadow,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  forgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 2,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});
