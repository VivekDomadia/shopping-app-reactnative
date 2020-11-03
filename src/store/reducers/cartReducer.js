import Cartitem from '../../models/CartItem';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartAction';
import { ADD_ORDER } from '../actions/orderAction';
import { DELETE_PRODUCT } from '../actions/productAction';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updateOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updateOrNewCartItem = new Cartitem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].total + prodPrice
        );
      } else {
        updateOrNewCartItem = new Cartitem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedProduct = state.items[action.productId];
      let updatedCartItems;
      if (selectedProduct.quantity > 1) {
        const updatedCartItem = new Cartitem(
          selectedProduct.quantity - 1,
          selectedProduct.productPrice,
          selectedProduct.productTitle,
          selectedProduct.total - selectedProduct.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = state.items;
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedProduct.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = state.items;

      const itemTotal = updatedItems[action.pid].total;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};
