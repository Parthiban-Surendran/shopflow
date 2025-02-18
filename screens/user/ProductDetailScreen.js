import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, network } from "../../constants";
import CustomButton from "../../components/CustomButton";
import EncryptedStorage from 'react-native-encrypted-storage';
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import { Rating } from 'react-native-ratings';
import companylogo from "../../assets/logo/logoshop.png";
import CustomLoader from "../../components/CustomLoader";


const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const CATEGORY_API = "http://192.168.0.114:5000/products/Category";
  const SUBCATEGORY_API = "http://192.168.0.114:5000/products/getProductsByCategory?subCategoryId=";

  const [onWishlist, setOnWishlist] = useState(false);
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();
  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  const fetchSimilarProducts = async () => {
    setLoadingSimilar(true);
    try {
      const response = await axios.get(`${SUBCATEGORY_API}${product.subCategoryId}`);
      if (response.status === 200) {
        setSimilarProducts(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  useEffect(() => {
    fetchSimilarProducts();
  }, [product.subCategoryId]);

  const handleWishlistToggle = async () => {
    setIsLoading(true);

    try {
      const userId = await EncryptedStorage.getItem("userid");
      console.log(userId)
      if(userId === null) {
      Alert.alert("Error","Guest cannot Make Wishlist")
      return
      }

      const token = await EncryptedStorage.getItem("authToken");
      console.log(token,userId,product.id)
      const response = await axios.post(
       `${network.serverip}/user/wishlist/addOrRemoveItem`,{},

        {
          params: { userId, productId: product.id },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data)
      if (response.status === 200) {
        setError(response.data.message);
        setAlertType("success");
        setOnWishlist((prevState) => !prevState);
      } else {
      Alert.alert(response.data.message || "Failed to update wishlist.")
        setError(response.data.message || "Failed to update wishlist.");
        setAlertType("error");
      }
    } catch (error) {

      console.error("Wishlist update error:", error);
      Alert.alert("Guest Cannot Make Wishlist")
      setError("Guest Cannot Make WishList");
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    setIsLoading(true); // Start loading state

    try {
      const userId = await EncryptedStorage.getItem("userid");
      const token = await EncryptedStorage.getItem("authToken");

      if (userId === null) {
        Alert.alert(
                "Please Login to Purchase",
                "",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // Navigate after alert dismisses
                      navigation.navigate("login", { fromScreen: "productdetail", product: product });
                    },
                  },
                ],
                { cancelable: false }
              );
        setIsLoading(false); // Ensure loading state ends if the user is not logged in
        return;
      }
console.log(userId,product.id,token)
      const response = await axios.post(
        `${network.serverip}/user/order/createOrder?userId=${userId}`,
        {
          items: [{ productId: Number(product.id), quantity: 1 }],
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
console.log(response.data)
      if (response.status === 201) {
        // Order created successfully
        navigation.navigate("addressscreen", { orders: response?.data?.data, fromCart: false });
      } else {
        setError("Failed to create order.");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      setError("Failed to place order. Please try again.");
      setAlertType("error");
    } finally {
      setIsLoading(false); // End loading state once the API call is finished
    }
  };

  const fetchWishlistStatus = async () => {
    try {
      const userId = await EncryptedStorage.getItem("userid");
      const token = await EncryptedStorage.getItem("authToken");

      const response = await axios.get(
        `${network.serverip}/user/wishlist/viewWishlist?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const isOnWishlist = response.data.data?.products?.some(
        (item) => item.productId === product.id
      );
      setOnWishlist(isOnWishlist || false);
    } catch (error) {
      console.error("Failed to fetch wishlist status:", error);
    }
  };

  useEffect(() => {
    fetchWishlistStatus();
  }, [product.id]);

  return (
    <View style={styles.container}>
              <CustomLoader visible={isLoading} autoClose={true} />

      <StatusBar />
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={"#fff"} />
        </TouchableOpacity>
        <Image source={companylogo} style={styles.logo} />
        <TouchableOpacity onPress={handleWishlistToggle} disabled={isLoading}>
          <Ionicons
            name={onWishlist ? "heart" : "heart-outline"}
            size={30}
            color={onWishlist ? colors.primary : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} ref={scrollViewRef} style={styles.scrollView}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <Text style={styles.priceLabel}>Price:</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>${product.offerPrice || "0.00"}</Text>
            <Text style={styles.originalPrice}>${product.actualPrice || "0.00"}</Text>
            <Text style={styles.discountedPercent}>
              ({product.discountPercentage || "0"}% OFF)
            </Text>
          </View>

          <View style={styles.rating}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={14}
              readonly
              startingValue={product.rating || 0}
              style={styles.ratingStars}
            />
            <Text style={styles.ratingText}>({product.rating || "No Rating"})</Text>
          </View>
        </View>

        {error && <CustomAlert message={error} type={alertType} />}

        <View style={styles.buttonContainer}>
          <CustomButton
            text={addedToCart ? "Added to Cart" : "Add to Cart"}
            onPress={() => {
              addCartItem(product);
              setAddedToCart(true);
              Alert.alert("Success", "Product added to cart successfully!");
            }}
            style={styles.viewProductButton}
            disabled={addedToCart}
          />
          <CustomButton
            text={"Buy Now"}
            onPress={handleBuyNow}
            style={styles.buyNowButton}
          >
            {isLoading && <CustomLoader visible={isLoading} autoClose={true} />}
          </CustomButton>

        </View>

        <Text style={styles.sectionTitle}>Similar Products</Text>
        {loadingSimilar ? (
          <Text>Loading similar products...</Text>
        ) : (
          <FlatList
            data={similarProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
                  }
                  navigation.push("productdetail", { product: item });
                }}
                style={styles.productCard}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:10,
    height: 60,
    backgroundColor: "#111827",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  productImageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    resizeMode: "contain",
    marginBottom: 20,
  },
  productDetailsContainer: {
    marginBottom: 40,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  discountedPercent: {
    fontSize: 16,
    color: colors.primary,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingStars: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    color: colors.dark,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productCard: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: 90,
    height: 40,
    marginTop:10,
  },
  viewProductButton: {
    marginVertical: 10,
    backgroundColor: colors.primary,
  },
  buyNowButton: {
    marginVertical: 10,
    backgroundColor: colors.secondary,
  },

});

export default ProductDetailScreen;
