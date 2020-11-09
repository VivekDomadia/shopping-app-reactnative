import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screen/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screen/shop/ProductDetailScreen';
import CartScreen from '../screen/shop/CartScreen';
import OrderScreen from '../screen/shop/OrderScreen';

import { defaultNavOptions } from './options';
import { AdminNavigator } from './UserNavigator';
import colors from '../constants/colors';
import { logout } from '../store/actions/authAction';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const ProductsNavigator = () => {
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

export const OrderNavigator = () => {
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

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        inactiveTintColor="white"
        inactiveBackgroundColor={colors.primary}
        style={{ marginTop: 15 }}
        labelStyle={{ alignSelf: 'center', fontSize: 16 }}
        onPress={() => dispatch(logout())}
      />
    </DrawerContentScrollView>
  );
};

export const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: colors.primary }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
  );
};
