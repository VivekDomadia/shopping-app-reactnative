import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';

const { combineReducers, createStore } = require('redux');

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

const store = createStore(rootReducer);

export default store;
