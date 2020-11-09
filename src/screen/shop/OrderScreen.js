import React, { useEffect, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import colors from '../../constants/colors';
import { fetchOrders } from '../../store/actions/orderAction';

const OrderScreen = ({ navigation }) => {
  const isLoading = useSelector(({ ui }) => ui.isLoading);
  const error = useSelector(({ ui }) => ui.error);
  const orders = useSelector(({ order }) => order.orders);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const loadOrders = () => {
    dispatch(fetchOrders());
  };

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button title="Try Again" color={colors.primary} onPress={loadOrders} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found! Start adding some..</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          date={itemData.item.redableDate}
          amount={itemData.item.totalAmount}
          item={itemData.item.items}
        />
      )}
    />
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
