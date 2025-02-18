//import {
//  StyleSheet,
//  Text,
//  View,
//  StatusBar,
//  TouchableOpacity,
//  Animated,
//  ScrollView,
//  SafeAreaView,
//  ActivityIndicator,
//} from "react-native";
//import React, { useState, useCallback } from "react";
//import { useFocusEffect } from "@react-navigation/native";
//import EncryptedStorage from 'react-native-encrypted-storage';
//import axios from "axios";
//import { colors, network } from "../../constants";
//import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
//import OptionList from "../../components/OptionList/OptionList";
//import { Ionicons } from "@expo/vector-icons";
//import { useDispatch } from "react-redux";
//import * as actions from "../../states/actionTypes/actionTypes";
//import CustomLoader from "../../components/CustomLoader";
//
//
//const UserProfileScreen = ({ navigation }) => {
//  const dispatch = useDispatch();
//  const [userInfo, setUserInfo] = useState({ name: "Guest", email: "guest@example.com" });
//  const [menuOpen, setMenuOpen] = useState(false);
//  const [loading, setLoading] = useState(false);
//  const translateX = useState(new Animated.Value(-250))[0];
//
//  useFocusEffect(
//    useCallback(() => {
//      const fetchUserProfile = async () => {
//        setLoading(true); // Show loading indicator
//        try {
//          const storedUser = await EncryptedStorage.getItem("authUser");
//          const userid = await EncryptedStorage.getItem("userid");
//          const authToken = await EncryptedStorage.getItem("authToken");
//
//          if (!storedUser || !userid || !authToken) {
//            console.error("User data not found");
//            return;
//          }
//
//          const parsedUser = JSON.parse(storedUser);
//          setUserInfo(parsedUser);
//
//          const response = await axios.get(
//            `${network.serverip}/user/userProfileInfo`,
//            {
//              params: { userId: Number(userid) },
//              headers: { Authorization: `Bearer ${authToken}` },
//            }
//          );
//
//          if (response.status === 200) {
//            setUserInfo(response.data.data);
//          } else {
//            console.error("API Error:", response.data.message);
//          }
//        } catch (error) {
//          console.error("Error fetching user profile:", error);
//        } finally {
//          setLoading(false); // Hide loading indicator
//        }
//      };
//
//      fetchUserProfile();
//    }, [])
//  );
//
//  const toggleMenu = () => {
//    setMenuOpen(!menuOpen);
//    Animated.timing(translateX, {
//      toValue: menuOpen ? -250 : 0,
//      duration: 300,
//      useNativeDriver: true,
//    }).start();
//  };
//
//  return (
//    <SafeAreaView style={styles.safeContainer}>
//      <StatusBar style="auto" />
//      <View style={styles.TopBarContainer}>
//        <TouchableOpacity onPress={toggleMenu}>
//          <Ionicons name="menu-sharp" size={30} color={colors.primary} />
//        </TouchableOpacity>
//        <View style={styles.screenNameContainer}>
//          <Text style={styles.screenNameText}>Profile</Text>
//        </View>
//      </View>
//
//      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
//        <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate("home"); }}>
//          <Text style={styles.menuText}>Home</Text>
//        </TouchableOpacity>
//        <TouchableOpacity onPress={() => { toggleMenu(); navigation.navigate("categories"); }}>
//          <Text style={styles.menuText}>Products</Text>
//        </TouchableOpacity>
//        <TouchableOpacity onPress={toggleMenu}>
//          <Text style={styles.menuText}>Accounts</Text>
//        </TouchableOpacity>
//      </Animated.View>
//
//      <ScrollView contentContainerStyle={styles.scrollViewContent}>
//        {loading ? (
//        <CustomLoader visible={loading} autoClose={true} />
//        ) : (
//          <>
//            <View style={styles.UserProfileCardContainer}>
//              <UserProfileCard
//                Icon={Ionicons}
//                name={userInfo?.name}
//                email={userInfo?.email}
//                imageUrl={userInfo?.profile_pic || null}
//              />
//            </View>
//
//            <View style={styles.OptionsContainer}>
//              <OptionList
//                text="My Account"
//                Icon={Ionicons}
//                iconName="person"
//                onPress={() => navigation.navigate("myaccount", { user: userInfo })}
//              />
//              <OptionList
//                text="Wishlist"
//                Icon={Ionicons}
//                iconName="heart"
//                onPress={() => navigation.navigate("mywishlist", { user: userInfo })}
//              />
//              <OptionList
//                text={userInfo?.name === "Guest" ? "Login" : "Logout"}
//                Icon={Ionicons}
//                iconName={userInfo?.name === "Guest" ? "log-in" : "log-out"}
//                onPress={async () => {
//                  if (userInfo?.name === "Guest") {
//                    await EncryptedStorage.setItem("isLoggedIn", "false");
//                    navigation.replace("login");
//                  } else {
//                    await EncryptedStorage.removeItem("authUser");
//                    await EncryptedStorage.removeItem("userid");
//                    await EncryptedStorage.removeItem("authToken");
//                    await EncryptedStorage.setItem("isLoggedIn", "false");
//                    dispatch({ type: actions.USER_LOGOUT });
//                    navigation.replace("tab", { user: { name: "Guest" } });
//                  }
//                }}
//              />
//            </View>
//          </>
//        )}
//      </ScrollView>
//    </SafeAreaView>
//  );
//};
//
//export default UserProfileScreen;
//
//const styles = StyleSheet.create({
//  safeContainer: {
//    flex: 1,
//    backgroundColor: colors.light,
//  },
//  TopBarContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//    paddingHorizontal: 20,
//    paddingVertical: 10,
//    backgroundColor: "#111827",
//  },
//  menu: {
//    position: "absolute",
//    top: 0,
//    left: 0,
//    bottom: 0,
//    width: 250,
//    backgroundColor: "#fff",
//    zIndex: 1,
//    elevation: 5,
//    padding: 20,
//  },
//  menuText: {
//    fontSize: 18,
//    fontWeight: "bold",
//    marginVertical: 10,
//  },
//  scrollViewContent: {
//    flexGrow: 1,
//    paddingHorizontal: 20,
//    paddingBottom: 20,
//  },
//  screenNameContainer: {
//    marginTop: 10,
//    marginBottom: 10,
//    marginLeft: 20,
//  },
//  screenNameText: {
//    fontSize: 26,
//    fontWeight: "800",
//    color: colors.primary,
//  },
//  UserProfileCardContainer: {
//    width: "100%",
//    height: "auto",
//    marginBottom: 20,
//    marginTop: 30,
//  },
//  OptionsContainer: {
//    width: "100%",
//  },
//});





