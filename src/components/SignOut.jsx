import React from 'react';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';
import useSignOut from '../hooks/useSignOut';
import useAuthorizedUser from '../hooks/useAuthorizedUser';


const handleSignOut = (signOut, history, setLoggedIn) => {
  const checkIfLoggedOut = () => {
    const { data } = useAuthorizedUser();
    if (data != undefined && data.authorizerUser == null){
      setLoggedIn(false);

    }
  };
  checkIfLoggedOut();
};

const SignOut = ({ history, setLoggedIn }) => {
  const signOut = useSignOut();
  signOut();
  handleSignOut(signOut, history, setLoggedIn);
  history.push("/");
};

export default SignOut;