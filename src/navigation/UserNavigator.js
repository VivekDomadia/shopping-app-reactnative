import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditProductScreen from '../screen/user/EditProductScreen';
import UserProductsScreen from '../screen/user/UserProductsScreen';

import AuthScreen from '../screen/user/AuthScreen';
import { defaultNavOptions } from './options';

const Stack = createStackNavigator();

export const AdminNavigator = () => {
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

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  );
};
