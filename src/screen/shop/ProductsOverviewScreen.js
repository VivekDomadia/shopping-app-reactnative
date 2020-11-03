import React, { useLayoutEffect } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { addToCart } from '../../store/actions/cartAction';
import colors from '../../constants/colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const product = useSelector((state) => state.product.avalableProducts);
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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName="md-cart"
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={product}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <Button
            color={colors.primary}
            title="View Details"
            onPress={() => selectItemHandler(item.id, item.title)}
          />
          <Button
            color={colors.primary}
            title="To Cart"
            onPress={() => dispatch(addToCart(item))}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
