import React, { useLayoutEffect } from 'react';
import { Alert, Button, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import colors from '../../constants/colors';
import { deleteProduct } from '../../store/actions/productAction';

const UserProductsScreen = ({ navigation }) => {
  const userProduct = useSelector(({ product }) => product.userProducts);
  const dispatch = useDispatch();

  const editProductHandle = (id) => {
    navigation.navigate('EditProduct', { productId: id });
  };

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

  return (
    <FlatList
      data={userProduct}
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
