//import React, { useState } from "react";
//import {
//  StyleSheet,
//  Text,
//  View,
//  TextInput,
//  TouchableOpacity,
//  ActivityIndicator,
//  Alert,
//  ScrollView,
//  KeyboardAvoidingView,
//  Image,
//} from "react-native";
//import axios from "axios";
//import { colors,network } from "../../constants";
//import header_logo from "../../assets/logo/logo.png";
//
//const SignupScreen = ({ navigation }) => {
//  const [name, setName] = useState("");
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [confirmPassword, setConfirmPassword] = useState("");
//  const [loading, setLoading] = useState(false);
//    const handleSignUp = async () => {
//    if (!name || !email || !password || !confirmPassword) {
//      Alert.alert("Error", "Please fill in all fields");
//      return;
//    }
//
//    if (!/\S+@\S+\.\S+/.test(email)) {
//      Alert.alert("Error", "Please enter a valid email address");
//      return;
//    }
//
//    if (password.length < 6) {
//      Alert.alert("Error", "Password must be at least 6 characters");
//      return;
//    }
//
//    if (password !== confirmPassword) {
//      Alert.alert("Error", "Passwords do not match");
//      return;
//    }
//
//    setLoading(true);
//    try {
//      const response = await axios.post(
//        `${network.serverip}/user/signup`,
//        {
//          name,
//          email,
//          password,
//        }
//      );
//      if (response.data.status === "success") {
//        Alert.alert("Success", "Registration Successful! Please login.");
//        navigation.navigate("login");
//      } else {
//        Alert.alert("Error", response.data.message || "Registration failed");
//      }
//    } catch (error) {
//      Alert.alert("Error", "Something went wrong. Please try again.");
//      console.error("Signup error:", error);
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  return (
//    <KeyboardAvoidingView style={styles.container} behavior="padding">
//      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//
//
//        <View style={styles.logoContainer}>
//          <Image source={header_logo} style={styles.logo} />
//        </View>
//
//        <View style={styles.formContainer}>
//          <Text style={styles.title}>Sign Up</Text>
//
//          <TextInput
//            style={styles.input}
//            placeholder="Full Name"
//            value={name}
//            onChangeText={setName}
//          />
//
//          <TextInput
//            style={styles.input}
//            placeholder="Email"
//            value={email}
//            onChangeText={setEmail}
//            keyboardType="email-address"
//            autoCapitalize="none"
//          />
//
//          <TextInput
//            style={styles.input}
//            placeholder="Password"
//            value={password}
//            secureTextEntry
//            onChangeText={setPassword}
//          />
//
//          <TextInput
//            style={styles.input}
//            placeholder="Confirm Password"
//            value={confirmPassword}
//            secureTextEntry
//            onChangeText={setConfirmPassword}
//          />
//
//          {loading ? (
//            <ActivityIndicator size="large" color={colors.primary} />
//          ) : (
//            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//              <Text style={styles.buttonText}>Register</Text>
//            </TouchableOpacity>
//          )}
//
//          <Text
//            style={styles.link}
//            onPress={() => navigation.navigate("login")}
//          >
//            Already have an account? Login
//          </Text>
//        </View>
//      </ScrollView>
//    </KeyboardAvoidingView>
//  );
//};
//
//export default SignupScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.light,
//    padding: 20,
//  },
//  topBarContainer: {
//    flexDirection: "row",
//    justifyContent: "flex-start",
//    marginBottom: 20,
//  },
//  backText: {
//    color: colors.primary,
//    fontSize: 16,
//    fontWeight: "bold",
//  },
//  logoContainer: {
//    alignItems: "center",
//    marginBottom: 20,
//  },
//  logo: {
//    width: 100,
//    height: 100,
//    resizeMode: "contain",
//  },
//  formContainer: {
//    flex: 1,
//    justifyContent: "center",
//  },
//  title: {
//    fontSize: 28,
//    fontWeight: "bold",
//    color: colors.dark,
//    textAlign: "center",
//    marginBottom: 20,
//  },
//  input: {
//    borderWidth: 1,
//    borderColor: colors.muted,
//    borderRadius: 8,
//    padding: 12,
//    marginBottom: 15,
//    backgroundColor: "#fff",
//    color: colors.dark,
//  },
//  button: {
//    backgroundColor: colors.primary,
//    padding: 15,
//    borderRadius: 8,
//    alignItems: "center",
//    marginTop: 10,
//  },
//  buttonText: {
//    color: "#fff",
//    fontSize: 18,
//    fontWeight: "bold",
//  },
//  link: {
//    marginTop: 15,
//    color: colors.primary,
//    textAlign: "center",
//    fontSize: 16,
//  },
//});



import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import axios from "axios";
import { colors, network } from "../../constants";
import header_logo from "../../assets/logo/llogo.png";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation Function (Runs on every change)
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "name":
        if (value.length > 18) {
          error = "Name should be less than 18 characters";
        } else if (value.trim() && !/^[a-zA-Z0-9\s]+$/.test(value.trim())) {
          error = "Name should contain only letters and numbers";
        }
        break;

     case "email":
       if (value.trim() && !/^[a-zA-Z]+([a-zA-Z0-9._%+@$&-]*[a-zA-Z0-9])?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
         error = "Invalid email format (The part before @ cannot start or end with special symbols, and hyphens cannot be in the middle)";
       }
       break;


      case "password":
        if (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
          error = "Must be 8+ chars, include UPPER/lower, number & special char";
        }
        break;

      case "confirmPassword":
        if (value && value !== password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleSignUp = async () => {
    // Validate all fields before submitting
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    // Check if there are any errors
    if (Object.values(errors).some((error) => error)) return;

    setLoading(true);
    try {
      const response = await axios.post(`${network.serverip}/user/signup`, {
        name,
        email,
        password,
      });
      console.log(response.data)

      if (response.data.status === "success") {
        Alert.alert("Success", "Registration Successful! Please login.");
        navigation.navigate("login");
      } else {
        Alert.alert("Error", response.data.message || "Registration failed");
      }
    } catch (error) {
      navigation.replace("login");
      Alert.alert("Error", "User Already Exists. Please Login!");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.logoContainer}>
          <Image source={header_logo} style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateField("name", text);
            }}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateField("email", text);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => {
              setPassword(text);
              validateField("password", text);
            }}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          {/* Confirm Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={(text) => {
              setConfirmPassword(text);
              validateField("confirmPassword", text);
            }}
          />
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

          {/* Submit Button */}
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}

          {/* Login Link */}
          <Text style={styles.link} onPress={() => navigation.navigate("login")}>
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.dark,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: colors.dark,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
  },
});
