import { StyleSheet, Text, View,Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Make sure Ionicons is imported
import { colors } from "../../constants";

const UserProfileCard = ({ imageUrl, name, email }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.avatarContainer}>
        {imageUrl ? (
          // Display image if available
          <Image source={{ uri: imageUrl }} style={styles.avatarImage} />
        ) : (
          // Display Ionicons icon if no image
          <Ionicons name="person" size={80} color={colors.primary} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.usernameText}>{name}</Text>
        <Text style={styles.secondaryText}>{email}</Text>
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
      avatarContainer: {
        display: "flex",
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light,
        borderRadius: 20,
        padding: 30,
      },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // For round image
    borderColor:"#333",
    borderWidth:2,

  },
  infoContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.light,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  secondaryText: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
