//import {
//  StyleSheet,
//  Image,
//  TouchableOpacity,
//  View,
//  StatusBar,
//  Text,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { Ionicons } from "@expo/vector-icons";
//import cartIcon from "../../assets/icons/cart_beg.png";
//import { colors, network } from "../../constants";
//import CustomButton from "../../components/CustomButton";
//import { useSelector, useDispatch } from "react-redux";
//import { bindActionCreators } from "redux";
//import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import axios from "axios";
//
//const ProductDetailScreen = ({ navigation, route }) => {
//  const { product } = route.params;
//  console.log("ProductScreen vanthuruchu:",product)
//  const cartproduct = useSelector((state) => state.product);
//  console.log(cartproduct)
//  const dispatch = useDispatch();
//
//  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);
//
//  //method to add item to cart(redux)
//  const handleAddToCat = (item) => {
//    addCartItem(item);
//  };
//
//  //remove the authUser from async storage and navigate to login
//  const logout = async () => {
//    await AsyncStorage.removeItem("authUser");
//    navigation.replace("login");
//  };
//
//  const [onWishlist, setOnWishlist] = useState(false);
//  const [avaiableQuantity, setAvaiableQuantity] = useState(0);
//  const [quantity, setQuantity] = useState(0);
//  const [productImage, SetProductImage] = useState(" ");
//  const [wishlistItems, setWishlistItems] = useState([]);
//  const [error, setError] = useState("");
//  const [isDisable, setIsDisbale] = useState(true);
//  const [alertType, setAlertType] = useState("error");
//
//  //method to fetch wishlist from server using API call
//  const fetchWishlist = async () => {
//    const value = await AsyncStorage.getItem("authUser"); // get authUser from async storage
//    const userId = await AsyncStorage.getItem("userid")
//        const token = await AsyncStorage.getItem("authToken")
//
//
//
//    console.log("Hello",userId)
//    const response = await axios.get(
//          `https://shopflow.onrender.com/user/wishlist/viewWishlist?userId=${userId}`,
//          {
//
//            headers: {
//              Authorization: `Bearer ${token}`,
//              "Content-Type": "application/json",
//            },
//          }
//        );
//    console.log("wishlist::::",response.data)
//
//  };
//
//  //method to increase the product quantity
//  const handleIncreaseButton = (quantity) => {
//    if (avaiableQuantity > quantity) {
//      setQuantity(quantity + 1);
//    }
//  };
//
//  //method to decrease the product quantity
//  const handleDecreaseButton = (quantity) => {
//    if (quantity > 0) {
//      setQuantity(quantity - 1);
//    }
//  };
//
//  //method to add or remove item from wishlist
//  const handleWishlistBtn = async () => {
//    setIsDisbale(true);
//    const value = await AsyncStorage.getItem("authUser");
//    let user = JSON.parse(value);
//
//    if (onWishlist) {
//      var myHeaders = new Headers();
//      myHeaders.append("x-auth-token", user.token);
//
//      var requestOptions = {
//        method: "GET",
//        headers: myHeaders,
//        redirect: "follow",
//      };
//
//      //API call to remove a item in wishlish
//      fetch(
//        `${network.serverip}/remove-from-wishlist?id=${product?._id}`,
//        requestOptions
//      )
//        .then((response) => response.json())
//        .then((result) => {
//          if (result.success) {
//            setError(result.message);
//            setAlertType("success");
//            setOnWishlist(false);
//          } else {
//            setError(result.message);
//            setAlertType("error");
//          }
//          setOnWishlist(!onWishlist);
//        })
//        .catch((error) => {
//          setError(result.message);
//          setAlertType("error");
//          console.log("error", error);
//        });
//      setIsDisbale(false);
//    } else {
//      var myHeaders2 = new Headers();
//      myHeaders2.append("x-auth-token", user.token);
//      myHeaders2.append("Content-Type", "application/json");
//
//      var raw2 = JSON.stringify({
//        productId: product?._id,
//        quantity: 1,
//      });
//
//      var addrequestOptions = {
//        method: "POST",
//        headers: myHeaders2,
//        body: raw2,
//        redirect: "follow",
//      };
//
//      console.log(addrequestOptions);
//
//      //API call to add a item in wishlish
//      fetch(`${network.serverip}/add-to-wishlist`, addrequestOptions)
//        .then((response) => response.json())
//        .then((result) => {
//          console.log(result);
//          if (result.success) {
//            setError(result.message);
//            setAlertType("success");
//            setOnWishlist(true);
//          } else {
//            setError(result.message);
//            setAlertType("error");
//          }
//          setOnWishlist(!onWishlist);
//        })
//        .catch((error) => {
//          setError(result.message);
//          setAlertType("error");
//          console.log("error", error);
//        });
//      setIsDisbale(false);
//    }
//  };
//
//  //set quantity, avaiableQuantity, product image and fetch wishlist on initial render
//  useEffect(() => {
//    setQuantity(0);
//    setAvaiableQuantity(product.quantity);
//    SetProductImage(`${network.serverip}/uploads/${product?.image}`);
//    fetchWishlist();
//  }, []);
//
//  //render whenever the value of wishlistItems change
//  useEffect(() => {}, [wishlistItems]);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar></StatusBar>
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity
//          onPress={() => {
//            navigation.goBack();
//          }}
//        >
//          <Ionicons
//            name="arrow-back-circle-outline"
//            size={30}
//            color={colors.muted}
//          />
//        </TouchableOpacity>
//
//        <View></View>
//        <TouchableOpacity
//          style={styles.cartIconContainer}
//          onPress={() => navigation.navigate("cart")}
//        >
//          {cartproduct.length > 0 ? (
//            <View style={styles.cartItemCountContainer}>
//              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
//            </View>
//          ) : (
//            <></>
//          )}
//          <Image source={cartIcon} />
//        </TouchableOpacity>
//      </View>
//      <View style={styles.bodyContainer}>
//        <View style={styles.productImageContainer}>
//          <Image source={{ uri: productImage }} style={styles.productImage} />
//        </View>
//        <CustomAlert message={error} type={alertType} />
//        <View style={styles.productInfoContainer}>
//          <View style={styles.productInfoTopContainer}>
//            <View style={styles.productNameContaier}>
//              <Text style={styles.productNameText}>{product?.title}</Text>
//            </View>
//            <View style={styles.infoButtonContainer}>
//              <View style={styles.wishlistButtonContainer}>
//                <TouchableOpacity
//                  disabled={isDisable}
//                  style={styles.iconContainer}
//                  onPress={() => handleWishlistBtn()}
//                >
//                  {onWishlist == false ? (
//                    <Ionicons name="heart" size={25} color={colors.muted} />
//                  ) : (
//                    <Ionicons name="heart" size={25} color={colors.danger} />
//                  )}
//                </TouchableOpacity>
//              </View>
//            </View>
//            <View style={styles.productDetailContainer}>
//              <View style={styles.productSizeOptionContainer}>
//                {/* <Text style={styles.secondaryTextSm}>Size:</Text> */}
//              </View>
//              <View style={styles.productPriceContainer}>
//                <Text style={styles.secondaryTextSm}>Price:</Text>
//                <Text style={styles.primaryTextSm}>{product?.price}$</Text>
//              </View>
//            </View>
//            <View style={styles.productDescriptionContainer}>
//              <Text style={styles.secondaryTextSm}>Description:</Text>
//              <Text>{product?.description}</Text>
//            </View>
//          </View>
//          <View style={styles.productInfoBottomContainer}>
//            <View style={styles.counterContainer}>
//              <View style={styles.counter}>
//                <TouchableOpacity
//                  style={styles.counterButtonContainer}
//                  onPress={() => {
//                    handleDecreaseButton(quantity);
//                  }}
//                >
//                  <Text style={styles.counterButtonText}>-</Text>
//                </TouchableOpacity>
//                <Text style={styles.counterCountText}>{quantity}</Text>
//                <TouchableOpacity
//                  style={styles.counterButtonContainer}
//                  onPress={() => {
//                    handleIncreaseButton(quantity);
//                  }}
//                >
//                  <Text style={styles.counterButtonText}>+</Text>
//                </TouchableOpacity>
//              </View>
//            </View>
//            <View style={styles.productButtonContainer}>
//              {avaiableQuantity > 0 ? (
//                <CustomButton
//                  text={"Add to Cart"}
//                  onPress={() => {
//                    handleAddToCat(product);
//                  }}
//                />
//              ) : (
//                <CustomButton text={"Out of Stock"} disabled={true} />
//              )}
//            </View>
//          </View>
//        </View>
//      </View>
//    </View>
//  );
//};
//
//export default ProductDetailScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    width: "100%",
//    flexDirecion: "row",
//    backgroundColor: colors.light,
//    alignItems: "center",
//    justifyContent: "flex-start",
//    flex: 1,
//  },
//  topBarContainer: {
//    width: "100%",
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//    padding: 20,
//  },
//  toBarText: {
//    fontSize: 15,
//    fontWeight: "600",
//  },
//  bodyContainer: {
//    width: "100%",
//    flexDirecion: "row",
//    backgroundColor: colors.light,
//    alignItems: "center",
//    justifyContent: "flex-start",
//    flex: 1,
//  },
//  productImageContainer: {
//    width: "100%",
//    flex: 2,
//    backgroundColor: colors.light,
//    flexDirecion: "row",
//    alignItems: "center",
//    justifyContent: "flex-end",
//    padding: 0,
//  },
//  productInfoContainer: {
//    width: "100%",
//    flex: 3,
//    backgroundColor: colors.white,
//    borderTopLeftRadius: 25,
//    borderTopRightRadius: 25,
//    flexDirection: "column",
//    justifyContent: "flex-end",
//    alignItems: "center",
//    elevation: 25,
//  },
//  productImage: {
//    height: 300,
//    width: 300,
//    resizeMode: "contain",
//  },
//  productInfoTopContainer: {
//    marginTop: 20,
//    display: "flex",
//    flexDirection: "column",
//    alignItems: "center",
//    justifyContent: "flex-start",
//    height: "100%",
//    width: "100%",
//    flex: 1,
//  },
//  productInfoBottomContainer: {
//    display: "flex",
//    flexDirection: "column",
//    alignItems: "center",
//    justifyContent: "flex-end",
//    backgroundColor: colors.light,
//    width: "100%",
//    height: 140,
//    borderTopLeftRadius: 25,
//    borderTopRightRadius: 25,
//  },
//  productButtonContainer: {
//    padding: 20,
//    paddingLeft: 40,
//    paddingRight: 40,
//    backgroundColor: colors.white,
//    width: "100%",
//    height: 100,
//    borderTopLeftRadius: 25,
//    borderTopRightRadius: 25,
//    display: "flex",
//    flexDirection: "column",
//    alignItems: "center",
//    justifyContent: "center",
//  },
//  productNameContaier: {
//    padding: 5,
//    paddingLeft: 20,
//    display: "flex",
//    width: "100%",
//    flexDirection: "row",
//    alignItems: "center",
//    justifyContent: "flex-start",
//  },
//  productNameText: {
//    fontSize: 20,
//    fontWeight: "bold",
//  },
//  infoButtonContainer: {
//    padding: 5,
//    paddingRight: 0,
//    display: "flex",
//    width: "100%",
//    flexDirection: "row",
//    alignItems: "center",
//    justifyContent: "flex-end",
//  },
//  wishlistButtonContainer: {
//    height: 50,
//    width: 80,
//    display: "flex",
//    alignItems: "center",
//    justifyContent: "center",
//    backgroundColor: colors.light,
//    borderTopLeftRadius: 10,
//    borderBottomLeftRadius: 10,
//  },
//  productDetailContainer: {
//    padding: 5,
//    paddingLeft: 20,
//    paddingRight: 20,
//    display: "flex",
//    width: "100%",
//    flexDirection: "row",
//    alignItems: "center",
//    justifyContent: "space-between",
//    elevation: 5,
//  },
//  secondaryTextSm: { fontSize: 15, fontWeight: "bold" },
//  primaryTextSm: { color: colors.primary, fontSize: 15, fontWeight: "bold" },
//  productDescriptionContainer: {
//    display: "flex",
//    width: "100%",
//    flexDirection: "column",
//    alignItems: "flex-start",
//    justifyContent: "center",
//    paddingLeft: 20,
//    paddingRight: 20,
//  },
//  iconContainer: {
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    width: 40,
//    height: 40,
//    backgroundColor: colors.white,
//    borderRadius: 20,
//  },
//  counterContainer: {
//    width: "100%",
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "flex-end",
//    alignItems: "center",
//    marginRight: 50,
//  },
//  counter: {
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "center",
//    alignItems: "center",
//    marginBottom: 5,
//  },
//  counterButtonContainer: {
//    display: "flex",
//    width: 30,
//    height: 30,
//    marginLeft: 10,
//    marginRight: 10,
//    justifyContent: "center",
//    alignItems: "center",
//    backgroundColor: colors.muted,
//    borderRadius: 15,
//    elevation: 2,
//  },
//  counterButtonText: {
//    fontSize: 20,
//    fontWeight: "bold",
//    color: colors.white,
//  },
//  counterCountText: {
//    fontSize: 20,
//    fontWeight: "bold",
//  },
//  cartIconContainer: {
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  cartItemCountContainer: {
//    position: "absolute",
//    zIndex: 10,
//    top: -10,
//    left: 10,
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    height: 22,
//    width: 22,
//    backgroundColor: colors.danger,
//    borderRadius: 11,
//  },
//  cartItemCountText: {
//    color: colors.white,
//    fontWeight: "bold",
//    fontSize: 10,
//  },
//});


//
//import {
//  StyleSheet,
//  Image,
//  TouchableOpacity,
//  View,
//  StatusBar,
//  Text,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { Ionicons } from "@expo/vector-icons";
//import cartIcon from "../../assets/icons/cart_beg.png";
//import { colors, network } from "../../constants";
//import CustomButton from "../../components/CustomButton";
//import { useSelector, useDispatch } from "react-redux";
//import { bindActionCreators } from "redux";
//import * as actionCreators from "../../states/actionCreaters/actionCreaters";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import axios from "axios";
//
//const ProductDetailScreen = ({ navigation, route }) => {
//  const { product } = route.params;
//  const cartProduct = useSelector((state) => state.product);
//  const dispatch = useDispatch();
//  const { addCartItem } = bindActionCreators(actionCreators, dispatch);
//
//  const [onWishlist, setOnWishlist] = useState(false);
//  const [availableQuantity, setAvailableQuantity] = useState(product?.stock || 0);
//  const [quantity, setQuantity] = useState(1);
//  const [error, setError] = useState("");
//  const [alertType, setAlertType] = useState("error");
//
//  const handleAddToCart = (item) => {
//    addCartItem(item);
//  };
//
//  const fetchWishlistStatus = async () => {
//    try {
//      const userId = await AsyncStorage.getItem("userid");
//      const token = await AsyncStorage.getItem("authToken");
//      const response = await axios.get(
//        `https://shopflow.onrender.com/user/wishlist/viewWishlist?userId=${userId}`,
//        {
//          headers: {
//            Authorization: `Bearer ${token}`,
//            "Content-Type": "application/json",
//          },
//        }
//      );
//      const wishlist = response.data.data.products;
//      setOnWishlist(wishlist.some((item) => item?.productId === product.id));
//    } catch (error) {
//      console.error("Error fetching wishlist status:", error);
//    }
//  };
//
//  const handleWishlistToggle = async () => {
//    try {
//      const userId = await AsyncStorage.getItem("userid");
//      const token = await AsyncStorage.getItem("authToken");
//      const response = await axios.post(
//        "https://shopflow.onrender.com/user/wishlist/addOrRemoveItem",
//        {},
//        {
//          params: {
//            userId: userId,
//            productId: product.id,
//          },
//          headers: {
//            Authorization: `Bearer ${token}`,
//            "Content-Type": "application/json",
//          },
//        }
//      );
//      setError(response.data.message);
//      setAlertType(response.data.success ? "success" : "error");
//      setOnWishlist(!onWishlist);
//    } catch (error) {
//      console.error("Error toggling wishlist:", error);
//      setError("Failed to update wishlist. Please try again.");
//      setAlertType("error");
//    }
//  };
//
//  useEffect(() => {
//    fetchWishlistStatus();
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <CustomAlert message={error} type={alertType} />
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
//        </TouchableOpacity>
//      </View>
//      <Image
//        source={{ uri: `${network.serverip}/uploads/${product?.image}` }}
//        style={styles.productImage}
//      />
//      <View style={styles.productDetailsContainer}>
//        <Text style={styles.productTitle}>{product?.name}</Text>
//        <Text style={styles.productDescription}>{product?.description}</Text>
//        <Text style={styles.productPrice}>${product?.price}</Text>
//        <View style={styles.actionButtonsContainer}>
//          <CustomButton
//            text={onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//            onPress={handleWishlistToggle}
//            disabled={availableQuantity === 0}
//            style={{
//              backgroundColor: onWishlist ? colors.error : colors.primary,
//            }}
//          />
//          <CustomButton
//            text="Add to Cart"
//            onPress={() => handleAddToCart(product)}
//            disabled={availableQuantity === 0}
//            style={{
//              backgroundColor: availableQuantity > 0 ? colors.success : colors.muted,
//            }}
//          />
//        </View>
//      </View>
//    </View>
//  );
//};
//
//export default ProductDetailScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.light,
//  },
//  topBarContainer: {
//    padding: 20,
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//  },
//  productImage: {
//    width: "100%",
//    height: 300,
//    resizeMode: "cover",
//  },
//  productDetailsContainer: {
//    padding: 20,
//  },
//  productTitle: {
//    fontSize: 24,
//    fontWeight: "bold",
//    color: colors.dark,
//  },
//  productDescription: {
//    fontSize: 16,
//    marginTop: 10,
//    color: colors.muted,
//  },
//  productPrice: {
//    fontSize: 20,
//    fontWeight: "bold",
//    marginTop: 10,
//    color: colors.primary,
//  },
//  actionButtonsContainer: {
//    flexDirection: "row",
//    justifyContent: "space-between",
//    marginTop: 20,
//  },
//});


//....----------------------------
//correecct
//import {
//  StyleSheet,
//  Image,
//  TouchableOpacity,
//  View,
//  StatusBar,
//  Text,
//  ScrollView,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { Ionicons } from "@expo/vector-icons";
//import { colors, network } from "../../constants";
//import CustomButton from "../../components/CustomButton";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import axios from "axios";
//
//const ProductDetailScreen = ({ navigation, route }) => {
//  const { product } = route.params;
//
//  const [onWishlist, setOnWishlist] = useState(false);
//  const [error, setError] = useState("");
//  const [alertType, setAlertType] = useState("error");
//  const [isLoading, setIsLoading] = useState(false);
//
//  // Toggle product in wishlist
//  const handleWishlistToggle = async () => {
//    setIsLoading(true);
//    try {
//      const userId = await AsyncStorage.getItem("userid");
//      const token = await AsyncStorage.getItem("authToken");
//
//      const response = await axios.post(
//        "https://shopflow.onrender.com/user/wishlist/addOrRemoveItem",
//        {},
//        {
//          params: { userId, productId: product.id },
//          headers: {
//            Authorization: `Bearer ${token}`,
//            "Content-Type": "application/json",
//          },
//        }
//      );
//
//      if (response.status===200) {
//        setError(response.data.message);
//        setAlertType("success");
//        setOnWishlist((prevState) => !prevState); // Toggle wishlist state
//      } else {
//        setError(response.data.message || "Failed to update wishlist.");
//        setAlertType("error");
//      }
//    } catch (error) {
//      console.error("Wishlist update error:", error);
//      setError("Failed to update wishlist. Please try again.");
//      setAlertType("error");
//    } finally {
//      setIsLoading(false);
//    }
//  };
//
//  // Add product to cart (placeholder logic)
//  const handleAddToCart = async () => {
//    console.log("Add to Cart: ", product);
//    setError("Add to cart functionality is not yet implemented.");
//    setAlertType("error");
//  };
//
//  // Fetch initial wishlist status
//  useEffect(() => {
//    const fetchWishlistStatus = async () => {
//      try {
//        const userId = await AsyncStorage.getItem("userid");
//        const token = await AsyncStorage.getItem("authToken");
//
//        const response = await axios.get(
//          `https://shopflow.onrender.com/user/wishlist/viewWishlist?userId=${userId}`,
//          {
//            headers: {
//              Authorization: `Bearer ${token}`,
//              "Content-Type": "application/json",
//            },
//          }
//        );
//
//        const isOnWishlist = response.data.data?.products?.some(
//          (item) => item.productId === product.id
//        );
//        setOnWishlist(isOnWishlist || false);
//      } catch (error) {
//        console.error("Failed to fetch wishlist status:", error);
//      }
//    };
//
//    fetchWishlistStatus();
//  }, [product.id]);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      {/* Top Navigation Bar */}
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
//        </TouchableOpacity>
//        <View />
//        <TouchableOpacity onPress={handleWishlistToggle} disabled={isLoading}>
//          <Ionicons
//            name={onWishlist ? "heart" : "heart-outline"}
//            size={30}
//            color={onWishlist ? colors.primary : colors.muted}
//          />
//        </TouchableOpacity>
//      </View>
//
//      {/* Product Details */}
//      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
//        <View style={styles.productImageContainer}>
//          <Image
//            source={{ uri: `${network.serverip}/uploads/${product.image}` }}
//            style={styles.productImage}
//          />
//        </View>
//        <View style={styles.productDetailsContainer}>
//          <Text style={styles.productTitle}>{product.name}</Text>
//          <Text style={styles.productDescription}>{product.description}</Text>
//          <View style={styles.priceContainer}>
//            <Text style={styles.discountedPrice}>${product.totalPrice}</Text>
//            <Text style={styles.originalPrice}>${product.actualPrice}</Text>
//          </View>
//        </View>
//
//        {/* Alert */}
//        {error ? <CustomAlert message={error} type={alertType} /> : null}
//
//        {/* Add to Cart Button */}
//        <View style={styles.buttonContainer}>
//          <CustomButton
//            label="Add to Cart"
//            onPress={handleAddToCart}
//            style={styles.addToCartButton}
//          />
//        </View>
//      </ScrollView>
//    </View>
//  );
//};
//
//export default ProductDetailScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.light,
//  },
//  topBarContainer: {
//    width: "100%",
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//    padding: 20,
//  },
//  scrollView: {
//    flex: 1,
//    padding: 20,
//  },
//  productImageContainer: {
//    width: "100%",
//    alignItems: "center",
//    marginBottom: 20,
//  },
//  productImage: {
//    width: "90%",
//    height: 300,
//    resizeMode: "contain",
//    borderRadius: 10,
//  },
//  productDetailsContainer: {
//    padding: 20,
//    backgroundColor: colors.white,
//    borderRadius: 10,
//    marginBottom: 20,
//  },
//  productTitle: {
//    fontSize: 24,
//    fontWeight: "bold",
//    color: colors.dark,
//  },
//  productDescription: {
//    fontSize: 16,
//    color: colors.muted,
//    marginTop: 10,
//  },
//  priceContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//    marginTop: 20,
//  },
//  discountedPrice: {
//    fontSize: 20,
//    fontWeight: "bold",
//    color: colors.primary,
//    marginRight: 10,
//  },
//  originalPrice: {
//    fontSize: 16,
//    textDecorationLine: "line-through",
//    color: colors.muted,
//  },
//  buttonContainer: {
//    marginTop: 20,
//    alignItems: "center",
//  },
//  addToCartButton: {
//    width: "100%",
//  },
//});




import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors, network } from "../../constants";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import axios from "axios";

