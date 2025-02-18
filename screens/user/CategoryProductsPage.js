import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  BackHandler,
    } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import ProgressDialog from "react-native-progress-dialog";
import { Ionicons } from "@expo/vector-icons";
import CustomLoader from "../../components/CustomLoader";


const CategoryProductsScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId, categoryName } = route.params;
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBarWidth] = useState(new Animated.Value(0)); // Initial width is 0 (hidden)
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading
const [label, setLabel] = useState("Loading products..."); // Label for ProgressDialog

  // Handle back button press to collapse search bar
  const handleBackPress = () => {
    if (isSearchActive) {
      collapseSearchBar();
      return true; // Prevent default back action
    }
    return false;
  };

  // Collapse search bar
  const collapseSearchBar = () => {
    setIsSearchActive(false);
    Animated.timing(searchBarWidth, {
      toValue: 0, // Collapse back to 0px
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Fetch data when categoryId or isSearchActive changes
  useEffect(() => {
    // Fetch products for the category
    axios
      .get(`${network.serverip}/products/subCategory?categoryId=${categoryId}`)
      .then((response) => {
        const subCategories = response.data.data.subCategories;
        if (subCategories && subCategories.length > 0) {
          const productPromises = subCategories.map((subCategory) =>
            axios
              .get(
                `${network.serverip}/products/getProductsByCategory?subCategoryId=${subCategory.id}`
              )
              .then((res) => ({
                subCategoryName: subCategory.name,
                products: res.data.data,
              }))
          );

          Promise.all(productPromises)
            .then((results) => {
              setSubCategoryData(results);
              setLoading(false); // Set loading to false when data is fetched
            })
            .catch((error) => {
              console.error("Error fetching products:", error);
              setLoading(false); // Set loading to false in case of error
            });
        } else {
          setLoading(false); // Set loading to false if no subcategories found
        }
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
        setLoading(false); // Set loading to false if error occurs while fetching subcategories
      });

    // Handle Android back button press
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove(); // Cleanup on unmount
  }, [categoryId, isSearchActive]);

  // Expand search bar
  const handleSearchIconPress = () => {
    navigation.navigate("searchresults", { query: searchQuery });
  };

  // Handle search submission
  const handleSearch = () => {
    navigation.navigate("searchresults", { query: searchQuery });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("productdetail", {
          product: item, // Pass the product information
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.offerPrice}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSubCategory = ({ item }) => (
    <View style={styles.subCategoryContainer}>
      <Text style={styles.subCategoryHeader}>{item.subCategoryName}</Text>
      {item.products.length > 0 ? (
        <FlatList
          data={item.products}
          keyExtractor={(product) => product.id.toString()}
          renderItem={renderProduct}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContainer}
        />
      ) : (
        <Text style={styles.noProductsText}>No products found</Text>
      )}
    </View>
  );

  return (
  <>
  <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
                  </TouchableOpacity>
          <Text style={styles.screenTitle}>{categoryName}</Text>
          <View style={styles.searchContainer}>
            <Animated.View style={[styles.searchBarContainer, { width: searchBarWidth }]}>
              <TextInput
                style={styles.searchBar}
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                onSubmitEditing={handleSearch}
                onBlur={collapseSearchBar}
              />
            </Animated.View>
            {!isSearchActive && (
              <TouchableOpacity onPress={handleSearchIconPress}>
                <Ionicons name="search" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
    <View style={styles.container}>

      {loading ? (
        <CustomLoader visible={loading} autoClose={true} />
      ) : subCategoryData.length === 0 ? (
        <Text style={styles.noProductsText}>No subcategories or products found</Text>
      ) : (
        <FlatList
          data={subCategoryData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSubCategory}
        />
      )}


    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    height:60,
    padding:10,
    backgroundColor:"#111827"
  },
  backButton: {
    padding: 8,
    marginRight: 12,

  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 700,
    color:colors.primary

  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight:20,
  },
  searchBarContainer: {
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginRight: 15,
  },
  searchBar: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  subCategoryContainer: {
    marginBottom: 20,
    backgroundColor:"#F0F0F0"
  },
  subCategoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
    marginLeft:7,
  },
  horizontalListContainer: {
    paddingLeft: 8,
  },
  card: {
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 160,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode:"contain"
  },
  cardContent: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  noProductsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryProductsScreen;
