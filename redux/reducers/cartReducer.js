import {
  ADD_TO_CART,
  SET_CART_ITEMS,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY
} from '../actions/cartActionTypes';

const initialState = {
  items: [],
  isLoggedIn: false,
  userId: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return { ...state, items: action.payload };

    case ADD_TO_CART:
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };

    case INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ),
      };

    case REMOVE_FROM_CART:
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };

    default:
      return state;
  }
};

export default cartReducer;
