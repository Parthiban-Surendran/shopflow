//import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import React, { useState, useEffect } from "react";
//import { colors } from "../../constants";
//
//function getTime(date) {
//  let t = new Date(date);
//  const hours = ("0" + t.getHours()).slice(-2);
//  const minutes = ("0" + t.getMinutes()).slice(-2);
//  const seconds = ("0" + t.getSeconds()).slice(-2);
//  let time = `${hours}:${minutes}:${seconds}`;
//  // Check correct time format and split into components
//  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
//    time,
//  ];
//
//  if (time.length > 1) {
//    // If time format correct
//    time = time.slice(1); // Remove full string match value
//    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
//    time[0] = +time[0] % 12 || 12; // Adjust hours
//  }
//  return time.join(""); // return adjusted time or original string
//}
//
//const dateFormat = (datex) => {
//  let t = new Date(datex);
//  const date = ("0" + t.getDate()).slice(-2);
//  const month = ("0" + (t.getMonth() + 1)).slice(-2);
//  const year = t.getFullYear();
//  const hours = ("0" + t.getHours()).slice(-2);
//  const minutes = ("0" + t.getMinutes()).slice(-2);
//  const seconds = ("0" + t.getSeconds()).slice(-2);
//  const newDate = `${date}-${month}-${year}`;
//
//  return newDate;
//};
//
//const OrderList = ({ item, onPress }) => {
//  const [totalCost, setTotalCost] = useState(0);
//  const [quantity, setQuantity] = useState(0);
//console.log("ORderlist:",item)
//  useEffect(() => {
//    let packageItems = 0;
//    item?.items.forEach(() => {
//      ++packageItems;
//    });
//    setQuantity(packageItems);
//    setTotalCost(
//      item?.items.reduce((accumulator, object) => {
//        return (accumulator + object.price) * object.quantity;
//      }, 0)
//    );
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      <View style={styles.innerRow}>
//        <View>
//          <Text style={styles.primaryText}>Order # {item?.orderId}</Text>
//        </View>
//        <View style={styles.timeDateContainer}>
//          <Text style={styles.secondaryTextSm}>
//            {dateFormat(item?.createdAt)}
//          </Text>
//          <Text style={styles.secondaryTextSm}>{getTime(item?.createdAt)}</Text>
//        </View>
//      </View>
//      {item?.user?.name && (
//        <View style={styles.innerRow}>
//          <Text style={styles.secondaryText}>{item?.user?.name} </Text>
//        </View>
//      )}
//      {item?.user?.email && (
//        <View style={styles.innerRow}>
//          <Text style={styles.secondaryText}>{item?.user?.email} </Text>
//        </View>
//      )}
//      <View style={styles.innerRow}>
//        <Text style={styles.secondaryText}>Quantity : {quantity}</Text>
//        <Text style={styles.secondaryText}>Total Amount : {totalCost}$</Text>
//      </View>
//      <View style={styles.innerRow}>
//        <TouchableOpacity style={styles.detailButton} onPress={onPress}>
//          <Text>Details</Text>
//        </TouchableOpacity>
//        <Text style={styles.secondaryText}>{item?.status}</Text>
//      </View>
//    </View>
//  );
//};
//
//export default OrderList;
//
//const styles = StyleSheet.create({
//  container: {
//    display: "flex",
//    flexDirection: "column",
//    justifyContent: "flex-start",
//    alignItems: "center",
//    width: "100%",
//    height: "auto",
//    backgroundColor: colors.white,
//    borderRadius: 10,
//    padding: 10,
//    marginBottom: 10,
//    elevation: 1,
//  },
//  innerRow: {
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//    width: "100%",
//  },
//  primaryText: {
//    fontSize: 15,
//    color: colors.dark,
//    fontWeight: "bold",
//  },
//  secondaryTextSm: {
//    fontSize: 11,
//    color: colors.muted,
//    fontWeight: "bold",
//  },
//  secondaryText: {
//    fontSize: 14,
//    color: colors.muted,
//    fontWeight: "bold",
//  },
//  timeDateContainer: {
//    display: "flex",
//    flexDirection: "column",
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  detailButton: {
//    marginTop: 10,
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    borderRadius: 10,
//    borderWidth: 1,
//    padding: 5,
//    borderColor: colors.muted,
//    color: colors.muted,
//    width: 100,
//  },
//});


//
//import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
//import React, { useState, useEffect } from "react";
//import { colors } from "../../constants";
//
//function getTime(date) {
//  let t = new Date(date);
//  const hours = ("0" + t.getHours()).slice(-2);
//  const minutes = ("0" + t.getMinutes()).slice(-2);
//  const seconds = ("0" + t.getSeconds()).slice(-2);
//  let time = `${hours}:${minutes}:${seconds}`;
//  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
//
//  if (time.length > 1) {
//    time = time.slice(1);
//    time[5] = +time[0] < 12 ? " AM" : " PM";
//    time[0] = +time[0] % 12 || 12;
//  }
//  return time.join("");
//}
//
//const dateFormat = (datex) => {
//  let t = new Date(datex);
//  const date = ("0" + t.getDate()).slice(-2);
//  const month = ("0" + (t.getMonth() + 1)).slice(-2);
//  const year = t.getFullYear();
//  const newDate = `${date}-${month}-${year}`;
//  return newDate;
//};
//
//const OrderList = ({ item, onPress }) => {
//  const [totalCost, setTotalCost] = useState(0);
//  const [quantity, setQuantity] = useState(0);
//console.log("Order:",item)
//  useEffect(() => {
//    let packageItems = 0;
//    item?.items.forEach(() => {
//      ++packageItems;
//    });
//    setQuantity(packageItems);
//    setTotalCost(
//      item?.items.reduce((accumulator, object) => {
//        return accumulator + (object.offerPrice * object.quantity);
//      }, 0)
//    );
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      <View style={styles.innerRow}>
//        <View>
//          <Text style={styles.primaryText}>Order {item?.items[0]?.orderId}</Text>
//        </View>
//        <View style={styles.timeDateContainer}>
//          <Text style={styles.secondaryTextSm}>
//            {dateFormat(item?.orderDate)}
//          </Text>
//          <Text style={styles.secondaryTextSm}>{getTime(item?.orderDate)}</Text>
//        </View>
//      </View>
//
//      <View style={styles.innerRow}>
//        <Text style={styles.secondaryText}>Quantity: {quantity}</Text>
//        <Text style={styles.secondaryText}>Total Amount: {totalCost}$</Text>
//      </View>
//
//      <View style={styles.productListContainer}>
//        {item?.items.map((product, index) => (
//          <View key={index} style={styles.itemRow}>
//            <Image source={{ uri: product.image }} style={styles.productImage} />
//            <View style={styles.itemDetails}>
//              <Text style={styles.productName}>{product.productName}</Text>
//              <Text style={styles.productPrice}>Price: {product.offerPrice}$</Text>
//              <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
//            </View>
//          </View>
//        ))}
//      </View>
//
//      <View style={styles.innerRow}>
//        <TouchableOpacity style={styles.detailButton} onPress={onPress}>
//          <Text>Details</Text>
//        </TouchableOpacity>
//        <Text style={styles.secondaryText}>{item?.status}</Text>
//      </View>
//    </View>
//  );
//};
//
//export default OrderList;
//
//const styles = StyleSheet.create({
//  container: {
//    display: "flex",
//    flexDirection: "column",
//    justifyContent: "flex-start",
//    alignItems: "center",
//    width: "100%",
//    height: "auto",
//    backgroundColor: colors.white,
//    borderRadius: 10,
//    padding: 15,
//    marginBottom: 20,
//    elevation: 3,
//    marginHorizontal: 10,
//    shadowColor: "#000",
//    shadowOffset: { width: 0, height: 2 },
//    shadowOpacity: 0.2,
//    shadowRadius: 4,
//  },
//  innerRow: {
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//    width: "100%",
//    marginBottom: 10,
//  },
//  primaryText: {
//    fontSize: 16,
//    color: colors.dark,
//    fontWeight: "600",
//  },
//  secondaryTextSm: {
//    fontSize: 12,
//    color: colors.muted,
//    fontWeight: "600",
//  },
//  secondaryText: {
//    fontSize: 14,
//    color: colors.muted,
//    fontWeight: "bold",
//  },
//  timeDateContainer: {
//    display: "flex",
//    flexDirection: "column",
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  productListContainer: {
//    marginTop: 15,
//    width: "100%",
//    paddingBottom: 10,
//  },
//  itemRow: {
//    display: "flex",
//    flexDirection: "row",
//    justifyContent: "flex-start",
//    alignItems: "center",
//    width: "100%",
//    marginBottom: 15,
//    paddingVertical: 10,
//    borderBottomWidth: 1,
//    borderBottomColor: colors.lightGray,
//  },
//  productImage: {
//    width: 60,
//    height: 60,
//    marginRight: 15,
//    borderRadius: 8,
//  },
//  itemDetails: {
//    flexDirection: "column",
//    justifyContent: "flex-start",
//    width: "70%",
//  },
//  productName: {
//    fontSize: 14,
//    fontWeight: "bold",
//    color: colors.dark,
//  },
//  productPrice: {
//    fontSize: 12,
//    color: colors.primary,
//  },
//  productQuantity: {
//    fontSize: 12,
//    color: colors.muted,
//  },
//  detailButton: {
//    marginTop: 10,
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    borderRadius: 10,
//    borderWidth: 1,
//    padding: 5,
//    borderColor: colors.primary,
//    backgroundColor: colors.primary,
//    color: colors.white,
//    width: 100,
//  },
//});
//


import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../constants";

function getTime(date) {
  let t = new Date(date);
  const hours = ("0" + t.getHours()).slice(-2);
  const minutes = ("0" + t.getMinutes()).slice(-2);
  const seconds = ("0" + t.getSeconds()).slice(-2);
  let time = `${hours}:${minutes}:${seconds}`;
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? " AM" : " PM";
    time[0] = +time[0] % 12 || 12;
  }
  return time.join("");
}

const dateFormat = (datex) => {
  let t = new Date(datex);
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const newDate = `${date}-${month}-${year}`;
  return newDate;
};

const OrderList = ({ item, onPress, onCancel }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let packageItems = 0;
    item?.items.forEach(() => {
      ++packageItems;
    });
    setQuantity(packageItems);
    setTotalCost(
      item?.items.reduce((accumulator, object) => {
        return accumulator + (object.offerPrice * object.quantity);
      }, 0)
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <View>
          <Text style={styles.primaryText}>Order {item?.items[0]?.orderId}</Text>
        </View>
        <View style={styles.timeDateContainer}>
          <Text style={styles.secondaryTextSm}>{"Placed on: "}
            {dateFormat(item?.orderDate)}
          </Text>
          <Text style={styles.secondaryTextSm}>{getTime(item?.orderDate)}</Text>
        </View>
      </View>

      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>Quantity: {quantity}</Text>
        <Text style={styles.secondaryText}>Total Amount: ${totalCost}</Text>
      </View>

      <View style={styles.productListContainer}>
        {item?.items.map((product, index) => (
          <View key={index} style={styles.itemBox}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.itemDetailsBox}>
              <Text style={styles.productName}>{product.productName}</Text>
              <View style={styles.productPriceBox}>
                <Text style={styles.productPrice}>Price: ${product.offerPrice}</Text>
              </View>
              <View style={styles.productQuantityBox}>
                <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.innerRow}>
        <TouchableOpacity style={styles.detailButton} onPress={onPress}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel(item.items[0].orderId)}>
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
        <Text style={styles.statusText}>{item?.status}</Text>
      </View>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  innerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  primaryText: {
    fontSize: 18,
    color: colors.dark,
    fontWeight: "bold",
  },
  secondaryTextSm: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
  },
  secondaryText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "600",
  },
  timeDateContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  productListContainer: {
    marginTop: 15,
    width: "100%",
  },
  itemBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,

    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    backgroundColor: colors.lightestGray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
   cancelButton: {
      backgroundColor: colors.danger,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginTop:15,
      marginLeft:70
//      alignSelf: "flex-start",
    },
    cancelButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
    },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 8,
    resizeMode:"contain"
  },
  itemDetailsBox: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "70%",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 5,
  },
  productPriceBox: {
    padding: 6,
    marginBottom: 6,
    backgroundColor: "#111827",
    borderRadius: 6,
    width: "80%",
  },
  productPrice: {
    fontSize: 14,
    color: colors.white,
  },
  productQuantityBox: {
    padding: 6,
    backgroundColor: colors.secondary,
    borderRadius: 6,
    width: "80%",
  },
  productQuantity: {
    fontSize: 14,
    color: colors.white,
  },
  detailButton: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    color: colors.white,
    width: 100,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
