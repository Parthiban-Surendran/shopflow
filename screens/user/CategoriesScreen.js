import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import axios from 'axios';
import CategorySidebar from './CategorySideBar';
import SubcategoryProductList from './SubcategoryProductList';
import ProgressDialog from "react-native-progress-dialog";
import CustomLoader from "../../components/CustomLoader";


const CATEGORY_API = `https://shopflow-new.onrender.com/products/Category`;
const SUBCATEGORY_API = `https://shopflow-new.onrender.com/products/subCategory?categoryId=`;
const PRODUCT_API = `https://shopflow-new.onrender.com/products/getProductsByCategory?subCategoryId=`;

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]); // Combined list for FlatList
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("Loading products...");
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    axios.get(CATEGORY_API)
      .then((response) => {
        setCategories(response.data.data);
        if (response.data.data.length > 0) {
          const firstCategoryId = response.data.data[0].id;
          setSelectedCategory(firstCategoryId);
          fetchSubcategoriesAndProducts(firstCategoryId);
        }
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const fetchSubcategoriesAndProducts = (categoryId) => {
    if (firstLoad) setLoading(true);
    axios.get(`${SUBCATEGORY_API}${categoryId}`)
      .then((response) => {
        const subcategories = response.data.data.subCategories;
        const productPromises = subcategories.map((subcategory) =>
          axios.get(`${PRODUCT_API}${subcategory.id}`)
            .then((res) => ({ subcategory, products: res.data.data }))
            .catch((error) => {
              console.error(`Error fetching products for subcategory ${subcategory.id}:`, error);
              return { subcategory, products: [] };
            })
        );

        Promise.all(productPromises).then((results) => {
          const formattedItems = results.map(({ subcategory, products }) => ({
            id: `sub-${subcategory.id}`,
            title: subcategory.name,
            products
          }));
          setItems(formattedItems);
          setLoading(false);
          setFirstLoad(false);
        });
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
        setLoading(false);
      });
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchSubcategoriesAndProducts(categoryId);
  };

  return (
    <View style={styles.container}>
      <CategorySidebar categories={categories} onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />

      {/* Continuous Scrolling List */}
      {loading ? (
        <CustomLoader visible={loading} autoClose={true} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.subcategoryContainer}>
              <Text style={styles.subcategoryTitle}>{item.title}</Text>
              <SubcategoryProductList products={item.products} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
  },
  subcategoryContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subcategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default CategoriesScreen;
