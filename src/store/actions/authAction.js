import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import { RESET_UI, SET_ERROR, SET_LOADING } from './uiAction';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token, userId, expiryTime) => (dispatch) => {
  dispatch({ type: AUTHENTICATE, token, userId });
};

export const signup = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const response = await Axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjtWKNQjQIC1ajJhNU04Jfi6uf6r1dQgw',
      { email, password, returnSecureToken: true }
    );

    const expDate = new Date(
      new Date().getTime() + parseInt(response.data.expiresIn) * 1000
    );
    saveAuthToStorage(response.data.idToken, response.data.localId, expDate);
    dispatch(
      authenticate(
        response.data.idToken,
        response.data.localId,
        parseInt(response.data.expiresIn) * 1000
      )
    );
    dispatch({ type: RESET_UI });
  } catch (err) {
    console.log(err.response.data.error);
    const error = err.response.data.error;
    let errMsg;
    if (error.message === 'EMAIL_EXISTS') {
      errMsg = 'Email already exists!! Please Login.';
    } else {
      errMsg = 'Something went wrong!';
    }
    dispatch({ type: SET_ERROR, error: errMsg });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const response = await Axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjtWKNQjQIC1ajJhNU04Jfi6uf6r1dQgw',
      { email, password, returnSecureToken: true }
    );

    const expDate = new Date(
      new Date().getTime() + parseInt(response.data.expiresIn) * 1000
    );
    saveAuthToStorage(response.data.idToken, response.data.localId, expDate);
    dispatch(
      authenticate(
        response.data.idToken,
        response.data.localId,
        parseInt(response.data.expiresIn) * 1000
      )
    );
    dispatch({ type: RESET_UI });
  } catch (err) {
    console.log(err.response.data.error);
    const error = err.response.data.error;
    let errMsg;
    if (
      error.message === 'INVALID_EMAIL' ||
      error.message === 'INVALID_PASSWORD'
    ) {
      errMsg = 'Email or Password Wrong!!';
    } else if (error.code === 400) {
      errMsg = error.message;
    } else {
      errMsg = 'Something went wrong!';
    }
    dispatch({ type: SET_ERROR, error: errMsg });
  }
};

export const logout = () => {
  removeAuthtoStorage();
  return { type: LOGOUT };
};

const saveAuthToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};

const removeAuthtoStorage = () => {
  AsyncStorage.removeItem('userData');
};
