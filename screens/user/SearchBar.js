import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryName } = route.params || {}; // Safely handle params

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("searchresults", { searchQuery, categoryId });
      setSearchQuery(""); // Clear search query after navigating
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button and Logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={`Search in ${categoryName || "all categories"}...`}
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch} // Trigger search on submit
          autoFocus={true} // Autofocus the search bar
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },

  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#000",
    width: 290,
    borderRadius: 25,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    color: "#000",
    fontSize: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    padding: 10,
  },
});

export default SearchBar;
