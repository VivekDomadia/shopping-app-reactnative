import Axios from 'axios';
import Product from '../../models/Product';
import { RESET_UI, SET_ERROR, SET_LOADING, UNSET_ERROR } from './uiAction';

export const SET_PRODUCT = 'SET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const fetchProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    const userId = getState().auth.userId;
    const response = await Axios.get(
      'https://shopping-app-5543e.firebaseio.com/products.json'
    );

    let loadedProducts = [];

    for (const key in response.data) {
      loadedProducts.push(
        new Product(
          key,
          response.data[key].ownerId,
          response.data[key].title,
          response.data[key].imageUrl,
          response.data[key].description,
          response.data[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCT,
      products: loadedProducts,
      currentUserId: userId,
    });
    dispatch({ type: RESET_UI });
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.message });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    product.price = +product.price;

    const token = getState().auth.token;
    const userId = getState().auth.userId;

    product.ownerId = userId;

    const response = await Axios.post(
      `https://shopping-app-5543e.firebaseio.com/products.json?auth=${token}`,
      product
    );

    dispatch({
      type: CREATE_PRODUCT,
      product: { id: response.data.name, ...product },
    });
    dispatch({ type: RESET_UI });
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.message });
  }
};

export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    delete product.price;
    const token = getState().auth.token;
    await Axios.patch(
      `https://shopping-app-5543e.firebaseio.com/products/${id}.json?auth=${token}`,
      product
    );

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      product,
    });
    dispatch({ type: RESET_UI });
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.message });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });

    const token = getState().auth.token;
    await Axios.delete(
      `https://shopping-app-5543e.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    dispatch({ type: DELETE_PRODUCT, pid: id });
    dispatch({ type: RESET_UI });
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.message });
  }
};
