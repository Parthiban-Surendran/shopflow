import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { network } from '../../constants';
import ProgressDialog from "react-native-progress-dialog";

const CategoryProducts = ({ route, navigation }) => {
  const { categoryId } = route.params;  // Get the categoryId passed from the carousel click
  const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true); // State for loading
  const [label, setLabel] = useState("Loading products..."); // Label for ProgressDialog


  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `${network.serverip}/products/getProductsByCategory?subCategoryId=${categoryId}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Products in this Category</Text>

      {loading ? (
  <ProgressDialog visible={loading} label="Loading products..." />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}  // Display products in two columns
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => navigation.navigate('productdetail', { product: item })}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.offerPrice}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default CategoryProducts;
