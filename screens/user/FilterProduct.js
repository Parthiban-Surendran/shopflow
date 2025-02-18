import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  network } from "../../constants";

const { width } = Dimensions.get('window'); // Get screen width
const numColumns = 2; // Two columns for grid layout

const FilterProduct = ({ navigation }) => {
    const { categoryId, subcategory, maxPrice, sort } = useSelector((state) => state.filter);
      url= `${network.serverip}/products/filteredProducts,{}`

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFilteredProducts();
    }, [categoryId, subcategory, maxPrice, sort]);

    const renderStars = (rating) => {
        const totalStars = 5; // 5 stars for rating
        let stars = [];
        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <Icon
                    key={i}
                    name={i <= rating ? 'star' : 'star-border'}
                    size={16}
                    color="#ff9800"
                />
            );
        }
        return stars;
    };

    const fetchFilteredProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (categoryId) params.categoryName = categoryId;
            if (subcategory) params.subCategoryNames = subcategory;
            if (maxPrice) params.maxPrice = maxPrice;
            if (sort) params.sort = sort;

            const response = await axios.get(`${network.serverip}/products/filteredProducts`, { params });
            setFilteredProducts(response.data.data || []);
        } catch (err) {
            setError('Error fetching filtered products');
        } finally {
            setLoading(false);
        }
    };

    // Navigate to Product Details
    const handleProductPress = (product) => {
        navigation.navigate("ProductDetailView", { proId: product.id });
    };

    // Render each product as a card
    const renderProduct = ({ item }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>
                    ${item.offerPrice}{"  "}
                    <Text style={styles.strikeThrough}>${item.actualPrice}</Text>
                </Text>
                {item.originalPrice > item.discountedPrice && (
                    <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                )}
            </View>
            <View style={styles.ratingContainer}>
                {renderStars(item.rating)}
                <Text style={styles.ratingText}> ({item.rating})</Text>
            </View>
            <Text>Free Delivery</Text>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator size="large" color="#000" style={styles.loader} />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                numColumns={numColumns} // Show two items per row
                contentContainerStyle={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 8,
    },
    flatList: {
        paddingVertical: 10,
    },
    loader: {
        marginTop: 50,
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 18,
        marginTop: 20,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        margin: 6,
        width: (width / numColumns) - 16, // Adjust for margins
        alignItems: 'center',
        elevation: 3, // Shadow effect
    },
    productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 5,
    },
    ratingContainer: { flexDirection: 'row', marginTop: 5 },
    ratingText: { fontSize: 12, marginLeft: 5, color: '#777' },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    discountedPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff5722',
        marginRight: 6,
    },
    productPrice: { marginTop: 5, fontSize: 16, fontWeight: 'bold' },
    originalPrice: {
        fontSize: 14,
        color: '#888',
        textDecorationLine: 'line-through',
    },
    strikeThrough: { textDecorationLine: 'line-through', color: '#777', fontSize: 14 },
});

export default FilterProduct;
