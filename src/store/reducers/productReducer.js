import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/Product';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/productAction';

const initialState = {
  avalableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        avalableProducts: action.products,
        userProducts: action.products.filter(
          (prod) => prod.ownerId === action.currentUserId
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.product.id,
        action.product.ownerId,
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );
      return {
        ...state,
        avalableProducts: [...state.avalableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const avalableProductIndex = state.avalableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvalableProducts = [...state.avalableProducts];
      updatedAvalableProducts[avalableProductIndex] = updatedProduct;
      return {
        ...state,
        avalableProducts: updatedAvalableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid
        ),
        avalableProducts: state.avalableProducts.filter(
          (prod) => prod.id !== action.pid
        ),
      };
    default:
      return state;
  }
};
