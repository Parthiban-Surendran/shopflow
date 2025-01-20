//import * as actions from "../actionTypes/actionTypes";
//
//export const addCartItem = (product) => {
//  return (dispatch) => {
//
//    dispatch({ type: actions.CART_ADD, payload: product });
//  };
//};
//
//export const removeCartItem = (id) => {
//  return (dispatch) => {
//    dispatch({ type: actions.CART_REMOVE, payload: _id });
//  };
//};
//
//export const increaseCartItemQuantity = (id) => {
//  return (dispatch) => {
//    dispatch({ type: actions.INCREASE_CART_ITEM_QUANTITY, payload: _id });
//  };
//};
//
//export const decreaseCartItemQuantity = (id) => {
//  return (dispatch) => {
//    dispatch({ type: actions.DECREASE_CART_ITEM_QUANTITY, payload: _id });
//  };
//};
//
//export const emptyCart = (type) => {
//  return (dispatch) => {
//    dispatch({ type: actions.EMPTY_CART, payload: type });
//  };
//};
//
//
//
//
//


import * as actions from "../actionTypes/actionTypes";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your API base URL
const API_BASE_URL = "https://shopflow-1.onrender.com/user/cart";
const id = 1
// Function to check if the user is logged in
const checkIfLoggedIn = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn'); // Assuming this stores login status
    console.log("status",isLoggedIn)
    return isLoggedIn === 'true'; // return true if logged in, false otherwise
  } catch (error) {
    console.error("Error checking login status", error);
    return false;
  }
};

// Add Cart Item (for both logged-in and non-logged-in users)

export const addCartItem = (product) => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();
console.log("actionCreator:",isLoggedIn)
    if (isLoggedIn) {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userid');
      console.log(userId,product.id,token)

      console.log("User ID:", userId);  // Log userId
      console.log("Product Data:", product);  // Log product data



      try {
      console.log("started...")
        const response = await axios.post(
                `https://shopflow-1.onrender.com/user/cart/addItemToCart`,
                {
                  userId: userId,
                  productId: product.id,
                  quantity: 1, // Adjust quantity
                },
                {
                  params: {
                    userId: userId,
                    productId: product.id,
                    quantity: 1, // Adjust quantity
                  },
                  headers: {
                    'Authorization': `Bearer ${token}`, // Attach token
                    'Content-Type': 'application/json', // Add this
                  },
                }
              );

console.log("Response ippo:",response.data)
        dispatch({ type: actions.CART_ADD, payload: response.data.data });

      } catch (error) {
        console.error("Error adding item to cart", error);
      }
    } else {
      console.log("User is a guest",product);
      dispatch({ type: actions.CART_ADD, payload: product });
    }
  };
};

const getToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return token;
};

export const fetchCart = (userId) => async (dispatch) => {
  try {
  const token = await getToken();
  console.log("vanthuten")

    const response = await axios.get(
      `https://shopflow-1.onrender.com/user/cart/viewCart`,
      {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
console.log("fetchcart::::",response.data)
    dispatch({ type: actions.CART_VIEW, payload: { data: response.data.data.items || []} });

  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};
// Remove Cart Item (for both logged-in and non-logged-in users)
export const removeCartItem = (id) => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
      // Perform API call for logged-in user
      try {
       const token = await getToken(); // Fetch the token
       const userId = await AsyncStorage.getItem('userid'); // Get userId
        console.log(token,userId,id)
       const response = await axios.delete('https://shopflow-1.onrender.com/user/cart/deleteFromCart',
         {
           params: {
             userId:userId,
             productId: id, // The productId to remove
           },
           headers: {
             Authorization: `Bearer ${token}`, // Make sure token is valid and properly added
             "Content-Type": "application/json",
           },
         }
       );

            console.log("deleted",response.data)
//            dispatch({ type: actions.CART_REMOVE, payload: id });
        dispatch({ type: actions.CART_VIEW, payload: { data: response.data.data.items || []}});
      } catch (error) {
        console.error("Error removing item from cart",  `${JSON.stringify(error.response.data)}`);
             console.error("Error removing item from cart",  `${(error.response.status)}`);

      }
    } else {
      // Perform actions for non-logged-in users
      dispatch({ type: actions.CART_REMOVE, payload: id });
    }
  };
};

