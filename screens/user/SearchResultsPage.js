import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Keyboard,
  Modal,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

// Import the ProductDetail component

const SEARCH_API = "https://shopflow-new.onrender.com/products/getProductBySearch?query=";
const CATEGORY_API ="https://shopflow-new.onrender.com/products/Category";
const SUBCATEGORY_API = "https://shopflow-new.onrender.com/products/subCategory?categoryId=";
const FILTER_API = "https://shopflow-new.onrender.com/products/filteredProducts?categoryName=";

const SearchResultsPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { searchQuery: initialSearchQuery } = route.params || {};

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${CATEGORY_API}`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(`${SUBCATEGORY_API}${categoryId}`);
      setSubCategories(response.data.data.subCategories); // Correctly set subcategories as an array
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(null); // Reset subcategory selection
    fetchSubCategories(categoryId); // Fetch subcategories for the selected category
  };

  const fetchResults = async (query) => {
    if (query.trim()) {
      setLoading(true);
      try {
        const response = await axios.get(`${SEARCH_API}${query}`);
        setResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setLoading(false);
    }
  };

  const applyFilter = async () => {
    setFilterModalVisible(false);
    setLoading(true);

    try {
      const response = await axios.get(
        `${FILTER_API}${selectedCategory}&subCategoryNames=${selectedSubCategory || ""}`
      );
      setResults(response.data.data);
    } catch (error) {
      console.error("Error applying filter", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (initialSearchQuery) {
      fetchResults(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const handleSearch = () => {
    fetchResults(searchQuery);
    Keyboard.dismiss();
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setFilterModalVisible(false);
    fetchResults(searchQuery); // Re-fetch results with no filters
  };

  // Function to handle product click and navigate to ProductDetail
  const handleProductClick = (product) => {
    navigation.navigate("productdetail", { product });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.heading}>Search Results</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search products..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Feather name="filter" size={18} color="#fff" />
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity
                onPress={() => setFilterModalVisible(false)}
                style={styles.closeButton}
              >
                <Feather name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Categories */}
              <Text style={styles.sectionTitle}>Select Category</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryCard,
                      selectedCategory === category.name && styles.selectedCategoryCard,
                    ]}
                    onPress={() => handleCategorySelect(category.id, category.name)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category.name && styles.selectedCategoryText,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Subcategories */}
              {selectedCategory && subCategories.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Select Subcategory</Text>
                  <View style={styles.categoryContainer}>
                    {subCategories.map((subCategory) => (
                      <TouchableOpacity
                        key={subCategory.id}
                        style={[
                          styles.categoryCard,
                          selectedSubCategory === subCategory.name && styles.selectedCategoryCard,
                        ]}
                        onPress={() => setSelectedSubCategory(subCategory.name)} // Allow manual selection
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            selectedSubCategory === subCategory.name && styles.selectedCategoryText,
                          ]}
                        >
                          {subCategory.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearFilters}
              >
                <Text style={styles.clearButtonText}>Clear Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Display Results */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : results.length > 0 ? (
        <FlatList
          numColumns={2}
          data={results}
          keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
           <TouchableOpacity onPress={() => handleProductClick(item)} style={styles.productCard}>
             <View style={styles.productImageContainer}>
               <Image source={{ uri: item.image }} style={styles.productImage} />
             </View>
             <View style={styles.productInfo}>
               <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
               <View style={styles.priceContainer}>
                 <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                 <Text style={styles.offerPrice}>${item.offerPrice}</Text>
               </View>
             </View>
           </TouchableOpacity>
         )}

        />
      ) : (
        <Text style={styles.noResults}>No results found</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height:60,
    backgroundColor:"#111827",
    borderRadius:5,
    padding:10,
  },
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    color:colors.primary,
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginLeft:10,
    marginRight:10,
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    padding:5,
  },
  searchIcon: {
    padding: 5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width:"20%",
    borderRadius: 5,
    marginLeft:10,
    marginBottom: 20,
  },
  filterButtonText: {
    color: "#fff",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#111827",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedCategoryCard: {
    backgroundColor: "#007bff",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: "#000",
  },
  applyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    margin: 10,
    width: "45%",
    padding: 10,
    alignItems: "center",
  },

  productImageContainer: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  productInfo: {
    marginTop: 10,
    alignItems: "center",
  },

  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 5,
  },

  offerPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff4d4d",
  },

  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
});

export default SearchResultsPage;
