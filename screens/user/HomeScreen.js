import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { colors, network } from "../../constants";
import EncryptedStorage from 'react-native-encrypted-storage';
import cartIcon from "../../assets/icons/cart_beg.png";
import companylogo from "../../assets/logo/logoshop.png";
import Swiper from "react-native-swiper";
import { Rating } from 'react-native-ratings';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [slides, setSlides] = useState([]);
  const cartProducts = useSelector((state) => state.product?.items || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser , setAuthuser] = useState({});



  useEffect(() => {
    const initialize = async () => {
      const loginStatus = await EncryptedStorage.getItem("isLoggedIn");
      const authUser  = await EncryptedStorage.getItem("authUser ");
      setIsLoggedIn(loginStatus === "true");
      setAuthuser(authUser );
      fetchProducts(1, true);
      fetchFlashDeals();
      fetchCategories();
      fetchCarouselImages();
    };

    initialize();
  }, []);

  const fetchProducts = async (pageNumber, reset = false) => {
    if (isFetchingMore || (!hasMore && !reset)) return;

    setLoading(reset);
    setIsFetchingMore(true);

    try {
      const response = await axios.get(
        `${network.serverip}/products/getAllProducts?page=${pageNumber}&limit=10`
      );

      const newProducts = response.data.data;

      setProducts((prevProducts) =>
        reset ? newProducts : [...prevProducts, ...newProducts]
      );
      setHasMore(newProducts.length > 0);
      if (newProducts.length > 0) {
        setPage(pageNumber);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const fetchFlashDeals = async () => {
    try {
      const response = await axios.get(
        `${network.serverip}/products/flashDealProducts`
      );
      setFlashDeals(response.data.data);
    } catch (error) {
      console.error("Error fetching flash deals:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${network.serverip}/products/Category`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get(
        `${network.serverip}/products/getCarousel`
      );
      setSlides(response.data.data);
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  const loadMoreProducts = () => {
    if (!hasMore || isFetchingMore) return;

    const nextPage = page + 1;
    fetchProducts(nextPage);
  };

  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('categoryproductpage', { categoryId: category.id, categoryName: category.name });
  };

  const handleCarouselImageClick = async (item) => {
    if (item.type === "SUBCATEGORY") {
      navigation.navigate('categoryproducts', { categoryId: item.type_id });
    } else if (item.type === "PRODUCT") {
      try {
        const response = await axios.get(
          `${network.serverip}/products/getProductById?productId=${item.type_id}`
        );
        const productsInCategory = response.data.data;
        navigation.navigate('productdetail', { product: productsInCategory });
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    }
  };

  // Header component for FlatList
  const renderHeader = () => (
    <View>
      <View style={styles.topBarContainer}>
        <View style={styles.logoContainer}>
          <Image source={companylogo} style={styles.logo} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("searchresults")}
          style={styles.searchIconContainer}
        >
          <Ionicons name="search" size={30} color={"#fff"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartProducts.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartProducts.length}</Text>
            </View>
          )}
          <Image source={cartIcon} style={{ tintColor: 'white' }} />
        </TouchableOpacity>
      </View>

      {/* Categories as Circle Icons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCircle}
            onPress={() => handleCategoryPress(category)}
          >
            <Image source={{ uri: category.image }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.swiperContainer}>
        <Swiper style={styles.swiper} showsPagination autoplay autoplayTimeout={3}>
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <TouchableOpacity onPress={() => handleCarouselImageClick(slide)}>
                <Image
                  source={{ uri: slide.image }}
                  style={styles.bannerImage}
                />
              </TouchableOpacity>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );

  // Render Flash Deals
  const renderFlashDeals = () => (
    <View>
      <Text style={styles.sectionTitle}>Flash Deals</Text>
      <FlatList
        horizontal
        data={flashDeals}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.flashDealCard}
            onPress={() => handleProductPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.flashDealImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>
              <Text style={styles.strikeThrough}>${item.actualPrice}</Text> ${item.offerPrice}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={14}
                readonly
                startingValue={item.rating || 0}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: "#555" }}>({item.rating || "No Rating"})</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>

    <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductPress(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>
              <Text style={styles.strikeThrough}>${item.actualPrice}</Text> ${item.offerPrice}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={14}
                readonly
                startingValue={item.rating || 0}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: "#555" }}>({item.rating || "No Rating"})</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <>
            {renderHeader()}
            {renderFlashDeals()}
          </>
        )}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isFetchingMore && (
            <ActivityIndicator size="medium" color={colors.primary} />
          )
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  topBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#111827",
  },
  logoContainer: { width: 90, height: 40, flexDirection: "row", paddingLeft: 0, alignItems: "center", justifyContent: "flex-start", marginRight: 140, backgroundColor: "#111827", marginTop: 10 },
  logo: { width: 120, height: 40 },
  searchIconContainer: { paddingHorizontal: 10 },
  cartIconContainer: { position: "relative" },
  cartBadge: {
    position: "absolute",
    right: 0,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartBadgeText: { color: "white", fontWeight: "bold", fontSize: 10 },
  categoriesContainer: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    height: 100
  },
  categoryCircle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F1F1F1",
    overflow: "hidden",
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryText: { marginTop: 5, textAlign: "center", fontSize: 12 },
  swiperContainer: { paddingBottom: 10 },
  swiper: { marginTop: 5, height: 190, backgroundColor: "#fff" },
  slide: { flex: 1, backgroundColor: "#fff" },
  bannerImage: {
    width: "100%",
    height: 190,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginLeft: 10 },
  flashDealCard: {
    marginLeft: 10,
    width: 150,
    minHeight: 210,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    marginBottom: 15,
    marginTop: 10,
  },
  flashDealImage: { width: "100%", height: 120, borderRadius: 10, resizeMode: "contain" },
  productName: { fontSize: 16, marginTop: 5, color: "#333", fontWeight: "900" },
  productPrice: { fontSize: 16, marginTop: 5 },
  strikeThrough: { textDecorationLine: "line-through", color: colors.muted },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  productImage: { width: "100%", height: 120, borderRadius: 10, resizeMode: "contain" },
});