//import React, { useState, useEffect } from "react";
//import { StyleSheet, StatusBar, Alert,View, TouchableOpacity, Text, ScrollView } from "react-native";
//import { Ionicons } from "@expo/vector-icons";
//import { useSelector } from "react-redux";
//import EncryptedStorage from 'react-native-encrypted-storage';
//import BasicProductList from "../../components/BasicProductList/BasicProductList";
//import CustomButton from "../../components/CustomButton";
//import { colors,network } from "../../constants";
//import { useStripe } from "@stripe/stripe-react-native";
//import axios from "axios";
//import companylogo from "../../assets/logo/logoshop.png";
//import CustomLoader from "../../components/CustomLoader";
//
//
//const CheckoutScreen = ({ navigation, route }) => {
//
//
//  const [totalCost, setTotalCost] = useState(0);
//  const [userData, setUserData] = useState(null);
//  const {orders,cartProduct} = route.params || null;
//  const singleProduct = orders || null
//  const order = singleProduct?.id || cartProduct?.id
//
// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const authToken = await EncryptedStorage.getItem("authToken"); // Fetch token from storage
//       const userId = await EncryptedStorage.getItem("userid"); // Fetch user ID
//
//       if (!authToken || !userId) {
//       Alert.alert("User not Logged-In")
//         return;
//       }
//
//
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };
//
//   fetchUserData();
// }, []);
//
//  useEffect(() => {
//      if (singleProduct) {
//        const calculatedTotalAmount =
//          singleProduct.totalAmount;
//        setTotalAmount(calculatedTotalAmount);
//      } else {
//        const calculatedTotalAmount = cartProduct.totalAmount;
//
//        setTotalAmount(calculatedTotalAmount);
//      }
//    }, [cartProduct, singleProduct]);
//
//
//const { initPaymentSheet, presentPaymentSheet } = useStripe();
//  const [loading, setLoading] = useState(false);
//  const [paymentIntent, setPaymentIntent] = useState(null); // Store paymentIntentId
//  const [paymentMethodId, setPaymentMethodId] = useState(null); // Store paymentMethodId
//  const [totalAmount, setTotalAmount] = useState(0); // State to store the total amount
//  const [isProcessing, setIsProcessing] = useState(false); // Add state for loading
//
//const [userInfo, setUserInfo] = useState({
//  user: {
//    name: "Guest",
//    email: "guest@example.com"
//  }
//});
//  const fetchPaymentSheetParams = async () => {
//  const userId = await EncryptedStorage.getItem("userid")
//  const token = await EncryptedStorage.getItem("authToken")
//  console.log(token,userId,totalAmount)
//    try {
//      const response = await axios.post(
//        `${network.serverip}/user/order/createPaymentIntent`,
//        {  totalAmount: Math.ceil(totalAmount),currency:"usd" },
//        {
//          headers: {
//                    Authorization: `Bearer ${token}` ,
//
//          },
//        }
//      );
//console.log(response.data)
//      const { paymentIntent,paymentIntentId, ephemeralKey, customer } = response.data.data;
//      setPaymentIntent(paymentIntentId);
//
//      return { paymentIntent, ephemeralKey, customer };
//    } catch (error) {
//      console.error("Error fetching payment sheet params:", error.response?.data || error.message);
//    }
//  };
//
//  const initializePaymentSheet = async () => {
//    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
//    if (!paymentIntent || !ephemeralKey || !customer) return;
//
//    const { error } = await initPaymentSheet({
//      merchantDisplayName: "Example, Inc.",
//      customerId: customer,
//      customerEphemeralKeySecret: ephemeralKey,
//      paymentIntentClientSecret: paymentIntent,
//      allowsDelayedPaymentMethods: true,
//      defaultBillingDetails: {
//        name: "Jane Doe",
//      },
//    });
//
//    if (!error) {
//      setLoading(true);
//    }
//  };
//
//  const openPaymentSheet = async () => {
//    const { error } = await presentPaymentSheet();
//setIsProcessing(true);
//    if (error) {
//    setIsProcessing(false);
//console.log(error.message)
//    } else {
//      console.log("Payment successful!");
//
//      // Fetch paymentIntent details from Stripe API or your backend
//      try {
//  const token = await EncryptedStorage.getItem("authToken")
//        const response = await axios.get(`${network.serverip}/user/order/paymentMethodId`, {
//          params: { paymentIntentId: paymentIntent }, // Pass the paymentIntentId
//          headers: {
//            'Authorization': `Bearer ${token}`,
//            "Content-Type": "application/json",
//          },
//        });
//        const { paymentMethodId } = response.data.data;
//        setPaymentMethodId(paymentMethodId)
//     const ConfirmResponse = await axios.post(`${network.serverip}/user/order/confirmPayment`, {
//     orderId:order,
//       paymentIntentId: paymentIntent, // Ensure this variable holds the correct PaymentIntent ID
//       paymentMethodId: paymentMethodId, // Ensure this variable holds the correct PaymentMethod ID
//     }, {
//       headers: {
//                   'Authorization': `Bearer ${token}`,
//
//         "Content-Type": "application/json", // Set the content type header to JSON
//       },
//     });
//
//
//        const userId = await EncryptedStorage.getItem("userid")
//
//         const userResponse = await axios.get(`${network.serverip}/user/userProfileInfo`, {
//                 params: { userId: Number(userId) },
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               });
//               if (userResponse.data) {
//                 setUserInfo({ user: userResponse.data });
//               }
//        Alert.alert("Success", "Your order is confirmed!", [
//          {
//            text: "OK",
//            onPress: () => navigation.replace("myorder", { user: userInfo }),
//          },
//        ]);
//
//      } catch (fetchError) {
//        console.error("Error retrieving payment method ID:", fetchError.message);
//      }finally{
//            setIsProcessing(false);
//
//      }
//    }
//  };
//
//
//  useEffect(() => {
//  if(totalAmount>0){
//      initializePaymentSheet();
//
//  }
//  }, [totalAmount]);
//
//
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
//        </TouchableOpacity>
//        <Text style={styles.topBarTitle}>Order Summary</Text>
//      </View>
//
//      <ScrollView style={styles.bodyContainer}>
//
//        <ScrollView style={styles.orderSummaryContainer} nestedScrollEnabled>
//          {singleProduct ? (
//            <BasicProductList
//              image={singleProduct.items[0].product.image}
//
//              title={singleProduct.items[0].product.name}
//              price={Math.floor(singleProduct.items[0].product.offerPrice)}
//              quantity={singleProduct.items[0].quantity}
//            />
//          ) : (
//            cartProduct.items.map((product, index) => (
//              <BasicProductList
//                key={index}
//                image={product.product.image}
//                title={product.product.name}
//                price={Math.floor(product.product.offerPrice )}
//                quantity={product.quantity}
//              />
//            ))
//          )}
//        </ScrollView>
//        <Text style={styles.primaryText}>Total</Text>
//        <View style={styles.totalOrderInfoContainer}>
//          <View style={styles.list}>
//            <Text>Order</Text>
//            <Text>{totalAmount.toFixed(2)}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text>Delivery</Text>
//            <Text>{0}$</Text>
//          </View>
//          <View style={styles.list}>
//            <Text style={styles.primaryTextSm}>Total</Text>
//            <Text style={styles.secondaryTextSm}>
//              {totalAmount.toFixed(2)}$
//            </Text>
//          </View>
//        </View>
//       {isProcessing ? (
//        <CustomLoader visible={loading} autoClose={true} />
//       ) : (
//         <CustomButton
//           onPress={openPaymentSheet}
//           text={"Confirm Order"}
//           disabled={isProcessing} // Disable button when processing
//         />
//       )}
//
//      </ScrollView>
//    </View>
//  );
//};
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//
//  },
//   topBarContainer: { flexDirection: "row", alignItems: "center", padding: 10, width: "100%", backgroundColor: "#111827" },
// primaryText: {
//    fontSize: 18,
//    fontWeight: "bold",
//    color:colors.primary,
//  },
//  topBarTitle: {
//    fontSize: 22,
//    fontWeight: "600",
//    color: colors.primary, // Change to colors.muted if needed
//    marginLeft: 20, // Adjust spacing for better alignment
//  },
//
//  bodyContainer: {
//    flex: 1,
//    padding:20,
//  },
//  orderSummaryContainer: {
//    marginVertical: 10,
//  },
//
//  totalOrderInfoContainer: {
//    marginTop: 20,
//  },
//  list: {
//    flexDirection: "row",
//    justifyContent: "space-between",
//    marginVertical: 5,
//  },
//  secondaryTextSm: {
//    color: colors.muted,
//  },
//  primaryTextSm: {
//    fontSize: 16,
//  },
//});
//
//export default CheckoutScreen;






