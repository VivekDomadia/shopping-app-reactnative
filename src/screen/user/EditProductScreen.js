import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import {
  createProduct,
  updateProduct,
} from '../../store/actions/productAction';

const EditProductScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const prodId = route.params?.productId;
  const exitedProduct = useSelector(({ product }) =>
    product.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(exitedProduct?.title);
  const [imageUrl, setImageUrl] = useState(exitedProduct?.imageUrl);
  const [price, setPrice] = useState(exitedProduct?.price.toString());
  const [description, setDescription] = useState(exitedProduct?.description);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" iconName="md-checkmark" onPress={submitHandler} />
        </HeaderButtons>
      ),
    });
  }, [navigation, title, imageUrl, description, price]);

  const submitHandler = () => {
    if (exitedProduct) {
      dispatch(updateProduct(prodId, title, imageUrl, description));
    } else {
      dispatch(createProduct(title, imageUrl, description, +price));
    }
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {!exitedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
