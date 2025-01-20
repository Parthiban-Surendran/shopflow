//import {
//  StyleSheet,
//  StatusBar,
//  View,
//  TouchableOpacity,
//  Text,
//  ScrollView,
//  Modal,
//} from "react-native";
//import { Ionicons } from "@expo/vector-icons";
//import React, { useState, useEffect } from "react";
//import BasicProductList from "../../components/BasicProductList/BasicProductList";
//import { colors, network } from "../../constants";
//import CustomButton from "../../components/CustomButton";
//import { useSelector, useDispatch } from "react-redux";
//import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
//import { bindActionCreators } from "redux";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import CustomInput from "../../components/CustomInput";
//import ProgressDialog from "react-native-progress-dialog";
//
//const CheckoutScreen = ({ navigation, route }) => {
//  const [modalVisible, setModalVisible] = useState(false);
//  const [isloading, setIsloading] = useState(false);
//  const cartproduct = useSelector((state) => state.product);
//  const dispatch = useDispatch();
//  const { emptyCart } = bindActionCreators(actionCreaters, dispatch);
//
//  const [deliveryCost, setDeliveryCost] = useState(0);
//  const [totalCost, setTotalCost] = useState(0);
//  const [address, setAddress] = useState("");
//  const [country, setCountry] = useState("");
//  const [city, setCity] = useState("");
//  const [streetAddress, setStreetAddress] = useState("");
//  const [zipcode, setZipcode] = useState("");
//  const [ddata,setdata] = useState("")
//
//  //method to remove the authUser from aysnc storage and navigate to login
//
//  //method to handle checkout
//  const fetchdata = async()=>
//  {
//  const y = await AsyncStorage.getItem("user")
//  setdata(y)
//  }
//  const handleCheckout = async () => {
//    setIsloading(true);
//    var myHeaders = new Headers();
//    const value = await AsyncStorage.getItem("authUser");
//    let user = JSON.parse(value);
//    console.log("Checkout:", user.token);
//
//    myHeaders.append("x-auth-token", user.token);
//    myHeaders.append("Content-Type", "application/json");
//
//    var payload = [];
//    var totalamount = 0;
//
//    // fetch the cart items from redux and set the total cost
//    cartproduct.forEach((product) => {
//    console.log("ullA:",product)
//      let obj = {
//        productId: product.id,
//        price: product.totalPrice,
//        quantity: product.quantity,
//      };
//      totalamount += parseInt(product.product.actualPrice) * parseInt(product.quantity);
//      payload.push(obj);
//    });
//    console.log(totalamount)
//
//    var raw = JSON.stringify({
//      items: payload,
//      amount: totalamount,
//      discount: 0,
//      payment_type: "cod",
//      country: country,
//      status: "pending",
//      city: city,
//      zipcode: zipcode,
//      shippingAddress: streetAddress,
//    });
//
//    var requestOptions = {
//      method: "POST",
//      headers: myHeaders,
//      body: raw,
//      redirect: "follow",
//    };
//
//    fetch(network.serverip + "/checkout", requestOptions) //API call
//      .then((response) => response.json())
//      .then((result) => {
//        console.log("Checkout=>", result);
//        if (result.err === "jwt expired") {
//          setIsloading(false);
//          logout();
//        }
//        if (result.success == true) {
//          setIsloading(false);
//          emptyCart("empty");
//          navigation.replace("orderconfirm");
//        }
//      })
//      .catch((error) => {
//        setIsloading(false);
//        console.log("error", error);
//      });
//  };
//  // set the address and total cost on initital render
//  console.log("poitu:",cartproduct)
//  useEffect(() => {
//    if (streetAddress && city && country != "") {
//      setAddress(`${streetAddress}, ${city},${country}`);
//    } else {
//      setAddress("");
//    }
//    setTotalCost(
//      cartproduct.reduce((accumulator, object) => {
//        return accumulator + object.product.actualPrice * object.quantity;
//      }, 0)
//    );
//        fetchdata();
//
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar></StatusBar>
//      <ProgressDialog visible={isloading} label={"Placing Order..."} />
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
//        <View></View>
//        <View></View>
//      </View>
//      <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
//        <Text style={styles.primaryText}>Order Summary</Text>
//        <ScrollView
//          style={styles.orderSummaryContainer}
//          nestedScrollEnabled={true}
//        >
//          {cartproduct.map((product, index) => (
//            <BasicProductList
//              key={index}
//              title={product.product.name}
//              price={product.totalPrice}
//              quantity={product.quantity}
//            />
//          ))}
//        </ScrollView>
//        <Text style={styles.primaryText}>Total</Text>
//        <View style={styles.totalOrderInfoContainer}>
//          <View style={styles.list}>
//            <Text>Order</Text>
//            <Text>{totalCost}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text>Delivery</Text>
//            <Text>{deliveryCost}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text style={styles.primaryTextSm}>Total</Text>
//            <Text style={styles.secondaryTextSm}>
//              {totalCost + deliveryCost}$
//            </Text>
//          </View>
//        </View>
//        <Text style={styles.primaryText}>Contact</Text>
//        <View style={styles.listContainer}>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Email</Text>
//            <Text style={styles.secondaryTextSm}>
//              {ddata}
//            </Text>
//          </View>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Phone</Text>
//            <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
//          </View>
//        </View>
//        <Text style={styles.primaryText}>Address</Text>
//        <View style={styles.listContainer}>
//          <TouchableOpacity
//            style={styles.list}
//            onPress={() => setModalVisible(true)}
//          >
//            <Text style={styles.secondaryTextSm}>Address</Text>
//            <View>
//              {country || city || streetAddress != "" ? (
//                <Text
//                  style={styles.secondaryTextSm}
//                  numberOfLines={1}
//                  ellipsizeMode="tail"
//                >
//                  {address.length < 25
//                    ? `${address}`
//                    : `${address.substring(0, 25)}...`}
//                </Text>
//              ) : (
//                <Text style={styles.primaryTextSm}>Add</Text>
//              )}
//            </View>
//          </TouchableOpacity>
//        </View>
//        <Text style={styles.primaryText}>Payment</Text>
//        <View style={styles.listContainer}>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Method</Text>
//            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
//          </View>
//        </View>
//
//        <View style={styles.emptyView}></View>
//      </ScrollView>
//      <View style={styles.buttomContainer}>
//        {country && city && streetAddress != "" ? (
//          <CustomButton
//            text={"Submit Order"}
//            // onPress={() => navigation.replace("orderconfirm")}
//            onPress={() => {
//              handleCheckout();
//            }}
//          />
//        ) : (
//          <CustomButton text={"Submit Order"} disabled />
//        )}
//      </View>
//      <Modal
//        animationType="slide"
//        transparent={true}
//        visible={modalVisible}
//        onRequestClose={() => {
//          setModalVisible(!modalVisible);
//        }}
//      >
//        <View style={styles.modelBody}>
//          <View style={styles.modelAddressContainer}>
//            <CustomInput
//              value={country}
//              setValue={setCountry}
//              placeholder={"Enter Country"}
//            />
//            <CustomInput
//              value={city}
//              setValue={setCity}
//              placeholder={"Enter City"}
//            />
//            <CustomInput
//              value={streetAddress}
//              setValue={setStreetAddress}
//              placeholder={"Enter Street Address"}
//            />
//            <CustomInput
//              value={zipcode}
//              setValue={setZipcode}
//              placeholder={"Enter ZipCode"}
//              keyboardType={"number-pad"}
//            />
//            {streetAddress || city || country != "" ? (
//              <CustomButton
//                onPress={() => {
//                  setModalVisible(!modalVisible);
//                  setAddress(`${streetAddress}, ${city},${country}`);
//                }}
//                text={"save"}
//              />
//            ) : (
//              <CustomButton
//                onPress={() => {
//                  setModalVisible(!modalVisible);
//                }}
//                text={"close"}
//              />
//            )}
//          </View>
//        </View>
//      </Modal>
//    </View>
//  );
//};
//
//export default CheckoutScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    width: "100%",
//    flexDirecion: "row",
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
//  toBarText: {
//    fontSize: 15,
//    fontWeight: "600",
//  },
//  bodyContainer: {
//    flex: 1,
//    paddingLeft: 20,
//    paddingRight: 20,
//  },
//  orderSummaryContainer: {
//    backgroundColor: colors.white,
//    borderRadius: 10,
//    padding: 10,
//    maxHeight: 220,
//  },
//  totalOrderInfoContainer: {
//    borderRadius: 10,
//    padding: 10,
//    backgroundColor: colors.white,
//  },
//  primaryText: {
//    marginBottom: 5,
//    marginTop: 5,
//    fontSize: 20,
//    fontWeight: "bold",
//  },
//  list: {
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//
//    backgroundColor: colors.white,
//    height: 50,
//    borderBottomWidth: 1,
//    borderBottomColor: colors.light,
//    padding: 10,
//  },
//  primaryTextSm: {
//    fontSize: 15,
//    fontWeight: "bold",
//    color: colors.primary,
//  },
//  secondaryTextSm: {
//    fontSize: 15,
//    fontWeight: "bold",
//  },
//  listContainer: {
//    backgroundColor: colors.white,
//    borderRadius: 10,
//    padding: 10,
//  },
//  buttomContainer: {
//    width: "100%",
//    padding: 20,
//    paddingLeft: 30,
//    paddingRight: 30,
//  },
//  emptyView: {
//    width: "100%",
//    height: 20,
//  },
//  modelBody: {
//    flex: 1,
//    display: "flex",
//    flexL: "column",
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  modelAddressContainer: {
//    display: "flex",
//    flexDirection: "column",
//    justifyContent: "center",
//    alignItems: "center",
//    padding: 20,
//    width: 320,
//    height: 400,
//    backgroundColor: colors.white,
//    borderRadius: 20,
//    elevation: 3,
//  },
//});


//
//import React, { useState, useEffect } from "react";
//import {
//  StyleSheet,
//  StatusBar,
//  View,
//  TouchableOpacity,
//  Text,
//  ScrollView,
//  Modal,
//} from "react-native";
//import { Ionicons } from "@expo/vector-icons";
//import { useSelector, useDispatch } from "react-redux";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { bindActionCreators } from "redux";
//import * as actionCreators from "../../states/actionCreaters/actionCreaters";
//import BasicProductList from "../../components/BasicProductList/BasicProductList";
//import CustomButton from "../../components/CustomButton";
//import CustomInput from "../../components/CustomInput";
//import ProgressDialog from "react-native-progress-dialog";
//import { colors, network } from "../../constants";
//import axios from "axios";
//
//const CheckoutScreen = ({ navigation }) => {
//  const [modalVisible, setModalVisible] = useState(false);
//  const [isLoading, setIsLoading] = useState(false);
//  const [deliveryCost, setDeliveryCost] = useState(0);
//  const [totalCost, setTotalCost] = useState(0);
//  const [address, setAddress] = useState("");
//  const [country, setCountry] = useState("");
//  const [city, setCity] = useState("");
//  const [streetAddress, setStreetAddress] = useState("");
//  const [zipcode, setZipcode] = useState("");
//  const [userData, setUserData] = useState(null);
//
//  const cartProduct = useSelector((state) => state.product || []);
//  const dispatch = useDispatch();
//  const { emptyCart } = bindActionCreators(actionCreators, dispatch);
//
//  // Fetch user data on mount
//  useEffect(() => {
//    const fetchUserData = async () => {
//      const user = await AsyncStorage.getItem("user");
//      setUserData(user ? JSON.parse(user) : null);
//    };
//    fetchUserData();
//  }, []);
//
//  // Update address and total cost whenever relevant state changes
//  useEffect(() => {
//    if (streetAddress && city && country) {
//      setAddress(`${streetAddress}, ${city}, ${country}`);
//    } else {
//      setAddress("");
//    }
//
//    const calculatedTotalCost = cartProduct.reduce(
//      (acc, product) => acc + product.product.actualPrice * product.quantity,
//      0
//    );
//    setTotalCost(calculatedTotalCost);
//  }, [streetAddress, city, country, cartProduct]);
//
//  const handleCheckout = async () => {
//    setIsLoading(true);
//    try {
//      const authData = await AsyncStorage.getItem("authUser");
//      console.log(authData)
//      const token = await AsyncStorage.getItem("authToken")
//      const user = authData ? JSON.parse(authData) : null;
//
//      if (!user || !token) {
//        console.error("User not authenticated");
//        setIsLoading(false);
//        return;
//      }
//
//const userId = await AsyncStorage.getItem("userid")
//console.log("mela:",cartProduct)
//const items = cartProduct.map(cartItem => ({
//        productId: cartItem.id,
//        quantity: cartItem.quantity,
//      }));
//
//console.log(userId,items,token)
//       const response = await axios.post("https://shopflow.onrender.com/user/order/createOrder", {
//            userId,
//            items,
//          });
//          console.log("hello response",response);
//
//      const result = await response.json();
//
//      if (result.err === "jwt expired") {
//        setIsLoading(false);
//        console.warn("Session expired, logging out...");
//        logout();
//        return;
//      }
//
//      if (result.success) {
//        setIsLoading(false);
//        emptyCart();
//        navigation.replace("orderconfirm");
//      } else {
//        console.error("Checkout failed:", result.message);
//        setIsLoading(false);
//      }
//    } catch (error) {
//      console.error("Checkout error:", error);
//      setIsLoading(false);
//    }
//  };
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <ProgressDialog visible={isLoading} label={"Placing Order..."} />
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//          <Ionicons
//            name="arrow-back-circle-outline"
//            size={30}
//            color={colors.muted}
//          />
//        </TouchableOpacity>
//      </View>
//      <ScrollView style={styles.bodyContainer}>
//        <Text style={styles.primaryText}>Order Summary</Text>
//        <ScrollView style={styles.orderSummaryContainer} nestedScrollEnabled>
//          {cartProduct.map((product, index) => (
//            <BasicProductList
//              key={index}
//              title={product.product.name}
//              price={product.totalPrice}
//              quantity={product.quantity}
//            />
//          ))}
//        </ScrollView>
//        <Text style={styles.primaryText}>Total</Text>
//        <View style={styles.totalOrderInfoContainer}>
//          <View style={styles.list}>
//            <Text>Order</Text>
//            <Text>{totalCost}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text>Delivery</Text>
//            <Text>{deliveryCost}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text style={styles.primaryTextSm}>Total</Text>
//            <Text style={styles.secondaryTextSm}>
//              {totalCost + deliveryCost}$
//            </Text>
//          </View>
//        </View>
//        <Text style={styles.primaryText}>Contact</Text>
//        <View style={styles.listContainer}>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Email</Text>
//            <Text style={styles.secondaryTextSm}>
//              {userData?.email || "N/A"}
//            </Text>
//          </View>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Phone</Text>
//            <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
//          </View>
//        </View>
//        <Text style={styles.primaryText}>Address</Text>
//        <View style={styles.listContainer}>
//          <TouchableOpacity
//            style={styles.list}
//            onPress={() => setModalVisible(true)}
//          >
//            <Text style={styles.secondaryTextSm}>Address</Text>
//            <Text
//              style={styles.secondaryTextSm}
//              numberOfLines={1}
//              ellipsizeMode="tail"
//            >
//              {address || "Add"}
//            </Text>
//          </TouchableOpacity>
//        </View>
//        <Text style={styles.primaryText}>Payment</Text>
//        <View style={styles.listContainer}>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Method</Text>
//            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
//          </View>
//        </View>
//        <View style={styles.emptyView}></View>
//      </ScrollView>
//      <View style={styles.bottomContainer}>
//        {country && city && streetAddress ? (
//          <CustomButton text={"Submit Order"} onPress={handleCheckout} />
//        ) : (
//          <CustomButton text={"Submit Order"} disabled />
//        )}
//      </View>
//      <Modal
//        animationType="slide"
//        transparent
//        visible={modalVisible}
//        onRequestClose={() => setModalVisible(!modalVisible)}
//      >
//        <View style={styles.modalBody}>
//          <View style={styles.modalAddressContainer}>
//            <CustomInput
//              value={country}
//              setValue={setCountry}
//              placeholder={"Enter Country"}
//            />
//            <CustomInput
//              value={city}
//              setValue={setCity}
//              placeholder={"Enter City"}
//            />
//            <CustomInput
//              value={streetAddress}
//              setValue={setStreetAddress}
//              placeholder={"Enter Street Address"}
//            />
//            <CustomInput
//              value={zipcode}
//              setValue={setZipcode}
//              placeholder={"Enter ZipCode"}
//              keyboardType={"number-pad"}
//            />
//            <CustomButton
//              text={streetAddress && city && country ? "Save" : "Close"}
//              onPress={() => {
//                if (streetAddress && city && country) {
//                  setModalVisible(false);
//                  setAddress(`${streetAddress}, ${city}, ${country}`);
//                } else {
//                  setModalVisible(false);
//                }
//              }}
//            />
//          </View>
//        </View>
//      </Modal>
//    </View>
//  );
//};
//
//export default CheckoutScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.light,
//    padding: 5,
//  },
//  topBarContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//    padding: 5,
//  },
//  bodyContainer: {
//    flex: 1,
//    padding: 5,
//  },
//  primaryText: {
//    fontSize: 18,
//    fontWeight: "bold",
//    marginVertical: 5,
//  },
//  primaryTextSm: {
//    fontSize: 14,
//    fontWeight: "bold",
//  },
//  secondaryTextSm: {
//    fontSize: 14,
//    color: colors.muted,
//  },
//  orderSummaryContainer: {
//    maxHeight: 300,
//    borderColor: colors.muted,
//    borderWidth: 1,
//    borderRadius: 5,
//    marginVertical: 5,
//    padding: 5,
//  },
//  totalOrderInfoContainer: {
//    padding: 5,
//  },
//  list: {
//    flexDirection: "row",
//    justifyContent: "space-between",
//    marginVertical: 2,
//  },
//  listContainer: {
//    padding: 5,
//    borderColor: colors.muted,
//    borderWidth: 1,
//    borderRadius: 5,
//    marginVertical: 5,
//  },
//  bottomContainer: {
//    padding: 10,
//  },
//  emptyView: {
//    height: 20,
//  },
//  modalBody: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//    backgroundColor: "rgba(0, 0, 0, 0.5)",
//  },
//  modalAddressContainer: {
//    width: "90%",
//    backgroundColor: colors.light,
//    borderRadius: 10,
//    padding: 20,
//  },
//});


//correct-------------------------------------------
//import React, { useState, useEffect } from "react";
//import {
//  StyleSheet,
//  StatusBar,
//  View,
//  TouchableOpacity,
//  Text,
//  ScrollView,
//  Modal,
//} from "react-native";
//import { Ionicons } from "@expo/vector-icons";
//import { useSelector, useDispatch } from "react-redux";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { bindActionCreators } from "redux";
//import * as actionCreators from "../../states/actionCreaters/actionCreaters";
//import BasicProductList from "../../components/BasicProductList/BasicProductList";
//import CustomButton from "../../components/CustomButton";
//import CustomInput from "../../components/CustomInput";
//import ProgressDialog from "react-native-progress-dialog";
//import { colors } from "../../constants";
//import axios from "axios";
//
//const CheckoutScreen = ({ navigation }) => {
//  const [modalVisible, setModalVisible] = useState(false);
//  const [isLoading, setIsLoading] = useState(false);
//  const [deliveryCost] = useState(0);
//  const [totalCost, setTotalCost] = useState(0);
//  const [address, setAddress] = useState("");
//  const [formFields, setFormFields] = useState({
//    country: "",
//    city: "",
//    streetAddress: "",
//    zipcode: "",
//  });
//  const [userData, setUserData] = useState(null);
//
//  const cartProduct = useSelector((state) => state.product || []);
//  const dispatch = useDispatch();
//  const { emptyCart } = bindActionCreators(actionCreators, dispatch);
//
//  // Fetch user data on mount
//  useEffect(() => {
//    const fetchUserData = async () => {
//      const user = await AsyncStorage.getItem("user");
//      setUserData(user ? JSON.parse(user) : null);
//    };
//    fetchUserData();
//  }, []);
//
//  // Update total cost whenever cartProduct changes
//  useEffect(() => {
//    const calculatedTotalCost = cartProduct.reduce(
//      (acc, product) => acc + product.product.actualPrice * product.quantity,
//      0
//    );
//    setTotalCost(calculatedTotalCost);
//  }, [cartProduct]);
//
//  // Update address when form fields change
//  useEffect(() => {
//    const { streetAddress, city, country } = formFields;
//    setAddress(streetAddress && city && country
//      ? `${streetAddress}, ${city}, ${country}`
//      : "");
//  }, [formFields]);
//
//  const handleCheckout = async () => {
//    setIsLoading(true);
//    try {
//      const token = await AsyncStorage.getItem("authToken");
//      const userId = await AsyncStorage.getItem("userid");
//
//      if (!userId || !token) {
//        console.error("User not authenticated");
//        setIsLoading(false);
//        return;
//      }
//
//      const items = cartProduct.map(({ id, quantity }) => ({
//        productId: id,
//        quantity,
//      }));
//
//      const response = await axios.post(
//        "https://shopflow.onrender.com/user/order/createOrder",
//        { userId, items },
//        { headers: { Authorization: `Bearer ${token}` } }
//      );
//
//      if (response.data.success) {
//        emptyCart();
//        navigation.replace("orderconfirm");
//      } else {
//        console.error("Checkout failed:", response.data.message);
//      }
//    } catch (error) {
//      console.error("Checkout error:", error);
//    } finally {
//      setIsLoading(false);
//    }
//  };
//
//  const handleInputChange = (field, value) => {
//    setFormFields((prev) => ({ ...prev, [field]: value }));
//  };
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <ProgressDialog visible={isLoading} label={"Placing Order..."} />
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//          <Ionicons
//            name="arrow-back-circle-outline"
//            size={30}
//            color={colors.muted}
//          />
//        </TouchableOpacity>
//      </View>
//      <ScrollView style={styles.bodyContainer}>
//        <Text style={styles.primaryText}>Order Summary</Text>
//        <ScrollView style={styles.orderSummaryContainer} nestedScrollEnabled>
//          {cartProduct.map((product, index) => (
//            <BasicProductList
//              key={index}
//              title={product.product.name}
//              price={product.product.actualPrice * product.quantity}
//              quantity={product.quantity}
//            />
//          ))}
//        </ScrollView>
//        <Text style={styles.primaryText}>Total</Text>
//        <View style={styles.totalOrderInfoContainer}>
//          <View style={styles.list}>
//            <Text>Order</Text>
//            <Text>{totalCost}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text>Delivery</Text>
//            <Text>{deliveryCost}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text style={styles.primaryTextSm}>Total</Text>
//            <Text style={styles.secondaryTextSm}>
//              {totalCost + deliveryCost}$
//            </Text>
//          </View>
//        </View>
//        <Text style={styles.primaryText}>Contact</Text>
//        <View style={styles.listContainer}>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Email</Text>
//            <Text style={styles.secondaryTextSm}>
//              {userData?.email || "N/A"}
//            </Text>
//          </View>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Phone</Text>
//            <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
//          </View>
//        </View>
//        <Text style={styles.primaryText}>Address</Text>
//        <View style={styles.listContainer}>
//          <TouchableOpacity
//            style={styles.list}
//            onPress={() => setModalVisible(true)}
//          >
//            <Text style={styles.secondaryTextSm}>Address</Text>
//            <Text
//              style={styles.secondaryTextSm}
//              numberOfLines={1}
//              ellipsizeMode="tail"
//            >
//              {address || "Add"}
//            </Text>
//          </TouchableOpacity>
//        </View>
//        <Text style={styles.primaryText}>Payment</Text>
//        <View style={styles.listContainer}>
//          <View style={styles.list}>
//            <Text style={styles.secondaryTextSm}>Method</Text>
//            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
//          </View>
//        </View>
//      </ScrollView>
//      <View style={styles.bottomContainer}>
//        {address ? (
//          <CustomButton text={"Submit Order"} onPress={handleCheckout} />
//        ) : (
//          <CustomButton text={"Submit Order"} disabled />
//        )}
//      </View>
//      <Modal
//        animationType="slide"
//        transparent
//        visible={modalVisible}
//        onRequestClose={() => setModalVisible(!modalVisible)}
//      >
//        <View style={styles.modalBody}>
//          <View style={styles.modalAddressContainer}>
//            {Object.keys(formFields).map((field) => (
//              <CustomInput
//                key={field}
//                value={formFields[field]}
//                setValue={(value) => handleInputChange(field, value)}
//                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
//                keyboardType={field === "zipcode" ? "number-pad" : "default"}
//              />
//            ))}
//            <CustomButton
//              text={address ? "Save" : "Close"}
//              onPress={() => setModalVisible(false)}
//            />
//          </View>
//        </View>
//      </Modal>
//    </View>
//  );
//};
//
//export default CheckoutScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.light,
//    padding: 5,
//  },
//  topBarContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//    padding: 5,
//  },
//  bodyContainer: {
//    flex: 1,
//    padding: 5,
//  },
//  primaryText: {
//    fontSize: 18,
//    fontWeight: "bold",
//    marginVertical: 5,
//  },
//  primaryTextSm: {
//    fontSize: 14,
//    fontWeight: "bold",
//  },
//  secondaryTextSm: {
//    fontSize: 14,
//    color: colors.muted,
//  },
//  orderSummaryContainer: {
//    maxHeight: 300,
//    borderColor: colors.muted,
//    borderWidth: 1,
//    borderRadius: 5,
//    marginVertical: 5,
//    padding: 5,
//  },
//  totalOrderInfoContainer: {
//    padding: 5,
//  },
//  list: {
//    flexDirection: "row",
//    justifyContent: "space-between",
//    marginVertical: 2,
//  },
//  listContainer: {
//    padding: 5,
//    borderColor: colors.muted,
//    borderWidth: 1,
//    borderRadius: 5,
//    marginVertical: 5,
//  },
//  bottomContainer: {
//    padding: 10,
//  },
//  emptyView: {
//    height: 20,
//  },
//  modalBody: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//    backgroundColor: "rgba(0, 0, 0, 0.5)",
//  },
//  modalAddressContainer: {
//    width: "90%",
//    backgroundColor: colors.light,
//    borderRadius: 10,
//    padding: 20,
//  },
//});
//

//
//    import React, { useState, useEffect } from "react";
//    import {
//      StyleSheet,
//      StatusBar,
//      View,
//      TouchableOpacity,
//      Text,
//      ScrollView,
//      Modal,
//    } from "react-native";
//    import RazorpayCheckout from 'react-native-razorpay';
//    import { Ionicons } from "@expo/vector-icons";
//    import { useSelector, useDispatch } from "react-redux";
//    import AsyncStorage from "@react-native-async-storage/async-storage";
//    import { bindActionCreators } from "redux";
//    import * as actionCreators from "../../states/actionCreaters/actionCreaters";
//    import BasicProductList from "../../components/BasicProductList/BasicProductList";
//    import CustomButton from "../../components/CustomButton";
//    import CustomInput from "../../components/CustomInput";
//    import ProgressDialog from "react-native-progress-dialog";
//    import { colors } from "../../constants";
//    import axios from "axios";
//
//    const CheckoutScreen = ({ navigation, route }) => {
//      const [modalVisible, setModalVisible] = useState(false);
//      const [isLoading, setIsLoading] = useState(false);
//      const [deliveryCost] = useState(0);
//      const [totalCost, setTotalCost] = useState(0);
//      const [address, setAddress] = useState("");
//      const [formFields, setFormFields] = useState({
//        country: "",
//        city: "",
//        streetAddress: "",
//        zipcode: "",
//      });
//      const [userData, setUserData] = useState(null);
//
//      const cartProduct = useSelector((state) => state.product || []);
//      const dispatch = useDispatch();
//      const { emptyCart } = bindActionCreators(actionCreators, dispatch);
//
//      // Check if the screen is accessed for "Buy Now" with a single product
//      const singleProduct = route.params?.order?.items || null;
//
//
//      // Fetch user data on mount
//      useEffect(() => {
//        const fetchUserData = async () => {
//          const user = await AsyncStorage.getItem("user");
//          setUserData(user ? JSON.parse(user) : null);
//        };
//        fetchUserData();
//      }, []);
//
//      // Calculate total cost based on the data source
//      useEffect(() => {
//        if (singleProduct) {
//          setTotalCost(singleProduct[0].product.actualPrice * singleProduct.quantity);
//        } else {
//          const calculatedTotalCost = cartProduct.reduce(
//            (acc, product) => acc + product.product.actualPrice * product.quantity,
//            0
//          );
//          setTotalCost(calculatedTotalCost);
//        }
//      }, [cartProduct, singleProduct]);
//
//      // Update address when form fields change
//      useEffect(() => {
//        const { streetAddress, city, country } = formFields;
//        setAddress(streetAddress && city && country
//          ? `${streetAddress}, ${city}, ${country}`
//          : "");
//      }, [formFields]);
//
//    //  const handleCheckout = async () => {
//    //    setIsLoading(true);
//    //    try {
//    //      const token = await AsyncStorage.getItem("authToken");
//    //      const userId = await AsyncStorage.getItem("userid");
//    //
//    //      if (!userId || !token) {
//    //        console.error("User not authenticated");
//    //        setIsLoading(false);
//    //        return;
//    //      }
//    //
//    //      const items = singleProduct
//    //        ? [{ productId: singleProduct[0].product.id, quantity: singleProduct.quantity }]
//    //        : cartProduct.map(({ id, quantity }) => ({
//    //            productId: id,
//    //            quantity,
//    //          }));
//    //console.log("ok")
//    //const response = await axios.post(
//    //        'https://shopflow.onrender.com/user/order/createOrder',
//    //        {
//    //          userId: Number(userId),
//    //          items: [
//    //            {
//    //              productId: Number(singleProduct[0].product.id),
//    //              quantity: 1,
//    //            },
//    //          ],
//    //        }
//    //      );
//    //      console.log("Ithu namma response:",response)
//    //      if (response.status===200) {
//    //        if (!singleProduct) emptyCart(); // Clear the cart only for cart purchases
//    //        navigation.replace("orderconfirm");
//    //      } else {singleProduct
//    //        console.error("Checkout failed:", response.data.message);
//    //      }
//    //    } catch (error) {
//    //      console.error("Checkout error:", error);
//    //    } finally {
//    //      setIsLoading(false);
//    //    }
//    //  };
//
//
//    //const handleCheckout = async () => {
//    //  setIsLoading(true);
//    //  try {
//    //    const token = await AsyncStorage.getItem("authToken");
//    //    const userId = await AsyncStorage.getItem("userid");
//    //
//    //    if (!userId || !token) {
//    //      console.error("User not authenticated");
//    //      setIsLoading(false);
//    //      return;
//    //    }
//    //
//    //    const items = singleProduct
//    //      ? [{ productId: singleProduct[0].product.id, quantity: singleProduct.quantity }]
//    //      : cartProduct.map(({ product, quantity }) => ({
//    //          productId: product.id,
//    //          quantity,
//    //        }));
//    //
//    //    // Fetch the payment order details from your backend
//    //    const response = await axios.post(
//    //      "https://shopflow.onrender.com/user/order/createOrder",
//    //      {
//    //        userId: Number(userId),
//    //        items,
//    //      }
//    //    );
//    //
//    //    if (response.status === 200) {
//    //      const { orderId, amount, currency } = response.data; // Ensure your backend returns these values
//    //
//    //      // Dynamically load the Razorpay script
//    //      const options = {
//    //        key: 'rzp_test_nTbKdtgjeOQLhc',  // Replace with your Razorpay Key ID
//    //        amount: amount * 100,  // Convert to paise
//    //        currency: 'INR',
//    //        name: 'ShopFlow',
//    //        description: 'Order Payment',
//    //        order_id: orderId, // The order ID received from the backend
//    //        prefill: {
//    //          name: userData?.name,
//    //          email: userData?.email,
//    //          contact: userData?.contact,  // Replace with actual user contact
//    //        },
//    //        theme: {
//    //          color: '#3399cc',
//    //        },
//    //      };
//    //
//    //      // Step 3: Open Razorpay Checkout
//    //      RazorpayCheckout.open(options)
//    //        .then(async (response) => { // Change to async here
//    //          // Handle successful payment
//    //          console.log(response);
//    //
//    //          try {
//    //            // Call your backend to verify the payment
//    //            const paymentVerificationResponse = await axios.post(
//    //              'https://shopflow.onrender.com/user/order/verify',
//    //              {
//    //                orderId,
//    //                paymentId: response.razorpay_payment_id,
//    //                paymentSignature: response.razorpay_signature,
//    //              }
//    //            );
//    //
//    //            if (paymentVerificationResponse.status === 200) {
//    //              if (!singleProduct) emptyCart();
//    //              navigation.replace('orderconfirm');
//    //            } else {
//    //              console.error('Payment verification failed:', paymentVerificationResponse.data.message);
//    //            }
//    //          } catch (error) {
//    //            console.error('Payment verification error:', error);
//    //          }
//    //        })
//    //        .catch((error) => {
//    //          console.error('Payment failed:', error);
//    //        });
//    //    } else {
//    //      console.error('Checkout failed:', response.data.message);
//    //    }
//    //  } catch (error) {
//    //    console.error('Checkout error:', error);
//    //  } finally {
//    //    setIsLoading(false);
//    //  }
//    //};
//
//
//    const handleCheckout = async () => {
//      setIsLoading(true);
//      try {
//        const token = await AsyncStorage.getItem("authToken");
//        const userId = await AsyncStorage.getItem("userid");
//
//        if (!userId || !token) {
//          console.error("User not authenticated");
//          setIsLoading(false);
//          return;
//        }
//
//        const items = singleProduct
//          ? [{ productId: singleProduct[0].product.id, quantity: singleProduct.quantity }]
//          : cartProduct.map(({ product, quantity }) => ({
//              productId: product.id,
//              quantity,
//            }));
//
//        // Fetch the payment order details from your backend
//        let response;
//        try {
//          response = await axios.post(
//            "https://shopflow.onrender.com/user/order/createOrder",
//            {
//              userId: Number(userId),
//              items,
//            }
//          );
//        } catch (error) {
//          console.error('Error fetching order details:', error);
//          setIsLoading(false);
//          return;
//        }
//
//        if (response.status === 200) {
//          const { orderId, amount, currency } = response.data; // Ensure your backend returns these values
//          console.log('Order created successfully:', response.data);
//
//          // Dynamically load the Razorpay script
//          const options = {
//            key: 'rzp_test_nTbKdtgjeOQLhc',  // Replace with your Razorpay Key ID
//            amount: amount * 100,  // Convert to paise
//            currency: 'INR',
//            name: 'ShopFlow',
//            description: 'Order Payment',
//            order_id: orderId, // The order ID received from the backend
//            prefill: {
//              name: userData?.name || 'User Name',
//              email: userData?.email || 'user@example.com',
//              contact: userData?.contact || '1234567890',  // Replace with actual user contact
//            },
//            theme: {
//              color: '#3399cc',
//            },
//          };
//
//          try {
//            const razorpayResponse = await RazorpayCheckout.open(options);
//            console.log('Razorpay response:', razorpayResponse);
//
//            // Call your backend to verify the payment
//            const paymentVerificationResponse = await axios.post(
//              'https://shopflow.onrender.com/user/order/verify',
//              {
//                orderId,
//                paymentId: razorpayResponse.razorpay_payment_id,
//                paymentSignature: razorpayResponse.razorpay_signature,
//              }
//            );
//
//            if (paymentVerificationResponse.status === 200) {
//              if (!singleProduct) emptyCart();
//              navigation.replace('orderconfirm');
//            } else {
//              console.error('Payment verification failed:', paymentVerificationResponse.data.message);
//            }
//          } catch (error) {
//            console.error('Error during Razorpay Checkout:', error);
//          }
//        } else {
//          console.error('Checkout failed:', response.data.message);
//        }
//      } catch (error) {
//        console.error('Checkout error:', error);
//      } finally {
//        setIsLoading(false);
//      }
//    };
//
//      return (
//        <View style={styles.container}>
//          <StatusBar />
//          <ProgressDialog visible={isLoading} label={"Placing Order..."} />
//          <View style={styles.topBarContainer}>
//            <TouchableOpacity onPress={() => navigation.goBack()}>
//              <Ionicons
//                name="arrow-back-circle-outline"
//                size={30}
//                color={colors.muted}
//              />
//            </TouchableOpacity>
//          </View>
//          <ScrollView style={styles.bodyContainer}>
//            <Text style={styles.primaryText}>Order Summary</Text>
//            <ScrollView style={styles.orderSummaryContainer} nestedScrollEnabled>
//              {singleProduct ? (
//                <BasicProductList
//                  title={singleProduct[0].product.name}
//                  price={singleProduct[0].product.actualPrice * singleProduct[0].quantity}
//                  quantity={singleProduct[0].quantity}
//                />
//              ) : (
//                cartProduct.map((product, index) => (
//                  <BasicProductList
//                    key={index}
//                    title={product.product.name}
//                    price={product.product.actualPrice * product.quantity}
//                    quantity={product.quantity}
//                  />
//                ))
//              )}
//            </ScrollView>
//            <Text style={styles.primaryText}>Total</Text>
//            <View style={styles.totalOrderInfoContainer}>
//              <View style={styles.list}>
//                <Text>Order</Text>
//                <Text>{totalCost}$</Text>
//              </View>
//              <View style={styles.list}>
//                <Text>Delivery</Text>
//                <Text>{deliveryCost}$</Text>
//              </View>
//              <View style={styles.list}>
//                <Text style={styles.primaryTextSm}>Total</Text>
//                <Text style={styles.secondaryTextSm}>
//                  {totalCost + deliveryCost}$
//                </Text>
//              </View>
//            </View>
//            <Text style={styles.primaryText}>Contact</Text>
//            <View style={styles.listContainer}>
//              <View style={styles.list}>
//                <Text style={styles.secondaryTextSm}>Email</Text>
//                <Text style={styles.secondaryTextSm}>
//                  {userData?.email || "N/A"}
//                </Text>
//              </View>
//              <View style={styles.list}>
//                <Text style={styles.secondaryTextSm}>Phone</Text>
//                <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
//              </View>
//            </View>
//            <Text style={styles.primaryText}>Address</Text>
//            <View style={styles.listContainer}>
//              <TouchableOpacity
//                style={styles.list}
//                onPress={() => setModalVisible(true)}
//              >
//                <Text style={styles.secondaryTextSm}>Address</Text>
//                <Text
//                  style={styles.secondaryTextSm}
//                  numberOfLines={1}
//                  ellipsizeMode="tail"
//                >
//                  {address || "Add"}
//                </Text>
//              </TouchableOpacity>
//            </View>
//            <Text style={styles.primaryText}>Payment</Text>
//            <View style={styles.listContainer}>
//              <View style={styles.list}>
//                <Text style={styles.secondaryTextSm}>Method</Text>
//                <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
//              </View>
//            </View>
//          </ScrollView>
//          <View style={styles.bottomContainer}>
//            {address ? (
//              <CustomButton text={"Submit Order"} onPress={handleCheckout} />
//            ) : (
//              <CustomButton text={"Submit Order"} disabled />
//            )}
//          </View>
//          <Modal
//            animationType="slide"
//            transparent
//            visible={modalVisible}
//            onRequestClose={() => setModalVisible(!modalVisible)}
//          >
//            <View style={styles.modalBody}>
//              <View style={styles.modalAddressContainer}>
//                {Object.keys(formFields).map((field) => (
//                  <CustomInput
//                    key={field}
//                    value={formFields[field]}
//                    setValue={(value) => handleInputChange(field, value)}
//                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
//                    keyboardType={field === "zipcode" ? "number-pad" : "default"}
//                  />
//                ))}
//                <CustomButton
//                  text={address ? "Save" : "Close"}
//                  onPress={() => setModalVisible(false)}
//                />
//              </View>
//            </View>
//          </Modal>
//        </View>
//      );
//    };
//
//    export default CheckoutScreen;
//
//    const styles = StyleSheet.create({
//      container: {
//        flex: 1,
//        backgroundColor: colors.light,
//        padding: 5,
//      },
//      topBarContainer: {
//        flexDirection: "row",
//        alignItems: "center",
//        padding: 5,
//      },
//      bodyContainer: {
//        flex: 1,
//        padding: 5,
//      },
//      primaryText: {
//        fontSize: 18,
//        fontWeight: "bold",
//        marginVertical: 5,
//      },
//      primaryTextSm: {
//        fontSize: 14,
//        fontWeight: "bold",
//      },
//      secondaryTextSm: {
//        fontSize: 14,
//        color: colors.muted,
//      },
//      orderSummaryContainer: {
//        maxHeight: 300,
//        borderColor: colors.muted,
//        borderWidth: 1,
//        borderRadius: 5,
//        marginVertical: 5,
//        padding: 5,
//      },
//      totalOrderInfoContainer: {
//        padding: 5,
//      },
//      list: {
//        flexDirection: "row",
//        justifyContent: "space-between",
//        marginVertical: 2,
//      },
//      listContainer: {
//        padding: 5,
//        borderColor: colors.muted,
//        borderWidth: 1,
//        borderRadius: 5,
//        marginVertical: 5,
//      },
//      bottomContainer: {
//        padding: 10,
//      },
//      emptyView: {
//        height: 20,
//      },
//      modalBody: {
//        flex: 1,
//        justifyContent: "center",
//        alignItems: "center",
//        backgroundColor: "rgba(0, 0, 0, 0.5)",
//      },
//      modalAddressContainer: {
//        width: "90%",
//        backgroundColor: colors.light,
//        borderRadius: 10,
//        padding: 20,
//      },
//    });
//
//
//-------------------------------correct

import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, View, TouchableOpacity, Text, ScrollView, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../states/actionCreaters/actionCreaters";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import CustomButton from "../../components/CustomButton";
import ProgressDialog from "react-native-progress-dialog";
import { colors } from "../../constants";
import axios from "axios";
import { WebView } from 'react-native-webview';

const CheckoutScreen = ({ navigation, route }) => {
  const order = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState("");
  const [formFields, setFormFields] = useState({
    country: "",
    city: "",
    streetAddress: "",
    zipcode: "",
  });
  const [userData, setUserData] = useState(null);
  const [razorpayUrl, setRazorpayUrl] = useState(null);

  const cartProduct = useSelector((state) => state.product || []);
  const dispatch = useDispatch();
  const { emptyCart } = bindActionCreators(actionCreators, dispatch);

  const singleProduct = route.params?.order?.items || null;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await AsyncStorage.getItem("authUser");
      setUserData(user ? JSON.parse(user) : null);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (singleProduct) {
      setTotalCost(singleProduct[0].product.actualPrice * singleProduct.quantity);
    } else {
      const calculatedTotalCost = cartProduct.reduce(
        (acc, product) => acc + product.product.actualPrice * product.quantity,
        0
      );
      setTotalCost(calculatedTotalCost);
    }
  }, [cartProduct, singleProduct]);

  useEffect(() => {
    const { streetAddress, city, country } = formFields;
    setAddress(streetAddress && city && country
      ? `${streetAddress}, ${city}, ${country}`
      : "");
  }, [formFields]);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("userid");

      if (!userId || !token) {
        console.error("User not authenticated");
        setIsLoading(false);
        return;
      }

      const items = singleProduct
        ? [{ productId: singleProduct[0].product.id, quantity: singleProduct[0].quantity }]
        : cartProduct.map(({ product, quantity }) => ({
            productId: product.id,
            quantity: product.quantity,
          }));

      const orderResponse = await axios.post(
        "https://shopflow-1.onrender.com/user/order/checkoutOrder",
        {}, {
          params: { orderId: order.order.id }
        }
      );

      if (orderResponse.status === 200) {
        const orderId = orderResponse.data.razorpayOrder.id;
        const amount = orderResponse.data.razorpayOrder.amount;

        // Configure Razorpay web URL
        const razorpayUrl = `https://checkout.razorpay.com/v1/checkout/embedded?order_id=${orderId}&amount=${amount}&name=ShopFlow&currency=INR&description=Order Payment&prefill_name=${userData?.name}&prefill_email=${userData?.email}&prefill_contact=${userData?.contact}`;

        // Set Razorpay URL to load in WebView
        setRazorpayUrl(razorpayUrl);
      } else {
        console.error('Checkout failed:', orderResponse.data.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (name, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    setAddress(`${formFields.streetAddress}, ${formFields.city}, ${formFields.country}`);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <ProgressDialog visible={isLoading} label={"Placing Order..."} />
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.bodyContainer}>
        <Text style={styles.primaryText}>Order Summary</Text>
        <ScrollView style={styles.orderSummaryContainer} nestedScrollEnabled>
          {singleProduct ? (
            <BasicProductList
              title={singleProduct[0].product.name}
              price={singleProduct[0].product.actualPrice * singleProduct.quantity}
              quantity={singleProduct[0].quantity}
            />
          ) : (
            cartProduct.map((product, index) => (
              <BasicProductList
                key={index}
                title={product.product.name}
                price={product.product.actualPrice * product.quantity}
                quantity={product.quantity}
              />
            ))
          )}
        </ScrollView>

        <Text style={styles.primaryText}>Total</Text>
        <View style={styles.totalOrderInfoContainer}>
          <View style={styles.list}>
            <Text>Order</Text>
            <Text>{totalCost}$</Text>
          </View>
          <View style={styles.list}>
            <Text>Delivery</Text>
            <Text>{deliveryCost}$</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.primaryTextSm}>Total</Text>
            <Text style={styles.secondaryTextSm}>
              {totalCost + deliveryCost}$
            </Text>
          </View>
        </View>

        <Text style={styles.primaryText}>Contact</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>{userData?.email || "N/A"}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
          </View>
        </View>

        <Text style={styles.primaryText}>Address</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.list} onPress={() => setModalVisible(true)}>
            <Text style={styles.secondaryTextSm}>Address</Text>
            <Text style={styles.secondaryTextSm} numberOfLines={1} ellipsizeMode="tail">
              {address || "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.primaryText}>Payment</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Method</Text>
            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        {address ? (
          <CustomButton text={"Submit Order"} onPress={handleCheckout} />
        ) : (
          <CustomButton text={"Submit Order"} disabled />
        )}
      </View>

      {razorpayUrl && (
        <WebView
          source={{ uri: razorpayUrl }}
          style={{ flex: 1 }}
          onLoadEnd={() => console.log("Razorpay WebView loaded")}
          onError={(error) => console.log("Razorpay WebView error", error)}
          javaScriptEnabled
          onNavigationStateChange={(event) => {
            if (event.url.includes("success")) {
              // Handle payment success
              console.log("Payment successful!");
              navigation.replace('orderconfirm');
            }
            if (event.url.includes("failure")) {
              // Handle payment failure
              console.log("Payment failed!");
            }
          }}
        />
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.primaryText}>Enter Your Address</Text>
          {["streetAddress", "city", "country"].map((field) => (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={field}
              value={formFields[field]}
              onChangeText={(value) => handleAddressChange(field, value)}
            />
          ))}
          <TouchableOpacity onPress={handleSaveAddress}>
            <Text>Save Address</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
      },
      topBarContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      bodyContainer: {
        marginTop: 20,
      },
      primaryText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      orderSummaryContainer: {
        marginBottom: 20,
      },
      totalOrderInfoContainer: {
        marginBottom: 20,
      },
      list: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
      },
      bottomContainer: {
        marginTop: 20,
      },
      modalContainer: {
        padding: 20,
      },
      inputField: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
      },
    });

    export default CheckoutScreen;

