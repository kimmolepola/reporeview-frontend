import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import Text from './Text';
import useSignOut from '../hooks/useSignOut';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  flexContainer: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: theme.colors.barBackground,
  },
  flexItem: {
    flexGrow: 0,
    paddingLeft: theme.padding.normal,
    paddingRight: theme.padding.normal,
    paddingBottom: 20,
    paddingTop: 30
  },
});

const SignOut = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.flexItem}>
        {<Text fontSize="subheading" color="subheading" fontWeight="bold">Sign out</Text>}        
      </View>
    </TouchableOpacity>
  );
};

const AppBar = ({ loggedIn, setLoggedIn }) => {
  const signOut = useSignOut();
  const { data } = useAuthorizedUser();
  const history = useHistory();

  const onPress = () => {
    signOut();
    if (data != undefined && data.authorizerUser == null){
      setLoggedIn(false);
      history.push("/");
    }
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <AppBarTab text={"Repositories"} link={"/"}/>
        {loggedIn && <AppBarTab text={"Create a review"} link={"/Review"}/>}
        {loggedIn && <AppBarTab text={"My reviews"} link={"/MyReviews"} />}
        {loggedIn && <SignOut onPress={onPress}/>}
        {!loggedIn && <AppBarTab text={"Sign in"} link={"/SignIn"}/>}
        {!loggedIn && <AppBarTab text={"Sign up"} link={"/SignUp"}/>}
      </ScrollView>
    </View>
  );
};

export default AppBar;
