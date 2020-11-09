import React, { useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import colors from '../../constants/colors';
import { login, signup } from '../../store/actions/authAction';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = () => {
  const [isSignup, setIsSignup] = useState(false);
  const isLoading = useSelector(({ ui }) => ui.isLoading);
  const error = useSelector(({ ui }) => ui.error);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  };

  const authHandler = () => {
    if (isSignup) {
      dispatch(
        signup(formState.inputValues.email, formState.inputValues.password)
      );
    } else {
      dispatch(
        login(formState.inputValues.email, formState.inputValues.password)
      );
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      // behavior="padding"
      // keyboardVerticalOffset={}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffeeff', '#ffe3ff']} style={styles.gradient}>
        <View style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter valid email address!"
              onInputChange={inputChangeHandler}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter valid password!"
              onInputChange={inputChangeHandler}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign up' : 'Login'}
                  color={colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Go to ${isSignup ? 'Login' : 'Sign up'}`}
                color={colors.accent}
                onPress={() => setIsSignup((prevState) => !prevState)}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
