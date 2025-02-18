//import {
//  StyleSheet,
//  Text,
//  TouchableOpacity,
//  View,
//  ScrollView,
//  KeyboardAvoidingView,
//  Platform,
//  Image,
//  Alert,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { Ionicons } from "@expo/vector-icons";
//import { colors } from "../../constants";
//import CustomInput from "../../components/CustomInput";
//import CustomButton from "../../components/CustomButton";
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import axios from "axios";
//import { network } from "../../constants";
//import * as ImagePicker from "expo-image-picker";
//import EncryptedStorage from 'react-native-encrypted-storage';
//
//const EditProfileScreen = ({ navigation, route }) => {
//  const { user } = route.params;
//  const [userDetails, setUserDetails] = useState({
//    name: user.name,
//    email: user.email,
//    phone: user.phone,
//    profile_pic: user.profile_pic || null,
//  });
//  const [error, setError] = useState("");
//  const [alertType, setAlertType] = useState("error");
//  const [authToken, setAuthToken] = useState("");
//  const [userid, setUserid] = useState(null);
//
//  useEffect(() => {
//    const loadToken = async () => {
//      try {
//        const token = await EncryptedStorage.getItem("authToken");
//        const temp = await EncryptedStorage.getItem("userid");
//        if (token) {
//          setAuthToken(token);
//          setUserid(temp);
//        }
//      } catch (err) {
//        console.error("Error loading auth token:", err);
//      }
//    };
//    loadToken();
//  }, []);
//
//  useEffect(() => {
//    if (!authToken || !userid) return;
//    axios
//      .get(
//        `${network.serverip}/user/userProfileInfo`,{ params: { userId: Number(userid) }, headers: { Authorization: `Bearer ${authToken}` } }
//      )
//      .then((response) => {
//        const { name, email, phone, profile_pic } = response.data.data;
//        setUserDetails({ name, email, phone, profile_pic });
//      })
//      .catch(() => {
//        setError("Failed to load user information");
//      });
//  }, [authToken, userid]);
//
//  const pickImage = async () => {
//    let result = await ImagePicker.launchImageLibraryAsync({
//      mediaTypes: ImagePicker.MediaTypeOptions.Images,
//      allowsEditing: true,
//      aspect: [1, 1],
//      quality: 1,
//    });
//
//    if (!result.canceled) {
//      setUserDetails((prevDetails) => ({
//        ...prevDetails,
//        profile_pic: result.assets[0].uri,
//      }));
//    }
//  };
//
//  const updateProfileHandle = async () => {
//    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
//      setError("All fields are required");
//      return;
//    }
//
//    const formData = new FormData();
//    formData.append("name", userDetails.name);
//    formData.append("email", userDetails.email);
//    formData.append("phone", userDetails.phone);
//
//    if (userDetails.profile_pic) {
//      formData.append("profile", {
//        uri: userDetails.profile_pic,
//        name: "profile.jpg",
//        type: "image/jpeg",
//      });
//    }
//
//    try {
//      const response = await axios.put(
//        `${network.serverip}/user/updateUserProfile?userId=${userid}`,
//        formData,
//        {
//          headers: {
//            "Content-Type": "multipart/form-data",
//            Authorization: `Bearer ${authToken}`,
//          },
//        }
//      );
//      await EncryptedStorage.setItem("authUser", JSON.stringify(response.data.data));
//      navigation.replace("tab", { user: response.data.data, name: "user" });
//      Alert.alert("Profile Updated", "Your profile has been successfully updated!");
//    } catch (err) {
//      setError("Failed to update profile");
//    }
//  };
//
//  return (
//    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
//      <ScrollView contentContainerStyle={styles.container}>
//        <View style={styles.TopBarContainer}>
//          <TouchableOpacity onPress={() => navigation.goBack()}>
//            <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
//          </TouchableOpacity>
//          <Text style={styles.header}>Edit Profile</Text>
//        </View>
//        <TouchableOpacity style={styles.profilePicContainer} onPress={pickImage}>
//          {userDetails.profile_pic ? (
//            <Image source={{ uri: userDetails.profile_pic }} style={styles.profilePic} />
//          ) : (
//            <Ionicons name="person-circle-outline" size={100} color={colors.muted} />
//          )}
//        </TouchableOpacity>
//        <Text style={styles.userName}>{userDetails.name}</Text>
//        <CustomAlert message={error} type={alertType} />
//        <View style={styles.inputContainer}>
//        <Text>Name:</Text>
//          <CustomInput label="Full Name" value={userDetails.name} setValue={(val) => setUserDetails({ ...userDetails, name: val })} />
//        <Text>Email:</Text>
//          <CustomInput label="Email" value={userDetails.email} setValue={(val) => setUserDetails({ ...userDetails, email: val })} />
//        <Text>Phone:</Text>
//          <CustomInput label="Phone" value={userDetails.phone} setValue={(val) => setUserDetails({ ...userDetails, phone: val })} />
//        </View>
//        <View style={styles.buttonContainer}>
//          <CustomButton text="Save" onPress={updateProfileHandle} />
//        </View>
//      </ScrollView>
//    </KeyboardAvoidingView>
//  );
//};
//
//const styles = StyleSheet.create({
//  container: { flex: 1, alignItems: "center", },
//  buttonContainer: { width: "100%", alignItems: "center", marginTop: 30,padding:20 },
//  header: { fontSize: 24, color: colors.primary, fontWeight: "bold", marginVertical: 10,marginLeft:20 },
//  profilePicContainer: { marginVertical: 20, alignItems: "center" },
//  profilePic: { width: 120, height: 120, borderRadius: 60 },
//  userName: { fontSize: 18, fontWeight: "bold", marginVertical: 10, textAlign: "center" },
//  inputContainer: { width: "100%" ,padding:20},
//  TopBarContainer: { flexDirection: "row", alignItems: "center", padding: 10, width: "100%", backgroundColor: "#111827" },
//});
//
//export default EditProfileScreen;

    import {
      StyleSheet,
      Text,
      TouchableOpacity,
      View,
      ScrollView,
      KeyboardAvoidingView,
      Platform,
      Image,
      Alert,
    } from "react-native";
    import React, { useState, useEffect } from "react";
    import { Ionicons } from "@expo/vector-icons";
    import { colors } from "../../constants";
    import CustomInput from "../../components/CustomInput";
    import CustomButton from "../../components/CustomButton";
    import CustomAlert from "../../components/CustomAlert/CustomAlert";
    import axios from "axios";
    import { network } from "../../constants";
    import * as ImagePicker from "expo-image-picker";
    import EncryptedStorage from 'react-native-encrypted-storage';

    const EditProfileScreen = ({ navigation, route }) => {
      const { user } = route.params;
      const [userDetails, setUserDetails] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile_pic: user.profile_pic || null,
      });
      const [error, setError] = useState("");
      const [alertType, setAlertType] = useState("error");
      const [authToken, setAuthToken] = useState("");
      const [userid, setUserid] = useState(null);

      useEffect(() => {
        const loadToken = async () => {
          try {
            const token = await EncryptedStorage.getItem("authToken");
            const temp = await EncryptedStorage.getItem("userid");
            if (token) {
              setAuthToken(token);
              setUserid(temp);
            }
          } catch (err) {
            console.error("Error loading auth token:", err);
          }
        };
        loadToken();
      }, []);

      useEffect(() => {
        if (!authToken || !userid) return;
        axios
          .get(
            `${network.serverip}/user/userProfileInfo`,
            { params: { userId: Number(userid) }, headers: { Authorization: `Bearer ${authToken}` } }
          )
          .then((response) => {
            const { name, email, phone, profile_pic } = response.data.data;
            console.log(response.data.data)
            setUserDetails({
              name,
              email,
              phone,
              profile_pic,
            });
          })
          .catch(() => {
            setError("Failed to load user information");
          });
      }, [authToken, userid]);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            profile_pic: result.assets[0].uri,
          }));
        }
      };

      const updateProfileHandle = async () => {
        if (!userDetails.name || !userDetails.email || !userDetails.phone) {
          setError("All fields are required");
          return;
        }

        if (!userDetails.name || !userDetails.email || !userDetails.phone) {
            setError("All fields are required");
            return;
          }

          // Name validation (only letters and spaces allowed)
          const nameRegex = /^[A-Za-z\s]+$/;
          if (!nameRegex.test(userDetails.name) ||  userDetails.name.length>18) {
            setError("Please enter a valid name (letters and spaces only)");
            return;
          }

          // Phone number validation (only numbers allowed and should be 10 digits long)
            const phoneRegex = /^[6-9]\d{9}$/;
          if (!phoneRegex.test(userDetails.phone)) {
            setError("Please enter a valid phone number (10 digits only)");
            return;
          }

        const formData = new FormData();
        formData.append("name", userDetails.name);
        formData.append("email", userDetails.email);
        formData.append("phone", userDetails.phone);

        if (userDetails.profile_pic) {
          formData.append("profile", {
            uri: userDetails.profile_pic,
            name: "profile.jpg",
            type: "image/jpeg",
          });
        }

        try {
          const response = await axios.put(
            `${network.serverip}/user/updateUserProfile?userId=${userid}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          await EncryptedStorage.setItem("authUser", JSON.stringify(response.data.data));
          navigation.replace("tab", { user: response.data.data, name: "user" });
          Alert.alert("Profile Updated", "Your profile has been successfully updated!");
        } catch (err) {
          setError("Failed to update profile");
        }
      };

      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.TopBarContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.header}>Edit Profile</Text>
            </View>
            <TouchableOpacity style={styles.profilePicContainer} onPress={pickImage}>
              {userDetails.profile_pic ? (
                <Image source={{ uri: userDetails.profile_pic }} style={styles.profilePic} />
              ) : (
                <Ionicons name="person-circle-outline" size={100} color={colors.muted} />
              )}
            </TouchableOpacity>
            <Text style={styles.userName}>{userDetails.name}</Text>
            <CustomAlert message={error} type={alertType} />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name:</Text>
              <CustomInput
                label="Full Name"
                value={userDetails.name}
                setValue={(val) => setUserDetails({ ...userDetails, name: val })}
              />

              <Text style={styles.label}>Email:</Text>
              <CustomInput
                label="Email"
                value={userDetails.email}
              editable={false} // Make email field non-editable
                pointerEvents="none" // Disables user interaction (non-clickable)

              />

              <Text style={styles.label}>Phone:</Text>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.flagText}>🇮🇳 +91</Text>
                <CustomInput
                  label="Phone"
                  value={userDetails.phone}
                  setValue={(val) => {
                    if (/^\d{0,10}$/.test(val)) { // Only allow up to 10 digits
                      setUserDetails({ ...userDetails, phone: val });
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                  style={styles.phoneInput}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton text="Save" onPress={updateProfileHandle} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    };

    const styles = StyleSheet.create({
      container: { flex: 1, alignItems: "center" },
      buttonContainer: { width: "100%", alignItems: "center", marginTop: 30, padding: 20 },
      header: { fontSize: 24, color: colors.primary, fontWeight: "bold", marginVertical: 10, marginLeft: 20 },
      profilePicContainer: { marginVertical: 20, alignItems: "center" },
      profilePic: { width: 120, height: 120, borderRadius: 60 },
      userName: { fontSize: 18, fontWeight: "bold", marginVertical: 10, textAlign: "center" },
      inputContainer: { width: "100%", padding: 20 },
      TopBarContainer: { flexDirection: "row", alignItems: "center", padding: 10, width: "100%", backgroundColor: "#111827" },
      flagbox:{flexDirection: "row", alignItems: "center"},
      inputContainer: {
          width: "100%",
          paddingHorizontal: 20,
        },
        label: {
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 5,
          color: "#333",
        },
        phoneInputContainer: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
        },
        flagText: {
          fontSize: 14,
          fontWeight: "bold",
          marginRight: 10,
        },
        phoneInput: {
          flex: 1, // Allows input to take remaining space
        },

    });

    export default EditProfileScreen;
