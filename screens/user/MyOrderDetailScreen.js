import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import StepIndicator from "react-native-step-indicator";

const MyOrderDetailScreen = ({ navigation, route }) => {
  const { orderDetail } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Loading..");
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState("");
  const [value, setValue] = useState(null);
  const [statusDisable, setStatusDisable] = useState(false);
  const labels = ["Processing", "Shipping", "Delivery"];
  const [trackingState, setTrackingState] = useState(1);
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: colors.white,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };

  //method to convert time to AM PM format
  function tConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join("");
  }

  //method to convert data to dd-mm-yyyy  format
  const dateFormat = (datex) => {
    let t = new Date(datex);
    const date = ("0" + t.getDate()).slice(-2);
    const month = ("0" + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ("0" + t.getHours()).slice(-2);
    const minutes = ("0" + t.getMinutes()).slice(-2);
    const seconds = ("0" + t.getSeconds()).slice(-2);
    const time = tConvert(`${hours}:${minutes}:${seconds}`);
    const newDate = `${date}-${month}-${year}, ${time}`;

    return newDate;
  };


  // set total cost, order detail, order status on initial render
  useEffect(() => {
    setError("");
    setAlertType("error");
    if (orderDetail?.orderStatus == "CONFIRMED") {
      setStatusDisable(true);
    } else {
      setStatusDisable(false);
    }
    setValue(orderDetail?.status);
    setAddress(
      orderDetail?.country +
        ", " +
        orderDetail?.city +
        ", " +
        orderDetail?.shippingAddress
    );
    setTotalCost(
      orderDetail.total
    );
    if (orderDetail?.status === "pending") {
      setTrackingState(1);
    } else if (orderDetail?.status === "shipped") {
      setTrackingState(2);
    } else {
      setTrackingState(3);
    }
  }, []);

  const cancelOrder = async (orderId, productId) => {
    try {
      setIsloading(true);
      setLabel("Cancelling...");

      const response = await fetch(`${network.serverip}/user/order/cancelOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, productId }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("Order cancelled successfully!");
        setAlertType("success");

        // Update UI by filtering out the cancelled product
        setOrderDetail(prevState => ({
          ...prevState,
          items: prevState.items.filter(item => item.productId !== productId)
        }));

      } else {
        setError(data.message || "Failed to cancel order");
        setAlertType("error");
      }
    } catch (error) {
      setError("Something went wrong!");
      setAlertType("error");
    } finally {
      setIsloading(false);
    }
  };


  return (
    <View style={styles.container}>
      <ProgressDialog visible={isloading} label={label} />
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
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

      <View style={styles.screenNameContainer}>
             <Text style={styles.screenNameText}>Order Details</Text>
      </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
      >


        <View>
          <Text style={styles.containerNameText}>Order Info</Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            Order # {orderDetail?.items[0].orderId}
          </Text>
          <Text style={styles.secondarytextSm}>
            Ordered on {dateFormat(orderDetail?.orderDate)}
          </Text>
          {orderDetail?.shippedOn && (
            <Text style={styles.secondarytextSm}>
              Shipped on {orderDetail?.shippedOn}
            </Text>
          )}
          {orderDetail?.deliveredOn && (
            <Text style={styles.secondarytextSm}>
              Delivered on {orderDetail?.deliveredOn}
            </Text>
          )}
          <View style={{ marginTop: 15, width: "100%" }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={trackingState}
              stepCount={3}
              labels={labels}
            />
          </View>
        </View>

        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Package Details</Text>
          </View>
        </View>
        <View style={styles.orderItemsContainer}>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Package</Text>
            <Text>{value}</Text>
          </View>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>
              Order on : {orderDetail?.orderDate}
            </Text>
          </View>
          <ScrollView
            style={styles.orderSummaryContainer}
            nestedScrollEnabled={true}
          >
            {orderDetail?.items.map((product, index) => (
              <View key={index}>
                <BasicProductList
                image={product?.image}
                  title={product?.productName}
                  price={product?.offerPrice}
                  quantity={product?.quantity}
                />
                <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => cancelOrder(orderDetail?.orderId, product?.id)}
                    >
                          <Text style={styles.cancelButtonText}>Cancel</Text>

                    </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Total</Text>
            <Text>{": "+totalCost.toFixed(2)}$</Text>
          </View>
        </View>
        <View style={styles.emptyView}></View>
      </ScrollView>
    </View>
  );
};

export default MyOrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",

    paddingBottom: 0,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height:70,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:"#111827",
    padding:10,
  },

  screenNameContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginLeft:20,

  },
  screenNameText: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.primary,
  },
  screenNameParagraph: {
    marginTop: 10,
    fontSize: 15,

  },
  bodyContainer: { flex: 1, width: "100%", padding: 10,},
  ShipingInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.muted,
    elevation: 5,
    marginBottom: 10,
  },
  containerNameContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerNameText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.muted,
  },
  secondarytextSm: {
    color: colors.muted,
    fontSize: 13,
  },
  orderItemsContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 3,
    marginBottom: 10,
  },
  orderItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "sorderItemContainerpace-between",
    alignItems: "center",
  },
  orderItemText: {
    fontSize: 13,
    color: colors.muted,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    width: "100%",
    marginBottom: 5,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    width: "110%",
    height: 70,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingLeft: 10,
    paddingRight: 10,
  },
  orderInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 1,
    marginBottom: 10,
  },
  primarytextMedian: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  secondarytextMedian: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "bold",
  },
  emptyView: {
    height: 20,
  },
});
