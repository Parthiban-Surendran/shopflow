//
//
//
//import * as actions from "../actionTypes/actionTypes";
//
//const reducer = (state = [], action) => {
//  switch (action.type) {
//    case actions.CART_ADD: {
//      const existingIndex = state.findIndex((item) => item.id === action.payload.id);
//
//      if (existingIndex !== -1) {
//        return state.map((item, index) =>
//          index === existingIndex
//            ? {
//                ...item,
//                quantity: item.stock > item.quantity ? item.quantity + 1 : item.quantity,
//              }
//            : item
//        );
//      }
//
//      return [
//        ...state,
//        {
//          id: action.payload.id,
//          name: action.payload.name,
//          description: action.payload.description,
//          actualPrice: action.payload.actualPrice,
//          brand: action.payload.brand,
//          offerPrice: action.payload.offerPrice,
//          discountPercentage: action.payload.discountPercentage,
//          rating: action.payload.rating,
//          stock: action.payload.stock, // Updated from avaiableQuantity
//          categoryId: action.payload.categoryId,
//          subCategoryId: action.payload.subCategoryId,
//          createdAt: action.payload.createdAt,
//          updatedAt: action.payload.updatedAt,
//          quantity: 1,
//        },
//      ];
//    }
//
//    case actions.CART_REMOVE:
//      return state.filter((item) => item.id !== action.payload);
//
//    case actions.INCREASE_CART_ITEM_QUANTITY:
//      return state.map((item) =>
//        item.id === action.payload.id && item.stock > item.quantity
//          ? { ...item, quantity: item.quantity + 1 }
//          : item
//      );
//
//    case actions.DECREASE_CART_ITEM_QUANTITY:
//      return state.map((item) =>
//        item.id === action.payload.id && item.quantity > 1
//          ? { ...item, quantity: item.quantity - 1 }
//          : item
//      );
//
//    case actions.EMPTY_CART:
//      return [];
//
//    default:
//      return state;
//  }
//};
//
//export default reducer;


//import * as actions from "../actionTypes/actionTypes";
//
//const reducer = (state = [], action) => {
//  switch (action.type) {
//    case actions.CART_ADD: {console.log("hello",action.payload)
//
//      const existingIndex = state.findIndex((item) => item.id === action.payload.id);
//
//      if (existingIndex !== -1) {
//        return state.map((item, index) =>
//          index === existingIndex
//            ? {
//                ...item,
//                quantity: item.stock > item.quantity ? item.quantity + 1 : item.quantity,
//              }
//            : item
//        );
//      }
//
//      return [
//        ...state,
//        {
//          id: action.payload.id,
//          name: action.payload.name,
//          description: action.payload.description,
//          actualPrice: action.payload.actualPrice,
//          brand: action.payload.brand,
//          offerPrice: action.payload.offerPrice,
//          discountPercentage: action.payload.discountPercentage,
//          rating: action.payload.rating,
//          stock: action.payload.stock, // Updated from availableQuantity
//          categoryId: action.payload.categoryId,
//          subCategoryId: action.payload.subCategoryId,
//          createdAt: action.payload.createdAt,
//          updatedAt: action.payload.updatedAt,
//          quantity: action.payload.quantity,
//        },
//      ];
//    }
//
//    case actions.CART_REMOVE:
//      return state.filter((item) => item.id !== action.payload);
//
//    case actions.INCREASE_CART_ITEM_QUANTITY:
//      return state.map((item) =>
//        item.id === action.payload.id && item.stock > item.quantity
//          ? { ...item, quantity: item.quantity + 1 }
//          : item
//      );
//
//    case actions.DECREASE_CART_ITEM_QUANTITY:
//      return state.map((item) =>
//        item.id === action.payload.id && item.quantity > 1
//          ? { ...item, quantity: item.quantity - 1 }
//          : item
//      );
//
//    case actions.EMPTY_CART:
//      return [];
//
//    case actions.CART_VIEW:
//      return action.payload;
//
//    default:
//      return state;
//  }
//};
//
//export default reducer;


import * as actions from "../actionTypes/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
//    case actions.CART_ADD: {
//      console.log("Cart Add Action Payload:", action.payload);
//
//      const existingIndex = state.findIndex((item) => item.id === action.payload.id);
//
//      if (existingIndex !== -1) {
//        return state.map((item, index) =>
//          index === existingIndex
//            ? {
//                ...item,
//                quantity: action.payload.quantity, // Updated quantity from API response
//                totalPrice: action.payload.totalPrice, // Updated total price
//              }
//            : item
//        );
//      }
//      return [
//        ...state,
//        {
//          id: action.payload.id,
//          title:action.payload.name,
//          cartId: action.payload.cartId,
//          productId: action.payload.productId,
//          quantity: action.payload.quantity,
//          totalPrice: action.payload.totalPrice, // Price from API response
//        },
//      ];
//    }

    case actions.CART_ADD: {
      console.log("Cart Add Action Payload:", action.payload);

      // Determine if the user is logged in
      const isLoggedIn = !!action.payload.cartId; // Assuming `cartId` is undefined for guest users

      if (isLoggedIn) {
        const existingIndex = state.findIndex((item) => item.id === action.payload.id);

        if (existingIndex !== -1) {
          return state.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: action.payload.quantity, // Updated quantity for logged-in users
                  totalPrice: action.payload.totalPrice, // Updated total price
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
            totalPrice: action.payload.totalPrice, // Price from API response
          },
        ];
      } else {
        // Logic for guest users
        const existingIndex = state.findIndex((item) => item.id === action.payload.id);
console.log("ithu hguest add",action.payload)
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
            title: action.payload.name, // Use `title` for guest users
            quantity: 1, // Default quantity for guest users
            totalPrice: action.payload.actualPrice || 0, // Default price
            actualPrice:action.payload.actualPrice || 0
          },
        ];
      }
    }

    case actions.CART_REMOVE:
    console.log("action",state,action.payload)
        return state.filter((item) => item.id !== action.payload);

    case actions.INCREASE_CART_ITEM_QUANTITY:
    console.log("state",state,action.payload)
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity+1, // Updated from API response

              totalPrice: item.totalPrice+item.actualPrice, // Updated total price
            }
          : item
      );

    case actions.DECREASE_CART_ITEM_QUANTITY:
    console.log("action",action.payload)

      return state.map((item) =>

        item.id === action.payload
          ? {
              ...item,
              quantity:item.quantity-1, // Updated from API response
              totalPrice: item.totalPrice-item.actualPrice, // Updated total price
            }
          : item
      );

    case actions.EMPTY_CART:
      return [];

    case actions.CART_VIEW:
          console.log("Cart View Payload:", action.payload);

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
