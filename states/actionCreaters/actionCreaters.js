import * as actions from "../actionTypes/actionTypes";
import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
import {  network } from "../../constants";


const id = 1
const checkIfLoggedIn = async () => {
  try {
    const isLoggedIn = await EncryptedStorage.getItem('isLoggedIn'); // Assuming this stores login status
    return isLoggedIn === 'true';
  } catch (error) {
    console.error("Error checking login status", error);
    return false;
  }
};


export const addCartItem = (product) => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();
    if (isLoggedIn) {
      const token = await EncryptedStorage.getItem('authToken');
      const userId = await EncryptedStorage.getItem('userid');
      try {
        const response = await axios.post(
                `${network.serverip}/user/cart/addItemToCart`,
                {
                  userId: userId,
                  productId: product.id,
                  quantity: 1,
                },
                {
                  params: {
                    userId: userId,
                    productId: product.id,
                    quantity: 1,
                  },
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

        dispatch({ type: actions.CART_VIEW, payload: response.data.data });

      } catch (error) {
        console.error("Error adding item to cart", error);
      }
    } else {
      dispatch({ type: actions.CART_ADD, payload: product });
    }
  };
};

const getToken = async () => {
  const token = await EncryptedStorage.getItem('authToken');
  return token;
};

export const fetchCart = (userId) => async (dispatch) => {
  try {
  const token = await getToken();
    const response = await axios.get(
      `${network.serverip}/user/cart/viewCart`,
      {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: actions.CART_VIEW, payload: { data: response.data.data.items || []} });

  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

export const removeCartItem = (id) => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
           const userId = await EncryptedStorage.getItem('userid'); // Get userId
      try {
       const token = await getToken();
       const response = await axios.delete(`${network.serverip}/user/cart/deleteFromCart`,
         {
           params: {
             userId:userId,
             productId: id,
           },
           headers: {
             Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
           },
         }
       );
       console.log(response)
        dispatch(fetchCart(userId));
      } catch (error) {
        console.error("Error removing item from cart",  `${JSON.stringify(error.response.data)}`);

      }
    } else {
      dispatch({ type: actions.CART_REMOVE, payload: id });
    }
  };
};


export const increaseCartItemQuantity = (id) => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
           const userId = await EncryptedStorage.getItem('userid');

      try {
       const token = await getToken();

            const response = await axios.put(`${network.serverip}/user/cart/cartCount`,{},
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
        dispatch(fetchCart(userId));
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
            const userId = await EncryptedStorage.getItem('userid'); // Get userId

      try {
               const token = await getToken(); // Fetch the token
                    const response = await axios.put(`${network.serverip}/user/cart/cartCount`,{},
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
                dispatch(fetchCart(userId));
      } catch (error) {
        console.error("Error decreasing quantity", error);
      }
    } else {

      dispatch({ type: actions.DECREASE_CART_ITEM_QUANTITY, payload: id });
    }
  };
};

export const emptyCart = () => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
      try {
        const userId = await EncryptedStorage.getItem('userId');
        await axios.post(`${network.serverip}/empty`, { userId });

        const response = await axios.get(`${network.serverip}/view/${userId}`);
        dispatch({ type: actions.EMPTY_CART, payload: [] });
        dispatch({ type: actions.CART_VIEW, payload: response.data });
      } catch (error) {
        console.error("Error emptying the cart", error);
      }
    } else {
      dispatch({ type: actions.EMPTY_CART, payload: [] });
    }
  };
};

export const viewCart = () => {
  return async (dispatch) => {
    const isLoggedIn = await checkIfLoggedIn();

    if (isLoggedIn) {
      try {
        const userId = await EncryptedStorage.getItem('userId');
const response = await axios.get(
        `${network.serverip}/user/cart/viewCart`,
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
       dispatch({ type: actions.CART_VIEW, payload: response.data });
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    } else {
      dispatch({ type: actions.CART_VIEW, payload: [] });
    }
  };
};
