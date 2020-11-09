import React, { useLayoutEffect } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import colors from '../../constants/colors';
import { deleteProduct } from '../../store/actions/productAction';

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector(({ product }) => product.userProducts);
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
            title="Add"
            iconName="md-create"
            onPress={() => {
              navigation.navigate('EditProduct');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const editProductHandle = (id) => {
    navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'yes',
        style: 'destructive',
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No product found! Start adding some..</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      key={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem product={item} onSelect={() => editProductHandle(item.id)}>
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => editProductHandle(item.id)}
          />
          <Button
            color={colors.primary}
            title="Delete"
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
