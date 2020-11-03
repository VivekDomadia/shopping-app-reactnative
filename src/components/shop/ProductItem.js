import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const ProductItem = ({ product, onSelect, children }) => {
  return (
    <View style={styles.product}>
      <TouchableNativeFeedback onPress={onSelect} useForeground>
        <View>
          <Image style={styles.image} source={{ uri: product.imageUrl }} />
          <View style={styles.details}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});
