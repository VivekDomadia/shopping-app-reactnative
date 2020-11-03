import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const OrderScreen = ({ navigation }) => {
  const orders = useSelector(({ order }) => order.orders);

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