import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  ScrollView,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";
import { colors, network } from "../../constants";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import OptionList from "../../components/OptionList/OptionList";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as actions from "../../states/actionTypes/actionTypes";
import CustomLoader from "../../components/CustomLoader";

const UserProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "Guest",
    email: "guest@example.com",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const translateX = useState(new Animated.Value(-250))[0];

  useFocusEffect(
    useCallback(() => {
      const fetchUserProfile = async () => {
        setLoading(true);
        try {
          const storedUser = await EncryptedStorage.getItem("authUser");
          const userid = await EncryptedStorage.getItem("userid");
          const authToken = await EncryptedStorage.getItem("authToken");

          if (!storedUser || !userid || !authToken) {
            console.error("User data not found");
            return;
          }

          const parsedUser = JSON.parse(storedUser);
          setUserInfo(parsedUser);

          const response = await axios.get(
            `${network.serverip}/user/userProfileInfo`,
            {
              params: { userId: Number(userid) },
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );

          if (response.status === 200) {
            setUserInfo(response.data.data);
          } else {
            console.error("API Error:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }, [])
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(translateX, {
      toValue: menuOpen ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar style="auto" />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu-sharp" size={30} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.screenNameContainer}>
          <Text style={styles.screenNameText}>Profile</Text>
        </View>
      </View>

      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate("home");
          }}
        >
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate("categories");
          }}
        >
          <Text style={styles.menuText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuText}>Accounts</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <CustomLoader visible={loading} autoClose={true} />
        ) : (
          <>
            <View style={styles.UserProfileCardContainer}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <UserProfileCard
                  Icon={Ionicons}
                  name={userInfo?.name}
                  email={userInfo?.email}
                  imageUrl={userInfo?.profile_pic || null}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.OptionsContainer}>
              <OptionList
                text="My Account"
                Icon={Ionicons}
                iconName="person"
                onPress={() =>
                  navigation.navigate("myaccount", { user: userInfo })
                }
              />
              <OptionList
                text="Wishlist"
                Icon={Ionicons}
                iconName="heart"
                onPress={() =>
                  navigation.navigate("mywishlist", { user: userInfo })
                }
              />
              <OptionList
                text={userInfo?.name === "Guest" ? "Login" : "Logout"}
                Icon={Ionicons}
                iconName={userInfo?.name === "Guest" ? "log-in" : "log-out"}
                onPress={async () => {
                  if (userInfo?.name === "Guest") {
                    await EncryptedStorage.setItem("isLoggedIn", "false");
                    navigation.navigate("login");
                  } else {
                    await EncryptedStorage.removeItem("authUser");
                    await EncryptedStorage.removeItem("userid");
                    await EncryptedStorage.removeItem("authToken");
                    await EncryptedStorage.setItem("isLoggedIn", "false");
                    dispatch({ type: actions.USER_LOGOUT });
                    navigation.replace("tab", { user: { name: "Guest" } });
                  }
                }}
              />
            </View>
          </>
        )}
      </ScrollView>

      {/* Modal for Image Preview */}
     <Modal visible={modalVisible} transparent={true} animationType="fade">
       <View style={styles.modalContainer}>
         <TouchableOpacity
           style={styles.modalCloseArea}
           onPress={() => setModalVisible(false)}
         />
         <View style={styles.modalContent}>
           {userInfo?.profile_pic ? (
             <Image
               source={{ uri: userInfo.profile_pic }}
               style={styles.modalImage}
               resizeMode="contain"
             />
           ) : (
             <Ionicons name="person-circle" size={150} color="gray" />
           )}
         </View>
       </View>
     </Modal>


    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.light,
  },
  TopBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#111827",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#fff",
    zIndex: 1,
    elevation: 5,
    padding: 20,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  screenNameContainer: {
    marginLeft: 20,
  },
  screenNameText: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.primary,
  },
  UserProfileCardContainer: {
    width: "100%",
    height: "auto",
    marginBottom: 20,
    marginTop: 30,
  },
  OptionsContainer: {
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 10,
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
