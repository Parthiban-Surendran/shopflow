import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/auth/Splash";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import UpdatePasswordScreen from "../screens/profile/UpdatePasswordScreen";
import EditProfile from "../screens/profile/EditProfile";
import MyAccountScreen from "../screens/profile/MyAccountScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import Tabs from "./tabs/Tabs";
import CartScreen from "../screens/user/CartScreen";
import CheckoutScreen from "../screens/user/CheckoutScreen.js";
import OrderConfirmScreen from "../screens/user/OrderConfirmScreen";
import ProductDetailScreen from "../screens/user/ProductDetailScreen";
import MyOrderScreen from "../screens/user/MyOrderScreen";
import MyOrderDetailScreen from "../screens/user/MyOrderDetailScreen";
import CategoriesScreen from "../screens/user/CategoriesScreen";
import MyWishlistScreen from "../screens/profile/MyWishlistScreen";
import SearchBar from "../screens/user/SearchBar";
import SearchResultsPage from "../screens/user/SearchResultsPage";
import CategoryProductsPage from "../screens/user/CategoryProductsPage";
import CategorySidebar from "../screens/user/CategorySideBar";
import SubcategoryProductList from "../screens/user/SubcategoryProductList";
import CategoryProducts from "../screens/user/CategoryProducts";
import AddressScreen from "../screens/user/AddressScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="forgetpassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="updatepassword" component={UpdatePasswordScreen} />
        <Stack.Screen name="myaccount" component={MyAccountScreen} />
        <Stack.Screen name="mywishlist" component={MyWishlistScreen} />
        <Stack.Screen name="tab" component={Tabs} />
        <Stack.Screen name="cart" component={CartScreen} />
       <Stack.Screen name="editprofile" component={EditProfile} />
       <Stack.Screen name="userprofile" component={UserProfileScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="orderconfirm" component={OrderConfirmScreen} />
        <Stack.Screen name="productdetail" component={ProductDetailScreen} />
        <Stack.Screen name="myorder" component={MyOrderScreen} />
        <Stack.Screen name="myorderdetail" component={MyOrderDetailScreen} />
        <Stack.Screen name="categories" component={CategoriesScreen} />
       <Stack.Screen name="searchbar" component={SearchBar} />
       <Stack.Screen name="searchresults" component={SearchResultsPage} />
       <Stack.Screen name="categoryproductpage" component={CategoryProductsPage} />
       <Stack.Screen name="subcategoryproductlist" component={SubcategoryProductList} />
       <Stack.Screen name="categorysidebar" component={CategorySidebar} />
       <Stack.Screen name="categoryproducts" component={CategoryProducts} />
       <Stack.Screen name="addressscreen" component={AddressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
