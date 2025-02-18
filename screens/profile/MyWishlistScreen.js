//import {
//  StyleSheet,
//  Text,
//  StatusBar,
//  View,
//  ScrollView,
//  TouchableOpacity,
//  Alert,
//  RefreshControl,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { colors, network } from "../../constants";
//import { Ionicons } from "@expo/vector-icons";
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import ProgressDialog from "react-native-progress-dialog";
//import EncryptedStorage from 'react-native-encrypted-storage';
//import WishList from "../../components/WishList/WishList";
//import axios from "axios";
//import CustomLoader from "../../components/CustomLoader";
//
//
//const MyWishlistScreen = ({ navigation, route }) => {
//  const { user } = route.params;
//  const [isloading, setIsloading] = useState(false);
//  const [label, setLabel] = useState("Please wait...");
//  const [refeshing, setRefreshing] = useState(false);
//  const [alertType, setAlertType] = useState("error");
//  const [error, setError] = useState("");
//  const [wishlist, setWishlist] = useState([]);
//  const [onWishlist, setOnWishlist] = useState(true);
//
//  const handleView = (product) => {
//    navigation.navigate("productdetail", { product });
//  };
//
//
//  const handleOnRefresh = () => {
//    setRefreshing(true);
//    fetchWishlist();
//    setRefreshing(false);
//  };
//
//  const fetchWishlist = async () => {
//    setIsloading(true);
//    try {
//    const token = await EncryptedStorage.getItem("authToken")
//    const userId = await EncryptedStorage.getItem("userid")
//    console.log(token,userId)
//      const response = await axios.get(
//        `${network.serverip}/user/wishlist/viewWishlist?userId=${userId}`,
//        {
//          headers: {
//            Authorization: `Bearer ${token}`,
//            "Content-Type": "application/json",
//          },
//        }
//      );
//      console.log("LLL",response.data)
//      if (response.status===200) {
//        setWishlist(response.data.data.products);
//        setError("");
//      }
//    } catch (error) {
//      setError("Guest Cannot Access WishList");
//    } finally {
//      setIsloading(false);
//    }
//  };
//
//  const handleAddOrRemoveFromWishlist = async (productId) => {
//  const userId = await EncryptedStorage.getItem("userid")
//  const token  = await EncryptedStorage.getItem("authToken")
//
//    try {
//      const response = await axios.post(
//             `${network.serverip}/user/wishlist/addOrRemoveItem`,{},
//
//              {
//                params: { userId, productId },
//                headers: {
//                  Authorization: `Bearer ${token}`,
//                  "Content-Type": "application/json",
//                },
//              }
//            );
//      console.log(response.data)
//      if (response.data.status === "success"){
//      Alert.alert("Success",response.data.message)
//        setError(response.data.message);
//        setAlertType("success");
//      } else {
//        setError(response.data.message);
//        setAlertType("error");
//      }
//      setOnWishlist(!onWishlist);
//    } catch (error) {
//      setError(error.message);
//      setAlertType("error");
//    }
//  };
//
//  useEffect(() => {
//    setError("");
//    fetchWishlist();
//  }, []);
//
//  useEffect(() => {
//    fetchWishlist();
//  }, [onWishlist]);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <CustomLoader visible={isloading} autoClose={true} />
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
//        <View />
//
//      </View>
//      <View style={styles.screenNameContainer}>
//        <Text style={styles.screenNameText}>My Wishlist</Text>
//
//      </View>
//      <CustomAlert message={error} type={alertType} />
//      {wishlist.length === 0 ? (
//        <View style={styles.ListContiainerEmpty}>
//          <Text style={styles.secondaryTextSmItalic}>
//            "Make your Wishlist here..."
//          </Text>
//        </View>
//      ) : (
//        <ScrollView
//          style={styles.scrollView}
//          showsVerticalScrollIndicator={false}
//          refreshControl={
//            <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
//          }
//        >
//          {wishlist.map((list, index) => (
//            <WishList
//              image={list?.product?.image}
//              title={list?.product?.name}
//              description={list?.product?.description}
//              key={index}
//              onPressView={() => handleView(list?.product)}
//              onPressRemove={() => handleAddOrRemoveFromWishlist(list?.product.id)}
//            />
//          ))}
//          <View style={styles.emptyView} />
//        </ScrollView>
//      )}
//    </View>
//  );
//};
//
//export default MyWishlistScreen;
//
//const styles = StyleSheet.create({
//  container: {
//    width: "100%",
//    flexDirection: "column",
//    backgroundColor: colors.light,
//    flex: 1,
//  },
//  topBarContainer: {
//    width: "100%",
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//    padding: 20,
//  },
//  screenNameContainer: {
//    padding: 20,
//    paddingTop: 0,
//    paddingBottom: 0,
//    width: "100%",
//    display: "flex",
//    flexDirection: "column",
//    justifyContent: "flex-start",
//    alignItems: "flex-start",
//  },
//  screenNameText: {
//    fontSize: 30,
//    fontWeight: "800",
//    color: colors.muted,
//  },
//  screenNameParagraph: {
//    marginTop: 5,
//    fontSize: 15,
//  },
//  scrollView: {
//    flex: 1,
//    width: "100%",
//    padding: 20,
//  },
//  ListContiainerEmpty: {
//    width: "100%",
//    justifyContent: "center",
//    alignItems: "center",
//    flex: 1,
//  },
//  secondaryTextSmItalic: {
//    fontStyle: "italic",
//    fontSize: 15,
//    color: colors.muted,
//  },
//  emptyView: {
//    height: 20,
//  },
//});