const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;

  const [onWishlist, setOnWishlist] = useState(false);
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
console.log(product)
  const handleWishlistToggle = async () => {
    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userid");
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.post(
        "https://shopflow-1.onrender.com/user/wishlist/addOrRemoveItem",
        {},
        {
          params: { userId, productId: product.id },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setError(response.data.message);
        setAlertType("success");
        setOnWishlist((prevState) => !prevState);
      } else {
        setError(response.data.message || "Failed to update wishlist.");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Wishlist update error:", error);
      setError("Failed to update wishlist. Please try again.");
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const createItemsArray = () => {
    return [
      {
        productId: product.id,
        quantity: 1, // Default quantity
      },
    ];
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userid");
      const token = await AsyncStorage.getItem("authToken");

      const items = createItemsArray();
      console.log(items, userId, token,product.id);

      const response = await axios.post(
        'https://shopflow-1.onrender.com/user/order/createOrder',
        {
          userId: Number(userId),
          items: [
            {
              productId: Number(product.id),
              quantity: 1,
            },
          ],
        }
      );


      console.log("Response:", response.data); // Log response for debugging

      if (response.status === 201) {
        navigation.navigate("checkout", { order: response.data.order });
      } else {
        setError(response.data.message || "Failed to place order.");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Order placement error:", error.response || error);

      if (error.response) {
        setError(`Error: ${error.response.data.message || 'Failed to place order.'}`);
      } else {
        setError("Failed to place order. Please try again.");
      }
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem("userid");
        const token = await AsyncStorage.getItem("authToken");

        const response = await axios.get(
          `https://shopflow-1.onrender.com/user/wishlist/viewWishlist?userId=${userId}`,
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

    fetchWishlistStatus();
  }, [product.id]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
        </TouchableOpacity>
        <View />
        <TouchableOpacity onPress={handleWishlistToggle} disabled={isLoading}>
          <Ionicons
            name={onWishlist ? "heart" : "heart-outline"}
            size={30}
            color={onWishlist ? colors.primary : colors.muted}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.productImageContainer}>
          <Image
            source={{uri:product.image}}
            style={styles.productImage}
          />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>${product.totalPrice}</Text>
            <Text style={styles.originalPrice}>${product.actualPrice}</Text>
          </View>
        </View>

        {error ? <CustomAlert message={error} type={alertType} /> : null}

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Buy Now"
            onPress={handleBuyNow}
            style={styles.buyNowButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

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
    padding: 20,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  productImageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: "90%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
  productDetailsContainer: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark || "#000",
  },
  productDescription: {
    fontSize: 16,
    color: colors.muted || "#555",
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: colors.muted,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  buyNowButton: {
    width: "100%",
    backgroundColor: colors.success,
  },
});
