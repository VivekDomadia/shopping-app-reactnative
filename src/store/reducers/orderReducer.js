import Order from '../../models/Order';
import { ADD_ORDER, SET_ORDER } from '../actions/orderAction';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return { ...state, orders: action.orders };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalAmount,
        action.orderData.date
      );
      return { ...state, orders: [...state.orders, newOrder] };
    default:
      return state;
  }
};
