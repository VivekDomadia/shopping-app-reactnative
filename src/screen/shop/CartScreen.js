import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import colors from '../../constants/colors';
import { removeFromCart } from '../../store/actions/cartAction';
import { addOrder } from '../../store/actions/orderAction';

const CartScreen = (props) => {
  const cartTotalAmount = useSelector(({ cart }) => cart.totalAmount);
  const cartitems = useSelector(({ cart }) => {
    const transformedCartitems = [];
    for (const key in cart.items) {
      transformedCartitems.push({
        productId: key,
        ...cart.items[key],
      });
    }
    return transformedCartitems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={colors.accent}
          disabled={cartitems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartitems, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={cartitems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            cart={itemData.item}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
