//import {
//  StyleSheet,
//  Text,
//  StatusBar,
//  View,
//  ScrollView,
//  TouchableOpacity,
//  RefreshControl,
//  Image,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { colors, network } from "../../constants";
//import { Ionicons } from "@expo/vector-icons";
//import ProgressDialog from "react-native-progress-dialog";
//import OrderList from "../../components/OrderList/OrderList";
//import EncryptedStorage from 'react-native-encrypted-storage';
//import CustomLoader from "../../components/CustomLoader";
//import axios from "axios";
//
//const MyOrderScreen = ({ navigation, route }) => {
//  const { user } = route.params;
//  const [isloading, setIsloading] = useState(false);
//  const [label, setLabel] = useState("Please wait...");
//  const [refeshing, setRefreshing] = useState(false);
//  const [orders, setOrders] = useState([]);
//console.log(user)
//  const fetchOrders = async() => {
//    setIsloading(true);
//    const userId = user.id;
//const token = await EncryptedStorage.getItem("authToken")
//    axios
//      .get(`${network.serverip}/user/order/getUserOrder`, {
//        params: { userId },
//         headers: {
//         'Authorization': `Bearer ${token}`,
//         },
//
//      })
//      .then((response) => {
//        if (response.status === 200) {
//          setOrders(response.data.data);
//        }
//        setIsloading(false);
//      })
//      .catch((error) => {
//        setIsloading(false);
//        console.log("Error fetching orders:", error.message);
//      });
//  };
//
//  const handleOnRefresh = () => {
//    setRefreshing(true);
//    fetchOrders();
//    setRefreshing(false);
//  };
//
//  const handleOrderDetail = (item) => {
//    navigation.navigate("myorderdetail", {
//      orderDetail: item,
//    });
//  };
//
//  useEffect(() => {
//    fetchOrders();
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar barStyle="dark-content" />
//      <CustomLoader visible={isloading} autoClose={true} />
//
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity
//          onPress={() => {
//            navigation.goBack();
//          }}
//        >
//          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
//        </TouchableOpacity>
//        <Text style={styles.topBarTitle}>My Orders</Text>
//      </View>
//
//      <View style={styles.screenNameContainer}>
//
//        <Text style={styles.screenNameParagraph}>
//          Your orders and their statuses
//        </Text>
//      </View>
//
//      {orders.length === 0 ? (
//        <View style={styles.ListContainerEmpty}>
//          <Text style={styles.secondaryTextSmItalic}>You haven't placed any orders yet.</Text>
//        </View>
//      ) : (
//        <ScrollView
//          style={styles.scrollView}
//          showsVerticalScrollIndicator={false}
//          refreshControl={<RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />}
//        >
//          {orders.map((order, index) => (
//            <OrderList key={index} item={order} onPress={() => handleOrderDetail(order)} />
//          ))}
//          <View style={styles.emptyView}></View>
//        </ScrollView>
//      )}
//    </View>
//  );
//};
//
//export default MyOrderScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.light,
//  },
//  topBarContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//    backgroundColor:"#111827",
//    paddingVertical: 15,
//    paddingHorizontal: 20,
//    elevation: 5, // Adds shadow effect for iOS
//  },
//  topBarTitle: {
//    marginLeft: 20,
//    fontSize: 26,
//    fontWeight: "800",
//    color: colors.primary,
//  },
//  screenNameContainer: {
//    paddingHorizontal: 20,
//    paddingVertical: 10,
//  },
//  screenNameText: {
//    fontSize: 30,
//    fontWeight: "800",
//    color: colors.muted,
//  },
//  screenNameParagraph: {
//    fontSize: 16,
//    color: colors.muted,
//    marginTop: 5,
//  },
//  scrollView: {
//    flex: 1,
//    width: "100%",
//    paddingHorizontal: 20,
//  },
//  emptyView: {
//    height: 20,
//  },
//  ListContainerEmpty: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  emptyImage: {
//    width: "100%",
//    height: 100,
//    marginBottom: 15,
//    tintColor: colors.muted,
//  },
//  secondaryTextSmItalic: {
//    fontSize: 15,
//    color: colors.muted,
//    fontStyle: "italic",
//  },
//});



////correct down

