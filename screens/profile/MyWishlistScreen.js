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
//import CustomAlert from "../../components/CustomAlert/CustomAlert";
//import ProgressDialog from "react-native-progress-dialog";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import WishList from "../../components/WishList/WishList";
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
//  //method to navigate to the product detail screen of the specific product
//  const handleView = (product) => {
//    navigation.navigate("productdetail", { product: product });
//  };
//
//  //method the remove the authUser from Aysnc Storage and navigate back to login screen
//  const logout = async () => {
//    await AsyncStorage.removeItem("authUser");
//    navigation.replace("login");
//  };
//
//  //method call on pull refresh
//  const handleOnRefresh = () => {
//    setRefreshing(true);
//    fetchWishlist();
//    setRefreshing(false);
//  };
//
//  //method to fetch the wishlist from server using API call
//  const fetchWishlist = () => {
//    var myHeaders = new Headers();
//    myHeaders.append("x-auth-token", user.token);
//
//    var requestOptions = {
//      method: "GET",
//      headers: myHeaders,
//      redirect: "follow",
//    };
//    setIsloading(true);
//    fetch(`${network.serverip}/wishlist`, requestOptions) // API call
//      .then((response) => response.json())
//      .then((result) => {
//        //check if the token is expired
//        if (result?.err === "jwt expired") {
//          logout();
//        }
//        if (result.success) {
//          setWishlist(result.data[0].wishlist);
//          setError("");
//        }
//        setIsloading(false);
//      })
//      .catch((error) => {
//        setIsloading(false);
//        setError(error.message);
//        console.log("error", error);
//      });
//  };
//
//  //method to remove the item from wishlist using API call
//  const handleRemoveFromWishlist = (id) => {
//    var myHeaders = new Headers();
//    myHeaders.append("x-auth-token", user.token);
//
//    var requestOptions = {
//      method: "GET",
//      headers: myHeaders,
//      redirect: "follow",
//    };
//
//    fetch(`${network.serverip}/remove-from-wishlist?id=${id}`, requestOptions)
//      .then((response) => response.json())
//      .then((result) => {
//        if (result.success) {
//          setError(result.message);
//          setAlertType("success");
//        } else {
//          setError(result.message);
//          setAlertType("error");
//        }
//        setOnWishlist(!onWishlist);
//      })
//      .catch((error) => {
//        setError(result.message);
//        setAlertType("error");
//        console.log("error", error);
//      });
//  };
//
//  //fetch the wishlist on initial render
//  useEffect(() => {
//    setError("");
//    fetchWishlist();
//  }, []);
//
//  //fetch the wishlist data from server whenever the value of onWishList change
//  useEffect(() => {
//    fetchWishlist();
//  }, [onWishlist]);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar></StatusBar>
//      <ProgressDialog visible={isloading} label={label} />
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
//        <TouchableOpacity onPress={() => handleOnRefresh()}>
//          <Ionicons name="heart-outline" size={30} color={colors.primary} />
//        </TouchableOpacity>
//      </View>
//      <View style={styles.screenNameContainer}>
//        <View>
//          <Text style={styles.screenNameText}>My Wishlist</Text>
//        </View>
//        <View>
//          <Text style={styles.screenNameParagraph}>
//            View , add or remove products from wishlist for later purchase
//          </Text>
//        </View>
//      </View>
//      <CustomAlert message={error} type={alertType} />
//      {wishlist.length == 0 ? (
//        <View style={styles.ListContiainerEmpty}>
//          <Text style={styles.secondaryTextSmItalic}>
//            "There are no product in wishlist yet."
//          </Text>
//        </View>
//      ) : (
//        <ScrollView
//          style={{ flex: 1, width: "100%", padding: 20 }}
//          showsVerticalScrollIndicator={false}
//          refreshControl={
//            <RefreshControl
//              refreshing={refeshing}
//              onRefresh={handleOnRefresh}
//            />
//          }
//        >
//          {wishlist.map((list, index) => {
//            return (
//              <WishList
//                image={`${network.serverip}/uploads/${list?.productId?.image}`}
//                title={list?.productId?.title}
//                description={list?.productId?.description}
//                key={index}
//                onPressView={() => handleView(list?.productId)}
//                onPressRemove={() =>
//                  handleRemoveFromWishlist(list?.productId?._id)
//                }
//              />
//            );
//          })}
//          <View style={styles.emptyView}></View>
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
//  bodyContainer: {
//    width: "100%",
//    flexDirecion: "row",
//    backgroundColor: colors.light,
//    alignItems: "center",
//    justifyContent: "flex-start",
//    flex: 1,
//  },
//  emptyView: {
//    height: 20,
//  },
//  ListContiainerEmpty: {
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
//});




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
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WishList from "../../components/WishList/WishList";
import axios from "axios";

const MyWishlistScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Please wait...");
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [onWishlist, setOnWishlist] = useState(true);

  const handleView = (product) => {
    navigation.navigate("productdetail", { product: product });
  };


  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchWishlist();
    setRefreshing(false);
  };

  const fetchWishlist = async () => {
    setIsloading(true);
    try {
    const token = await AsyncStorage.getItem("authToken")
    const userId = await AsyncStorage.getItem("userid")
      const response = await axios.get(
        `https://shopflow-1.onrender.com/user/wishlist/viewWishlist?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("wishlist::::", response.data);
    console.log(response.status)
      if (response.status===200) {
      console.log("entered")
        setWishlist(response.data.data.products);
        console.log("ppp",wishlist)
        setError("");
      }
    } catch (error) {
      setError(error.message);
      console.log("error", error);
    } finally {
      setIsloading(false);
    }
  };

  const handleAddOrRemoveFromWishlist = async (productId) => {
    try {
    console.log("entered")
      const response = await axios.post(
        "https://shopflow-1.onrender.com/user/wishlist/addOrRemoveItem",
        {},
        {
          params: {
            userId: user.id,
            productId: productId,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(user.id,productId,token)
      if (response.data.success) {
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
      console.log("error", error);
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
      <ProgressDialog visible={isloading} label={label} />
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
        <TouchableOpacity onPress={() => handleOnRefresh()}>
          <Ionicons name="heart-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>My Wishlist</Text>

      </View>
      <CustomAlert message={error} type={alertType} />
      {wishlist.length === 0 ? (
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
              onPressView={() => handleView(list?.product?.id)}
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
