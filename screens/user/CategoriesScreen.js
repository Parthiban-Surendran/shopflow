//import {
//  StyleSheet,
//  Image,
//  TouchableOpacity,
//  View,
//  StatusBar,
//  Text,
//  FlatList,
//  RefreshControl,
//  Dimensions,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//
//import { Ionicons } from "@expo/vector-icons";
//import cartIcon from "../../assets/icons/cart_beg.png";
//import emptyBox from "../../assets/image/emptybox.png";
//import { colors, network } from "../../constants";
//import { useSelector, useDispatch } from "react-redux";
//import { bindActionCreators } from "redux";
//import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
//import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
//import ProductCard from "../../components/ProductCard/ProductCard";
//import CustomInput from "../../components/CustomInput";
//
//const CategoriesScreen = ({ navigation, route }) => {
//  const { categoryID } = route.params;
//
//  const [isLoading, setLoading] = useState(true);
//  const [products, setProducts] = useState([]);
//  const [refeshing, setRefreshing] = useState(false);
//  const [label, setLabel] = useState("Loading...");
//  const [error, setError] = useState("");
//  const [foundItems, setFoundItems] = useState([]);
//  const [filterItem, setFilterItem] = useState("");
//
//  //get the dimenssions of active window
//  const [windowWidth, setWindowWidth] = useState(
//    Dimensions.get("window").width
//  );
//  const windowHeight = Dimensions.get("window").height;
//
//  //initialize the cartproduct with redux data
//  const cartproduct = useSelector((state) => state.product);
//  const dispatch = useDispatch();
//
//  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);
//
//  //method to navigate to product detail screen of specific product
//  const handleProductPress = (product) => {
//    navigation.navigate("productdetail", { product: product });
//  };
//
//  //method to add the product to cart (redux)
//  const handleAddToCat = (product) => {
//    addCartItem(product);
//  };
//
//  //method call on pull refresh
//  const handleOnRefresh = () => {
//    setRefreshing(true);
//    fetchProduct();
//    setRefreshing(false);
//  };
//
//  var headerOptions = {
//    method: "GET",
//    redirect: "follow",
//  };
//  const category = [
//    {
//      _id: "62fe244f58f7aa8230817f89",
//      title: "Garments",
//      image: require("../../assets/icons/garments.png"),
//    },
//    {
//      _id: "62fe243858f7aa8230817f86",
//      title: "Electornics",
//      image: require("../../assets/icons/electronics.png"),
//    },
//    {
//      _id: "62fe241958f7aa8230817f83",
//      title: "Cosmentics",
//      image: require("../../assets/icons/cosmetics.png"),
//    },
//    {
//      _id: "62fe246858f7aa8230817f8c",
//      title: "Groceries",
//      image: require("../../assets/icons/grocery.png"),
//    },
//  ];
//  const [selectedTab, setSelectedTab] = useState(category[0]);
//
//  //method to fetch the product from server using API call
//  const fetchProduct = () => {
//    var headerOptions = {
//      method: "GET",
//      redirect: "follow",
//    };
//    fetch(`${network.serverip}/products`, headerOptions)
//      .then((response) => response.json())
//      .then((result) => {
//        if (result.success) {
//          setProducts(result.data);
//          setFoundItems(result.data);
//          setError("");
//        } else {
//          setError(result.message);
//        }
//      })
//      .catch((error) => {
//        setError(error.message);
//        console.log("error", error);
//      });
//  };
//
//  //listener call on tab focus and initlize categoryID
//  navigation.addListener("focus", () => {
//    if (categoryID) {
//      setSelectedTab(categoryID);
//    }
//  });
//
//  //method to filter the product according to user search in selected category
//  const filter = () => {
//    const keyword = filterItem;
//    if (keyword !== "") {
//      const results = products.filter((product) => {
//        return product?.title.toLowerCase().includes(keyword.toLowerCase());
//      });
//
//      setFoundItems(results);
//    } else {
//      setFoundItems(products);
//    }
//  };
//
//  //render whenever the value of filterItem change
//  useEffect(() => {
//    filter();
//  }, [filterItem]);
//
//  //fetch the product on initial render
//  useEffect(() => {
//    fetchProduct();
//  }, []);
//
//  return (
//    <View style={styles.container}>
//      <StatusBar></StatusBar>
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity
//          onPress={() => {
//            navigation.jumpTo("home");
//          }}
//        >
//          <Ionicons
//            name="arrow-back-circle-outline"
//            size={30}
//            color={colors.muted}
//          />
//        </TouchableOpacity>
//
//        <View></View>
//        <TouchableOpacity
//          style={styles.cartIconContainer}
//          onPress={() => navigation.navigate("cart")}
//        >
//          {cartproduct?.length > 0 ? (
//            <View style={styles.cartItemCountContainer}>
//              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
//            </View>
//          ) : (
//            <></>
//          )}
//          <Image source={cartIcon} />
//        </TouchableOpacity>
//      </View>
//      <View style={styles.bodyContainer}>
//        <View style={{ padding: 0, paddingLeft: 20, paddingRight: 20 }}>
//          <CustomInput
//            radius={5}
//            placeholder={"Search..."}
//            value={filterItem}
//            setValue={setFilterItem}
//          />
//        </View>
//        <FlatList
//          data={category}
//          keyExtractor={(index, item) => `${index}-${item}`}
//          horizontal
//          style={{ flexGrow: 0 }}
//          contentContainerStyle={{ padding: 10 }}
//          showsHorizontalScrollIndicator={false}
//          renderItem={({ item: tab }) => (
//            <CustomIconButton
//              key={tab}
//              text={tab.title}
//              image={tab.image}
//              active={selectedTab?.title === tab.title ? true : false}
//              onPress={() => {
//                setSelectedTab(tab);
//              }}
//            />
//          )}
//        />
//
//        {foundItems.filter(
//          (product) => product?.category?._id === selectedTab?._id
//        ).length === 0 ? (
//          <View style={styles.noItemContainer}>
//            <View
//              style={{
//                display: "flex",
//                justifyContent: "center",
//                alignItems: "center",
//                backgroundColor: colors.white,
//                height: 150,
//                width: 150,
//                borderRadius: 10,
//              }}
//            >
//              <Image
//                source={emptyBox}
//                style={{ height: 80, width: 80, resizeMode: "contain" }}
//              />
//              <Text style={styles.emptyBoxText}>
//                There no product in this category
//              </Text>
//            </View>
//          </View>
//        ) : (
//          <FlatList
//            data={foundItems.filter(
//              (product) => product?.category?._id === selectedTab?._id
//            )}
//            refreshControl={
//              <RefreshControl
//                refreshing={refeshing}
//                onRefresh={handleOnRefresh}
//              />
//            }
//            keyExtractor={(index, item) => `${index}-${item}`}
//            contentContainerStyle={{ margin: 10 }}
//            numColumns={2}
//            renderItem={({ item: product }) => (
//              <View
//                style={[
//                  styles.productCartContainer,
//                  { width: (windowWidth - windowWidth * 0.1) / 2 },
//                ]}
//              >
//                <ProductCard
//                  cardSize={"large"}
//                  name={product.title}
//                  image={`${network.serverip}/uploads/${product.image}`}
//                  price={product.price}
//                  quantity={product.quantity}
//                  onPress={() => handleProductPress(product)}
//                  onPressSecondary={() => handleAddToCat(product)}
//                />
//                <View style={styles.emptyView}></View>
//              </View>
//            )}
//          />
//        )}
//      </View>
//    </View>
//  );
//};
//
//export default CategoriesScreen;
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
//  bodyContainer: {
//    flex: 1,
//    width: "100%",
//    flexDirecion: "row",
//    backgroundColor: colors.light,
//
//    justifyContent: "flex-start",
//    flex: 1,
//  },
//  cartIconContainer: {
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  cartItemCountContainer: {
//    position: "absolute",
//    zIndex: 10,
//    top: -10,
//    left: 10,
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    height: 22,
//    width: 22,
//    backgroundColor: colors.danger,
//    borderRadius: 11,
//  },
//  cartItemCountText: {
//    color: colors.white,
//    fontWeight: "bold",
//    fontSize: 10,
//  },
//  productCartContainer: {
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    borderRadius: 10,
//    margin: 5,
//    padding: 5,
//    paddingBottom: 0,
//    paddingTop: 0,
//    marginBottom: 0,
//  },
//  noItemContainer: {
//    width: "100%",
//    flex: 1,
//    display: "flex",
//    justifyContent: "center",
//    alignItems: "center",
//    textAlign: "center",
//  },
//  emptyBoxText: {
//    fontSize: 11,
//    color: colors.muted,
//    textAlign: "center",
//  },
//  emptyView: {
//    height: 20,
//  },
//});

//import {
//  StyleSheet,
//  Image,
//  TouchableOpacity,
//  View,
//  StatusBar,
//  Text,
//  FlatList,
//  RefreshControl,
//  Dimensions,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { Ionicons } from "@expo/vector-icons";
//import cartIcon from "../../assets/icons/cart_beg.png";
//import emptyBox from "../../assets/image/emptybox.png";
//import { colors, network } from "../../constants";
//import { useSelector, useDispatch } from "react-redux";
//import { bindActionCreators } from "redux";
//import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
//import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
//import CustomInput from "../../components/CustomInput";
//import axios from "axios";
//
//const CategoriesScreen = ({ navigation, route }) => {
//  const { categoryID } = route.params;
//
//  const [isLoading, setLoading] = useState(false);
//  const [products, setProducts] = useState([]);
//  const [foundItems, setFoundItems] = useState([]);
//  const [filterItem, setFilterItem] = useState("");
//  const [categoryList, setCategoryList] = useState([]);
//  const [selectedTab, setSelectedTab] = useState(null);
//  const [pageNumber, setPageNumber] = useState(1);
//  const [refreshing, setRefreshing] = useState(false);
//  const [error, setError] = useState("");
//
//  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
//
//  // Redux
//  const cartproduct = useSelector((state) => state.product);
//  const dispatch = useDispatch();
//  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);
//
//  // API URLs
//  const SEARCH_API = "http://192.168.0.107:5000/products/getProductBySearch?query=";
//  const CATEGORY_API = "http://192.168.0.107:5000/products/getProductByCategory?category=";
//
//  // Fetch categories and products
//  const fetchCategories = async () => {
//    try {
//      const response = await axios.get("http://192.168.0.107:5000/products/Category");
//
//      if (response.data.message === "Success") {
//        setCategoryList(response.data.data);
//        setSelectedTab(response.data.data[0]); // Set default category
//      } else {
//        setError("Failed to fetch categories");
//      }
//    } catch (err) {
//      setError("Error fetching categories: " + err.message);
//    }
//  };
//
//  const fetchProducts = async (page, category = "", query = "") => {
//    setLoading(true);
//    try {
//      let url = "";
//      if (query !== "") {
//        url = `${SEARCH_API}${query}`;
//      } else if (category !== "") {
//        url = `${CATEGORY_API}${category}`;
//      } else {
//        url = `http://192.168.0.107:5000/products/getAllProducts?page=${page}`;
//      }
//
//      const response = await axios.get(url);
//      if (response.data.status === "success") {
//        if (page === 1) {
//          setProducts(response.data.data);
//        } else {
//          setProducts((prev) => [...prev, ...response.data.data]); // Append new products
//        }
//          setFoundItems((prev) => [...prev, ...response.data.data]); // Append new products
//          setPageNumber(pageNumber + 1);
//        setError("");
//      } else {
//        setError("Failed to fetch products");
//      }
//    } catch (err) {
//      setError("Error fetching products: " + err.message);
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  // Handle product press
//  const handleProductPress = (product) => {
//    navigation.navigate("productdetail", { product });
//  };
//
//  // Handle add to cart
//  const handleAddToCat = (product) => {
//    addCartItem(product);
//  };
//
//  // Handle search filter
//  const handleSearch = () => {
//    if (filterItem.trim() !== "") {
//      fetchProducts(1, "", filterItem); // Search with query
//    } else {
//      setProducts([]); // Clear products if search is empty
//      setFoundItems([]);
//    }
//  };
//
//  // Fetch categories on mount
//  useEffect(() => {
//    fetchCategories();
//    fetchProducts(pageNumber); // Fetch the first page of products
//  }, []);
//
//  // Fetch products when page number or selected category changes
//  useEffect(() => {
//    if (selectedTab) {
//      fetchProducts(pageNumber, selectedTab?.name); // Fetch products for the selected category
//    } else {
//      fetchProducts(pageNumber); // Fetch products for all categories
//    }
//  }, [ selectedTab]);
//
//  // Handle infinite scroll
//  const handleLoadMore = () => {
//  console.log(pageNumber*10)
//    if (!isLoading && foundItems.length >= pageNumber * 10) {
//    fetchProducts(pageNumber)
//    }
//  };
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity
//          onPress={() => {
//            navigation.jumpTo("home");
//          }}
//        >
//          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
//        </TouchableOpacity>
//        <TouchableOpacity
//          style={styles.cartIconContainer}
//          onPress={() => navigation.navigate("cart")}
//        >
//          {cartproduct?.length > 0 ? (
//            <View style={styles.cartItemCountContainer}>
//              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
//            </View>
//          ) : null}
//          <Image source={cartIcon} />
//        </TouchableOpacity>
//      </View>
//
//      <View style={styles.bodyContainer}>
//        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
//          <CustomInput
//            radius={5}
//            placeholder={"Search..."}
//            value={filterItem}
//            setValue={setFilterItem}
//            onSubmitEditing={handleSearch} // Trigger search on Enter key
//          />
//          <TouchableOpacity onPress={handleSearch} style={{ marginLeft: 10 }}>
//            <Ionicons name="search-outline" size={25} color={colors.primary} />
//          </TouchableOpacity>
//        </View>
//
//        <FlatList
//          data={categoryList}
//          keyExtractor={(item, index) => `${index}-${item.name}`}
//          horizontal
//          contentContainerStyle={{ padding: 10 }}
//          showsHorizontalScrollIndicator={false}
//          renderItem={({ item: tab }) => (
//            <CustomIconButton
//              key={tab.name}
//              text={tab.name}
//              image={tab.image}
//              active={selectedTab?.name === tab.name}
//              onPress={() => {
//                setSelectedTab(tab);
//                setPageNumber(1); // Reset page number when category changes
//                fetchProducts(1, tab.name);
//              }}
//            />
//          )}
//        />
//
//        {foundItems.length === 0 ? (
//          <View style={styles.noItemContainer}>
//            <Image source={emptyBox} style={{ height: 80, width: 80, resizeMode: "contain" }} />
//            <Text style={styles.emptyBoxText}>No products found</Text>
//          </View>
//        ) : (
//          <FlatList
//            data={foundItems}
//            keyExtractor={(item, index) => `${index}-${item.name}`}
//            numColumns={2}
//            renderItem={({ item }) => (
//              <View style={styles.productContainer}>
//                <TouchableOpacity onPress={() => handleProductPress(item)}>
//                  <Image
//                    source={{ uri: item.imageUrl }}
//                    style={styles.productImage}
//                  />
//                  <Text style={styles.productName}>{item.name}</Text>
//                  <Text style={styles.productPrice}>${item.discountedPrice}</Text>
//                </TouchableOpacity>
//                <TouchableOpacity onPress={() => handleAddToCat(item)} style={styles.addToCartButton}>
//                  <Text style={styles.addToCartText}>Add to Cart</Text>
//                </TouchableOpacity>
//              </View>
//            )}
//            onEndReached={handleLoadMore} // Trigger to load more products
//            onEndReachedThreshold={0.5} // Load more when 50% of the list is visible
//            ListFooterComponent={isLoading && <Text>Loading more...</Text>} // Footer for loading state
//            refreshControl={
//              <RefreshControl
//                refreshing={refreshing}
//                onRefresh={() => fetchProducts(1)} // Handle pull to refresh
//              />
//            }
//          />
//        )}
//      </View>
//    </View>
//  );
//};


//
//
//import {
//  StyleSheet,
//  Image,
//  TouchableOpacity,
//  View,
//  StatusBar,
//  Text,
//  FlatList,
//  RefreshControl,
//  Dimensions,
//} from "react-native";
//import React, { useState, useEffect } from "react";
//import { Ionicons } from "@expo/vector-icons";
//import cartIcon from "../../assets/icons/cart_beg.png";
//import emptyBox from "../../assets/image/emptybox.png";
//import { colors, network } from "../../constants";
//import { useSelector, useDispatch } from "react-redux";
//import { bindActionCreators } from "redux";
//import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
//import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
//import CustomInput from "../../components/CustomInput";
//import axios from "axios";
//
//const CategoriesScreen = ({ navigation, route }) => {
//  const { categoryID } = route.params;
//
//  const [isLoading, setLoading] = useState(false);
//  const [products, setProducts] = useState([]);
//  const [foundItems, setFoundItems] = useState([]);
//  const [filterItem, setFilterItem] = useState("");
//  const [categoryList, setCategoryList] = useState([]);
//  const [selectedTab, setSelectedTab] = useState(null);
//  const [pageNumber, setPageNumber] = useState(1);
//  const [refreshing, setRefreshing] = useState(false);
//  const [error, setError] = useState("");
//
//  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
//
//  // Redux
//  const cartproduct = useSelector((state) => state.product);
//  const dispatch = useDispatch();
//  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);
//
//  // API URLs
//  const SEARCH_API = "http://192.168.0.114:5000/products/getProductBySearch?query=";
//  const CATEGORY_API = "http://192.168.0.114:5000/products/getProductByCategory?category=";
//
//  // Fetch categories and products
//  const fetchCategories = async () => {
//    try {
//      const response = await axios.get("http://192.168.0.114:5000/products/Category");
//
//      if (response.data.message === "Success") {
//        setCategoryList(response.data.data);
//        setSelectedTab(response.data.data[0].name); // Set default category
//      } else {
//        setError("Failed to fetch categories");
//      }
//    } catch (err) {
//      setError("Error fetching categories: " + err.message);
//    }
//  };
//
//const fetchProducts = async (page, category = "", query) => {
//    setLoading(true);
//    try {
//        let url = "";
//
//        if (query && query !== "") {
//            url = `${SEARCH_API}${query}`; // Include page for search API
////            console.log("Search URL:", url);  // Log the search URL for debugging
//        } else if (category !== "") {
//            url = `${CATEGORY_API}${category}`; // Include page for category API
////            console.log("Category URL:", url);  // Log the category URL for debugging
//        } else {
//            url = `http://192.168.0.114:5000/products/getAllProducts?page=${page}`;
////            console.log("All Products URL:", url);  // Log the all products URL for debugging
//        }
////console.log(url)
//        const response = await axios.get(url);
////        console.log( response.data);
//
//        if (response.data.status === "success") {
//            if (page === 1) {
//                setProducts(response.data.data);  // Set products
//                setFoundItems(response.data.data); // Set foundItems as well
//            } else {
//                setProducts((prev) => [...prev, ...response.data.data]); // Append new products
//                setFoundItems((prev) => [...prev, ...response.data.data]); // Append new foundItems
//            }
//            setPageNumber(page + 1); // Increment page number for the next load
//            setError("");
//        } else {
//            setError("Failed to fetch products");
//        }
//    } catch (err) {
//        setError("Error fetching products: " + err.message);
//    } finally {
//        setLoading(false);
//    }
//};
//
//
//
//  // Handle product press
//  const handleProductPress = (product) => {
//    navigation.navigate("productdetail", { product });
//  };
//
//  // Handle add to cart
//  const handleAddToCat = (product) => {
//    addCartItem(product);
//  };
//
//  // Handle search filter
//  const handleSearch = () => {
//    if (filterItem.trim() !== "") {
//      setPageNumber(1); // Reset page number for search
//      setFoundItems([])
//      fetchProducts(0,selectedTab, filterItem); // Search with query
//    } else {
//      setProducts([]); // Clear products if search is empty
//      setFoundItems([]);
//    }
//  };
//
//  // Fetch categories on mount
//  useEffect(() => {
//    fetchCategories();
//    fetchProducts(pageNumber); // Fetch the first page of products
//    setFilterItem("")
//  }, []);
//
//  // Fetch products when page number or selected category changes
//  useEffect(() => {
//  console.log("hello",selectedTab)
//    if (selectedTab) {
//      fetchProducts(pageNumber, selectedTab); // Fetch products for the selected category
//    } else {
//      fetchProducts(pageNumber); // Fetch products for all categories
//    }
//  }, [selectedTab]);
//
//
//
//
//  // Handle infinite scroll
//  const handleLoadMore = () => {
//    if (!isLoading && filterItem.trim() !== "") {
//      fetchProducts(pageNumber, "", filterItem); // Load more products with search query
//    } else if (!isLoading && !filterItem.trim() && foundItems.length >= pageNumber * 10) {
//      fetchProducts(pageNumber, selectedTab?.name); // Load more products for the selected category
//    }
//  };
//
//  return (
//    <View style={styles.container}>
//      <StatusBar />
//      <View style={styles.topBarContainer}>
//        <TouchableOpacity
//          onPress={() => {
//            navigation.jumpTo("home");
//          }}
//        >
//          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
//        </TouchableOpacity>
//        <TouchableOpacity
//          style={styles.cartIconContainer}
//          onPress={() => navigation.navigate("cart")}
//        >
//          {cartproduct?.length > 0 ? (
//            <View style={styles.cartItemCountContainer}>
//              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
//            </View>
//          ) : null}
//          <Image source={cartIcon} />
//        </TouchableOpacity>
//      </View>
//
//      <View style={styles.bodyContainer}>
//        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
//          <CustomInput
//            radius={5}
//            placeholder={"Search..."}
//            value={filterItem}
//            setValue={setFilterItem}
//            onSubmitEditing={handleSearch} // Trigger search on Enter key
//          />
//          <TouchableOpacity onPress={handleSearch} style={{ marginLeft: 10 }}>
//            <Ionicons name="search-outline" size={25} color={colors.primary} />
//          </TouchableOpacity>
//        </View>
//
//        <FlatList
//          data={categoryList}
//          keyExtractor={(item, index) => `${index}-${item.name}`}
//          horizontal
//          contentContainerStyle={{ padding: 10 }}
//          showsHorizontalScrollIndicator={false}
//          renderItem={({ item: tab }) => (
//            <CustomIconButton
//              key={tab.name}
//              text={tab.name}
//              image={tab.image}
//              active={selectedTab?.name === tab.name}
//              onPress={() => {
//                setSelectedTab(tab.name);
//                setPageNumber(1); // Reset page number when category changes
//                fetchProducts(1, tab.name);
//              }}
//            />
//          )}
//        />
//
//        {foundItems.length === 0 ? (
//          <View style={styles.noItemContainer}>
//            <Image source={emptyBox} style={{ height: 80, width: 80, resizeMode: "contain" }} />
//            <Text style={styles.emptyBoxText}>No products found</Text>
//          </View>
//        ) : (
//          <FlatList
//            data={foundItems}
//            keyExtractor={(item, index) => `${index}-${item.name}`}
//            numColumns={2}
//            renderItem={({ item }) => (
//              <View style={styles.productContainer}>
//                <TouchableOpacity onPress={() => handleProductPress(item)}>
//                  <Image
//                    source={{ uri: item.imageUrl }}
//                    style={styles.productImage}
//                  />
//                  <Text style={styles.productName}>{item.name}</Text>
//                  <Text style={styles.productPrice}>${item.discountedPrice}</Text>
//                </TouchableOpacity>
//                <TouchableOpacity onPress={() => handleAddToCat(item)} style={styles.addToCartButton}>
//                  <Text style={styles.addToCartText}>Add to Cart</Text>
//                </TouchableOpacity>
//              </View>
//            )}
//            onEndReached={handleLoadMore} // Trigger to load more products
//            onEndReachedThreshold={0.5} // Load more when 50% of the list is visible
//            ListFooterComponent={isLoading && <Text>Loading more...</Text>} // Footer for loading state
//            refreshControl={
//              <RefreshControl
//                refreshing={refreshing}
//                onRefresh={() => fetchProducts(1)} // Handle pull to refresh
//              />
//            }
//          />
//        )}
//      </View>
//    </View>
//  );
//};
//
//
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: colors.white,
//  },
//  topBarContainer: {
//    flexDirection: "row",
//    justifyContent: "space-between",
//    alignItems: "center",
//    padding: 10,
//  },
//  cartIconContainer: {
//    flexDirection: "row",
//    alignItems: "center",
//  },
//  cartItemCountContainer: {
//    backgroundColor: colors.primary,
//    borderRadius: 10,
//    padding: 3,
//    position: "absolute",
//    top: -5,
//    right: -5,
//  },
//  cartItemCountText: {
//    color: colors.white,
//    fontSize: 12,
//  },
//  bodyContainer: {
//    flex: 1,
//  },
//  noItemContainer: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//  },
//  emptyBoxText: {
//    color: colors.muted,
//    fontSize: 16,
//  },
//  productContainer: {
//    width: "45%",
//    margin: 10,
//    backgroundColor: colors.white,
//    borderRadius: 10,
//    elevation: 3,
//    padding: 10,
//  },
//  productImage: {
//    width: "100%",
//    height: 150,
//    borderRadius: 10,
//    resizeMode: "contain",
//  },
//  productName: {
//    fontSize: 16,
//    fontWeight: "bold",
//    marginVertical: 5,
//  },
//  productPrice: {
//    fontSize: 14,
//    color: colors.primary,
//  },
//  addToCartButton: {
//    marginTop: 10,
//    backgroundColor: colors.primary,
//    paddingVertical: 5,
//    borderRadius: 5,
//    alignItems: "center",
//  },
//  addToCartText: {
//    color: colors.white,
//    fontWeight: "bold",
//  },
//});
//
//export default CategoriesScreen;

import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg.png";
import emptyBox from "../../assets/image/emptybox.png";
import { colors, network } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
import CustomInput from "../../components/CustomInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CategoriesScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Local state to manage isLoggedIn

  const [error, setError] = useState("");

  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

  // Redux
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  // API URLs
  const SEARCH_API = "https://shopflow-1.onrender.com/products/getProductBySearch?query=";
  const CATEGORY_API = "https://shopflow-1.onrender.com/products/subCategory?categoryId=";

  // Fetch categories and products
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://shopflow-1.onrender.com/products/Category");

      if (response.data.message === "Success") {
        setCategoryList(response.data.data);
        setSelectedTab(response.data.data[0].name); // Set default category
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError("Error fetching categories: " + err.message);
    }
  };

  const fetchProducts = async (page, categoryId , query) => {
    setLoading(true);
    try {
      let url = "";

      if (query && query !== "") {
        url = `${SEARCH_API}${query}`; // Include page for search API
      } else if (categoryId >0) {
        url = `${CATEGORY_API}${categoryId}`; // Include page for category API with categoryId
      } else {
        url = `https://shopflow-1.onrender.com/products/getAllProducts?page=${page}`;
      }

      const response = await axios.get(url);

      if (response.data.status === "success") {
        if (page === 1) {
          setProducts(response.data.data);  // Set products
          setFoundItems(response.data.data); // Set foundItems as well
        } else {
          setProducts((prev) => [...prev, ...response.data.data]); // Append new products
          setFoundItems((prev) => [...prev, ...response.data.data]); // Append new foundItems
        }
        setPageNumber(page + 1); // Increment page number for the next load
        setError("");
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("Error fetching products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle product press
  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product });
  };

  // Handle add to cart
  const handleAddToCat = (product) => {
//    console.log("Before adding to cart:", cartproduct);
    addCartItem(product);
//    console.log("After adding to cart:", cartproduct);
  };

  // Handle search filter
  const handleSearch = () => {
    if (filterItem.trim() !== "") {
      setPageNumber(1); // Reset page number for search
      setFoundItems([]); // Reset found items for new search
      fetchProducts(1, "", filterItem); // Search with query
    } else {
      setProducts([]); // Clear products if search is empty
      setFoundItems([]);
      fetchProducts(1, "", "");
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
   const fetchLoginStatus = async () => {
           setIsLoggedIn(await AsyncStorage.getItem("isLoggedIn"))
         };

         fetchLoginStatus();
    fetchProducts(pageNumber); // Fetch the first page of products
    setFilterItem("");
  }, []);

  // Fetch products when page number or selected category changes
  useEffect(() => {
    if (selectedTab) {
      fetchProducts(pageNumber, selectedTab); // Fetch products by categoryId
    } else {
      fetchProducts(pageNumber); // Fetch products for all categories
    }
  }, [selectedTab]);

  // Handle infinite scroll
  const handleLoadMore = () => {
    if (!isLoading) {
      if (filterItem.trim() !== "") {
        fetchProducts(pageNumber, "", filterItem); // Load more products with search query
      } else {
        fetchProducts(pageNumber, selectedTab); // Load more products for the selected category
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.jumpTo("home");
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
        </TouchableOpacity>
       <TouchableOpacity
         style={styles.cartIconContainer}
         onPress={() => {

           if (isLoggedIn) {
             navigation.navigate("cart"); // Navigate to a different page if logged in
           } else {
             navigation.navigate("OtherPage"); // Navigate to the Cart page if not logged in
           }
         }}
       >
          {cartproduct?.length > 0 ? (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          ) : null}
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 30,marginRight:10 }}>
          <CustomInput
            radius={5}
            placeholder={"Search..."}
            value={filterItem}
            setValue={setFilterItem}
            onSubmitEditing={handleSearch} // Trigger search on Enter key
          />
          <TouchableOpacity onPress={handleSearch} >
            <Ionicons name="search-outline" size={25} color={colors.primary} style = {{marginLeft:10}}/>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categoryList}
          keyExtractor={(item, index) => `${index}-${item.name}`}
          horizontal
          contentContainerStyle={{ padding: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: tab }) => (
            <CustomIconButton
              key={tab.name}
              text={tab.name}
              image={tab.image}
              active={selectedTab === tab.id} // Highlight active category
              onPress={() => {
                setSelectedTab(tab.id); // Set the selected category ID
                setPageNumber(1); // Reset page number when category changes
                fetchProducts(1, tab.id); // Fetch products for the new category using categoryId
              }}
            />
          )}
        />

        {foundItems.length === 0 ? (
          <View style={styles.noItemContainer}>
            <Image source={emptyBox} style={{ height: 80, width: 80, resizeMode: "contain" }} />
            <Text style={styles.emptyBoxText}>No products found</Text>
          </View>
        ) : (
          <FlatList
            data={foundItems}
            keyExtractor={(item, index) => `${index}-${item.name}`}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <TouchableOpacity
                  onPress={() => handleProductPress(item)}
                  style={styles.productCard}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>${item.discountedPrice}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddToCat(item)}
                  style={styles.addToCartButton}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
            onEndReached={handleLoadMore} // Trigger to load more products
            onEndReachedThreshold={0.5} // Load more when 50% of the list is visible
            ListFooterComponent={isLoading && <Text>Loading more...</Text>} // Footer for loading state
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchProducts(1)} // Handle pull to refresh
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  cartIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemCountContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 3,
    position: "absolute",
    top: -5,
    right: -5,
  },
  cartItemCountText: {
    color: colors.white,
    fontSize: 12,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 10,
  },
  noItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyBoxText: {
    fontSize: 16,
    color: colors.muted,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    paddingBottom: 10,
  },
  productCard: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: colors.white,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    color: colors.black,
  },
  productPrice: {
    fontSize: 12,
    color: colors.primary,
    padding: 5,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  addToCartText: {
    color: colors.white,
    fontSize: 14,
  },
});

export default CategoriesScreen;
