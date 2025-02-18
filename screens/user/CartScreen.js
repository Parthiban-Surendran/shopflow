import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
  Alert,
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
import EncryptedStorage from 'react-native-encrypted-storage';
import { fetchCart } from "../../states/actionCreaters/actionCreaters";
import axios from "axios"

const CartScreen = ({ navigation }) => {
  const cartproduct = useSelector((state) => state.product||[]);
    const dispatch = useDispatch();
    const [isLoggedIn,setIsLoggedIn]=useState("false")
    const [userid,setUserId] = useState(null)

  useEffect(() => {

    const fetchUserData = async () => {
      try {
       const isLoggedIn = await EncryptedStorage.getItem("isLoggedIn")
     setIsLoggedIn(isLoggedIn === "true" ? "true" : "false");
        setUserId(userid)
        const userid = await EncryptedStorage.getItem("userid");
        setUserId(userid)

        const token = await EncryptedStorage.getItem("authToken")
        if (userid) {
          dispatch(fetchCart(userid));

        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [dispatch]);


  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } =
    bindActionCreators(actionCreaters, dispatch);

  const deleteItem = (id) => {
  console.log("Enter")
    removeCartItem(id);
  };
  const increaseQuantity = (id) => {

      increaseCartItemQuantity(id);
       setRefresh(!refresh);

  };

  const decreaseQuantity = (id) => {
      decreaseCartItemQuantity(id)
//      dispatch(fetchCart(userid))
      setRefresh(!refresh);
  };

  useEffect(()=>{

  const fetchdetail = async() =>{
    const f = await EncryptedStorage.getItem("isLoggedIn")
  }
  fetchdetail();
  },[])

  //calcute and the set the total price whenever the value of carproduct change
  useEffect(() => {
    if (isLoggedIn==="true") {
      // Calculate total price for logged-in users
      setTotalPrice(
        cartproduct.reduce((accumulator, object) => {
          return accumulator + object.product?.offerPrice * object.quantity;
        }, 0)
      );
    } else {
      // Calculate total price for not-logged-in users (if different logic is needed)
      setTotalPrice(
        cartproduct.reduce((accumulator, object) => {
return accumulator + object?.offerPrice * object.quantity;        }, 0)
      );
    }
  }, [cartproduct, refresh,isLoggedIn]);
const createItemsArray = () => {
    const items = cartproduct?.map(product => ({
            productId: Number(product.product.id),
            quantity: Number(product.quantity),
          }));
          return items
  };

  const placeOrder = async () => {
      if(!isLoggedIn){
      navigation.replace("checkout",{ });

      return
   }
    try {
          const userId = await EncryptedStorage.getItem("userid");
          const token = await EncryptedStorage.getItem("authToken");
      const items = createItemsArray();

          const response = await axios.post(
            `${network.serverip}/user/order/createOrder?userId=${userId}`,
            {
              items:items,
            },{
                        headers: {
                          'Authorization': `Bearer ${token}`,
                        },
             }
          );


          if (response.status === 201) {
            navigation.navigate("addressscreen",{orders:response?.data?.data,fromCart:true});
          } else {
            console.log(response.data.message || "Failed to place order.");
          }
        } catch (error) {
 navigation.navigate("login", { fromScreen: "cart" });
          console.log("Order placement error:", error.response || error);
        }
  };
  console.log("Cart:klklk",cartproduct,isLoggedIn)

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
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.cartInfoTopBar}>
            <Text style={{color:colors.primary,fontWeight:"800",fontSize:20}}>Your Cart</Text>
            <Text style={{color:colors.primary,fontSize:18}}>{cartproduct.length} Items</Text>
          </View>
        </View>

        <View></View>
        <TouchableOpacity onPress={navigation.navigate("cart")}>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      {cartproduct.length === 0 ? (
        <View style={styles.cartProductListContainerEmpty}>

          <Text style={styles.secondaryTextSmItalic}>"Cart is empty"</Text>
        </View>
      ) : (
        <ScrollView style={styles.cartProductListContiainer}>
        {isLoggedIn==="true" ? (
          cartproduct?.map((item, index) => (
            <CartProductList
              key={index}
              index={index}
              image={item.product?.image}
              title={item.product?.name }
              price={Math.ceil(item.product?.offerPrice).toFixed(2) || "0"}
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
              image={item.image}
              title={item.title }
              price={Math.ceil(item.offerPrice) || "0"}
              quantity={item.quantity }
              onPressIncrement={() => {
                increaseQuantity(item.id);
              }}
              onPressDecrement={() => {
                decreaseQuantity(item.id);
              }}
              handleDelete={() => {

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
            <Text style={styles.cartBottomSecondaryText}>{Math.ceil(totalPrice).toFixed(2)}$</Text>
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
    backgroundColor:"#111827"
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cartProductListContiainer: { width: "100%" },
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
