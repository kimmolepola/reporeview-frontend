import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import { useHistory } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Please enter a username of length of 1-30 characters")
    .max(30, "Please enter a username of length of 1-30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(1, "Please enter a password of length of 5-50 characters")
    .max(30, "Please enter a password of length of 5-50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], "Please make sure your passwords match")
    .required("Password confirmation is required"),
});

const initialValues = {
  username: '',
  password: ''
};

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.flexContainer}>
    <FormikTextInput name="username" placeholder="Username"/>
    <View style={{ margin: theme.margin.half }}/>
    <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
    <View style={{ margin: theme.margin.half }}/>
    <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry/>
    <View style={{ margin: theme.margin.half }}/>
    <TouchableOpacity style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
  </View>
);

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

const SignUp = ({ setLoggedIn }) => {
  const history = useHistory();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      if (data){
        try {
          const signInData = await signIn({ username, password });
          if (signInData) {
            setLoggedIn(true);
            history.push("/");
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      Alert.alert("Error", e.message);
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
  flexContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.padding.normal,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.normal,
    borderRadius: theme.borderRadius.normal,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    marginTop: 5, 
    marginBottom: 5, 
    color: theme.colors.subheading, 
    fontWeight: 'bold',
  }
});

export default SignUp;