import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import EncryptedStorage from 'react-native-encrypted-storage';
import WishList from "../../components/WishList/WishList";
import axios from "axios";
import CustomLoader from "../../components/CustomLoader";

const MyWishlistScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Please wait...");
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [onWishlist, setOnWishlist] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  const handleView = (product) => {
    navigation.navigate("productdetail", { product });
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchWishlist();
    setRefreshing(false);
  };

  const fetchWishlist = async () => {
    setIsloading(true);
    try {
      const token = await EncryptedStorage.getItem("authToken");
      setAuthToken(token);

      if (!token) {
      Alert.alert("Alert","Guest Users Cannot have Wishlist")
        setError("Guest users cannot access the wishlist.");
        return;
      }

      const userId = await EncryptedStorage.getItem("userid");
      const response = await axios.get(
        `${network.serverip}/user/wishlist/viewWishlist?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setWishlist(response.data.data.products);
        setError("");
      }
    } catch (error) {
      setError("Failed to fetch wishlist.");
    } finally {
      setIsloading(false);
    }
  };

  const handleAddOrRemoveFromWishlist = async (productId) => {
    if (!authToken) {
      setError("Guest users cannot add/remove items from the wishlist.");
      return;
    }

    const userId = await EncryptedStorage.getItem("userid");

    try {
      const response = await axios.post(
        `${network.serverip}/user/wishlist/addOrRemoveItem`,
        {},
        {
          params: { userId, productId },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        Alert.alert("Success", response.data.message);
        setError(response.data.message);
        setAlertType("success");
      } else {
        setError(response.data.message);
        setAlertType("error");
      }
      setOnWishlist(!onWishlist);
    } catch (error) {
      setError(error.message);
      setAlertType("error");
    }
  };

  useEffect(() => {
    setError("");
    fetchWishlist();
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [onWishlist]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <CustomLoader visible={isloading} autoClose={true} />
      <View style={styles.topBarContainer}>
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
        <View />
      </View>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>My Wishlist</Text>
      </View>
      <CustomAlert message={error} type={alertType} />
      {error ? (
        <View style={styles.ListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>{error}</Text>
        </View>
      ) : wishlist.length === 0 ? (
        <View style={styles.ListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>
            "Make your Wishlist here..."
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
          }
        >
          {wishlist.map((list, index) => (
            <WishList
              image={list?.product?.image}
              title={list?.product?.name}
              description={list?.product?.description}
              key={index}
              onPressView={() => handleView(list?.product)}
              onPressRemove={() => handleAddOrRemoveFromWishlist(list?.product.id)}
            />
          ))}
          <View style={styles.emptyView} />
        </ScrollView>
      )}
    </View>
  );
};

export default MyWishlistScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: colors.light,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  scrollView: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
  ListContiainerEmpty: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
  emptyView: {
    height: 20,
  },
});
