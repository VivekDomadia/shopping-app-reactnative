import Axios from 'axios';
import Order from '../../models/Order';
import { RESET_UI, SET_ERROR, SET_LOADING } from './uiAction';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    const userId = getState().auth.userId;
    const response = await Axios.get(
      `https://shopping-app-5543e.firebaseio.com/orders/${userId}.json`
    );

    let loadedOrders = [];

    for (const key in response.data) {
      loadedOrders.push(
        new Order(
          key,
          response.data[key].cartItems,
          response.data[key].totalAmount,
          response.data[key].date
        )
      );
    }

    dispatch({ type: SET_ORDER, orders: loadedOrders });
    dispatch({ type: RESET_UI });
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.message });
  }
};

export const addOrder = (items, totalAmount) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    const date = new Date();

    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await Axios.post(
      `https://shopping-app-5543e.firebaseio.com/orders/${userId}.json?auth=${token}`,
      { cartItems: items, totalAmount, date: date.toISOString() }
    );

    dispatch({
      type: ADD_ORDER,
      orderData: { id: response.data.name, items, totalAmount, date },
    });
    dispatch({ type: RESET_UI });
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.message });
  }
};
