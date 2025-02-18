import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import OptionList from "../../components/OptionList/OptionList";
import axios from "axios"; // Make sure to install axios
import { network } from "../../constants";
import EncryptedStorage from 'react-native-encrypted-storage';

const MyAccountScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [error, setError] = useState("");
  const { user } = route.params;
  const [authToken,setAuthToken]= useState("")
  const [modalVisible,setModalVisible] = useState(false)
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const authToken = await EncryptedStorage.getItem("authToken"); // Replace with your actual token
        setAuthToken(authToken)

        const userid = await EncryptedStorage.getItem("userid")
        const response = await axios.get(
          `${network.serverip}/user/userProfileInfo`,

          {
            params: { userId: Number(userid) },
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status===200) {
          setUserData(response.data.data);

        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
       setUserData({name:"Guest",email:"guest@gmail.com"})
     setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [user]);



  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.screenNameContainer}>
                <Text style={styles.screenNameText}>My Account</Text>
         </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

      <View style={styles.UserProfileCardContianer}>
        {user  ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <UserProfileCard
              name={user?.name || "Guest"}
              email={user?.email || "guest@gmail.com"}
              imageUrl={user?.profile_pic || null}
            />
          </TouchableOpacity>
        ) : (
          <Text style={{ color: "red" }}>
            {error || "Loading user information..."}
          </Text>
        )}
      </View>
      <View style={styles.OptionsContainer}>
        <OptionList
          text={"Edit Profile"}
          Icon={Ionicons}
          iconName={"create"}
          onPress={() =>{
          console.log(user.name)
          if(user.name !== "Guest"){
            navigation.navigate("editprofile", {
              user: user,
            })
          }
          else{
        Alert.alert("Error", "User not logged in");
         navigation.navigate("myaccount",{user:user})
          }
          }
          }
        />

<Modal visible={modalVisible} transparent={true} animationType="fade">
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.modalBackground}
      onPress={() => setModalVisible(false)}
    >
    <View style={styles.modalContent}>
      {user?.profile_pic ? (
        <Image
          source={{ uri: user.profile_pic }}
          style={styles.modalImage}
          resizeMode="contain"
        />
      ) : (
      <Ionicons name="person-circle" size={150} color="gray" />

      )}
      </View>
    </TouchableOpacity>
  </View>
</Modal>

      </View>
      </ScrollView>
    </View>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  TopBarContainer: {
  width:"100%",
    flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor:"#111827"
  },
  UserProfileCardContianer: {
     width: "100%",
        height: "auto",
        marginBottom: 20,
        marginTop:30,
  },
 screenNameContainer: {
     marginTop: 10,
     marginBottom: 10,
     marginLeft:20,
   },
    scrollViewContent: {
       flexGrow: 1,
       paddingHorizontal: 20,
       paddingBottom: 20,
     },
   screenNameText: {
     fontSize: 26,
     fontWeight: "800",
     color: colors.primary
     },
  OptionsContainer: {
    width: "100%",

  },
  modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.7)", // Dark overlay background
    },
    modalBackground: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalImage: {
      width: 300,
      height: 300,
      borderRadius: 10,
      backgroundColor: "#fff", // Ensure background visibility
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 10,
      },
});


