//import {
//  StyleSheet,
//  Image,
//  Text,
//  View,
//  StatusBar,
//  KeyboardAvoidingView,
//  ScrollView,
//} from "react-native";
//
//import React, { useState } from "react";
//import { colors, network } from "../../constants";
//import CustomInput from "../../components/CustomInput";
//import header_logo from "../../assets/logo/logo.png";
//import CustomButton from "../../components/CustomButton";
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import ProgressDialog from "react-native-progress-dialog";
//import InternetConnectionAlert from "react-native-internet-connection-alert";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//
//const LoginScreen = ({ navigation }) => {
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [error, setError] = useState("");
//  const [isloading, setIsloading] = useState(false);
//
//  //method to store the authUser to aync storage
//  _storeData = async (user) => {
//    try {
//      AsyncStorage.setItem("authUser", JSON.stringify(user));
//    } catch (error) {
//      console.log(error);
//      setError(error);
//    }
//  };
//
//  var myHeaders = new Headers();
//  myHeaders.append("Content-Type", "application/json");
//
//  var raw = JSON.stringify({
//    email: email,
//    password: password,
//  });
//
//  var requestOptions = {
//    method: "POST",
//    headers: myHeaders,
//    body: raw,
//    redirect: "follow",
//  };
//
//  //method to validate the user credentials and navigate to Home Screen / Dashboard
//  const loginHandle = () => {
//    setIsloading(true);
//    //[check validation] -- Start
//    // if email does not contain @ sign
//    if (email == "") {
//      setIsloading(false);
//      return setError("Please enter your email");
//    }
//    if (password == "") {
//      setIsloading(false);
//      return setError("Please enter your password");
//    }
//    if (!email.includes("@")) {
//      setIsloading(false);
//      return setError("Email is not valid");
//    }
//    // length of email must be greater than 5 characters
//    if (email.length < 6) {
//      setIsloading(false);
//      return setError("Email is too short");
//    }
//    // length of password must be greater than 5 characters
//    if (password.length < 6) {
//      setIsloading(false);
//      return setError("Password must be 6 characters long");
//    }
//    //[check validation] -- End
//
//    fetch(network.serverip + "/login", requestOptions) // API call
//      .then((response) => response.json())
//      .then((result) => {
//        if (
//          result.status == 200 ||
//          (result.status == 1 && result.success != false)
//        ) {
//          if (result?.data?.userType == "ADMIN") {
//            //check the user type if the type is ADMIN then navigate to Dashboard else navigate to User Home
//            _storeData(result.data);
//            setIsloading(false);
//            navigation.replace("dashboard", { authUser: result.data }); // naviagte to Admin Dashboard
//          } else {
//            _storeData(result.data);
//            setIsloading(false);
//            navigation.replace("tab", { user: result.data }); // naviagte to User Dashboard
//          }
//        } else {
//          setIsloading(false);
//          return setError(result.message);
//        }
//      })
//      .catch((error) => {
//        setIsloading(false);
//        console.log("error", setError(error.message));
//      });
//  };
//
//  return (
//    <InternetConnectionAlert onChange={(connectionState) => {}}>
//      <KeyboardAvoidingView
//        // behavior={Platform.OS === "ios" ? "padding" : "height"}
//        style={styles.container}
//      >
//        <ScrollView style={{ flex: 1, width: "100%" }}>
//          <ProgressDialog visible={isloading} label={"Login ..."} />
//          <StatusBar></StatusBar>
//          <View style={styles.welconeContainer}>
//            <View>
//              <Text style={styles.welcomeText}>Welcome to EasyBuy</Text>
//              <Text style={styles.welcomeParagraph}>
//                make your ecommerce easy
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
//              placeholder={"Username"}
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
//                style={styles.ForgetText}
//              >
//                Forget Password?
//              </Text>
//            </View>
//          </View>
//        </ScrollView>
//        <View style={styles.buttomContainer}>
//          <CustomButton text={"Login"} onPress={loginHandle} />
//        </View>
//        <View style={styles.bottomContainer}>
//          <Text>Don't have an account?</Text>
//          <Text
//            onPress={() => navigation.navigate("signup")}
//            style={styles.signupText}
//          >
//            signup
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
//    flexDirecion: "row",
//    backgroundColor: colors.light,
//    alignItems: "center",
//    justifyContent: "center",
//    padding: 20,
//    flex: 1,
//  },
//  welconeContainer: {
//    width: "100%",
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "space-around",
//    alignItems: "center",
//    height: "30%",
//    // padding:15
//  },
//  formContainer: {
//    flex: 3,
//    justifyContent: "flex-start",
//    alignItems: "center",
//    display: "flex",
//    width: "100%",
//    flexDirecion: "row",
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
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "flex-end",
//    alignItems: "center",
//  },
//  ForgetText: {
//    fontSize: 15,
//    fontWeight: "600",
//  },
//  buttomContainer: {
//    display: "flex",
//    justifyContent: "center",
//    width: "100%",
//  },
//  bottomContainer: {
//    marginTop: 10,
//    display: "flex",
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
//    display: "flex",
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
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { colors } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/download.jpeg";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as actions from "../../states/actionTypes/actionTypes";
import { fetchCart } from "../../states/actionCreaters/actionCreaters";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch()

  // Store user data in AsyncStorage
  const _storeData = async (user) => {
    try {
      await AsyncStorage.setItem("authUser", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      setError("Failed to store user data.");
    }
  };

  const loginHandle = async () => {
    setIsloading(true);
    setError(""); // Clear previous errors

    // Input validation
    if (!email) {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (!password) {
      setIsloading(false);
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      setIsloading(false);
      return setError("Email is not valid");
    }
    if (email.length < 6) {
      setIsloading(false);
      return setError("Email is too short");
    }
    if (password.length < 6) {
      setIsloading(false);
      return setError("Password must be at least 6 characters");
    }

    // API request
    try {
      const response = await fetch("https://shopflow.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
        await AsyncStorage.setItem('user',JSON.stringify(email))
      // Get raw text response
      const text = await response.text();
      console.log("Raw Response:", text);

      // Try parsing JSON
      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        throw new Error("Invalid JSON response from server");
      }

      // Handle API response
      console.log("Parsed Response:", result);
      console.log(result.data.id,result.token)

      await AsyncStorage.setItem("userid",JSON.stringify(result.data.id))
            await AsyncStorage.setItem("authToken",(result.token))


      if (response.ok && result?.status === "success") {
      const token = await AsyncStorage.getItem("authToken")
      const userid = await AsyncStorage.getItem("userid")
            await AsyncStorage.setItem('isLoggedIn',"true")
             dispatch({ type: actions.LOGIN_SUCCESS, payload: response.data });

                   // After login success, immediately fetch the cart
                  if (token) {
                  console.log("entered token",token)
                    // Proceed with the action
                    dispatch(fetchCart(userid));
                  } else {
                    // Handle the case when token is not available
                    console.error("Token is missing");
                  }
        _storeData(result.data); // Save user data
        setIsloading(false);
        if (result?.status === "temp") {
          navigation.replace("dashboard", { authUser: result.data });
        } else {
          navigation.replace("tab", { user: result.data });

        }
      } else {
        setIsloading(false);
        setError(result.message || "Login failed");
      }
    } catch (error) {
      setIsloading(false);
      console.log("Login Error:", error.message);
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
