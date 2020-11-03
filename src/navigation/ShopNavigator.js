import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import ProductsOverviewScreen from '../screen/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screen/shop/ProductDetailScreen';
import CartScreen from '../screen/shop/CartScreen';
import OrderScreen from '../screen/shop/OrderScreen';
import UserProductsScreen from '../screen/user/UserProductsScreen';
import EditProductScreen from '../screen/user/EditProductScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerTintColor: 'white',
};

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{ headerTitle: 'All Product' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Your Cart' }}
      />
    </Stack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Orders"
        component={OrderScreen}
        options={{ title: 'Your Orders' }}
      />
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="UserProduct"
        component={UserProductsScreen}
        options={{ title: 'Your Product' }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params?.productId ? 'Edit Product' : 'Add Product',
        })}
      />
    </Stack.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{ activeTintColor: colors.primary }}
      >
        <Drawer.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Ionicons name="md-cart" size={23} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrderNavigator}
          options={{
            title: 'Your Orders',
            drawerIcon: ({ tintColor }) => (
              <Ionicons name="md-list" size={23} color={tintColor} />
            ),
          }}
        />
        <Drawer.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: ({ tintColor }) => (
              <Ionicons name="md-create" size={23} color={tintColor} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
