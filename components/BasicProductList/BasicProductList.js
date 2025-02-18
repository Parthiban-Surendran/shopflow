import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";

const BasicProductList = ({ image, title, price, quantity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.productImage} />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.secondaryText} numberOfLines={1}>
            {title || "Product Name"}
          </Text>
          <Text style={styles.quantityText}>x{quantity || 1}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.primaryText}>
          {quantity && price ? `${quantity * price}$` : "0$"}
        </Text>
      </View>
    </View>
  );
};

export default BasicProductList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    padding: 10,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: colors.light,
    borderRadius: 8,
    overflow: "hidden",
    height: 60,
    width: 60,
    justifyContent: "center",
    resizeMode:"contain",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  productInfoContainer: {
    marginLeft: 15,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 5,
  },
  quantityText: {
    fontSize: 13,
    color: colors.muted,
  },
});
