import * as actions from "../actionTypes/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case actions.CART_ADD: {
      const isLoggedIn = !!action.payload.cartId;
      if (isLoggedIn) {
        const existingIndex = state.findIndex((item) => item.id === action.payload.id);

        if (existingIndex !== -1) {
          return state.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: action.payload.quantity,
                  totalPrice: action.payload.totalPrice,
                }
              : item
          );
        }

        return [
          ...state,
          {
            id: action.payload.id,
            title: action.payload.name,
            cartId: action.payload.cartId,
            productId: action.payload.productId,
            quantity: action.payload.quantity,
            totalPrice: action.payload.totalPrice,
          },
        ];
      } else {
        const existingIndex = state.findIndex((item) => item.id === action.payload.id);
        if (existingIndex !== -1) {
          return state.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: item.quantity ? item.quantity + 1 : 1, // Increment quantity for guest users
                  totalPrice: item.totalPrice
                    ? item.totalPrice + (action.payload.actualPrice || 0)
                    : action.payload.actualPrice || 0, // Update total price
                }
              : item
          );
        }

        return [
          ...state,
          {
            id: action.payload.id,
            title: action.payload.name,
            quantity: 1,
            totalPrice: action.payload.actualPrice || 0,
            actualPrice:action.payload.actualPrice || 0,
            offerPrice:action.payload.offerPrice || 0,
            image: action.payload.image,


          },
        ];
      }
    }

    case actions.CART_REMOVE:
        return state.filter((item) => item.id !== action.payload);

    case actions.INCREASE_CART_ITEM_QUANTITY:
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity+1,

              totalPrice: item.totalPrice+item.offerPrice,
            }
          : item
      );

    case actions.DECREASE_CART_ITEM_QUANTITY:
      return state.map((item) =>

        item.id === action.payload
          ? {
              ...item,
              quantity:item.quantity-1,
              totalPrice: item.totalPrice-item.actualPrice,
            }
          : item
      );

    case actions.EMPTY_CART:
      return [];

    case actions.CART_VIEW:
          return action.payload?.data || [];


    case actions.USER_LOGOUT:
          return [];
     case actions.LOGIN_SUCCESS:
          return [];

    default:
      return state;
  }
};

export default reducer;