import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Alert, View, TouchableOpacity, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import EncryptedStorage from 'react-native-encrypted-storage';
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import CustomButton from "../../components/CustomButton";
import { colors, network } from "../../constants";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import companylogo from "../../assets/logo/logoshop.png";
import CustomLoader from "../../components/CustomLoader";

const CheckoutScreen = ({ navigation, route }) => {
  const [totalAmount, setTotalAmount] = useState(0);  // Store totalAmount
  const [userData, setUserData] = useState(null);
  const { orders, cartProduct } = route.params || {};
  const singleProduct = orders || null;
  const order = singleProduct?.id || cartProduct?.id;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null); // Store paymentIntentId
  const [paymentMethodId, setPaymentMethodId] = useState(null); // Store paymentMethodId
  const [isProcessing, setIsProcessing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    user: {
      name: "Guest",
      email: "guest@example.com"
    }
  });

  // Fetch user data (authToken, userId) from encrypted storage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = await EncryptedStorage.getItem("authToken");
        const userId = await EncryptedStorage.getItem("userid");

        if (!authToken || !userId) {
          Alert.alert("User not Logged-In");
          return;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Set the total amount based on the product or cart
  useEffect(() => {
    if (singleProduct) {
      const calculatedTotalAmount = singleProduct.totalAmount;
      setTotalAmount(Math.ceil(calculatedTotalAmount));
    } else {
      const calculatedTotalAmount = cartProduct.totalAmount;
      setTotalAmount(Math.ceil(calculatedTotalAmount));
    }
  }, [cartProduct, singleProduct]);

  // Fetch parameters to initialize payment sheet
  const fetchPaymentSheetParams = async () => {
    const userId = await EncryptedStorage.getItem("userid");
    const token = await EncryptedStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${network.serverip}/user/order/createPaymentIntent`,
        { totalAmount: Math.ceil(totalAmount), currency: "usd" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { paymentIntent, paymentIntentId, ephemeralKey, customer } = response.data.data;
      console.log("Before",paymentIntent, paymentIntentId, ephemeralKey, customer)
      setPaymentIntent(paymentIntentId);

      return { paymentIntent, ephemeralKey, customer };
    } catch (error) {
      console.error("Error fetching payment sheet params:", error.response?.data || error.message);
    }
  };

  // Initialize PaymentSheet
  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
    console.log("initialize",paymentIntent,ephemeralKey,customer)
    if (!paymentIntent || !ephemeralKey || !customer) return;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (!error) {
      setLoading(true);  // Set loading state to true once payment sheet is initialized
    } else {
      Alert.alert("Error", error.message);
    }
  };

  // Open PaymentSheet and handle payment
  const openPaymentSheet = async () => {
    // Ensure payment sheet is initialized before presenting it
    if (!paymentIntent) {
      Alert.alert("Error", "Payment sheet has not been initialized.");
      return;
    }

    const { error } = await presentPaymentSheet();

    setIsProcessing(true);

    if (error) {
      setIsProcessing(false);
      Alert.alert(error.message)
      console.log(error.message);
    } else {
      console.log("Payment successful!");

      // Confirm the payment with paymentIntentId and paymentMethodId
      try {
        const token = await EncryptedStorage.getItem("authToken");
        const response = await axios.get(`${network.serverip}/user/order/paymentMethodId`, {
          params: { paymentIntentId: paymentIntent },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const { paymentMethodId } = response.data.data;
        setPaymentMethodId(paymentMethodId);

        // Confirm the payment with backend
        const ConfirmResponse = await axios.post(
          `${network.serverip}/user/order/confirmPayment`,
          {
            orderId: order,
            paymentIntentId: paymentIntent,
            paymentMethodId: paymentMethodId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const userId = await EncryptedStorage.getItem("userid");
        const userResponse = await axios.get(`${network.serverip}/user/userProfileInfo`, {
          params: { userId: Number(userId) },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.data) {
          setUserInfo({ user: userResponse.data });
        }

        Alert.alert("Success", "Your order is confirmed!", [
          {
            text: "OK",
            onPress: () => navigation.replace("myorder", { user: userInfo }),
          },
        ]);
      } catch (fetchError) {
        console.error("Error retrieving payment method ID:", fetchError.message);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Initialize payment sheet when totalAmount changes
  useEffect(() => {
    if (totalAmount > 0) {
      initializePaymentSheet();
    }
  }, [totalAmount]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Order Summary</Text>
      </View>

      <ScrollView style={styles.bodyContainer}>
        <ScrollView style={styles.orderSummaryContainer} nestedScrollEnabled>
          {singleProduct ? (
            <BasicProductList
              image={singleProduct.items[0].product.image}
              title={singleProduct.items[0].product.name}
              price={Math.ceil(singleProduct.items[0].product.offerPrice)}
              quantity={singleProduct.items[0].quantity}
            />
          ) : (
            cartProduct.items.map((product, index) => (
              <BasicProductList
                key={index}
                image={product.product.image}
                title={product.product.name}
                price={Math.ceil(product.product.offerPrice)}
                quantity={product.quantity}
              />
            ))
          )}
        </ScrollView>
        <Text style={styles.primaryText}>Total</Text>
        <View style={styles.totalOrderInfoContainer}>
          <View style={styles.list}>
            <Text>Order</Text>
            <Text>{totalAmount.toFixed(2)}$</Text>
          </View>
          <View style={styles.list}>
            <Text>Delivery</Text>
            <Text>{0}$</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.primaryTextSm}>Total</Text>
            <Text style={styles.secondaryTextSm}>
              {totalAmount.toFixed(2)}$
            </Text>
          </View>
        </View>

        {isProcessing ? (
          <CustomLoader visible={loading} autoClose={true} />
        ) : (
          <CustomButton
            onPress={openPaymentSheet}
            text={"Confirm Order"}
            disabled={isProcessing}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "#111827",
  },
  primaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: 20,
  },
  bodyContainer: {
    flex: 1,
    padding: 20,
  },
  orderSummaryContainer: {
    marginVertical: 10,
  },
  totalOrderInfoContainer: {
    marginTop: 20,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  primaryTextSm: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  secondaryTextSm: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.secondary,
  },
});

export default CheckoutScreen;
