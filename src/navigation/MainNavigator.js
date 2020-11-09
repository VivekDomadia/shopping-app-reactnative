import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator } from './UserNavigator';
import { ShopNavigator } from './ShopNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { authenticate } from '../store/actions/authAction';

const MainNavigator = () => {
  const isAuth = !!useSelector(({ auth }) => auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        return;
      }
      const { token, userId, expiryDate } = JSON.parse(userData);
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }
      const expiryTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authenticate(token, userId, expiryTime));
    };
    tryLogin();
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <ShopNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
