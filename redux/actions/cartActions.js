import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  ADD_TO_CART,
  SET_CART_ITEMS,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY
} from './cartActionTypes';

// ✅ Fetch Cart from Backend if Logged In
export const viewCartAsync = () => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn') === 'true';
    const { cart } = getState();

    if (isLoggedIn) {
      const response = await axios.get(
        `https://shopflow-1.onrender.com/user/cart/viewCart?userId=${cart.userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({ type: SET_CART_ITEMS, payload: response.data });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

// ✅ Add to Cart (Backend if Logged In, Local if Not)
export const addToCartAsync = (product) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn') === 'true';
    const { cart } = getState();

    if (isLoggedIn) {
      const response = await axios.post(
        `https://shopflow-1.onrender.com/user/cart/addItemToCart`,
        { userId: cart.userId, productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(viewCartAsync()); // Refresh Cart
    } else {
      dispatch({ type: ADD_TO_CART, payload: product });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// ✅ Increase Quantity (Backend for Logged In Users)
export const increaseQuantityAsync = (productId) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn') === 'true';
    const { cart } = getState();

    if (isLoggedIn) {
      await axios.put(
        `https://shopflow-1.onrender.com/user/cart/increaseQuantity`,
        { userId: cart.userId, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(viewCartAsync());
    } else {
      dispatch({ type: INCREASE_QUANTITY, payload: productId });
    }
  } catch (error) {
    console.error('Error increasing quantity:', error);
  }
};

// ✅ Decrease Quantity
export const decreaseQuantityAsync = (productId) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      await axios.put(
        `https://shopflow-1.onrender.com/user/cart/decreaseQuantity`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(viewCartAsync());
    } else {
      dispatch({ type: DECREASE_QUANTITY, payload: productId });
    }
  } catch (error) {
    console.error('Error decreasing quantity:', error);
  }
};

// ✅ Remove from Cart
export const removeFromCartAsync = (productId) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      await axios.delete(
        `https://shopflow-1.onrender.com/user/cart/removeItem?productId=${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(viewCartAsync());
    } else {
      dispatch({ type: REMOVE_FROM_CART, payload: productId });
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};
