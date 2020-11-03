import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import { addToCart } from '../../store/actions/cartAction';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const product = useSelector((state) =>
    state.product.avalableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
