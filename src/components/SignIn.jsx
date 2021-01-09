import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required"),
});

/*
const initialValues = {
  username: 'kalle',
  password: 'password'
};
*/

const initialValues = {
  username: '',
  password: ''
};

const SignInForm = ({ onSubmit }) => (
  <View style={styles.flexContainer}>
    <FormikTextInput testID="usernameField" name="username" placeholder="Username"/>
    <View style={{ margin: theme.margin.half }}/>
    <FormikTextInput testID="passwordField" name="password" placeholder="Password" secureTextEntry/>
    <View style={{ margin: theme.margin.half }}/>
    <TouchableOpacity testID="submitButton" style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
  </View>
);

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

const SignIn = ({ setLoggedIn }) => {
  const [signIn] = useSignIn();  
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data && data.authorize && data.authorize.accessToken){
        setLoggedIn(true);
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
  /*
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
  */
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

export default SignIn;