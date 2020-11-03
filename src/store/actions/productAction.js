export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const createProduct = (title, imageUrl, description, price) => {
  return {
    type: CREATE_PRODUCT,
    product: { title, imageUrl, description, price },
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    product: { title, imageUrl, description },
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};