// Increase Cart Item Quantity (for both logged-in and non-logged-in users)
export const increaseCartItemQuantity = (id) => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
      // Perform API call for logged-in user
      try {
       const userId = await AsyncStorage.getItem('userid'); // Get userId
       const token = await getToken(); // Fetch the token

        // Fetch the updated cart
        console.log("started",userId,id,token)
            const response = await axios.put(`https://shopflow-1.onrender.com/user/cart/cartCount`,{},
                  {
                    params: {
                     userId:userId,
                     productId:id,
                     operation:'increase'
                     },
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log(response.data)
//               dispatch({ type: actions.INCREASE_CART_ITEM_QUANTITY, payload: id });
        dispatch({ type: actions.CART_VIEW, payload: response.data.data.items });
      } catch (error) {
        console.error("Error increasing quantity", error);
      }
    } else {
      // Perform actions for non-logged-in users
      console.log("guest Increase",id)

      dispatch({ type: actions.INCREASE_CART_ITEM_QUANTITY, payload: id });
    }
  };
};

// Decrease Cart Item Quantity (for both logged-in and non-logged-in users)
export const decreaseCartItemQuantity = (id) => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
      // Perform API call for logged-in user
      try {
        const userId = await AsyncStorage.getItem('userid'); // Get userId
               const token = await getToken(); // Fetch the token

                // Fetch the updated cart
                console.log("started",userId,id,token)
                    const response = await axios.put(`https://shopflow-1.onrender.com/user/cart/cartCount`,{},
                          {
                            params: {
                             userId:userId,
                             productId:id,
                             operation:'decrease'
                             },
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        console.log(response.data)
        //               dispatch({ type: actions.INCREASE_CART_ITEM_QUANTITY, payload: id });
                dispatch({ type: actions.CART_VIEW, payload: response.data.data.items });
      } catch (error) {
        console.error("Error decreasing quantity", error);
      }
    } else {
      // Perform actions for non-logged-in users
//      console.log("sollatuma",id)
      dispatch({ type: actions.DECREASE_CART_ITEM_QUANTITY, payload: id });
    }
  };
};

// Empty Cart (for both logged-in and non-logged-in users)
export const emptyCart = () => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
      // Perform API call for logged-in user
      try {
        const userId = await AsyncStorage.getItem('userId');
        await axios.post(`${API_BASE_URL}/empty`, { userId });

        // Fetch the updated empty cart
        const response = await axios.get(`${API_BASE_URL}/view/${userId}`);
        dispatch({ type: actions.EMPTY_CART, payload: [] });
        dispatch({ type: actions.CART_VIEW, payload: response.data });
      } catch (error) {
        console.error("Error emptying the cart", error);
      }
    } else {
      // Perform actions for non-logged-in users
      dispatch({ type: actions.EMPTY_CART, payload: [] });
    }
  };
};

// View Cart (for both logged-in and non-logged-in users)
export const viewCart = () => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
      // Perform API call for logged-in user
      try {
        const userId = await AsyncStorage.getItem('userId');
const response = await axios.get(
        `https:shopflow-1.onrender.com/user/cart/viewCart`,
        {
          params: {
            userId: userId,
          },
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token
            'Content-Type': 'application/json', // Add this
          },
        }
      );
       console.log(response.data)
       dispatch({ type: actions.CART_VIEW, payload: response.data });
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    } else {
      // Perform actions for non-logged-in users (e.g., use local storage or an empty array)
      dispatch({ type: actions.CART_VIEW, payload: [] });
    }
  };
};