//import {
//  StyleSheet,
//  Text,
//  StatusBar,
//  View,
//  ScrollView,
//  TouchableOpacity,
//  RefreshControl,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { colors, network } from "../../constants";
//import { Ionicons } from "@expo/vector-icons";
//import OrderList from "../../components/OrderList/OrderList";
//import EncryptedStorage from "react-native-encrypted-storage";
//import CustomLoader from "../../components/CustomLoader";
//import axios from "axios";
//
//const MyOrderScreen = ({ navigation, route }) => {
//  const { user } = route.params || {}; // Ensure user is always checked
//  const [isLoading, setIsLoading] = useState(false);
//  const [refreshing, setRefreshing] = useState(false);
//  const [orders, setOrders] = useState([]);
//
//  const fetchOrders = async () => {
//    if (user.name === "Guest" ) {
//      return; // Prevent fetching if user is a guest
//    }
//
//    setIsLoading(true);
//    const userId = user.id;
//    const token = await EncryptedStorage.getItem("authToken");
//
//    axios
//      .get(`${network.serverip}/user/order/getUserOrder`, {
//        params: { userId },
//        headers: {
//          Authorization: `Bearer ${token}`,
//        },
//      })
//      .then((response) => {
//        if (response.status === 200) {
//          setOrders(response.data.data);
//        }
//      })
//      .catch((error) => {
//        console.log("Error fetching orders:", error.message);
//      })
//      .finally(() => {
//        setIsLoading(false);
//      });
//  };
//
//  const handleOnRefresh = () => {
//    if (user.name === "Guest" || !user.id) {
//      return; // Prevent refreshing for guests
//    }
//    setRefreshing(true);
//    fetchOrders();
//    setRefreshing(false);
//  };
//
//  const handleOrderDetail = (item) => {
//    if (user.name === "Guest" ) {
//      return;
//    }
//    navigation.navigate("myorderdetail", {
//      orderDetail: item,
//    });
//  };
//
//  useEffect(() => {
//    fetchOrders();
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar barStyle="dark-content" />
//      <CustomLoader visible={isLoading} autoClose={true} />
//
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity onPress={() => navigation.goBack()}>
//          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
//        </TouchableOpacity>
//        <Text style={styles.topBarTitle}>My Orders</Text>
//      </View>
//
//      <View style={styles.screenNameContainer}>
//        <Text style={styles.screenNameParagraph}>Your orders and their statuses</Text>
//      </View>
//
//      {user.name === "Guest"? (
//        <View style={styles.guestContainer}>
//          <Text style={styles.guestText}>Guest users cannot access orders.</Text>
//        </View>
//      ) : orders.length === 0 ? (
//        <View style={styles.ListContainerEmpty}>
//          <Text style={styles.secondaryTextSmItalic}>You haven't placed any orders yet.</Text>
//        </View>
//      ) : (
//        <ScrollView
//          style={styles.scrollView}
//          showsVerticalScrollIndicator={false}
//          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />}
//        >
//          {orders.map((order, index) => (
//            <OrderList key={index} item={order} onPress={() => handleOrderDetail(order)} />
//          ))}
//          <View style={styles.emptyView}></View>
//        </ScrollView>
//      )}
//    </View>
//  );
//};
//
//export default MyOrderScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.light,
//  },
//  topBarContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//    backgroundColor: "#111827",
//    paddingVertical: 15,
//    paddingHorizontal: 20,
//    elevation: 5, // Adds shadow effect for iOS
//  },
//  topBarTitle: {
//    marginLeft: 20,
//    fontSize: 26,
//    fontWeight: "800",
//    color: colors.primary,
//  },
//  screenNameContainer: {
//    paddingHorizontal: 20,
//    paddingVertical: 10,
//  },
//  screenNameParagraph: {
//    fontSize: 16,
//    color: colors.muted,
//    marginTop: 5,
//  },
//  scrollView: {
//    flex: 1,
//    width: "100%",
//    paddingHorizontal: 20,
//  },
//  emptyView: {
//    height: 20,
//  },
//  ListContainerEmpty: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  secondaryTextSmItalic: {
//    fontSize: 15,
//    color: colors.muted,
//    fontStyle: "italic",
//  },
//  guestContainer: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  guestText: {
//    fontSize: 18,
//    color: colors.muted,
//    fontWeight: "bold",
//  },
//});

///correct above



import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import OrderList from "../../components/OrderList/OrderList";
import EncryptedStorage from "react-native-encrypted-storage";
import CustomLoader from "../../components/CustomLoader";
import axios from "axios";

const MyOrderScreen = ({ navigation, route }) => {
  const { user } = route.params || {}; // Ensure user is always checked
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    if (user.name === "Guest" ) {
      return; // Prevent fetching if user is a guest
    }

    setIsLoading(true);
    const userId = user.id;
    const token = await EncryptedStorage.getItem("authToken");

    axios
      .get(`${network.serverip}/user/order/getUserOrder`, {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching orders:", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnRefresh = () => {
    if (user.name === "Guest" || !user.id) {
      return; // Prevent refreshing for guests
    }
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  };

  const handleOrderDetail = (item) => {
    if (user.name === "Guest" ) {
      return;
    }
    navigation.navigate("myorderdetail", {
      orderDetail: item,
    });
  };

  const handleCancelOrder = async (orderId) => {
    if (user.name === "Guest" ) {
      return;
    }

    setIsLoading(true);
    const token = await EncryptedStorage.getItem("authToken");
    const userId = user.id;
    axios
      .delete(`${network.serverip}/user/order/cancelOrder`, {
        params: { userId,orderId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
      console.log(response.data)
        if (response.status === 200) {
          setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
        }
      })
      .catch((error) => {
        console.log("Error canceling order:", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(user.id)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CustomLoader visible={isLoading} autoClose={true} />

      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>My Orders</Text>
      </View>

      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameParagraph}>Your orders and their statuses</Text>
      </View>

      {user.name === "Guest"? (
        <View style={styles.guestContainer}>
          <Text style={styles.guestText}>Guest users cannot access orders.</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.ListContainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>You haven't placed any orders yet.</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />}
        >
          {orders.map((order, index) => (
            <View key={index} style={styles.orderItem}>
              <OrderList item={order}  onPress={() => handleOrderDetail(order)}
                                          onCancel={(orderId) => handleCancelOrder(orderId)} />

            </View>
          ))}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  topBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5, // Adds shadow effect for iOS
  },
  topBarTitle: {
    marginLeft: 20,
    fontSize: 26,
    fontWeight: "800",
    color: colors.primary,
  },
  screenNameContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  screenNameParagraph: {
    fontSize: 16,
    color: colors.muted,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  emptyView: {
    height: 20,
  },
  ListContainerEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryTextSmItalic: {
    fontSize: 15,
    color: colors.muted,
    fontStyle: "italic",
  },
  guestContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  guestText: {
    fontSize: 18,
    color: colors.muted,
    fontWeight: "bold",
  },
  orderItem: {
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: colors.danger,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

