import { StyleSheet, Image, View } from "react-native";
import React, { useEffect } from "react";
import { colors,network } from "../../constants";
import logo from "../../assets/logo/download.jpeg";

import EncryptedStorage from 'react-native-encrypted-storage';

const Splash = ({ navigation }) => {
  //method to fetch the authUser data from aync storage if there is any and login the Dashboard or Home Screen according to the user type
  _retrieveData = async () => {
    try {
      const value = await EncryptedStorage.getItem("authUser");
      if (value !== null) {
        let user = JSON.parse(value); // covert the authUser value to json
        if (user.userType === "ADMIN") {
          setTimeout(() => {
            navigation.replace("dashboard", { authUser: JSON.parse(value) }); // navigate to Admin dashboard
          }, 2000);
        } else {

          setTimeout(() => {
            navigation.replace("tab", { user: JSON.parse(value) }); // navigate to User Home screen
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigation.replace("tab",{ user: {name:"Guest",email:"guest@gmail.com"} }); // // navigate to login screen if there is no authUser store in aysnc storage
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // check the authUser and navigate to screens accordingly on initial render
  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    color: colors.light,
    fontSize: 50,
    fontWeight: "bold",
  },
  logo: {
    resizeMode: "contain",
    width: 180,
    height: 260,
  },
});
