import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ cart, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{cart.quantity} </Text>
        <Text style={styles.mainText}>{cart.productTitle}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${cart.total.toFixed(2)}</Text>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name="md-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
