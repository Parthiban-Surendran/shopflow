import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg_active.png";
import { colors, network } from "../../constants";
import CartProductList from "../../components/CartProductList/CartProductList";
import CustomButton from "../../components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCart } from "../../states/actionCreaters/actionCreaters";
import axios from "axios"

const CartScreen = ({ navigation }) => {
  const cartproduct = useSelector((state) => state.product||[]);
    const dispatch = useDispatch();
    const [isLoggedIn,setIsLoggedIn]=useState("false")

  useEffect(() => {

    const fetchUserData = async () => {
      try {
       const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
     setIsLoggedIn(isLoggedIn === "true" ? "true" : "false");  // Make sure to set the correct value

        const userid = await AsyncStorage.getItem("userid");
        const token = await AsyncStorage.getItem("authToken")
        console.log(token)
        if (userid) {
          dispatch(fetchCart(userid)); // Ensure the dispatch is called only when userid is available

        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [dispatch]);


  console.log("CartScreen",cartproduct)
  console.log("ippo Paakalam",isLoggedIn)
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } =
    bindActionCreators(actionCreaters, dispatch);

  //method to remove the item from (cart) redux
  const deleteItem = (id) => {
    removeCartItem(id);
  };

  //method to increase tidhe quantity of the item in(cart) redux
  const increaseQuantity = (id) => {

console.log("CArt id:",id)
      increaseCartItemQuantity(id);
      console.log("hello inc")
       setRefresh(!refresh);

  };

  //method to decrease the quantity of the item in(cart) redux
  const decreaseQuantity = (id) => {
  console.log("hello")

      decreaseCartItemQuantity(id);
      setRefresh(!refresh);

  };

  useEffect(()=>{
  const fetchdetail = async() =>{
    const f = await AsyncStorage.getItem("isLoggedIn")
    console.log("ippo cart la",f)
  }
  fetchdetail();
  },[])

  //calcute and the set the total price whenever the value of carproduct change
  useEffect(() => {
  console.log("ennoda peru",isLoggedIn)

    if (isLoggedIn==="true") {
      // Calculate total price for logged-in users
      setTotalPrice(
        cartproduct.reduce((accumulator, object) => {
          console.log("Loggedx In:", object);
          return accumulator + object.product?.actualPrice * object.quantity;
        }, 0)
      );
    } else {
      // Calculate total price for not-logged-in users (if different logic is needed)
      setTotalPrice(
        cartproduct.reduce((accumulator, object) => {
          console.log("Not Logged In:", object);
          return accumulator + object.totalPrice;
        }, 0)
      );
    }
  }, [cartproduct, refresh,isLoggedIn]);
const createItemsArray = () => {
    const items = cartproduct?.map(product => ({
            productId: Number(product.id),
            quantity: Number(product.quantity),
          }));
          return items
  };

  const placeOrder = async () => {
    try {
          const userId = await AsyncStorage.getItem("userid");
          const token = await AsyncStorage.getItem("authToken");
      const items = createItemsArray();

          console.log("Hello all", userId, cartproduct,items);

          const response = await axios.post(
            'https://shopflow-1.onrender.com/user/order/createOrder',
            {
              userId: Number(userId),
              items:items,
            }
          );


          console.log("Response:", response.data); // Log response for debugging
          if (response.status === 201) {
            navigation.navigate("checkout",{ order:response.data.order });
          } else {
            console.log(response.data.message || "Failed to place order.");
          }
        } catch (error) {
          console.error("Order placement error:", error.response || error);


        }
  };




  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <View style={styles.cartInfoContainerTopBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={colors.muted}
            />
          </TouchableOpacity>
          <View style={styles.cartInfoTopBar}>
            <Text>Your Cart</Text>
            <Text>{cartproduct.length} Items</Text>
          </View>
        </View>

        <View></View>
        <TouchableOpacity>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      {cartproduct.length === 0 ? (
        <View style={styles.cartProductListContainerEmpty}>
          {/* <Image
            source={CartEmpty}
            style={{ height: 400, resizeMode: "contain" }}
          /> */}
          <Text style={styles.secondaryTextSmItalic}>"Cart is empty"</Text>
        </View>
      ) : (
        <ScrollView style={styles.cartProductListContiainer}>
        {isLoggedIn==="true" ? (
          cartproduct?.map((item, index) => (
            <CartProductList
              key={index}
              index={index}
              image={item.product.image}
              title={item.product?.name }
              price={item.product?.actualPrice.toFixed(2) || "0"}
              quantity={item.quantity }
              onPressIncrement={() => {
                increaseQuantity(item.product?.id);
              }}
              onPressDecrement={() => {
                decreaseQuantity(item.product?.id);
              }}
              handleDelete={() => {
                console.log("Cart Screen:", item.product?.id);
                deleteItem(item.product?.id);
              }}
            />
          ))
        ) : (
          cartproduct?.map((item, index) => (
            <CartProductList
              key={index}
              index={index}
              image={`${network.serverip}/uploads/${item.image}`}
              title={item.title }
              price={item.totalPrice || "0"}
              quantity={item.quantity }
              onPressIncrement={() => {
                increaseQuantity(item.id);
              }}
              onPressDecrement={() => {
                decreaseQuantity(item.id);
              }}
              handleDelete={() => {
                console.log("Delete panniten:", item);

                deleteItem(item.id);
              }}
            />
          ))
        )}

          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
      <View style={styles.cartBottomContainer}>
        <View style={styles.cartBottomLeftContainer}>
          <View style={styles.IconContainer}>
            <MaterialIcons
              name="featured-play-list"
              size={24}
              color={colors.primary}
            />
          </View>
          <View>
            <Text style={styles.cartBottomPrimaryText}>Total</Text>
            <Text style={styles.cartBottomSecondaryText}>{totalPrice}$</Text>
          </View>
        </View>
        <View style={styles.cartBottomRightContainer}>
          {cartproduct.length > 0 ? (
            <CustomButton
                          text={"Checkout"}
                          onPress={async () => {
                            if (cartproduct.length > 0) {
                              await placeOrder(); // Place the order
                            } else {
                              console.log("Cart is empty!");
                            }
                          }}
                        />
          ) : (
            <CustomButton
                          text={"Checkout"}
                          disabled={true}
                          onPress={() => navigation.navigate("checkout")}
                        />
                      )}
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cartProductListContiainer: { width: "100%", padding: 20 },
  cartProductListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
  cartBottomContainer: {
    width: "100%",
    height: 120,
    display: "flex",
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cartBottomLeftContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    height: "100%",
  },
  cartBottomRightContainer: {
    padding: 30,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    height: "100%",
  },
  cartBottomPrimaryText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cartBottomSecondaryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  cartInfoContainerTopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cartInfoTopBar: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 5,
  },
});



//
//import {
//  StyleSheet,
//  Image,
//  TouchableOpacity,
//  View,
//  StatusBar,
//  Text,
//  ScrollView,
//} from "react-native";
//import React, { useEffect, useState } from "react";
//import { Ionicons } from "@expo/vector-icons";
//import cartIcon from "../../assets/icons/cart_beg_active.png";
//import { colors, network } from "../../constants";
//import CartProductList from "../../components/CartProductList/CartProductList";
//import CustomButton from "../../components/CustomButton";
//import { MaterialIcons } from "@expo/vector-icons";
//import { useSelector, useDispatch } from "react-redux";
//import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
//import { bindActionCreators } from "redux";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { fetchCart } from "../../states/actionCreaters/actionCreaters";
//
//const CartScreen = ({ navigation }) => {
//  const cartproduct = useSelector((state) => state.product || []);
//  const dispatch = useDispatch();
//  const [isLoggedIn, setIsLoggedIn] = useState("false");
//
//  useEffect(() => {
//    const fetchUserData = async () => {
//      try {
//        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
//        setIsLoggedIn(isLoggedIn === "true" ? "true" : "false"); // Ensure to set the correct value
//
//        const userid = await AsyncStorage.getItem("userid");
//        const token = await AsyncStorage.getItem("authToken");
//        console.log(token);
//        if (userid) {
//          dispatch(fetchCart(userid)); // Ensure the dispatch is called only when userid is available
//        }
//      } catch (error) {
//        console.error("Error fetching user data:", error);
//      }
//    };
//    fetchUserData();
//  }, [dispatch]);
//
//  console.log("CartScreen", cartproduct);
//  console.log("ippo Paakalam", isLoggedIn);
//  const [totalPrice, setTotalPrice] = useState(0);
//  const [refresh, setRefresh] = useState(false);
//
//  const { removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } =
//    bindActionCreators(actionCreaters, dispatch);
//
//  //method to remove the item from (cart) redux
//  const deleteItem = (id) => {
//    removeCartItem(id);
//  };
//
//  //method to increase the quantity of the item in (cart) redux
//  const increaseQuantity = (id) => {
//    console.log("Cart id:", id);
//    increaseCartItemQuantity(id);
//    console.log("hello inc");
//    setRefresh(!refresh);
//  };
//
//  //method to decrease the quantity of the item in (cart) redux
//  const decreaseQuantity = (id) => {
//    console.log("hello");
//    decreaseCartItemQuantity(id);
//    setRefresh(!refresh);
//  };
//
//  useEffect(() => {
//    const fetchdetail = async () => {
//      const f = await AsyncStorage.getItem("isLoggedIn");
//      console.log("ippo cart la", f);
//    };
//    fetchdetail();
//  }, []);
//
//  // Calculate and set the total price whenever the value of cartproduct changes
//  useEffect(() => {
//    console.log("ennoda peru", isLoggedIn);
//
//    if (isLoggedIn === "true") {
//      // Calculate total price for logged-in users
//      setTotalPrice(
//        cartproduct.reduce((accumulator, object) => {
//          console.log("Logged In:", object);
//          return accumulator + object.product?.actualPrice * object.quantity;
//        }, 0)
//      );
//    } else {
//      // Calculate total price for not-logged-in users (if different logic is needed)
//      setTotalPrice(
//        cartproduct.reduce((accumulator, object) => {
//          console.log("Not Logged In:", object);
//          return accumulator + object.totalPrice;
//        }, 0)
//      );
//    }
//  }, [cartproduct, refresh, isLoggedIn]);
//
//  // Method to place an order
//  const placeOrder = async () => {
//    try {
//          const userId = await AsyncStorage.getItem("userid");
//          const token = await AsyncStorage.getItem("authToken");
//
//          const items = createItemsArray();
//          console.log(items, userId, token,product.id);
//
//          const response = await axios.post(
//            'https://shopflow.onrender.com/user/order/createOrder',
//            {
//              userId: Number(userId),
//              items: [
//                {
//                  productId: Number(product.id),
//                  quantity: 1,
//                },
//              ],
//            }
//          );
//
//
//          console.log("Response:", response.data); // Log response for debugging
//
//          if (response.status === 201) {
//            navigation.navigate("checkout");
//          } else {
//            setError(response.data.message || "Failed to place order.");
//            setAlertType("error");
//          }
//        } catch (error) {
//          console.error("Order placement error:", error.response || error);
//
//          if (error.response) {
//            setError(`Error: ${error.response.data.message || 'Failed to place order.'}`);
//          } else {
//            setError("Failed to place order. Please try again.");
//          }
//          setAlertType("error");
//        } finally {
//          setIsLoading(false);
//        }
//  };
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <View style={styles.topBarContainer}>
//        <View style={styles.cartInfoContainerTopBar}>
//          <TouchableOpacity
//            onPress={() => {
//              navigation.goBack();
//            }}
//          >
//            <Ionicons
//              name="arrow-back-circle-outline"
//              size={30}
//              color={colors.muted}
//            />
//          </TouchableOpacity>
//          <View style={styles.cartInfoTopBar}>
//            <Text>Your Cart</Text>
//            <Text>{cartproduct.length} Items</Text>
//          </View>
//        </View>
//
//        <View />
//        <TouchableOpacity>
//          <Image source={cartIcon} />
//        </TouchableOpacity>
//      </View>
//      {cartproduct.length === 0 ? (
//        <View style={styles.cartProductListContainerEmpty}>
//          <Text style={styles.secondaryTextSmItalic}>"Cart is empty"</Text>
//        </View>
//      ) : (
//        <ScrollView style={styles.cartProductListContiainer}>
//          {isLoggedIn === "true" ? (
//            cartproduct?.map((item, index) => (
//              <CartProductList
//                key={index}
//                index={index}
//                image={`${network.serverip}/uploads/${item.image}`}
//                title={item.product?.name}
//                price={item.product?.actualPrice || "0"}
//                quantity={item.quantity}
//                onPressIncrement={() => {
//                  increaseQuantity(item.product?.id);
//                }}
//                onPressDecrement={() => {
//                  decreaseQuantity(item.product?.id);
//                }}
//                handleDelete={() => {
//                  console.log("Cart Screen:", item.product?.id);
//                  deleteItem(item.product?.id);
//                }}
//              />
//            ))
//          ) : (
//            cartproduct?.map((item, index) => (
//              <CartProductList
//                key={index}
//                index={index}
//                image={`${network.serverip}/uploads/${item.image}`}
//                title={item.title}
//                price={item.totalPrice || "0"}
//                quantity={item.quantity}
//                onPressIncrement={() => {
//                  increaseQuantity(item.id);
//                }}
//                onPressDecrement={() => {
//                  decreaseQuantity(item.id);
//                }}
//                handleDelete={() => {
//                  console.log("Delete panniten:", item);
//                  deleteItem(item.id);
//                }}
//              />
//            ))
//          )}
//
//          <View style={styles.emptyView}></View>
//        </ScrollView>
//      )}
//      <View style={styles.cartBottomContainer}>
//        <View style={styles.cartBottomLeftContainer}>
//          <View style={styles.IconContainer}>
//            <MaterialIcons
//              name="featured-play-list"
//              size={24}
//              color={colors.primary}
//            />
//          </View>
//          <View>
//            <Text style={styles.cartBottomPrimaryText}>Total</Text>
//            <Text style={styles.cartBottomSecondaryText}>{totalPrice}$</Text>
//          </View>
//        </View>
//        <View style={styles.cartBottomRightContainer}>
//          {cartproduct.length > 0 ? (
//            <CustomButton
//              text={"Checkout"}
//              onPress={async () => {
//                if (cartproduct.length > 0) {
//                  await placeOrder(); // Place the order
//                } else {
//                  console.log("Cart is empty!");
//                }
//              }}
//            />
//          ) : (
//            <CustomButton
//              text={"Checkout"}
//              disabled={true}
//              onPress={() => navigation.navigate("checkout")}
//            />
//          )}
//        </View>
//      </View>
//    </View>
//  );
//};
//
//export default CartScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    width: "100%",
//    flexDirection: "row",
//    backgroundColor: colors.light,
//    alignItems: "center",
//    justifyContent: "flex-start",
//    paddingBottom: 0,
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
//  cartProductListContiainer: { width: "100%", padding: 20 },
//  cartProductListContainerEmpty: {
//    width: "100%",
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    flex: 1,
//  },
//  secondaryTextSmItalic: {
//    fontStyle: "italic",
//    fontSize: 15,
//    color: colors.muted,
//  },
//  cartBottomContainer: {
//    width: "100%",
//    height: 120,
//    display: "flex",
//    backgroundColor: colors.light,
//    paddingHorizontal: 20,
//    marginTop: 10,
//    justifyContent: "space-between",
//    flexDirection: "row",
//  },
//  cartBottomLeftContainer: {
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//  },
//  cartBottomRightContainer: {
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "flex-end",
//    marginTop: 10,
//  },
//  cartBottomPrimaryText: {
//    fontSize: 20,
//    color: colors.primary,
//    fontWeight: "bold",
//  },
//  cartBottomSecondaryText: {
//    fontSize: 16,
//    color: colors.muted,
//  },
//  IconContainer: {
//    marginRight: 10,
//  },
//  emptyView: {
//    width: "100%",
//    height: 10,
//  },
//});
